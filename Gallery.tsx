import { Scroll, Text, View, signal, windowSize, type JSX, type TextStyle, type ViewStyle } from "nsh";
import { Button, Input, Link, Menu, MenuItem } from "nsh/base";
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
  const current = () => inventory.find(entry => entry.id === selected()) ?? deploy;

  function updateGroup(value: string) {
    group.set(value);
    index.set(0);
    const candidate = matches()[0];
    if (candidate) selected.set(candidate.id);
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

  function Chip(p: { label: string; press: () => void; active?: boolean; muted?: boolean; disabled?: boolean }) {
    return <Button accessibilityLabel={p.label} onPress={p.press} selected={p.active} disabled={p.disabled}
      class="focus-visible:outline-2 disabled:opacity-50"
      focusVisibleStyle={{ outlineWidth: 2, outlineOffset: 2, outlineColor: ink().accent }}
      hoverStyle={{ borderColor: ink().accent }}
      style={{
        minHeight: 36, borderWidth: 1, borderRadius: 20, paddingHorizontal: 13, justifyContent: "center",
        borderColor: p.active ? ink().accent : ink().border, backgroundColor: p.active ? ink().tint : ink().panel,
      }}><Type size={13} tone={p.active ? "accent" : p.muted ? "muted" : "text"} strong>{p.label}</Type></Button>;
  }

  function TextLink(p: { href: string; label: string }) {
    return <Link href={p.href} accessibilityLabel={p.label}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: ink().accent }}
      style={{ ...horizontal, minHeight: 34, paddingHorizontal: 10, borderRadius: 8, gap: 6 }}>
      <Type size={13} strong tone="accent">{p.label}</Type><Glyph name="external-link" color={ink().accent} size={12} />
    </Link>;
  }

  function HeaderActions() {
    const themeLabel = () => appearance() === "dark"
      ? (zh() ? "切换到浅色主题" : "Switch to light theme")
      : (zh() ? "切换到深色主题" : "Switch to dark theme");
    const languageLabel = () => zh() ? "语言" : "Language";
    const iconStyle = (): ViewStyle => ({
      width: 41, height: 41, alignItems: "center", justifyContent: "center",
      borderWidth: 1, borderColor: ink().border, backgroundColor: ink().panel, borderRadius: 22,
    });
    const ring = () => ({ outlineWidth: 2, outlineOffset: 2, outlineColor: ink().accent });
    const hover = () => ({ backgroundColor: ink().tint, borderColor: ink().accent });
    const locales = [{ id: "en" as const, caption: "English" }, { id: "zh" as const, caption: "简体中文" }];
    return <View style={{ ...horizontal, gap: 7, flexWrap: "nowrap" }}>
      <Link href={repository} accessibilityLabel={t().github} title={t().github}
        style={iconStyle()} class="focus-visible:outline-2" focusVisibleStyle={ring()} hoverStyle={hover()}>
        <Glyph name="github" color={ink().text} />
      </Link>
      <Menu align="end" offset={7} popupStyle={{ minWidth: 136, padding: 4, borderRadius: 12, borderWidth: 1,
        borderColor: ink().border, backgroundColor: ink().panel }}
        trigger={<View accessibilityLabel={languageLabel()} tooltip={languageLabel()} style={iconStyle()}
          class="focus-visible:outline-2" focusVisibleStyle={ring()} hoverStyle={hover()}>
          <Glyph name="languages" color={ink().text} />
        </View>}>
        {locales.map(locale => <MenuItem accessibilityLabel={locale.caption} onSelect={() => language.set(locale.id)}
          focusStyle={hover()} style={{ ...horizontal, flexWrap: "nowrap", minHeight: 36, paddingHorizontal: 10,
            justifyContent: "space-between", borderRadius: 8 }}>
          <Type size={14}>{locale.caption}</Type>
          <If when={language() === locale.id}><Glyph name="check" color={ink().accent} size={14} /></If>
        </MenuItem>)}
      </Menu>
      <Button accessibilityLabel={themeLabel()} tooltip={themeLabel()} style={iconStyle()}
        class="focus-visible:outline-2" focusVisibleStyle={ring()} hoverStyle={hover()}
        onPress={() => appearance.update(value => value === "dark" ? "light" : "dark")}>
        <Glyph name={appearance() === "dark" ? "sun" : "moon"} color={ink().text} />
      </Button>
    </View>;
  }

  function Preview(p: { entry: Entry }) {
    const port = () => portFor(p.entry);
    return <View testID={`preview-${p.entry.id}`} style={{
      flex: 1, minWidth: 0, alignSelf: "stretch", maxWidth: "100%",
      borderColor: ink().border, borderWidth: 1, backgroundColor: ink().panel, borderRadius: 24,
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
        <If when={port()}><TextLink href={repository + "/blob/main/ports/" + portFile[port()!] + ".tsx"} label={t().local} /></If>
      </View>
    </View>;
  }

  return <View style={{ flex: 1, backgroundColor: ink().background }}>
    <Head lang={zh() ? "zh-CN" : "en"} title={t().title} description={t().intro} />
    <Scroll style={{ flex: 1 }}>
      <View style={{
        width: "100%", maxWidth: 1296, alignSelf: "center", paddingHorizontal: mobile() ? 16 : 33,
        paddingTop: 23, paddingBottom: 35, gap: mobile() ? 24 : 31,
      }}>
        <View style={{ ...horizontal, justifyContent: "space-between", gap: 15 }}>
          <View style={horizontal}>
            <View style={{ width: 39, height: 39, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: ink().accent }}>
              <Glyph name="sparkles" color={ink().onAccent} size={22} />
            </View>
            <Type size={mobile() ? 16 : 18} strong>{t().title}</Type>
          </View>
          <HeaderActions />
        </View>
        <View style={{
          flexDirection: narrow() ? "column" : "row", alignItems: "stretch", gap: 17,
          padding: mobile() ? 20 : 38, borderRadius: mobile() ? 24 : 32, overflow: "hidden",
          borderWidth: 1, borderColor: ink().border, backgroundColor: ink().panel,
          backgroundImage: appearance() === "dark" ? "radial-gradient(ellipse at 95% 20%, #433075, #242039 48%, #191824 86%)"
            : "radial-gradient(ellipse at 95% 20%, #dcd3ff, #f1eafa 52%, #fbfaff 88%)",
        }}>
          <View style={{ flex: 1.2, minWidth: 0, gap: 14, justifyContent: "center" }}>
            <Type tone="accent" size={13} strong style={{ fontFamily: "monospace", letterSpacing: 1.3 }}>NATIVE SHELL / AMICRO</Type>
            <Type size={mobile() ? 38 : 58} strong style={{ letterSpacing: mobile() ? -1.6 : -2.6, lineHeight: mobile() ? 44 : 64 }}>{t().heading}</Type>
            <Type tone="muted" size={16} style={{ maxWidth: 470 }}>{t().intro}</Type>
            <View style={{ ...horizontal, gap: 13, marginTop: 4 }}>
              <MotionButton entry={deploy} label={name(deploy)} ink={ink()} testID="hero-demo" onPress={() => notice.set("hero")} />
            </View>
            <Type size={13} tone="accent">{notice() === "hero"
              ? zh() ? "已触发交互" : "Interaction triggered"
              : `${ready.length} ${t().count} · ${inventory.length} ${t().listed}`}</Type>
          </View>
          <View style={{ flex: 0.8, minWidth: 0, alignItems: "center", justifyContent: "center" }}>
            <CardMotion id="card-arc-5" label={zh() ? "展开卡片" : "Spread cards"} ink={ink()} hero />
          </View>
        </View>
        <View style={{ gap: 13 }}>
          <View style={{ ...horizontal, justifyContent: "space-between", gap: 12 }}>
            <Type size={26} strong>{t().catalog}</Type>
            <View style={horizontal}>
              <Chip label={t().verified} active={!showAll()} press={() => toggleInventory(false)} />
              <Chip label={t().inventory} active={showAll()} press={() => toggleInventory(true)} />
            </View>
          </View>
          <View style={horizontal}>
            <Chip label={t().all} active={group() === "all"} press={() => updateGroup("all")} />
            {familyOrder.filter(family => (showAll() ? inventory : ready).some(entry => entry.family === family))
              .map(family => <Chip label={familyName(family)} active={group() === family} press={() => updateGroup(family)} />)}
          </View>
          <Input accessibilityLabel={t().search} placeholder={t().search} value={query()}
            onChange={({ value }) => { query.set(value); index.set(0); }}
            class="focus-visible:outline-2" focusStyle={{ borderColor: ink().accent }}
            style={{
              minHeight: 43, maxWidth: 400, paddingHorizontal: 14, borderRadius: 11, fontSize: 15,
              backgroundColor: ink().panel, borderColor: ink().border, borderWidth: 1, color: ink().text,
            }} />
          <View style={{ flexDirection: narrow() ? "column-reverse" : "row", gap: 16, alignItems: "flex-start" }}>
            <View style={{ width: narrow() ? "100%" : 326, gap: 5 }}>
              <If when={pageEntries().length === 0}><Type tone="muted">{t().noResults}</Type></If>
              {pageEntries().map(entry => <Button testID={`choose-${entry.id}`} accessibilityLabel={name(entry)} selected={entry.id === selected()}
                onPress={() => { selected.set(entry.id); notice.set(""); }}
                class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: ink().accent }}
                hoverStyle={{ borderColor: ink().accent }}
                style={{
                  minHeight: 43, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
                  gap: 6, paddingHorizontal: 12, backgroundColor: entry.id === selected() ? ink().tint : ink().panel,
                  borderColor: entry.id === selected() ? ink().accent : ink().border, borderWidth: 1,
                }}>
                <Type size={14} strong>{name(entry)}</Type>
                <Type tone="muted" size={12}>{familyName(entry.family)}</Type>
              </Button>)}
              <View style={{ ...horizontal, marginTop: 7 }}>
                <Chip label={t().previous} disabled={index() === 0} press={() => index.update(value => Math.max(0, value - 1))} />
                <Chip label={t().next} disabled={(index() + 1) * pageSize >= matches().length}
                  press={() => index.update(value => value + 1)} />
              </View>
            </View>
            <Each of={[current()]}>{entry => <Preview entry={entry()} />}</Each>
          </View>
        </View>
        <View style={{ ...horizontal, justifyContent: "space-between", paddingTop: 12, borderTopWidth: 1, borderColor: ink().border }}>
          <Type tone="muted" size={13}>{t().attribution}</Type>
          <TextLink label={t().license} href={repository + "/blob/main/LICENSE"} />
        </View>
      </View>
    </Scroll>
  </View>;
}
