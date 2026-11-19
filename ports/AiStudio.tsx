import { Button, Input, Select } from "nsh/base";
import { Clipboard, Picker, Text, View, cleanup, signal, type ViewStyle } from "nsh";
import type { Ink, Language } from "../model";
import { Glyph } from "./ButtonMotion";

export const studioNames = new Set(["ai-prompt-input", "ai-response-stream"]);
const layout = { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6 } as const;
const exampleCode = [
  "const speed = signal(0);\nconst spring = createAnimatedValue(0);",
  "const easing = { stiffness: 280, damping: 24 };\nvoid progress.spring(1, easing);",
  "const seen = signal(false);\nif (reduceMotion()) seen.set(true);",
];

export function AiStudio(p: { id: string; ink: Ink; language: Language }) {
  const zh = () => p.language === "zh";
  const prompt = signal("");
  const model = signal("fast");
  const web = signal(false);
  const deep = signal(true);
  const listening = signal(false);
  const generating = signal(false);
  const attachments = signal<string[]>([]);
  const status = signal("");
  const branch = signal(0);
  const vote = signal("");
  let work: ReturnType<typeof setTimeout> | undefined;
  let mic: ReturnType<typeof setTimeout> | undefined;
  cleanup(() => { if (work !== undefined) clearTimeout(work); if (mic !== undefined) clearTimeout(mic); });
  const shell = (): ViewStyle => ({ width: "100%", maxWidth: 478, borderRadius: 15, padding: 12, gap: 10,
    borderWidth: 1, borderColor: p.ink.border, backgroundColor: p.ink.panel });
  function Copy(q: { text: string; muted?: boolean; code?: boolean }) {
    return <Text style={{ color: q.muted ? p.ink.muted : p.ink.text, fontSize: 13, flexShrink: 1,
      fontFamily: q.code ? "monospace" : undefined }}>{q.text}</Text>;
  }
  function Action(q: { label: string; press: () => void; icon?: string; active?: boolean; disabled?: boolean }) {
    return <Button accessibilityLabel={q.label} selected={q.active} disabled={q.disabled} onPress={q.press}
      focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }} class="focus-visible:outline-2 disabled:opacity-50"
      style={{ ...layout, minHeight: 32, borderRadius: 17, paddingHorizontal: 9, borderWidth: 1, borderColor: p.ink.border,
        backgroundColor: q.active ? p.ink.tint : p.ink.panel }}>
      <If when={q.icon}><Glyph name={q.icon!} color={q.active ? p.ink.accent : p.ink.muted} size={14} /></If>
      <Copy text={q.label} />
    </Button>;
  }
  function simulate() {
    if (work !== undefined) clearTimeout(work);
    if (generating()) { generating.set(false); status.set(zh() ? "已停止" : "Stopped"); return; }
    if (!prompt().trim() && !attachments().length) return;
    generating.set(true);
    status.set("");
    work = setTimeout(() => { generating.set(false); status.set(zh() ? "演示生成完成" : "Demo generation complete"); }, 3500);
  }
  function record() {
    if (mic !== undefined) clearTimeout(mic);
    listening.update(value => !value);
    if (!listening()) return;
    mic = setTimeout(() => {
      prompt.update(value => [value, zh() ? "给轮播添加弹簧动效" : "Add spring motion to the carousel"].filter(Boolean).join(" "));
      listening.set(false);
    }, 2500);
  }
  if (p.id === "ai-prompt-input") {
    const choices = () => [{ value: "fast", title: zh() ? "快速" : "Fast" }, { value: "balanced", title: zh() ? "均衡" : "Balanced" },
      { value: "deep", title: zh() ? "深度" : "Deep" }];
    return <View style={shell()}>
      <Copy muted text={zh() ? "本地输入演示" : "Local input demo"} />
      <Input multiline accessibilityLabel={zh() ? "提示词" : "Prompt"} value={prompt()}
        placeholder={listening() ? (zh() ? "模拟语音输入中…" : "Simulating speech input…") : (zh() ? "输入要生成的组件效果…" : "Describe the interaction…")}
        onChange={({ value }) => prompt.set(value)}
        style={{ minHeight: Math.min(160, 56 + Math.floor(prompt().length / 42) * 17), borderRadius: 8,
          color: p.ink.text, backgroundColor: p.ink.stage, padding: 8, fontSize: 14 }} />
      <If when={attachments().length > 0}><View style={layout}>{attachments().map((name, i) =>
        <Action label={name + " ×"} press={() => attachments.update(list => list.filter((_, index) => index !== i))} />
      )}</View></If>
      <View style={layout}>
        <Select accessibilityLabel={zh() ? "选择模型" : "Choose model"} items={choices()} value={model()}
          onChange={({ value }) => { if (value) model.set(value); }}
          popupStyle={{ minWidth: 116, borderRadius: 8, padding: 4, backgroundColor: p.ink.panel, borderWidth: 1, borderColor: p.ink.border }}
          itemStyle={{ padding: 7, color: p.ink.text }}
          trigger={<View style={{ ...layout, padding: 8, borderRadius: 8, backgroundColor: p.ink.stage }}>
            <Copy text={(choices().find(choice => choice.value === model())?.title ?? "") + "  ⌄"} />
          </View>} />
        <Action label={zh() ? "搜索" : "Search"} icon="search" active={web()} press={() => web.update(value => !value)} />
        <Action label={zh() ? "深度思考" : "Deep think"} icon="sparkles" active={deep()} press={() => deep.update(value => !value)} />
        <Action label={zh() ? "添加附件" : "Attach"} icon="link" press={() => {
          void Picker.pickFiles({ multiple: true, limit: 6, maxSize: 0 }).then(
            list => attachments.update(current => [...current, ...list.map(file => file.name)]),
            () => status.set(zh() ? "文件选择不可用" : "File picker unavailable"),
          );
        }} />
        <Action label={listening() ? (zh() ? "停止语音" : "Stop speech") : (zh() ? "模拟语音" : "Simulate speech")}
          icon="mic" active={listening()} press={record} />
        <Action label={generating() ? (zh() ? "停止" : "Stop") : (zh() ? "发送" : "Send")} icon="send"
          active={generating()} disabled={!generating() && !prompt().trim() && !attachments().length} press={simulate} />
      </View>
      <Copy muted text={generating() ? (zh() ? "模拟生成中…" : "Simulating generation…")
        : status() || (zh() ? `约 ${Math.ceil(prompt().length / 3.8)} 个 token` : `~${Math.ceil(prompt().length / 3.8)} tokens`)} />
    </View>;
  }
  const summary = () => zh() ? "使用 NSH 创建一个可响应减少动态效果的组件。" : "Create an NSH interaction that follows reduced-motion preferences.";
  return <View style={shell()}>
    <Copy text={summary()} />
    <View style={{ borderRadius: 8, backgroundColor: p.ink.stage, padding: 10 }}>
      <Copy code text={generating() ? (zh() ? "正在重播生成…" : "Replaying generation…") : exampleCode[branch()]} />
    </View>
    <View style={layout}>
      <Action label={zh() ? "上一条" : "Previous branch"} icon="arrow-left" press={() => branch.update(value => (value + 2) % 3)} />
      <Copy muted text={`${branch() + 1} / 3`} />
      <Action label={zh() ? "下一条" : "Next branch"} icon="arrow-right" press={() => branch.update(value => (value + 1) % 3)} />
      <Action label={zh() ? "复制" : "Copy"} icon="copy" press={() => {
        void Clipboard.writeText(exampleCode[branch()]).then(
          () => status.set(zh() ? "已复制" : "Copied"), () => status.set(zh() ? "复制失败" : "Copy unavailable"));
      }} />
      <Action label={zh() ? "重新生成" : "Regenerate"} icon="refresh-cw" active={generating()} press={() => {
        if (work !== undefined) clearTimeout(work);
        generating.set(true); work = setTimeout(() => generating.set(false), 800);
      }} />
      <Action label={zh() ? "有帮助" : "Helpful"} icon="thumbs-up" active={vote() === "up"}
        press={() => vote.update(value => value === "up" ? "" : "up")} />
      <Action label={zh() ? "没帮助" : "Not helpful"} active={vote() === "down"}
        press={() => vote.update(value => value === "down" ? "" : "down")} />
    </View>
    <If when={status()}><Copy muted text={status()} /></If>
  </View>;
}
