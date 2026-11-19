import { Button, Select } from "nsh/base";
import { Text, View, cleanup, effect, signal, type ViewStyle } from "nsh";
import { ActionMorph } from "./ActionMorph";
import { ShapeMotion, shapeNames } from "./ShapeMotion";
import { componentName } from "../strings";
import type { Ink, Language } from "../model";

const group = [
  ["dynamic-island", "Dynamic Island"], ["add-to-cart-morph", "Add to Cart"], ["play-pause-morph", "Play / Pause"],
  ["shapes-heart-morph", "Shapes to Heart"], ["search-expand", "Search Expand"], ["loader-morphing", "Squircle to Circle"],
  ["morph-diamond-squircle", "Diamond to Squircle"], ["morph-organic-blob", "Organic Blob"], ["morph-jelly-skew", "Jelly Skew"],
  ["morph-star-kinetic", "Kinetic Star"], ["morph-capsule-stretch", "Capsule Stretch"],
];
const row = { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" } as const;

function Island(p: { ink: Ink; language: Language }) {
  const scene = signal(0);
  const expanded = signal(false);
  const seconds = signal(48);
  const running = signal(false);
  const status = signal("");
  const zh = () => p.language === "zh";
  effect(() => {
    if (!running()) return;
    const timer = setInterval(() => {
      seconds.update(value => Math.max(0, value - 1));
      if (!seconds()) running.set(false);
    }, 1000);
    cleanup(() => clearInterval(timer));
  });
  const title = () => (zh() ? ["计时", "来电", "外送"] : ["Timer", "Call", "Delivery"])[scene()];
  const detail = () => scene() === 0 ? `00:${String(seconds()).padStart(2, "0")}`
    : status() || (scene() === 1 ? (zh() ? "来电中" : "Incoming call") : (zh() ? "预计 12 分钟" : "ETA 12 min"));
  function Action(q: { label: string; press: () => void; active?: boolean }) {
    return <Button accessibilityLabel={q.label} onPress={q.press} selected={q.active}
      focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }} class="focus-visible:outline-2"
      style={{ paddingHorizontal: 10, minHeight: 33, borderRadius: 16, justifyContent: "center",
        borderColor: p.ink.border, borderWidth: 1, backgroundColor: q.active ? p.ink.tint : p.ink.panel }}>
      <Text style={{ color: p.ink.text, fontSize: 13 }}>{q.label}</Text>
    </Button>;
  }
  return <View style={{ gap: 10, alignItems: "center" }}>
    <View style={row}>{(zh() ? ["计时", "来电", "外送"] : ["Timer", "Call", "Delivery"]).map((label, i) =>
      <Action label={label} active={scene() === i} press={() => { scene.set(i); status.set(""); }} />
    )}</View>
    <View class="transition-all duration-200 motion-reduce:transition-none"
      style={{ width: expanded() ? 224 : 141, padding: 7, gap: 8, borderRadius: 20,
        backgroundColor: p.ink.tint, borderWidth: 1, borderColor: p.ink.border, alignItems: "center" }}>
      <Action label={expanded() ? (zh() ? "收起状态栏" : "Collapse island") : `${title()} · ${detail()}`}
        press={() => expanded.update(value => !value)} />
      <If when={expanded()}>
        <Text style={{ color: p.ink.muted, fontSize: 13 }}>{detail()}</Text>
        <View style={row}>
          <Action label={scene() === 0 ? (running() ? (zh() ? "暂停" : "Pause") : (zh() ? "开始" : "Start"))
            : scene() === 1 ? (zh() ? "接听" : "Answer") : (zh() ? "查看进度" : "Track")}
            press={() => {
              if (scene() === 0) { if (!seconds()) seconds.set(48); running.update(value => !value); }
              else status.set(scene() === 1 ? (zh() ? "通话中" : "Connected") : (zh() ? "配送中" : "Out for delivery"));
            }} />
          <Action label={zh() ? "重置" : "Reset"} press={() => { running.set(false); seconds.set(48); status.set(""); }} />
        </View>
      </If>
    </View>
  </View>;
}

export function ShapeStudio(p: { ink: Ink; language: Language }) {
  const selected = signal(group[0][0]);
  const zh = () => p.language === "zh";
  const choices = () => group.map(([value, label]) => ({ value, title: value === "dynamic-island" && zh()
    ? "动态状态岛" : componentName(value, label, zh()) }));
  const popup = (): ViewStyle => ({ borderRadius: 11, padding: 5, minWidth: 156, borderWidth: 1,
    borderColor: p.ink.border, backgroundColor: p.ink.panel });
  return <View style={{ gap: 14, alignItems: "center" }}>
    <Select accessibilityLabel={zh() ? "选择形变" : "Choose morph"} items={choices()} value={selected()}
      onChange={({ value }) => { if (value) selected.set(value); }}
      popupStyle={popup()} itemStyle={{ padding: 7, color: p.ink.text }}
      trigger={<View style={{ ...popup(), alignItems: "center", paddingVertical: 9 }}>
        <Text style={{ color: p.ink.text, fontSize: 13 }}>{choices().find(choice => choice.value === selected())?.title}  ⌄</Text>
      </View>} />
    <Each of={[selected()]}>{id => <If when={id() === "dynamic-island"} else={
      <If when={shapeNames.has(id())} else={<ActionMorph id={id()} label={id()} ink={p.ink} language={p.language} />}>
        <ShapeMotion id={id()} label={id()} ink={p.ink} language={p.language} />
      </If>
    }><Island ink={p.ink} language={p.language} /></If>}</Each>
  </View>;
}
