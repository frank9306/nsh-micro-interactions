import { Button, Slider } from "nsh/base";
import { Text, View, createAnimatedValue, reduceMotion, signal } from "nsh";
import type { Ink, Language } from "../model";

const leaves = ["#5242a9", "#7159c7", "#ae8df5", "#b39aff", "#ded1fc"];
export const depthNames = new Set(["card-carousel", "card-cover-flow", "card-time-machine",
  "card-carousel-mono", "card-cover-flow-mono", "card-time-machine-mono"]);

export function CardDepth(p: { id: string; ink: Ink; language: Language }) {
  const stack = p.id.includes("time-machine");
  const cover = p.id.includes("cover-flow");
  const mono = p.id.endsWith("-mono");
  const index = signal(stack ? 0 : 2);
  const position = createAnimatedValue(index());
  const zh = () => p.language === "zh";
  const choices = [0, 1, 2, 3, 4];
  function moveTo(next: number) {
    const target = Math.min(4, Math.max(0, Math.round(next)));
    index.set(target);
    if (reduceMotion()) position.set(target);
    else void position.spring(target, { stiffness: 320, damping: 30 });
  }

  function Step(props: { value: number }) {
    const selected = () => index() === props.value;
    const label = () => zh() ? `卡片 ${props.value + 1}` : `Card ${props.value + 1}`;
    return <Button accessibilityLabel={label()} selected={selected()} onPress={() => moveTo(props.value)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
      style={{ width: 36, height: 35, alignItems: "center", justifyContent: "center", borderRadius: 10, backgroundColor: selected() ? p.ink.tint : p.ink.panel }}>
      <View style={{ width: selected() ? 18 : 7, height: 4, borderRadius: 3, backgroundColor: selected() ? p.ink.accent : p.ink.muted }} />
    </Button>;
  }

  return <View style={{ alignSelf: "stretch", alignItems: "center", gap: 10 }}>
    <View style={{ minHeight: 156, alignSelf: "stretch", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {choices.map(i => {
        const interpolate = (project: (offset: number) => number) => position.interpolate({
          inputRange: choices, outputRange: choices.map(active => project(i - active)),
        });
        const x = interpolate(d => stack ? 0 : d * (cover ? 41 : 34));
        const y = interpolate(d => stack ? (d < 0 ? -38 : d * -8) : cover ? Math.abs(d) * 1.4 : Math.abs(d) * 10);
        const rotation = interpolate(d => stack ? -Math.max(0, d) * 3 : cover ? -Math.sign(d) * 37 : Math.max(-36, Math.min(36, d * 15)));
        const scale = interpolate(d => stack ? (d < 0 ? 1.17 : 1 - d * 0.08) : d === 0 ? 1.08 : Math.max(0.58, 0.94 - Math.abs(d) * 0.08));
        const opacity = interpolate(d => stack ? (d < 0 ? 0 : Math.max(0.24, 1 - d * 0.12)) : Math.max(0.34, 1 - Math.abs(d) * 0.12));
        return <View style={{
          position: "absolute", width: 110, height: 73, borderRadius: 12, overflow: "hidden",
          zIndex: 20 - Math.abs(i - index()), opacity,
          transform: [{ perspective: 460 }, { translateX: x }, { translateY: y },
            stack ? { rotateX: rotation } : cover ? { rotateY: rotation } : { rotate: rotation }, { scale }],
          backgroundColor: mono ? p.ink.muted : leaves[i], backgroundImage: "linear-gradient(140deg,#ffffff54,#ffffff00 65%,#23163e52)",
          borderColor: "#ffffff67", borderWidth: 1, justifyContent: "space-between", padding: 11, pointerEvents: "none",
        }}>
          <View style={{ width: 20, height: 12, borderRadius: 4, borderColor: "#17102e95", borderWidth: 1 }} />
          <View style={{ width: 42, height: 3, borderRadius: 3, backgroundColor: "#17102e85" }} />
        </View>;
      })}
    </View>
    <If when={stack} else={<View style={{ flexDirection: "row", gap: 5 }}>{choices.map(value => <Step value={value} />)}</View>}>
      <Slider accessibilityLabel={zh() ? "时间轴" : "Timeline"} value={index()} min={0} max={4} step={1}
        onChange={({ value }) => { if (typeof value === "number") moveTo(value); }} style={{ width: "80%" }}
        trackStyle={{ height: 28, justifyContent: "center" }} indicatorStyle={{ height: 4, borderRadius: 4, backgroundColor: p.ink.border }}
        rangeStyle={{ height: 4, borderRadius: 4, backgroundColor: p.ink.accent }}
        thumbStyle={{ width: 13, height: 13, borderRadius: 7, backgroundColor: p.ink.accent }} />
    </If>
    <Text style={{ color: p.ink.muted, fontSize: 13 }}>{`${index() + 1} / 5`}</Text>
  </View>;
}
