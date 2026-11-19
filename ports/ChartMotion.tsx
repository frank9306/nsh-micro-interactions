import { Button, Slider } from "nsh/base";
import { Canvas, Text, View, signal, windowSize } from "nsh";
import type { Ink, Language } from "../model";

const mono = "mono-rounded-";
const modes: Record<string, string> = {
  [mono + "line"]: "line", [mono + "bar"]: "bar", [mono + "area"]: "area", [mono + "composed"]: "hybrid",
  [mono + "donut"]: "donut", [mono + "gauge-arc"]: "gauge", [mono + "step"]: "step",
  [mono + "funnel"]: "funnel", [mono + "heatmap"]: "heatmap", [mono + "pyramid"]: "pyramid",
  "mono-activity-green": "heatmap", "mono-activity-blue": "heatmap", "mono-activity-purple": "heatmap",
};
export const chartNames = new Set(Object.keys(modes));
const sample = [34, 49, 42, 67, 59, 80, 71, 87];
const tau = 2 * Math.PI;

export function ChartMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const kind = modes[p.id];
  const activity = p.id.includes("activity");
  const max = kind === "heatmap" ? (activity ? 139 : 83) : kind === "donut" ? 3
    : kind === "funnel" || kind === "pyramid" ? 5 : sample.length - 1;
  const selected = signal(Math.min(max, 4));
  const horizontal = signal(false);
  const w = () => windowSize().width < 430 ? 256 : 336;
  const h = 142;
  const zh = () => p.language === "zh";
  const accent = () => p.id.endsWith("-green") ? "#43c996" : p.id.endsWith("-blue") ? "#42a9e4" : p.ink.accent;

  function mouseIndex(x: number, y: number) {
    const width = w();
    if (kind === "heatmap") {
      const cols = activity ? 20 : 12;
      return Math.min(max, Math.max(0, Math.floor((x - 12) / ((width - 24) / cols))) * 7 + Math.max(0, Math.min(6, Math.floor((y - 24) / 14))));
    }
    if (kind === "donut") return Math.min(3, Math.floor((((Math.atan2(y - h / 2, x - width / 2) + Math.PI / 2) % tau + tau) % tau) / (tau / 4)));
    return Math.max(0, Math.min(max, Math.round((x - 18) / ((width - 36) / max))));
  }

  return <View style={{ alignItems: "center", alignSelf: "stretch", gap: 7 }}>
    <Canvas accessibilityLabel={p.label}
      onMouseMove={event => selected.set(mouseIndex(event.position.x, event.position.y))}
      style={{ width: w(), height: h, maxWidth: "100%" }} draw={ctx => {
        const width = w();
        const index = selected();
        const color = accent();
        const xs = sample.map((_, i) => 18 + i * ((width - 36) / (sample.length - 1)));
        const ys = sample.map(n => 126 - n * 1.13);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        function point(x: number, y: number, r: number) {
          ctx.beginPath(); ctx.arc(x, y, r, 0, tau); ctx.fill();
        }
        function line(x: number, y: number, tx: number, ty: number, thickness: number) {
          ctx.lineWidth = thickness;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke();
        }
        if (kind === "heatmap") {
          const cols = activity ? 20 : 12;
          const size = (width - 24) / cols;
          for (let i = 0; i < cols * 7; i++) {
            const x = 12 + Math.floor(i / 7) * size + size / 2;
            const y = 30 + (i % 7) * 14;
            ctx.globalAlpha = i === index ? 1 : (0.14 + ((i * 53 + Math.floor(i / 6) * 37) % 15) / 20);
            point(x, y, Math.min(5.3, size * 0.38));
          }
          return;
        }
        if (kind === "donut" || kind === "gauge") {
          const start = kind === "donut" ? -Math.PI / 2 : Math.PI;
          const fraction = kind === "donut" ? 1 : 0.5;
          const cx = width / 2;
          const cy = kind === "donut" ? 72 : 101;
          const r = kind === "donut" ? 45 : 69;
          ctx.lineWidth = 13;
          if (kind === "gauge") {
            ctx.globalAlpha = 0.23;
            ctx.beginPath(); ctx.arc(cx, cy, r, start, tau); ctx.stroke();
            ctx.globalAlpha = 1;
            ctx.beginPath(); ctx.arc(cx, cy, r, start, start + Math.PI * sample[index] / 100); ctx.stroke();
          } else {
            const segments = [0, 0.35, 0.61, 0.84, 1];
            for (let i = 0; i < 4; i++) {
              ctx.globalAlpha = i === index ? 1 : 0.29 + i * 0.12;
              ctx.beginPath();
              ctx.arc(cx, cy, r, start + tau * fraction * segments[i] + 0.15, start + tau * fraction * segments[i + 1] - 0.15);
              ctx.stroke();
            }
          }
          ctx.globalAlpha = 1;
          ctx.font = "700 21px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText(kind === "gauge" ? String(sample[index]) : ["35%", "26%", "23%", "16%"][index], cx, cy + 6);
          return;
        }
        if (kind === "funnel" || kind === "pyramid") {
          for (let i = 0; i < 6; i++) {
            const span = (kind === "funnel" ? 6 - i : i + 2) * (width - 45) / 8;
            const y = 19 + i * 20;
            const x = kind === "funnel" ? 26 : (width - span) / 2;
            ctx.globalAlpha = i === index ? 1 : 0.26 + i * 0.11;
            line(x, y, x + span, y, 11);
          }
          return;
        }
        ctx.globalAlpha = 0.15;
        for (const y of [32, 59, 86, 113]) line(15, y, width - 15, y, 1);
        if (kind === "bar" || kind === "hybrid") {
          for (const [i, pointX] of xs.entries()) {
            ctx.globalAlpha = i === index ? 1 : kind === "hybrid" ? 0.36 : 0.62;
            if (horizontal()) line(18, 15 + i * 15, 18 + sample[i] * (width - 43) / 100, 15 + i * 15, 8);
            else line(pointX, 119, pointX, ys[i], 11);
          }
          if (kind === "bar") return;
        }
        ctx.globalAlpha = 1;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(xs[0], ys[0]);
        for (let i = 1; i < xs.length; i++) {
          if (kind === "step") {
            ctx.lineTo(xs[i], ys[i - 1]); ctx.lineTo(xs[i], ys[i]);
          } else {
            const mid = (xs[i - 1] + xs[i]) / 2;
            ctx.bezierCurveTo(mid, ys[i - 1], mid, ys[i], xs[i], ys[i]);
          }
        }
        ctx.stroke();
        if (kind === "area") {
          ctx.lineTo(xs.at(-1)!, 123); ctx.lineTo(xs[0], 123); ctx.closePath();
          const fade = ctx.createLinearGradient(0, 22, 0, 126);
          fade.addColorStop(0, color); fade.addColorStop(1, "#a493dc00");
          ctx.fillStyle = fade;
          ctx.globalAlpha = 0.5;
          ctx.fill();
        }
        ctx.fillStyle = color;
        ctx.globalAlpha = 1;
        point(xs[index], ys[index], 4);
      }} />
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, alignSelf: "stretch" }}>
      <Slider accessibilityLabel={zh() ? "数据点" : "Data point"} min={0} max={max} value={Math.min(max, selected())}
        onChange={({ value }) => { if (typeof value === "number") selected.set(value); }}
        style={{ width: "55%" }} trackStyle={{ height: 23, justifyContent: "center" }}
        indicatorStyle={{ height: 4, backgroundColor: p.ink.border, borderRadius: 3 }}
        rangeStyle={{ height: 4, backgroundColor: accent(), borderRadius: 3 }}
        thumbStyle={{ width: 12, height: 12, borderRadius: 6, backgroundColor: accent() }} />
      <Text style={{ color: p.ink.muted, fontSize: 12 }}>{`${Math.min(max, selected()) + 1} / ${max + 1}`}</Text>
    </View>
    <If when={kind === "bar"}>
      <Button onPress={() => horizontal.update(value => !value)} accessibilityLabel={zh() ? "切换方向" : "Switch orientation"}
        style={{ minHeight: 31, paddingHorizontal: 10, borderRadius: 16, justifyContent: "center", backgroundColor: p.ink.panel }}>
        <Text style={{ color: p.ink.text }}>{zh() ? (horizontal() ? "横向" : "纵向") : (horizontal() ? "Horizontal" : "Vertical")}</Text>
      </Button>
    </If>
  </View>;
}
