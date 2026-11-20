import { Clipboard, Scroll, Text, View, signal, windowSize, type JSX, type TextStyle, type ViewStyle } from "nsh";
import { Head } from "nsh/web";
import { inventory, portFor } from "./catalog";
import { repository, themes, type Entry, type Language } from "./model";
import { componentName, families, phrases } from "./strings";
import { Glyph, MotionButton } from "./ports/ButtonMotion";
import { CardMotion } from "./ports/CardMotion";
import { CardDepth } from "./ports/CardDepth";
import { LoaderMotion } from "./ports/LoaderMotion";
import { TextMotion } from "./ports/TextMotion";
import { UiMotion } from "./ports/UiMotion";
import { ChartMotion } from "./ports/ChartMotion";
import { AiMotion } from "./ports/AiMotion";
import { ShapeMotion } from "./ports/ShapeMotion";
import { TextEffects } from "./ports/TextEffects";
import { ActionMorph } from "./ports/ActionMorph";
import { LoaderSpecial } from "./ports/LoaderSpecial";
import { DitherMotion } from "./ports/DitherMotion";
import { MonoMore } from "./ports/MonoMore";
import { AiStudio } from "./ports/AiStudio";
import { PrimitiveMotion } from "./ports/PrimitiveMotion";
import { PhysicsMotion } from "./ports/PhysicsMotion";
import { UiMore } from "./ports/UiMore";
import { ShapeStudio } from "./ports/ShapeStudio";
import { ActionMenu, ControlButton, ControlLink, SearchField } from "./ports/Controls";
import { SeriesChart } from "./index";

const chartExample = [{ label: "Mon", value: 34 }, { label: "Tue", value: 49 }, { label: "Wed", value: 42 }];
const usage: Record<string, string> = {
  "btn-3": `import { mount } from "nsh";
import { AnimatedButton, themes } from "./micro-interactions";

mount(() => <AnimatedButton label="Deploy" ink={themes.light}
  effect="morph" icons={["cloud", "cloud-upload"]} onPress={() => console.log("Deploy")} />);`,
  "ui-category-select": `import { mount, signal } from "nsh";
import { MotionSelect, themes } from "./micro-interactions";

function App() {
  const value = signal<string | null>(null);
  return <MotionSelect label="Category" placeholder="Choose a category"
    ink={themes.light} options={[{ value: "docs", label: "Docs" }]}
    value={value()} onChange={value.set} />;
}
mount(() => <App />);`,
  "mono-rounded-line": `import { mount } from "nsh";
import { SeriesChart, themes } from "./micro-interactions";

mount(() => <SeriesChart label="Orders" emptyLabel="No data" ink={themes.light}
  data={${JSON.stringify(chartExample)}} />);`,
};

const chineseUsage: Record<string, string> = {
  "btn-3": usage["btn-3"].replaceAll("Deploy", "部署"),
  "ui-category-select": usage["ui-category-select"].replace('label="Category"', 'label="类别"')
    .replace('placeholder="Choose a category"', 'placeholder="请选择类别"').replace('label: "Docs"', 'label: "文档"'),
  "mono-rounded-line": usage["mono-rounded-line"].replace('label="Orders" emptyLabel="No data"', 'label="订单" emptyLabel="暂无数据"'),
};

const ready = inventory.filter(entry => portFor(entry));
const deploy = ready.find(entry => entry.id === "btn-3")!;
const horizontal: ViewStyle = { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" };
const pageSize = 12;
const familyOrder = Object.keys(families);
const portFile = {
  button: "ButtonMotion", card: "CardMotion", depth: "CardDepth", loader: "LoaderMotion",
  text: "TextMotion", textEffect: "TextEffects", ui: "UiMotion", chart: "ChartMotion", ai: "AiMotion", shape: "ShapeMotion",
  actionMorph: "ActionMorph",
  specialLoader: "LoaderSpecial", dither: "DitherMotion", monoMore: "MonoMore", aiStudio: "AiStudio",
  primitive: "PrimitiveMotion", physics: "PhysicsMotion",
  uiMore: "UiMore", shapeStudio: "ShapeStudio",
};
type Tone = "text" | "muted" | "accent" | "onAccent";

export function Gallery(props: { initialLanguage: Language }) {
  const language = signal<Language>(props.initialLanguage);
  const appearance = signal<"dark" | "light">("dark");
  const group = signal("all");
  const query = signal("");
  const showAll = signal(false);
  const index = signal(0);
  const selected = signal("btn-20");
  const notice = signal("");
  const ink = () => themes[appearance()];
  const t = () => phrases[language()];
  const zh = () => language() === "zh";
  const narrow = () => windowSize().width < 800;
  const mobile = () => windowSize().width < 570;
  const name = (entry: Entry) => componentName(entry.id, entry.name, zh());
  const familyName = (family: string) => families[family]?.[zh() ? 1 : 0] ?? family;
  const matches = () => {
    const needle = query().trim().toLocaleLowerCase();
    return (showAll() ? inventory : ready).filter(entry => (group() === "all" || group() === entry.family)
      && (!needle || `${name(entry)} ${entry.name} ${entry.id} ${familyName(entry.family)}`.toLocaleLowerCase().includes(needle)));
  };
  const pageEntries = () => matches().slice(index() * pageSize, (index() + 1) * pageSize);
  const current = () => pageEntries().find(entry => entry.id === selected()) ?? pageEntries()[0];

  function updateGroup(value: string) {
    group.set(value);
    index.set(0);
    notice.set("");
  }

  function toggleInventory(all: boolean) {
    showAll.set(all);
    updateGroup("all");
  }

  function Type(p: { children: JSX.Element; size?: number; tone?: Tone; strong?: boolean; style?: TextStyle }) {
    return <Text style={{
      color: ink()[p.tone ?? "text"], fontSize: p.size ?? 15, fontWeight: p.strong ? "700" : "400",
      lineHeight: (p.size ?? 15) * 1.4, flexShrink: 1, ...p.style,
    }}>{p.children}</Text>;
  }

  function HeaderActions() {
    const themeLabel = () => appearance() === "dark"
      ? (zh() ? "切换到浅色主题" : "Switch to light theme")
      : (zh() ? "切换到深色主题" : "Switch to dark theme");
    return <View style={{ ...horizontal, gap: 7, flexWrap: "nowrap" }}>
      <ControlLink href={repository} label={t().github} look="icon" icon="github" ink={ink()} />
      <ActionMenu label={zh() ? "语言" : "Language"} look="icon" icon="languages" align="end" ink={ink()}
        items={[{ id: "en", label: "English" }, { id: "zh", label: "简体中文" }]} current={language()}
        onSelect={id => language.set(id === "zh" ? "zh" : "en")} />
      <ControlButton label={themeLabel()} look="icon" icon={appearance() === "dark" ? "sun" : "moon"} ink={ink()}
        onPress={() => appearance.update(value => value === "dark" ? "light" : "dark")} />
    </View>;
  }

  function Preview(p: { entry: Entry }) {
    const port = () => portFor(p.entry);
    const code = () => (zh() ? chineseUsage : usage)[p.entry.id];
    const copyStatus = signal<"idle" | "copied" | "failed">("idle");
    const codeOpen = signal(false);

    async function copyCode() {
      try {
        await Clipboard.writeText(code());
        copyStatus.set("copied");
      } catch {
        codeOpen.set(true);
        copyStatus.set("failed");
      }
    }
    return <View testID={`preview-${p.entry.id}`} style={{
      width: "100%", minWidth: 0,
      borderColor: ink().border, borderWidth: 1, backgroundColor: ink().panel, borderRadius: 21,
      padding: mobile() ? 16 : 23, gap: 15,
    }}>
      <View style={{ ...horizontal, justifyContent: "space-between" }}>
        <View style={{ flex: 1, minWidth: 140, gap: 4 }}>
          <Type tone="muted" size={13}>{familyName(p.entry.family)}</Type>
          <Type size={23} strong>{name(p.entry)}</Type>
        </View>
        <Type size={12} tone={port() ? "accent" : "muted"} strong>{port() ? t().live : t().pending}</Type>
      </View>
      <View style={{
        minHeight: 182, borderRadius: 16, justifyContent: "center", alignItems: "center", padding: 12, gap: 8,
        backgroundColor: ink().stage, backgroundImage: `radial-gradient(ellipse at 45% 60%, ${ink().tint}, ${ink().stage} 73%)`,
      }}>
        <If when={port() === "button"}>
          <MotionButton entry={p.entry} label={name(p.entry)} ink={ink()} onPress={() => notice.set(p.entry.id)} />
          <Type tone="muted" size={13}>{notice() === p.entry.id ? (zh() ? "已触发交互" : "Interaction triggered") : t().hint}</Type>
        </If>
        <If when={port() === "card"}><CardMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "depth"}><CardDepth id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "loader"}><LoaderMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "specialLoader"}><LoaderSpecial id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "text"}><TextMotion id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "textEffect"}><TextEffects id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "shape"}><ShapeMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "actionMorph"}><ActionMorph id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "ui"}><UiMotion id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "chart"}><ChartMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "monoMore"}><MonoMore id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "dither"}><DitherMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "ai"}><AiMotion id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "aiStudio"}><AiStudio id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "primitive"}><PrimitiveMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "physics"}><PhysicsMotion id={p.entry.id} label={name(p.entry)} ink={ink()} language={language()} /></If>
        <If when={port() === "uiMore"}><UiMore id={p.entry.id} ink={ink()} language={language()} /></If>
        <If when={port() === "shapeStudio"}><ShapeStudio ink={ink()} language={language()} /></If>
        <If when={!port()}><Type tone="muted">{t().pending}</Type></If>
      </View>
      <View style={horizontal}>
        <If when={port()}><ControlLink href={repository + "/blob/main/ports/" + portFile[port()!] + ".tsx"} label={t().local}
          look="plain" icon="external-link" ink={ink()} /></If>
        <If when={code()}><ControlButton label={codeOpen() ? (zh() ? "收起用法" : "Hide usage") : (zh() ? "查看用法" : "View usage")}
          ink={ink()} selected={codeOpen()} onPress={() => codeOpen.update(open => !open)} /></If>
      </View>
      <If when={code() && codeOpen()}>
        <If when={p.entry.id === "mono-rounded-line"}>
          <SeriesChart label={zh() ? "订单示例" : "Orders example"} emptyLabel={zh() ? "暂无数据" : "No data"}
            ink={ink()} data={chartExample} />
        </If>
        <Type size={13} style={{ fontFamily: "monospace" }}>{code()}</Type>
        <View style={horizontal}>
          <ControlButton label={zh() ? "复制代码" : "Copy code"} ink={ink()} onPress={() => { void copyCode(); }} />
          <ControlLink href={repository + "/blob/main/COMPONENTS.md"} label={zh() ? "接入说明" : "Integration guide"}
            look="plain" ink={ink()} />
          <If when={copyStatus() === "copied"}><Type>{zh() ? "已复制" : "Copied"}</Type></If>
          <If when={copyStatus() === "failed"}><Type>{zh() ? "复制失败，可从接入说明复制" : "Copy failed. Copy from the integration guide."}</Type></If>
        </View>
      </If>
    </View>;
  }

  return <View style={{ flex: 1, backgroundColor: ink().background }}>
    <Head lang={zh() ? "zh-CN" : "en"} title={t().title} description={t().intro} />
    <Scroll style={{ flex: 1 }}>
      <View style={{
        width: "100%", maxWidth: 1296, alignSelf: "center", paddingHorizontal: mobile() ? 14 : 32,
        paddingTop: mobile() ? 15 : 20, paddingBottom: 35, gap: mobile() ? 22 : 28,
      }}>
        <View style={{ ...horizontal, justifyContent: "space-between", gap: 9, paddingBottom: 13, borderBottomWidth: 1, borderColor: ink().border }}>
          <View style={horizontal}>
            <View style={{ width: 39, height: 39, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: ink().accent }}>
              <Glyph name="sparkles" color={ink().onAccent} size={22} />
            </View>
            <Type size={mobile() ? 16 : 18} strong>{t().title}</Type>
          </View>
          <HeaderActions />
        </View>
        <View style={{
          flexDirection: narrow() ? "column" : "row", alignItems: "center", gap: mobile() ? 16 : 32,
          padding: mobile() ? 18 : 30, borderRadius: mobile() ? 19 : 26,
          borderWidth: 1, borderColor: ink().border, backgroundColor: ink().panel,
          backgroundImage: appearance() === "dark" ? "radial-gradient(ellipse at 92% 14%, #392863, #201b33 48%, #181723 88%)"
            : "radial-gradient(ellipse at 92% 14%, #dfd4fc, #f5effc 47%, #ffffff 88%)",
        }}>
          <View style={{ flex: narrow() ? undefined : 1, width: narrow() ? "100%" : undefined, minWidth: 0, gap: 12, justifyContent: "center" }}>
            <Type size={mobile() ? 36 : 62} strong style={{ letterSpacing: mobile() ? -1.6 : -2.7, lineHeight: mobile() ? 42 : 66 }}>{t().heading}</Type>
            <Type tone="muted" size={16} style={{ maxWidth: 470 }}>{t().intro}</Type>
            <View style={{ ...horizontal, gap: 13, marginTop: 4 }}>
              <MotionButton entry={deploy} label={name(deploy)} ink={ink()} testID="hero-demo" onPress={() => notice.set("hero")} />
            </View>
            <Type size={13} tone="accent">{notice() === "hero"
              ? zh() ? "已触发交互" : "Interaction triggered"
              : `${ready.length} ${t().count} · ${inventory.length} ${t().listed}`}</Type>
          </View>
          <View style={{ width: narrow() ? "100%" : "40%", minWidth: 0, alignItems: "center", justifyContent: "center",
            borderRadius: 19, borderWidth: 1, borderColor: ink().border, backgroundColor: ink().stage }}>
            <CardMotion id="card-arc-5" label={zh() ? "展开卡片" : "Spread cards"} ink={ink()} hero />
            <Type size={12} tone="muted" style={{ marginBottom: 12 }}>{zh() ? "悬停或点击展开卡片" : "Hover or press to spread the cards"}</Type>
          </View>
        </View>
        <View style={{ gap: 13 }}>
          <View style={{ ...horizontal, justifyContent: "space-between", gap: 12 }}>
            <Type size={26} strong>{t().catalog}</Type>
            <SearchField label={t().search} clearLabel={zh() ? "清空搜索" : "Clear search"} ink={ink()} value={query()}
              onChange={value => { query.set(value); index.set(0); notice.set(""); }}
              style={{ width: narrow() ? "100%" : 320, maxWidth: "100%" }} />
          </View>
          <View style={horizontal}>
            <ControlButton label={t().all} selected={group() === "all"} ink={ink()} onPress={() => updateGroup("all")} />
            {familyOrder.filter(family => (showAll() ? inventory : ready).some(entry => entry.family === family))
              .map(family => <ControlButton label={familyName(family)} selected={group() === family} ink={ink()}
                onPress={() => updateGroup(family)} />)}
          </View>
          <If when={ready.length !== inventory.length}>
            <View style={horizontal}>
              <ControlButton label={t().verified} selected={!showAll()} ink={ink()} onPress={() => toggleInventory(false)} />
              <ControlButton label={t().inventory} selected={showAll()} ink={ink()} onPress={() => toggleInventory(true)} />
            </View>
          </If>
          <View style={{ flexDirection: narrow() ? "column-reverse" : "row", gap: 16, alignItems: "flex-start" }}>
            <View style={{ width: narrow() ? "100%" : 312, gap: 6, padding: 9, borderWidth: 1,
              borderColor: ink().border, backgroundColor: ink().panel, borderRadius: 17 }}>
              <If when={pageEntries().length === 0}><Type tone="muted">{t().noResults}</Type></If>
              {pageEntries().map(entry => <ControlButton testID={`choose-${entry.id}`} label={name(entry)} selected={entry.id === current()?.id}
                look="row" ink={ink()}
                onPress={() => { selected.set(entry.id); notice.set(""); }}
                style={{ minHeight: 43 }}>
                <Type size={14} strong>{name(entry)}</Type>
                <Type tone="muted" size={12}>{familyName(entry.family)}</Type>
              </ControlButton>)}
              <View style={{ ...horizontal, marginTop: 7, justifyContent: "space-between", paddingHorizontal: 2 }}>
                <ControlButton label={t().previous} look="icon" icon="arrow-left" ink={ink()} disabled={index() === 0}
                  onPress={() => { index.update(value => Math.max(0, value - 1)); notice.set(""); }} />
                <Type size={12} tone="muted">{`${matches().length ? index() + 1 : 0} / ${Math.ceil(matches().length / pageSize)}`}</Type>
                <ControlButton label={t().next} look="icon" icon="arrow-right" ink={ink()} disabled={(index() + 1) * pageSize >= matches().length}
                  onPress={() => { index.update(value => value + 1); notice.set(""); }} />
              </View>
            </View>
            <If when={current()}><View style={{ flex: narrow() ? undefined : 1, minWidth: 0, width: narrow() ? "100%" : undefined }}>
              <Each of={current() ? [current()!] : []}>{entry => <Preview entry={entry()} />}</Each>
            </View></If>
          </View>
        </View>
        <View style={{ ...horizontal, justifyContent: "space-between", paddingTop: 12, borderTopWidth: 1, borderColor: ink().border }}>
          <Type tone="muted" size={13}>{t().attribution}</Type>
          <ControlLink label={t().license} href={repository + "/blob/main/LICENSE"} look="plain" ink={ink()} icon="external-link" />
        </View>
      </View>
    </Scroll>
  </View>;
}
