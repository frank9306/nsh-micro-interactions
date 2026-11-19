import { Button } from "nsh/base";
import { createAnimatedValue, reduceMotion, signal, View, windowSize } from "nsh";
import type { Ink } from "../model";

type Pose = readonly [x: number, y: number, rotation: number];
type Spread = { count: number; from?: (index: number) => Pose; to: (index: number) => Pose; origin?: string };
const arc = (index: number, center: number, gap: number, angle: number, depth: number): Pose => {
  const distance = index - center;
  const ratio = distance / center;
  return [ratio * gap, ratio * ratio * depth - depth * 0.65, ratio * angle];
};
const scatter: Pose[] = [[-68, 6, -28], [-31, -24, 12], [0, 0, -6], [33, -16, 21], [71, 12, -16]];
export const spreadStyles: Record<string, Spread> = {
  "card-arc-5": { count: 5, to: i => arc(i, 2, 70, 30, 29) },
  "card-arc-7": { count: 7, to: i => arc(i, 3, 110, 45, 35) },
  "card-long-arc-5": { count: 5, to: i => arc(i, 2, 140, 15, 13) },
  "card-linear-spread": { count: 5, to: i => [(i - 2) * 45, 0, 0] },
  "card-corner-fan": { count: 5, origin: "10% 95%", to: i => [0, 0, -20 + i * 10] },
  "card-cascade-stagger": { count: 5, from: i => [0, (i - 2) * 2, 0], to: i => [(i - 2) * 14, (i - 2) * -28 - 14, (i - 2) * 6] },
  "card-scatter-spread": { count: 5, to: i => scatter[i] },
  "card-wheel-fan": { count: 5, origin: "50% 100%", to: i => [(i - 2) * 11, 0, (i - 2) * 18] },
};

const paper = ["#4534ac", "#6456cc", "#8472e4", "#b3a0ff", "#d9caff", "#eadbff", "#f2e8ff"];
export function CardMotion(p: { id: string; label: string; ink: Ink; hero?: boolean }) {
  const spread = spreadStyles[p.id];
  const pinned = signal(false);
  const pointer = signal(false);
  const open = createAnimatedValue(0);
  const arrangement = Array.from({ length: spread.count }, (_, i) => i)
    .sort((a, b) => Math.abs(b - (spread.count - 1) / 2) - Math.abs(a - (spread.count - 1) / 2));
  function update() {
    const target = pinned() || pointer() ? 1 : 0;
    if (reduceMotion()) open.set(target);
    else void open.spring(target, { stiffness: 245, damping: 23 });
  }
  const compact = () => windowSize().width < 680;
  return <Button accessibilityLabel={p.label} selected={pinned()}
    onMouseEnter={() => { pointer.set(true); update(); }}
    onMouseLeave={() => { pointer.set(false); update(); }}
    onPress={() => { pinned.update(on => !on); update(); }}
    class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
    style={{ width: "100%", minHeight: p.hero ? 208 : 167, borderRadius: 17, alignItems: "center", justifyContent: "center" }}>
    {arrangement.map(i => {
      const a = spread.from?.(i) ?? [0, 0, 0];
      const b = spread.to(i);
      const axis = (index: number) => open.interpolate({ inputRange: [0, 1], outputRange: [a[index], b[index]] });
      const x = axis(0);
      const y = axis(1);
      const rotation = axis(2);
      return <View style={{
        position: "absolute", pointerEvents: "none", width: p.hero ? 113 : 75, height: p.hero ? 85 : 56,
        transformOrigin: spread.origin ?? "50% 50%", transform: [{ scale: compact() ? 0.76 : 1 }, { translateX: x }, { translateY: y }, { rotate: rotation }],
        borderRadius: 12, borderWidth: 1, borderColor: "#ffffff68", padding: 12, justifyContent: "space-between",
        backgroundColor: paper[i], backgroundImage: "linear-gradient(142deg,#ffffff63,#ffffff00 52%,#291a6648)",
        boxShadow: "0 9px 25px #20144648",
      }}>
        <View style={{ width: 17, height: 11, borderRadius: 4, borderColor: "#20144c7b", borderWidth: 1 }} />
        <View style={{ width: "49%", height: 3, borderRadius: 2, backgroundColor: "#20144c60" }} />
      </View>;
    })}
  </Button>;
}
