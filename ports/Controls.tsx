import { Button, Input, Link, Menu, MenuItem } from "nsh/base";
import { Text, View, reduceMotion, type JSX, type ViewStyle } from "nsh";
import type { Ink } from "../model";
import { Glyph } from "./ButtonMotion";

type Look = "pill" | "icon" | "row" | "plain";
type Face = { label: string; ink: Ink; icon?: string; look?: Look; selected?: boolean; style?: ViewStyle; children?: JSX.Element };
const row = { flexDirection: "row", alignItems: "center", gap: 8 } as const;

function faceStyle(p: Face): ViewStyle {
  const iconOnly = p.look === "icon", plain = p.look === "plain";
  return {
    ...row, justifyContent: p.look === "row" ? "space-between" : "center", minHeight: iconOnly ? 42 : 39,
    width: iconOnly ? 42 : undefined, paddingHorizontal: iconOnly ? 0 : 12,
    borderRadius: p.look === "row" ? 11 : plain ? 8 : 24, borderWidth: plain ? 0 : 1,
    borderColor: p.selected ? p.ink.accent : p.ink.border, backgroundColor: p.selected ? p.ink.tint : plain ? "transparent" : p.ink.panel,
    ...p.style,
  };
}

function ring(ink: Ink) {
  return { outlineWidth: 2, outlineOffset: 2, outlineColor: ink.accent };
}

function FaceContent(p: Face) {
  return <>
    <If when={p.icon}><Glyph name={p.icon!} color={p.selected || p.look === "plain" ? p.ink.accent : p.ink.text} size={p.look === "icon" ? 19 : 15} /></If>
    <If when={p.look !== "icon"} else={p.children}>
      {p.children ?? <Text style={{ fontSize: 13, fontWeight: "650", color: p.selected || p.look === "plain" ? p.ink.accent : p.ink.text }}>{p.label}</Text>}
    </If>
  </>;
}

export function ControlButton(p: Face & { onPress: () => void; disabled?: boolean; testID?: string }) {
  return <Button accessibilityLabel={p.label} tooltip={p.look === "icon" ? p.label : undefined}
    testID={p.testID} onPress={p.onPress} selected={p.selected} disabled={p.disabled}
    class="focus-visible:outline-2 disabled:opacity-50 transition motion-reduce:transition-none"
    focusVisibleStyle={ring(p.ink)} hoverStyle={{ borderColor: p.ink.accent, backgroundColor: p.ink.tint }}
    activeStyle={reduceMotion() ? undefined : { transform: [{ scale: 0.96 }] }} style={faceStyle(p)}>
    <FaceContent {...p} />
  </Button>;
}

export function ControlLink(p: Face & { href: string }) {
  return <Link href={p.href} accessibilityLabel={p.label} title={p.look === "icon" ? p.label : undefined}
    class="focus-visible:outline-2 transition motion-reduce:transition-none" focusVisibleStyle={ring(p.ink)}
    hoverStyle={{ borderColor: p.ink.accent, backgroundColor: p.ink.tint }}
    activeStyle={reduceMotion() ? undefined : { transform: [{ scale: 0.96 }] }} style={faceStyle(p)}>
    <FaceContent {...p} />
  </Link>;
}

type MenuChoice = { id: string; label: string };
export function ActionMenu(p: Face & {
  items: readonly MenuChoice[]; current?: string; align?: "start" | "center" | "end"; onSelect: (id: string) => void;
}) {
  return <Menu align={p.align ?? "start"} offset={7}
    popupStyle={{ minWidth: 144, padding: 5, borderRadius: 13, borderWidth: 1,
      borderColor: p.ink.border, backgroundColor: p.ink.panel }}
    popupClass="transition motion-reduce:transition-none"
    popupStartingStyle={reduceMotion() ? undefined : { opacity: 0, transform: [{ translateY: -4 }] }}
    trigger={<View accessibilityLabel={p.label} tooltip={p.look === "icon" ? p.label : undefined}
      class="focus-visible:outline-2" focusVisibleStyle={ring(p.ink)} hoverStyle={{ borderColor: p.ink.accent, backgroundColor: p.ink.tint }}
      style={faceStyle(p)}><FaceContent {...p} /></View>}>
    {p.items.map(item => <MenuItem accessibilityLabel={item.label} onSelect={() => p.onSelect(item.id)}
      focusStyle={{ backgroundColor: p.ink.tint }} style={{ ...row, minHeight: 37, paddingHorizontal: 10, justifyContent: "space-between", borderRadius: 8 }}>
      <Text style={{ color: p.ink.text, fontSize: 14 }}>{item.label}</Text>
      <If when={p.current === item.id}><Glyph name="check" color={p.ink.accent} size={14} /></If>
    </MenuItem>)}
  </Menu>;
}

export function SearchField(p: {
  label: string; placeholder?: string; clearLabel: string; ink: Ink; value: string; onChange: (value: string) => void;
  collapsed?: boolean; onExpand?: () => void; closeLabel?: string; onCollapse?: () => void;
  focusOnMount?: boolean; style?: ViewStyle;
}) {
  return <View class="transition-all duration-300 motion-reduce:transition-none"
    style={{ ...row, minHeight: 44, borderWidth: 1, borderColor: p.ink.border, borderRadius: 23, backgroundColor: p.ink.panel,
      overflow: "hidden", paddingHorizontal: p.collapsed ? 0 : 7, ...p.style }}>
    <If when={!p.collapsed} else={<ControlButton label={p.label} icon="search" look="icon" ink={p.ink} onPress={() => p.onExpand?.()} style={{ borderWidth: 0 }} />}>
      <View style={{ width: 27, alignItems: "center" }}><Glyph name="search" color={p.ink.muted} size={17} /></View>
      <Input accessibilityLabel={p.label} placeholder={p.placeholder ?? p.label} value={p.value}
        ref={p.focusOnMount ? ref => ref.focus() : undefined} onChange={({ value }) => p.onChange(value)}
        focusStyle={{ color: p.ink.text }}
        style={{ flex: 1, minWidth: 0, minHeight: 42, fontSize: 14, color: p.ink.text }} />
      <If when={p.value || p.onCollapse}>
        <ControlButton ink={p.ink} look="icon" icon="x" label={p.value ? p.clearLabel : p.closeLabel ?? p.clearLabel}
          onPress={() => { if (p.value) p.onChange(""); else p.onCollapse?.(); }}
          style={{ width: 34, minHeight: 34, borderWidth: 0 }} />
      </If>
    </If>
  </View>;
}
