import { Select } from "nsh/base";
import { Text, View, reduceMotion } from "nsh";
import type { Ink } from "../model";

export type MotionSelectProps = {
  label: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
  ink: Ink;
  disabled?: boolean;
};

export function MotionSelect(p: MotionSelectProps) {
  const selected = () => p.options.find(option => option.value === p.value);
  const disabled = () => p.disabled || p.options.length === 0;
  return <Select accessibilityLabel={p.label} placeholder={p.placeholder} disabled={disabled()}
    items={p.options.map(({ label, value }) => ({ title: label, value }))}
    value={selected()?.value ?? null} onChange={({ value }) => p.onChange(value ?? null)}
    popupStyle={{ minWidth: 152, borderWidth: 1, borderColor: p.ink.border, backgroundColor: p.ink.panel, borderRadius: 12, padding: 4 }}
    popupClass="transition motion-reduce:transition-none"
    popupStartingStyle={reduceMotion() ? undefined : { opacity: 0, translate: [0, -4] }}
    itemStyle={{ padding: 8, color: p.ink.text, fontSize: 14 }}
    trigger={<View class="focus-visible:outline-2"
      focusVisibleStyle={{ outlineColor: p.ink.accent, outlineWidth: 2 }}
      style={{ minHeight: 39, minWidth: 0, maxWidth: "100%", paddingHorizontal: 14, borderRadius: 20, borderWidth: 1,
        borderColor: p.ink.border, backgroundColor: p.ink.panel, justifyContent: "center", opacity: disabled() ? 0.5 : 1 }}>
      <Text style={{ color: selected() ? p.ink.text : p.ink.muted, fontSize: 14, fontWeight: "650" }}>
        {(selected()?.label ?? p.placeholder) + "  ⌄"}
      </Text>
    </View>} />;
}
