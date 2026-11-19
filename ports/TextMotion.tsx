import { Button } from "nsh/base";
import { View, Text, cleanup, createAnimatedValue, effect, reduceMotion, signal, type ViewStyle } from "nsh";
import type { Ink, Language } from "../model";

type Reveal = {
  part: "letter" | "word" | "whole";
  x?: number; y?: number; scale?: number; sx?: number; sy?: number;
  rotate?: number; rotateX?: number; rotateY?: number;
  bounce?: boolean; hover?: boolean; loop?: boolean; dim?: number; glow?: boolean;
};
const presets: Record<string, Reveal> = {
  "fade-in-char": { part: "letter" },
  "fade-in-word": { part: "word" },
  "fade-in-text": { part: "whole" },
  "slide-up-char": { part: "letter", y: 18 },
  "slide-up-word": { part: "word", y: 18 },
  "slide-up-text": { part: "whole", y: 18 },
  "slide-down-char": { part: "letter", y: -18 },
  "slide-down-word": { part: "word", y: -18 },
  "slide-left-char": { part: "letter", x: 20 },
  "slide-right-char": { part: "letter", x: -20 },
  "drop-in-char": { part: "letter", y: -29 },
  "rise-up-word": { part: "word", y: 26, bounce: true },
  "bounce-in-char": { part: "letter", x: 0, y: 10, scale: 0.65, bounce: true },
  "scale-in-char": { part: "letter", scale: 0.4 },
  "scale-in-word": { part: "word", scale: 0.75 },
  "scale-in-text": { part: "whole", scale: 0.6 },
  "zoom-in-text": { part: "whole", scale: 0.85 },
  "zoom-out-text": { part: "whole", scale: 1.25 },
  "stagger-text": { part: "word", y: 18 },
  "fade-in": { part: "whole" },
  "fade-up": { part: "whole", y: 20 },
  "fade-down": { part: "whole", y: -20 },
  "character-stagger": { part: "letter", y: 17 },
  "word-reveal": { part: "word", y: 18 },
  "scale-in": { part: "whole", scale: 0.92 },
  "zoom-in": { part: "whole", scale: 0.8 },
  "zoom-out": { part: "whole", scale: 1.2 },
  "flip-y-char": { part: "letter", rotateY: -85 },
  "flip-x-char": { part: "letter", rotateX: -85 },
  "rotate-in-char": { part: "letter", rotate: -30, y: 11 },
  "swing-word": { part: "word", rotate: -28, bounce: true },
  "stretch-x-char": { part: "letter", sx: 1.8 },
  "stretch-y-char": { part: "letter", sy: 1.8 },
  "spring-text": { part: "whole", scale: 1.12, hover: true, bounce: true },
  "hover-lift-char": { part: "letter", y: -8, hover: true },
  "hover-lift-word": { part: "word", y: -8, hover: true },
  "hover-scale-char": { part: "letter", scale: 1.13, hover: true },
  "hover-scale-word": { part: "word", scale: 1.13, hover: true },
  "float-char": { part: "letter", y: -8, loop: true },
  "float-word": { part: "word", y: -8, loop: true },
  "pulse-char": { part: "letter", dim: 0.3, loop: true },
  "pulse-word": { part: "word", dim: 0.3, loop: true },
  "glow-text": { part: "whole", glow: true, dim: 0.6, loop: true },
};
export const textNames = new Set(Object.keys(presets));

function Sample(p: { sample: string; preset: Reveal; ink: Ink }) {
  const progress = createAnimatedValue(1);
  const paused = signal(false);
  const segments = p.preset.part === "letter" ? [...p.sample] : p.preset.part === "word" ? p.sample.split(" ") : [p.sample];
  const cap = p.preset.part === "letter" ? 0.54 : 0.35;
  const averageDelay = segments.length > 1 ? cap / (segments.length - 1) : 0;
  const interactive = p.preset.hover || p.preset.loop;
  function play() {
    if (reduceMotion()) return;
    progress.set(0);
    void progress.keyframes([0, 1], { duration: segments.length > 1 ? 850 : 440, easing: "linear" });
  }
  function hover(inside: boolean) {
    if (!p.preset.hover || reduceMotion()) return;
    void progress.spring(inside ? 0 : 1, { stiffness: 300, damping: p.preset.bounce ? 14 : 24 });
  }
  effect(() => {
    if (p.preset.loop && !reduceMotion() && !paused()) {
      void progress.keyframes([1, 0, 1], { duration: 1450, easing: "easeInOut", iterations: "infinite" });
      cleanup(() => { progress.set(1); });
    }
  });
  return <Button accessibilityLabel={p.sample} onPress={p.preset.loop ? () => paused.update(value => !value) : play}
    onMouseEnter={() => hover(true)} onMouseLeave={() => hover(false)} class="focus-visible:outline-2"
    focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
    style={{ minHeight: 70, paddingHorizontal: 12, justifyContent: "center", borderRadius: 11 }}>
    <View style={{ overflow: "hidden", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: p.preset.part === "word" ? 8 : 0 }}>
      {segments.map((segment, i) => {
        const start = averageDelay * i;
        const end = start + (segments.length === 1 ? 1 : 1 - cap);
        const active = [start, end];
        const animate = (from: number, to: number) => progress.interpolate({ inputRange: active, outputRange: [from, to], extrapolate: "clamp" });
        const y = p.preset.bounce
          ? progress.interpolate({ inputRange: [start, (start + end) / 2, end], outputRange: [p.preset.y ?? 0, -3, 0], extrapolate: "clamp" })
          : animate(p.preset.y ?? 0, 0);
        const style: ViewStyle = {
          opacity: animate(p.preset.dim ?? (interactive ? 1 : 0), 1),
          transform: [
            { perspective: 490 }, { translateX: animate(p.preset.x ?? 0, 0) }, { translateY: y },
            { rotate: animate(p.preset.rotate ?? 0, 0) }, { rotateX: animate(p.preset.rotateX ?? 0, 0) },
            { rotateY: animate(p.preset.rotateY ?? 0, 0) }, { scale: animate(p.preset.scale ?? 1, 1) },
            { scaleX: animate(p.preset.sx ?? 1, 1) }, { scaleY: animate(p.preset.sy ?? 1, 1) },
          ],
        };
        const textStyle = {
          color: p.ink.text, fontSize: 26, fontWeight: "700" as const,
          textShadow: p.preset.glow ? `0 0 26px ${p.ink.accent}` : undefined,
        };
        return <View style={style}><Text style={textStyle}>{segment === " " ? "\u00a0" : segment}</Text></View>;
      })}
    </View>
  </Button>;
}

export function TextMotion(p: { id: string; ink: Ink; language: Language }) {
  const preset = presets[p.id];
  const label = () => p.language === "zh" ? (preset.part === "word" ? "微交互 实验室" : "微交互实验室") : "Motion in focus";
  const hint = () => preset.loop ? (p.language === "zh" ? "点击文字暂停或继续" : "Press the text to pause or resume")
    : preset.hover ? (p.language === "zh" ? "悬停或点击文字" : "Hover or press the text")
    : (p.language === "zh" ? "点击文字重播" : "Press the text to replay");
  return <View style={{ alignItems: "center", gap: 8 }}>
    <Each of={[label()]}>{sample => <Sample sample={sample()} preset={preset} ink={p.ink} />}</Each>
    <Text style={{ color: p.ink.muted, fontSize: 13 }}>{hint()}</Text>
  </View>;
}
