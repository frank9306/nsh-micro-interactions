import { Button, Slider } from "nsh/base";
import { Canvas, Text, View, signal, windowSize } from "nsh";
import type { Ink, Language } from "../model";

const types: Record<string, string> = {
  "dither-donut": "donut", "dither-device": "device", "dither-stacked": "stacked",
  "dither-growth": "growth", "dither-revenue": "revenue", "dither-gauge": "gauge",
  "dither-traffic": "traffic", "dither-funnel": "funnel", "dither-storage": "storage",
  "dither-heatmap": "heatmap", "dither-uptime": "uptime",
  "dither-donut-chart": "donut", "dither-growth-chart": "growth", "activity-heatmap": "heatmap",
};
export const ditherNames = new Set(Object.keys(types));
const base = [33, 48, 37, 62, 51, 73, 59, 86, 79, 94];
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const tau = Math.PI * 2;
const clip01 = (v: number) => Math.min(1, Math.max(0, v));

export function DitherMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const kind = types[p.id];
  const matrix = kind === "heatmap" || kind === "uptime";
  const donut = kind === "donut" || kind === "device";
  const dates = kind === "growth" || kind === "revenue";
  const index = signal(0);
  const period = signal(0);
  const zh = () => p.language === "zh";
  const width = () => windowSize().width < 440 ? 244 : 320;
  const height = 168;
  const steps = donut ? 4 : matrix ? 90 : kind === "gauge" ? 2 : kind === "traffic" ? 5 : kind === "funnel" ? 4 : 10;
  const figure = (i: number) => base[(i + period() * 3) % base.length];
  function pointUnder(x: number, y: number) {
    const w = width();
    if (donut) return Math.min(3, Math.floor((((Math.atan2(y - 77, x - w / 2) + Math.PI / 2) % tau + tau) % tau) / (tau / 4)));
    if (matrix) return Math.max(0, Math.min(89, Math.floor(Math.max(0, Math.min(17, (x - 14) / ((w - 28) / 18)))) * 5 + Math.min(4, Math.max(0, Math.floor((y - 30) / 21)))));
    if (kind === "traffic") return Math.min(4, Math.floor(clip01(x / w) * 5));
    if (kind === "funnel") return Math.min(3, Math.max(0, Math.floor((y - 18) / 33)));
    return Math.min(steps - 1, Math.floor(clip01(x / w) * steps));
  }
  return <View style={{ gap: 9, alignItems: "center", alignSelf: "stretch" }}>
    <Canvas accessibilityLabel={p.label} onMouseMove={e => index.set(pointUnder(e.position.x, e.position.y))}
      style={{ width: width(), height, maxWidth: "100%" }} draw={ctx => {
        const w = width(), selected = index();
        const levels = [p.ink.tint, p.ink.muted, p.ink.accent, p.ink.text];
        function noise(x: number, y: number, ww: number, hh: number, strength: number) {
          ctx.fillStyle = p.ink.text;
          for (let j = Math.floor(y / 3); j < (y + hh) / 3; j++) {
            for (let i = Math.floor(x / 3); i < (x + ww) / 3; i++) {
              if (bayer[((j & 3) * 4) + (i & 3)] < strength * 16) ctx.fillRect(i * 3, j * 3, 1, 1);
            }
          }
        }
        function bar(x: number, y: number, ww: number, hh: number, level: number, strength: number) {
          ctx.save();
          ctx.beginPath(); ctx.rect(x, y, ww, hh); ctx.clip();
          ctx.fillStyle = levels[level]; ctx.fillRect(x, y, ww, hh);
          noise(x, y, ww, hh, strength);
          ctx.restore();
        }
        function ring(x: number, y: number, r: number, thickness: number, start: number, finish: number, level: number, strength: number) {
          ctx.save();
          ctx.beginPath(); ctx.arc(x, y, r + thickness / 2, start, finish);
          ctx.arc(x, y, r - thickness / 2, finish, start, true); ctx.closePath(); ctx.clip();
          ctx.fillStyle = levels[level]; ctx.fillRect(x - r - thickness, y - r - thickness, (r + thickness) * 2, (r + thickness) * 2);
          noise(x - r - thickness, y - r - thickness, (r + thickness) * 2, (r + thickness) * 2, strength);
          ctx.restore();
        }
        function label(value: string, x: number, y: number) {
          ctx.font = "700 15px sans-serif";
          ctx.fillStyle = p.ink.text;
          ctx.textAlign = "center";
          ctx.fillText(value, x, y);
        }
        if (donut) {
          const cx = w / 2, cy = 77, start = -Math.PI / 2;
          const values = kind === "device" ? [0.42, 0.28, 0.21, 0.09] : period() === 0 ? [0.34, 0.31, 0.2, 0.15] : [0.28, 0.36, 0.25, 0.11];
          let angle = start;
          values.forEach((part, i) => {
            const end = angle + part * tau;
            ring(cx, cy, 53, i === selected ? 22 : 18, angle + 0.025, end - 0.025, i === selected ? 2 : (i % 2), i === selected ? 0.68 : 0.32 + i * 0.08);
            angle = end;
          });
          label(`${Math.round(values[selected] * 100)}%`, cx, cy + 4);
          return;
        }
        if (kind === "gauge") {
          for (let i = 0; i < 2; i++) {
            const center = w * (i ? 0.73 : 0.27);
            ring(center, 105, 46, 14, Math.PI, tau, 0, 0.19);
            ring(center, 105, 46, 14, Math.PI, Math.PI + Math.PI * figure(i + 4) / 100, i === selected ? 2 : 1, 0.55);
            label((i ? "RAM " : "CPU ") + figure(i + 4) + "%", center, 113);
          }
          return;
        }
        if (matrix) {
          const unit = (w - 28) / 18;
          for (let i = 0; i < 90; i++) {
            const intensity = kind === "uptime" ? (i % 17 === 0 ? 1 : 3) : (i * 47 + Math.floor(i / 5) * 71) % 4;
            bar(14 + Math.floor(i / 5) * unit, 30 + (i % 5) * 21, unit - 2, 15, i === selected ? 2 : 0, 0.1 + 0.22 * intensity);
          }
          return;
        }
        if (kind === "traffic") {
          for (let i = 0; i < 5; i++) {
            const cx = 24 + (w - 48) * i / 4, cy = 54 + ((i * 53) % 68), r = 17 + ((i * 11) % 14);
            ctx.save();
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, tau); ctx.clip();
            bar(cx - r, cy - r, r * 2, r * 2, i === selected ? 2 : 0, 0.22 + i * 0.13);
            ctx.restore();
          }
          return;
        }
        if (kind === "funnel") {
          [1, 0.78, 0.56, 0.34].forEach((part, i) => {
            bar(14, 18 + i * 33, (w - 29) * part, 19, i === selected ? 2 : 0, 0.66 - i * 0.11);
          });
          return;
        }
        if (kind === "storage") {
          const usage = figure(selected);
          bar(14, 59, w - 28, 32, 0, 0.08);
          [0.53, 0.3, 0.17].reduce((from, part, i) => {
            const size = (w - 28) * usage * part / 100;
            bar(from, 59, size - 2, 32, i === 0 ? 2 : 1, 0.3 + i * 0.16);
            return from + size;
          }, 14);
          label(usage + "%", w / 2, 115);
          return;
        }
        const dx = (w - 28) / 9;
        if (kind === "stacked") {
          for (let i = 0; i < 10; i++) {
            const x = 14 + i * dx, length = figure(i) * 1.24;
            bar(x - 5, 143 - length, 11, length * 0.34, i === selected ? 2 : 1, 0.5);
            bar(x - 5, 143 - length * 0.66, 11, length * 0.66, i === selected ? 2 : 0, 0.28);
          }
          return;
        }
        if (dates) {
          const points = base.map((_, i) => [14 + i * dx, 145 - figure(i) * 1.35]);
          function trace() {
            ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < points.length; i++) {
              const mid = (points[i - 1][0] + points[i][0]) / 2;
              ctx.bezierCurveTo(mid, points[i - 1][1], mid, points[i][1], points[i][0], points[i][1]);
            }
          }
          ctx.save();
          trace(); ctx.lineTo(w - 14, 145); ctx.lineTo(14, 145); ctx.closePath(); ctx.clip();
          bar(14, 12, w - 28, 133, 0, kind === "revenue" ? 0.36 : 0.56);
          ctx.restore();
          trace(); ctx.strokeStyle = p.ink.accent; ctx.lineWidth = 2; ctx.stroke();
          const [x, y] = points[selected]; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, 145); ctx.stroke();
          ctx.beginPath(); ctx.arc(x, y, 4, 0, tau); ctx.fillStyle = p.ink.text; ctx.fill();
        }
      }} />
    <View style={{ width: "78%", gap: 6 }}>
      <Slider accessibilityLabel={zh() ? "选择数据点" : "Select data point"} min={0} max={steps - 1}
        value={index()} onChange={({ value }) => { if (typeof value === "number") index.set(value); }}
        trackStyle={{ height: 24, justifyContent: "center" }}
        indicatorStyle={{ height: 4, backgroundColor: p.ink.border, borderRadius: 2 }}
        rangeStyle={{ height: 4, backgroundColor: p.ink.accent, borderRadius: 2 }}
        thumbStyle={{ width: 13, height: 13, borderRadius: 7, backgroundColor: p.ink.accent }} />
      <Text style={{ color: p.ink.muted, fontSize: 12, textAlign: "center" }}>{index() + 1} / {steps}</Text>
    </View>
    <If when={kind === "donut" || dates}><View style={{ flexDirection: "row", gap: 6 }}>
      {(zh() ? ["近 7 天", "近 30 天"] : ["7 days", "30 days"]).map((label, i) =>
        <Button accessibilityLabel={label} selected={period() === i} onPress={() => period.set(i)}
          style={{ paddingHorizontal: 9, paddingVertical: 6, borderRadius: 13, backgroundColor: period() === i ? p.ink.tint : p.ink.panel }}>
          <Text style={{ color: p.ink.text, fontSize: 12 }}>{label}</Text>
        </Button>
      )}
    </View></If>
  </View>;
}
