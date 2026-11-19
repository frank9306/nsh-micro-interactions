import { Button, Slider } from "nsh/base";
import { createAnimatedValue, reduceMotion, signal, Text, View, windowSize } from "nsh";
import type { Ink, Language } from "../model";

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
  "card-stamp-arc": { count: 5, to: i => [(i - 2) * 45, [34, 8.5, -8.5, 8.5, 34][i], [-25, -12, 0, 12, 25][i]] },
};

const paper = ["#4534ac", "#6456cc", "#8472e4", "#b3a0ff", "#d9caff", "#eadbff", "#f2e8ff"];
export function CardMotion(p: { id: string; label: string; ink: Ink; hero?: boolean; language?: Language }) {
  const spread = spreadStyles[p.id];
  const stamp = p.id === "card-stamp-arc";
  const settings = [
    { en: "Arc", zh: "弧度", start: 25, value: signal(25), min: 0, max: 45 },
    { en: "Spread", zh: "展开距离", start: 90, value: signal(90), min: 38, max: 126 },
    { en: "Vertical offset", zh: "垂直偏移", start: 34, value: signal(34), min: 0, max: 51 },
  ];
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
  return <View style={{ alignSelf: "stretch", gap: 8 }}><Button accessibilityLabel={p.label} selected={pinned()}
    onMouseEnter={() => { pointer.set(true); update(); }}
    onMouseLeave={() => { pointer.set(false); update(); }}
    onPress={() => { pinned.update(on => !on); update(); }}
    class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
    style={{ width: "100%", minHeight: p.hero ? 208 : 167, borderRadius: 17, alignItems: "center", justifyContent: "center" }}>
    {arrangement.map(i => {
      const a = spread.from?.(i) ?? [0, 0, 0];
      const b = spread.to(i);
      const axis = (index: number, ratio = 1) => open.interpolate({ inputRange: [0, 1], outputRange: [a[index], b[index] * ratio] });
      return <View style={{
        position: "absolute", pointerEvents: "none", width: p.hero ? 113 : 75, height: p.hero ? 85 : 56,
        transformOrigin: spread.origin ?? "50% 50%",
        transform: [{ scale: compact() ? 0.76 : 1 },
          { translateX: axis(0, stamp ? settings[1].value() / settings[1].start : 1) },
          { translateY: axis(1, stamp ? settings[2].value() / settings[2].start : 1) },
          { rotate: axis(2, stamp ? settings[0].value() / settings[0].start : 1) }],
        borderRadius: stamp ? 4 : 12, borderWidth: 1, borderColor: "#ffffff68", padding: 12, justifyContent: "space-between",
        backgroundColor: paper[i], backgroundImage: "linear-gradient(142deg,#ffffff63,#ffffff00 52%,#291a6648)",
        boxShadow: "0 9px 25px #20144648",
      }}>
        <View style={{ width: 17, height: 11, borderRadius: 4, borderColor: "#20144c7b", borderWidth: 1 }} />
        <View style={{ width: "49%", height: 3, borderRadius: 2, backgroundColor: "#20144c60" }} />
        <If when={stamp}><View style={{ position: "absolute", bottom: -2, left: 8, right: 8, flexDirection: "row", justifyContent: "space-between" }}>
          {Array.from({ length: 7 }, () => <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: p.ink.stage }} />)}
        </View></If>
      </View>;
    })}
  </Button><If when={stamp}>
    {settings.map(setting => <View style={{ paddingHorizontal: 10, gap: 3 }}>
      <Text style={{ color: p.ink.muted, fontSize: 12 }}>{p.language === "zh" ? setting.zh : setting.en}</Text>
      <Slider accessibilityLabel={p.language === "zh" ? setting.zh : setting.en}
        value={setting.value()} min={setting.min} max={setting.max}
        onChange={({ value }) => { if (typeof value === "number") { setting.value.set(value); pinned.set(true); update(); } }}
        trackStyle={{ height: 24, justifyContent: "center" }}
        indicatorStyle={{ height: 4, borderRadius: 3, backgroundColor: p.ink.border }}
        rangeStyle={{ height: 4, borderRadius: 3, backgroundColor: p.ink.accent }}
        thumbStyle={{ width: 11, height: 11, borderRadius: 6, backgroundColor: p.ink.accent }} />
    </View>)}
  </If></View>;
}
