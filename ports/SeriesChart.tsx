import { Canvas, Text, View } from "nsh";
import type { Ink } from "../model";

export type SeriesPoint = { label: string; value: number };
export type SeriesChartProps = {
  label: string;
  emptyLabel: string;
  data: readonly SeriesPoint[];
  ink: Ink;
};

export function SeriesChart(p: SeriesChartProps) {
  const points = () => p.data.filter(point => Number.isFinite(point.value));
  return <View accessibilityLabel={p.label} style={{ width: "100%", maxWidth: 420, minWidth: 0, gap: 8 }}>
    <Text style={{ color: p.ink.text, fontWeight: "650" }}>{p.label}</Text>
    <If when={points().length > 0} else={<Text style={{ color: p.ink.muted }}>{p.emptyLabel}</Text>}>
      <Canvas style={{ width: "100%", height: 120 }} draw={(ctx, { width, height }) => {
        const data = points();
        if (!data.length || width <= 16 || height <= 16) return;
        // Normalize before subtracting so even extreme finite values stay finite.
        let magnitude = 1;
        for (const { value } of data) magnitude = Math.max(magnitude, Math.abs(value));
        const normalized = data.map(({ value }) => value / magnitude);
        let low = normalized[0], high = low;
        for (const value of normalized) {
          low = Math.min(low, value);
          high = Math.max(high, value);
        }
        const x = (i: number) => data.length === 1 ? width / 2 : 8 + i * (width - 16) / (data.length - 1);
        const y = (value: number) => high === low ? height / 2 : 8 + (high - value) / (high - low) * (height - 16);
        ctx.strokeStyle = p.ink.accent;
        ctx.fillStyle = p.ink.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x(0), y(normalized[0]));
        for (let i = 1; i < normalized.length; i++) ctx.lineTo(x(i), y(normalized[i]));
        ctx.stroke();
        for (let i = 0; i < normalized.length; i++) {
          ctx.beginPath();
          ctx.arc(x(i), y(normalized[i]), 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {points().map(({ label, value }) => <Text style={{ color: p.ink.muted, flexShrink: 1 }}>{`${label}: ${value}`}</Text>)}
      </View>
    </If>
  </View>;
}
