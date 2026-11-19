import { Button } from "nsh/base";
import { Clipboard, Text, View, cleanup, signal, reduceMotion } from "nsh";
import type { Ink, Language } from "../model";
import { Glyph } from "./ButtonMotion";

export const aiNames = new Set(["ai-floating-toolbar", "ai-prompt-chips", "ai-reasoning-trace"]);
const actions = [
  ["Add spring motion", "加弹簧动效"], ["Refactor TSX", "重构 TSX"], ["Add haptics", "加触感反馈"], ["Generate CLI", "生成 CLI"],
];
const suggestions = [
  ["Spring tilt card", "弹簧倾斜卡片", "Create a card that tilts toward the pointer.", "让卡片跟随指针倾斜。"],
  ["Particle burst button", "粒子爆发按钮", "Add a burst of particles when the button is pressed.", "按下按钮时播放粒子爆发。"],
  ["Reasoning accordion", "过程手风琴", "Build a collapsible list with progressive status updates.", "制作可以折叠并逐步更新状态的列表。"],
  ["Magnetic pill dock", "磁吸胶囊工具栏", "Build a pill-shaped dock with a spring pull effect.", "制作带弹簧吸附效果的胶囊工具栏。"],
];

export function AiMotion(p: { id: string; ink: Ink; language: Language }) {
  const zh = () => p.language === "zh";
  const active = signal(-1);
  const expanded = signal(true);
  const cursor = signal(4);
  const copied = signal("");
  let timer: ReturnType<typeof setTimeout> | undefined;
  let playback: ReturnType<typeof setInterval> | undefined;
  function stop() { if (playback !== undefined) clearInterval(playback); playback = undefined; }
  cleanup(() => { if (timer !== undefined) clearTimeout(timer); stop(); });
  const cells = () => zh()
    ? ["检查输入", "分析布局和按压行为", "验证键盘与缩减动画", "预览已就绪"]
    : ["Inspect the input", "Check layout and press behavior", "Verify keyboard and reduced motion", "Preview ready"];
  function replay() {
    stop();
    if (reduceMotion()) { cursor.set(cells().length); return; }
    cursor.set(0);
    playback = setInterval(() => {
      cursor.update(step => step + 1);
      if (cursor() >= cells().length) stop();
    }, 550);
  }
  function Action(a: { label: string; press: () => void; active?: boolean; icon?: string }) {
    return <Button accessibilityLabel={a.label} selected={a.active} onPress={a.press}
      focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }} class="focus-visible:outline-2"
      hoverStyle={reduceMotion() ? undefined : { transform: [{ translateY: -2 }, { scale: 1.03 }] }}
      activeStyle={reduceMotion() ? undefined : { transform: [{ scale: 0.96 }] }}
      style={{ flexDirection: "row", alignItems: "center", gap: 5, minHeight: 35, paddingHorizontal: 10,
        borderWidth: 1, borderColor: a.active ? p.ink.accent : p.ink.border, borderRadius: 21,
        backgroundColor: a.active ? p.ink.tint : p.ink.panel }}>
      <If when={a.icon}><Glyph name={a.icon!} color={p.ink.accent} size={14} /></If>
      <Text style={{ color: p.ink.text, fontSize: 13 }}>{a.label}</Text>
    </Button>;
  }
  const row = { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 6 } as const;

  if (p.id === "ai-floating-toolbar") return <View style={row}>
    {actions.map((item, index) => <Action label={item[zh() ? 1 : 0]} active={active() === index}
      icon={active() === index ? "check" : ["sparkles", "pen", "bell", "arrow-right"][index]}
      press={() => { if (timer !== undefined) clearTimeout(timer); active.set(index); timer = setTimeout(() => active.set(-1), 1500); }} />)}
  </View>;

  if (p.id === "ai-prompt-chips") return <View style={{ gap: 10, alignItems: "center" }}>
    <View style={row}>{suggestions.map((item, index) => <Action label={item[zh() ? 1 : 0]} icon="sparkles"
      active={active() === index} press={() => active.set(index)} />)}</View>
    <If when={active() !== -1}><Text style={{ color: p.ink.muted, fontSize: 13 }}>{suggestions[active()][zh() ? 3 : 2]}</Text></If>
  </View>;

  return <View style={{ width: "100%", gap: 9, maxWidth: 450, borderWidth: 1, borderColor: p.ink.border,
    backgroundColor: p.ink.panel, padding: 12, borderRadius: 15 }}>
    <View style={{ ...row, justifyContent: "flex-start" }}>
      <Action label={zh() ? "示例执行过程" : "Example run trace"} active={expanded()} icon="sparkles"
        press={() => expanded.update(value => !value)} />
      <Action label={zh() ? "重播" : "Replay"} press={replay} />
      <Action label={zh() ? "复制" : "Copy"} icon="copy" press={() => {
        void Clipboard.writeText(cells().join("\n")).then(() => copied.set("yes"), () => copied.set("no"));
      }} />
    </View>
    <If when={expanded()}>
      {cells().map((text, index) => <View style={{ flexDirection: "row", gap: 7, alignItems: "center", minHeight: 22 }}>
        <Glyph name={index < cursor() ? "check" : "refresh-cw"} color={index < cursor() ? p.ink.accent : p.ink.muted} size={13} />
        <Text style={{ flexShrink: 1, color: index < cursor() ? p.ink.text : p.ink.muted, fontSize: 13 }}>{text}</Text>
      </View>)}
    </If>
    <If when={copied()}><Text style={{ color: p.ink.muted, fontSize: 12 }}>{copied() === "yes" ? (zh() ? "已复制" : "Copied") : (zh() ? "复制失败" : "Copy unavailable")}</Text></If>
  </View>;
}
