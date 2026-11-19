import { Button } from "nsh/base";
import { View, Text, createAnimatedValue, reduceMotion, type ViewStyle } from "nsh";
import type { Ink, Language } from "../model";

type Reveal = { part: "letter" | "word" | "whole"; x?: number; y?: number; scale?: number; bounce?: boolean };
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
  "scale-in": { part: "whole", scale: 0.92 },
  "zoom-in": { part: "whole", scale: 0.8 },
  "zoom-out": { part: "whole", scale: 1.2 },
};
export const textNames = new Set(Object.keys(presets));

function Sample(p: { sample: string; preset: Reveal; ink: Ink }) {
  const progress = createAnimatedValue(1);
  const segments = p.preset.part === "letter" ? [...p.sample] : p.preset.part === "word" ? p.sample.split(" ") : [p.sample];
  const cap = p.preset.part === "letter" ? 0.54 : 0.35;
  const averageDelay = segments.length > 1 ? cap / (segments.length - 1) : 0;
  function play() {
    if (reduceMotion()) return;
    progress.set(0);
    void progress.keyframes([0, 1], { duration: segments.length > 1 ? 850 : 440, easing: "linear" });
  }
  const textStyle = { color: p.ink.text, fontSize: 26, fontWeight: "700" } as const;
  return <Button accessibilityLabel={p.sample} onPress={play} class="focus-visible:outline-2"
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
        const style: ViewStyle = { opacity: animate(0, 1), transform: [{ translateX: animate(p.preset.x ?? 0, 0) }, { translateY: y }, { scale: animate(p.preset.scale ?? 1, 1) }] };
        return <View style={style}><Text style={textStyle}>{segment === " " ? "\u00a0" : segment}</Text></View>;
      })}
    </View>
  </Button>;
}

export function TextMotion(p: { id: string; ink: Ink; language: Language }) {
  const preset = presets[p.id];
  const label = () => p.language === "zh" ? "微交互实验室" : "Motion in focus";
  return <View style={{ alignItems: "center", gap: 8 }}>
    <Each of={[label()]}>{sample => <Sample sample={sample()} preset={preset} ink={p.ink} />}</Each>
    <Text style={{ color: p.ink.muted, fontSize: 13 }}>{p.language === "zh" ? "点击文字重播" : "Press the text to replay"}</Text>
  </View>;
}
