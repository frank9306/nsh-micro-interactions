import { Button, Menu, MenuItem, Select, Switch, Tab, Tabs } from "nsh/base";
import { Text, View, createAnimatedValue, reduceMotion, signal, type ViewStyle } from "nsh";
import { Glyph } from "./ButtonMotion";
import type { Ink, Language } from "../model";

export const uiNames = new Set(["ui-context-menu", "ui-category-select", "ui-ab-tabs", "ui-date-position",
  "ui-save-pill", "ui-light-dark-toggle", "ui-segmented-step-bar"]);

export function UiMotion(p: { id: string; ink: Ink; language: Language }) {
  const value = signal(0);
  const slide = createAnimatedValue(0);
  const note = signal("");
  const zh = () => p.language === "zh";
  const row = { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 } as const;
  const pill = (): ViewStyle => ({ ...row, minHeight: 39, paddingHorizontal: 14,
    borderRadius: 20, backgroundColor: p.ink.panel, borderColor: p.ink.border, borderWidth: 1 });
  const popup = (): ViewStyle => ({ minWidth: 152, borderWidth: 1, borderColor: p.ink.border,
    backgroundColor: p.ink.panel, borderRadius: 12, padding: 4 });

  function select(index: number) {
    value.set(index);
    if (reduceMotion()) slide.set(index);
    else void slide.spring(index, { stiffness: 420, damping: 32 });
  }
  function Copy(props: { text: string; accent?: boolean }) {
    return <Text style={{ color: props.accent ? p.ink.accent : p.ink.text, fontSize: 14, fontWeight: "650" }}>{props.text}</Text>;
  }
  function ChoiceButton(props: { label: string; press: () => void; selected?: boolean }) {
    return <Button accessibilityLabel={props.label} selected={props.selected} onPress={props.press}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
      style={{ ...pill(), backgroundColor: props.selected ? p.ink.tint : p.ink.panel }}>
      <Copy text={props.label} accent={props.selected} />
    </Button>;
  }

  if (p.id === "ui-context-menu") {
    return <View style={{ alignItems: "center", gap: 12 }}>
      <Menu trigger={<View accessibilityLabel={zh() ? "更多操作" : "Actions"} style={pill()}><Copy text={zh() ? "更多操作" : "Actions"} /></View>}
        popupStyle={popup()}>
        {([["Edit", "编辑"], ["Delete", "删除"]] as const).map(item => <MenuItem accessibilityLabel={item[zh() ? 1 : 0]}
          onSelect={() => note.set(item[0])} style={{ padding: 9, borderRadius: 7 }}
          focusStyle={{ backgroundColor: p.ink.tint }}><Copy text={item[zh() ? 1 : 0]} /></MenuItem>)}
      </Menu>
      <If when={note()}><Copy text={zh() ? (note() === "Edit" ? "已选择编辑" : "已选择删除") : `Selected ${note()}`} /></If>
    </View>;
  }
  if (p.id === "ui-category-select") {
    const choices = () => (zh() ? ["全部", "设计", "开发", "文档"] : ["All", "Design", "Development", "Docs"])
      .map((title, index) => ({ title, value: String(index) }));
    return <Select accessibilityLabel={zh() ? "类别" : "Category"} items={choices()} value={String(value())}
      onChange={({ value: next }) => { if (next !== null && next !== undefined) select(Number(next)); }}
      popupStyle={popup()} itemStyle={{ padding: 8, color: p.ink.text, fontSize: 14 }}
      trigger={<View style={pill()}><Copy text={choices()[value()].title + "  ⌄"} /></View>} />;
  }
  if (p.id === "ui-save-pill") {
    return <Button accessibilityLabel={zh() ? (value() ? "已收藏" : "收藏") : (value() ? "Saved" : "Save")}
      selected={!!value()} onPress={() => select(value() ? 0 : 1)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineColor: p.ink.accent, outlineWidth: 2 }}
      style={{ ...pill(), minWidth: 99, backgroundColor: value() ? p.ink.tint : p.ink.panel }}>
      <View style={{ width: 18, height: 18 }}>
        <View style={{ position: "absolute", opacity: slide.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
          <Glyph name="bookmark" color={p.ink.text} />
        </View>
        <View style={{ position: "absolute", opacity: slide }}>
          <Glyph name="check" color={p.ink.accent} />
        </View>
      </View>
      <Copy accent={!!value()} text={zh() ? (value() ? "已收藏" : "收藏") : (value() ? "Saved" : "Save")} />
    </Button>;
  }
  if (p.id === "ui-light-dark-toggle") {
    const x = slide.interpolate({ inputRange: [0, 1], outputRange: [0, 29] });
    return <View style={{ ...row, padding: 14, borderRadius: 15, backgroundColor: value() ? "#181527" : "#e5dcf9" }}>
      <Glyph name={value() ? "moon" : "sun"} color={value() ? "#ded3ff" : "#53378c"} />
      <Switch accessibilityLabel={zh() ? "切换预览主题" : "Toggle demo theme"} checked={!!value()}
        onChange={({ checked }) => select(Number(checked))}
        trackStyle={{ ...row, justifyContent: "flex-start", width: 60, height: 30, padding: 4, borderRadius: 16,
          backgroundColor: value() ? "#493574" : "#c6b2ee" }}
        thumbStyle={{ width: 22, height: 22, borderRadius: 11, backgroundColor: "#ffffff", translate: x }} />
    </View>;
  }
  if (p.id === "ui-segmented-step-bar") {
    return <View style={{ alignItems: "center", gap: 13 }}>
      <View style={row}>{[0, 1, 2, 3, 4].map(section =>
        <View style={{ height: 6, width: 30, borderRadius: 5, backgroundColor: section <= value() ? p.ink.accent : p.ink.border }} />
      )}</View>
      <ChoiceButton label={value() === 4 ? (zh() ? "重置" : "Reset") : (zh() ? "下一步" : "Next step")}
        press={() => select(value() === 4 ? 0 : value() + 1)} />
    </View>;
  }
  const labels = p.id === "ui-date-position" ? ["24", "25", "26"] : ["A", "B"];
  const x = slide.interpolate({ inputRange: [0, labels.length - 1], outputRange: [0, (labels.length - 1) * 48] });
  return <Tabs accessibilityLabel={p.id === "ui-date-position" ? (zh() ? "日期" : "Day") : (zh() ? "分段标签" : "Segmented tabs")}
    style={{ ...row, gap: 0, padding: 4, borderRadius: 21, backgroundColor: p.ink.panel, position: "relative",
      borderColor: p.ink.border, borderWidth: 1 }}>
    <View style={{ position: "absolute", left: 4, top: 4, width: 48, height: 34, translate: x, borderRadius: 17,
      backgroundColor: p.ink.tint, pointerEvents: "none" }} />
    {labels.map((label, index) => <Tab accessibilityLabel={label} selected={index === value()} onPress={() => select(index)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
      style={{ width: 48, height: 34, alignItems: "center", justifyContent: "center", borderRadius: 17 }}>
      <Copy text={label} accent={index === value()} />
    </Tab>)}
  </Tabs>;
}
