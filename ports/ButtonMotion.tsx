import { Button } from "nsh/base";
import { Canvas, Path2D, Text, View, cleanup, createAnimatedValue, reduceMotion, signal, type MouseEvent } from "nsh";
import { glyphs } from "../glyphs";
import type { Entry, Ink } from "../model";

const paths = Object.fromEntries(Object.entries(glyphs).map(([name, path]) => [name, new Path2D(path)]));
const spring = { stiffness: 600, damping: 28 };
const drawer = { position: "absolute", left: 0, top: 0, width: 18, height: 18 } as const;

export function Glyph(p: { name: string; color: string; fill?: boolean; size?: number }) {
  return <Canvas style={{ width: p.size ?? 18, height: p.size ?? 18, flexShrink: 0 }} draw={ctx => {
    const size = p.size ?? 18;
    const path = paths[p.name];
    if (!path) return;
    ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (p.fill) { ctx.fillStyle = p.color; ctx.fill(path); }
    ctx.stroke(path);
  }} />;
}

export function MotionButton(p: { entry: Entry; label: string; ink: Ink; onPress?: () => void; testID?: string }) {
  const effect = p.entry.effect;
  const hover = signal(false);
  const held = signal(false);
  const active = signal(false);
  const size = signal(0);
  const swap = createAnimatedValue(0);
  const scale = createAnimatedValue(1);
  const pulse = createAnimatedValue(1);
  const angle = createAnimatedValue(0);
  const x = createAnimatedValue(0);
  const y = createAnimatedValue(0);
  const sweep = createAnimatedValue(0);
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const interpolated = (values: number[]) => swap.interpolate({ inputRange: [0, 1], outputRange: values });
  const oldOpacity = interpolated([1, 0]);
  const newOpacity = interpolated([0, 1]);
  const oldScale = interpolated([1, 0.5]);
  const newScale = interpolated([0.5, 1]);
  const firstShift = interpolated([0, -12]);
  const secondShift = interpolated([12, 0]);
  const roll = interpolated([0, -18]);
  const lift = interpolated([0, 42]);
  const haloX = sweep.interpolate({ inputRange: [0, 1], outputRange: [-120, 150] });
  const haloScale = sweep.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] });
  const haloAlpha = sweep.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0.85, 0] });
  const both = ["morph", "color-morph", "sparkle", "ring", "slide-arrow"].includes(effect ?? "") && p.entry.icons?.length === 2;
  const first = p.entry.icons?.[0] ?? "sparkles";
  const second = p.entry.icons?.[1] ?? first;

  function resizing() {
    if (reduceMotion()) scale.set(1);
    else void scale.spring(held() ? 0.96 : hover() ? 1.02 : 1, spring);
  }

  function change(next: boolean) {
    hover.set(next);
    active.set(next);
    resizing();
    const reduced = reduceMotion();
    if (reduced) {
      swap.set(Number(next));
      return;
    }
    void swap.spring(Number(next), spring);
    if (effect === "rotate" || effect === "text-reveal") {
      void angle.spring(next ? (effect === "rotate" ? 180 : 45) : 0, { stiffness: 400, damping: 28 });
    }
    if (!next) {
      void x.spring(0, spring);
      void y.spring(0, spring);
      sweep.set(0);
      return;
    }
    if (effect === "pulse") void pulse.keyframes([1, 1.25, 1], { duration: 250 });
    if (effect === "shake") {
      void angle.keyframes([0, -10, 10, -10, 0], { duration: 250 });
      void y.keyframes([0, -2, 0, -2, 0], { duration: 250 });
    }
    if (effect === "expand-ring" || effect === "glare") {
      sweep.set(0);
      void sweep.keyframes([0, 1], { duration: effect === "glare" ? 850 : 300 });
    }
  }

  function magnet(event: MouseEvent) {
    if (effect !== "magnetic" || reduceMotion()) return;
    void x.spring((event.position.x - size() / 2) * 0.14, spring);
    void y.spring((event.position.y - 20) * 0.23, spring);
  }

  function press() {
    p.onPress?.();
    if (hover()) return;
    change(true);
    if (timeout !== undefined) clearTimeout(timeout);
    timeout = setTimeout(() => change(false), 650);
  }

  cleanup(() => { if (timeout !== undefined) clearTimeout(timeout); });
  return <View style={{ alignItems: "center", justifyContent: "center" }}>
    <If when={effect === "expand-ring"}><View style={{
      position: "absolute", top: 0, bottom: 0, left: 0, right: 0, borderColor: p.ink.accent,
      borderWidth: 1, borderRadius: 32, pointerEvents: "none", opacity: haloAlpha, transform: [{ scale: haloScale }],
    }} /></If>
    <Button accessibilityLabel={p.label} onPress={press} testID={p.testID}
      onMouseEnter={() => { if (timeout !== undefined) clearTimeout(timeout); change(true); }}
      onMouseMove={magnet} onMouseLeave={() => { held.set(false); change(false); }}
      onPressDown={() => { held.set(true); resizing(); }} onPressUp={() => { held.set(false); resizing(); }}
      onLayout={({ bounds }) => size.set(bounds.size.width)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineColor: p.ink.accent, outlineWidth: 2, outlineOffset: 3 }}
      style={{
        minHeight: 40, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingHorizontal: 17,
        gap: 9, borderRadius: 32, borderWidth: 1, borderColor: active() ? p.ink.accent : p.ink.border,
        backgroundColor: active() ? p.ink.tint : p.ink.panel, overflow: "hidden",
        transform: [{ translateX: effect === "magnetic" ? x : 0 }, { translateY: effect === "magnetic" ? y : 0 }, { scale }],
      }}>
      <View style={{ position: "relative", width: 18, height: 18, pointerEvents: "none" }}>
        <View style={{
          ...drawer, opacity: both ? oldOpacity : 1,
          transform: [{ translateX: effect === "slide-arrow" ? firstShift : 0 },
            { translateY: effect === "shake" ? y : 0 }, { rotate: angle }, { scale: both ? oldScale : pulse }],
        }}>
          <Glyph name={first} color={active() && (effect === "pulse" || effect === "shake") ? p.entry.ink ?? p.ink.accent : p.ink.text} fill={active() && effect === "pulse"} />
        </View>
        <If when={both}><View style={{
          ...drawer, opacity: newOpacity,
          transform: [{ translateX: effect === "slide-arrow" ? secondShift : 0 }, { rotate: effect === "ring" ? roll : 0 }, { scale: newScale }],
        }}>
          <Glyph name={second} color={p.entry.ink ?? p.ink.accent} fill={effect === "color-morph"} />
          <If when={effect === "ring" || effect === "sparkle"}>
            <View style={{ position: "absolute", top: -3, right: -3, width: 5, height: 5, borderRadius: 4, backgroundColor: p.entry.ink ?? p.ink.accent }} />
          </If>
        </View></If>
      </View>
      <View style={{ height: 18, overflow: "hidden", pointerEvents: "none" }}>
        <View style={{ transform: [{ translateY: effect === "text-reveal" ? roll : 0 }] }}>
          <Text style={{ fontSize: 13, height: 18, lineHeight: 18, color: p.ink.text, fontWeight: "650" }}>{p.label}</Text>
          <If when={effect === "text-reveal"}><Text style={{ fontSize: 13, height: 18, lineHeight: 18, color: p.ink.text, fontWeight: "650" }}>{p.label}</Text></If>
        </View>
      </View>
      <If when={effect === "glare" || effect === "sparkle"}>
        <View style={{
          position: "absolute", top: 0, bottom: 0, width: effect === "glare" ? 54 : 20, opacity: effect === "glare" ? haloAlpha : newOpacity,
          pointerEvents: "none", backgroundImage: "linear-gradient(90deg, #ffffff00, #ffffff45, #ffffff00)",
          transform: [{ translateX: effect === "glare" ? haloX : lift }, { rotate: -18 }],
        }} />
      </If>
    </Button>
  </View>;
}
