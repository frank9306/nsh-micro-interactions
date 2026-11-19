import { Slider } from "nsh/base";
import { Canvas, Text, View, signal, windowSize, type CanvasRenderingContext2D } from "nsh";
import type { Ink, Language } from "../model";

const modes = ["scatter", "candlestick", "kpi", "radial-group", "bullet", "sankey", "stacked-bar", "radar",
  "radial-gauge", "sparkline", "bubble", "treemap", "stream", "meter", "waterfall", "polar", "range"] as const;
type Mode = typeof modes[number];
export const monoMoreNames = new Set(modes.map(mode => "mono-rounded-" + mode));
const tau = Math.PI * 2;
const values = [35, 50, 42, 64, 57, 76, 69, 89];
const trend = [3, 6, 4, 7, 8, 6, 10, 12];

function chart(ctx: CanvasRenderingContext2D, mode: Mode, w: number, ink: Ink, active: number, zh: boolean) {
  const x = (i: number) => 21 + i * (w - 42) / 7;
  const y = (value: number) => 137 - value * 1.16;
  ctx.strokeStyle = ink.accent; ctx.fillStyle = ink.accent; ctx.lineCap = "round"; ctx.lineJoin = "round";
  function point(px: number, py: number, radius: number, alpha = 1, border = false) {
    ctx.globalAlpha = alpha; ctx.beginPath(); ctx.arc(px, py, radius, 0, tau); ctx.fill();
    if (border) { ctx.globalAlpha = Math.min(1, alpha + 0.28); ctx.lineWidth = 1.2; ctx.stroke(); }
  }
  function segment(px: number, py: number, tx: number, ty: number, thickness: number, alpha = 1) {
    ctx.globalAlpha = alpha; ctx.lineWidth = thickness; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(tx, ty); ctx.stroke();
  }
  function text(value: string, px: number, py: number, size = 13) {
    ctx.globalAlpha = 1; ctx.fillStyle = ink.text; ctx.font = `650 ${size}px sans-serif`; ctx.textAlign = "center";
    ctx.fillText(value, px, py); ctx.fillStyle = ink.accent;
  }
  function curve(points: number[][], begin = true) {
    if (begin) { ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]); }
    else ctx.lineTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const [xl, yl] = points[i - 1], [xr, yr] = points[i];
      const middle = (xl + xr) / 2;
      ctx.bezierCurveTo(middle, yl, middle, yr, xr, yr);
    }
  }
  function polygon(points: number[][]) {
    ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (const [px, py] of points.slice(1)) ctx.lineTo(px, py);
    ctx.closePath();
  }
  function axisGrid() { for (const yy of [38, 68, 98, 128]) segment(14, yy, w - 14, yy, 1, 0.14); }

  if (mode === "radar" || mode === "polar") {
    const count = mode === "radar" ? 6 : 8;
    const a = (i: number) => -Math.PI / 2 + tau * i / count;
    const spokes = (r: number) => Array.from({ length: count }, (_, i) => [w / 2 + r * Math.cos(a(i)), 79 + r * Math.sin(a(i))]);
    for (const radius of [20, 40, 60]) {
      ctx.globalAlpha = 0.19; ctx.lineWidth = 1; polygon(spokes(radius)); ctx.stroke();
    }
    if (mode === "radar") {
      const all = spokes(60);
      all.forEach(([px, py], i) => segment(w / 2, 79, px, py, 1, i === active ? 0.88 : 0.22));
      const data = all.map(([px, py], i) => [w / 2 + (px - w / 2) * values[i] / 100, 79 + (py - 79) * values[i] / 100]);
      polygon(data); ctx.globalAlpha = 0.23; ctx.fill(); ctx.lineWidth = 2; ctx.globalAlpha = 1; ctx.stroke();
      data.forEach(([px, py], i) => point(px, py, i === active ? 4 : 2.5));
    } else {
      values.forEach((value, i) => {
        const finalR = 16 + value * 0.54;
        ctx.beginPath();
        ctx.arc(w / 2, 79, finalR, a(i) + 0.05, a(i + 1) - 0.05);
        ctx.arc(w / 2, 79, 14, a(i + 1) - 0.05, a(i) + 0.05, true); ctx.closePath();
        ctx.globalAlpha = i === active ? 1 : 0.31 + i * 0.068; ctx.fill();
      });
    }
    return;
  }
  if (mode === "radial-group" || mode === "radial-gauge" || mode === "meter") {
    const meter = mode === "meter";
    const rows = meter ? [values[active]] : [values[active], values[(active + 2) % 8], values[(active + 5) % 8]];
    const start = meter ? Math.PI : -Math.PI / 2;
    const length = meter ? Math.PI : tau * (mode === "radial-group" ? 0.78 : 0.96);
    const cy = meter ? 116 : 80;
    rows.forEach((v, i) => {
      const radius = (meter ? 72 : 60) - i * 14;
      ctx.lineWidth = 8;
      ctx.globalAlpha = 0.14; ctx.beginPath(); ctx.arc(w / 2, cy, radius, start, start + length); ctx.stroke();
      ctx.globalAlpha = 1 - 0.27 * i; ctx.beginPath(); ctx.arc(w / 2, cy, radius, start, start + length * v / 100); ctx.stroke();
    });
    text(rows[0] + "%", w / 2, cy + 6, 22);
    return;
  }
  if (mode === "scatter" || mode === "bubble") {
    axisGrid();
    values.forEach((v, i) => {
      const yy = y(v + (i % 3) * 9);
      const radius = mode === "bubble" ? 7 + v / 11 : (i === active ? 5 : 3);
      if (i === active) {
        segment(x(i), 22, x(i), 137, 1, 0.25);
        segment(14, yy, w - 14, yy, 1, 0.25);
      }
      point(x(i), yy, radius, i === active ? 0.9 : 0.28 + (i % 3) * 0.12, mode === "bubble");
    });
    return;
  }
  if (mode === "bullet") {
    for (let i = 0; i < 4; i++) {
      const yy = 30 + 32 * i, max = w - 53, actual = values[i + 2], target = values[i + 4];
      segment(24, yy, 24 + max, yy, 12, 0.14);
      segment(24, yy, 24 + max * 0.7, yy, 12, 0.24);
      segment(24, yy, 24 + max * actual / 100, yy, 6, active === i ? 1 : 0.64);
      const mark = 24 + max * target / 100;
      segment(mark, yy - 9, mark, yy + 9, 2, 0.96);
    }
    return;
  }
  if (mode === "sankey") {
    const flow = [[27, 29, 21], [33, 100, 14], [83, 30, 17], [97, 113, 25], [128, 69, 12]];
    flow.forEach(([from, to, thick], i) => {
      ctx.globalAlpha = active === i ? 0.95 : 0.35;
      ctx.lineWidth = thick;
      curve([[24, from], [w - 24, to]]); ctx.stroke();
    });
    return;
  }
  if (mode === "treemap") {
    const tiles = [[0, 0, 0.43, 0.58], [0.43, 0, 0.32, 0.58], [0.75, 0, 0.25, 0.58],
      [0, 0.58, 0.28, 0.42], [0.28, 0.58, 0.21, 0.42], [0.49, 0.58, 0.21, 0.42], [0.7, 0.58, 0.17, 0.42], [0.87, 0.58, 0.13, 0.42]];
    tiles.forEach(([left, top, width, height], i) => {
      ctx.globalAlpha = i === active ? 1 : 0.22 + 0.068 * i;
      const l = 14 + left * (w - 28), t = 15 + top * 125, tw = width * (w - 28) - 4, th = height * 125 - 4;
      ctx.beginPath();
      ctx.moveTo(l + 7, t); ctx.lineTo(l + tw - 7, t); ctx.quadraticCurveTo(l + tw, t, l + tw, t + 7);
      ctx.lineTo(l + tw, t + th - 7); ctx.quadraticCurveTo(l + tw, t + th, l + tw - 7, t + th);
      ctx.lineTo(l + 7, t + th); ctx.quadraticCurveTo(l, t + th, l, t + th - 7);
      ctx.lineTo(l, t + 7); ctx.quadraticCurveTo(l, t, l + 7, t); ctx.fill();
    });
    return;
  }
  if (mode === "candlestick" || mode === "waterfall" || mode === "stacked-bar") {
    axisGrid();
    let cumulative = 32;
    values.forEach((value, i) => {
      const delta = [14, 9, -13, 12, 13, -8, 11, 7][i];
      if (mode === "candlestick") {
        segment(x(i), y(value + 15), x(i), y(value - 17), 2, i === active ? 1 : 0.57);
        const empty = delta < 0;
        const l = x(i) - 6, t = y(value + 7), hh = 10 + Math.abs(delta) / 2;
        ctx.lineWidth = 1.5; ctx.globalAlpha = i === active ? 1 : 0.63;
        if (empty) ctx.strokeRect(l, t, 12, hh); else ctx.fillRect(l, t, 12, hh);
      } else if (mode === "waterfall") {
        segment(x(i), y(cumulative), x(i), y(cumulative + delta), 13, i === active ? 1 : delta > 0 ? 0.67 : 0.31);
        cumulative += delta;
        if (i < 7) segment(x(i) + 6, y(cumulative), x(i + 1) - 6, y(cumulative), 1, 0.4);
      } else {
        const middle = value * (0.36 + 0.09 * (i % 4));
        segment(x(i), 129, x(i), y(middle), 12, i === active ? 0.8 : 0.36);
        segment(x(i), y(middle) - 3, x(i), y(value), 12, i === active ? 1 : 0.62);
      }
    });
    return;
  }
  if (mode === "kpi" || mode === "sparkline") {
    const amount = mode === "kpi" ? 1 : 3;
    for (let i = 0; i < amount; i++) {
      const yy = amount === 1 ? 88 : 33 + 48 * i;
      text(amount === 1 ? (zh ? "总访问量" : "Total visits") : ["API", "DB", "UI"][i], w * 0.17, yy - 12, 13);
      text(String(trend[(active + i * 2) % 8] * 108), w * 0.17, yy + 9, 20);
      const points = trend.map((value, j) => [w * 0.32 + j * w * 0.085, yy + 8 - trend[(j + i * 2) % 8] * 2.5]);
      ctx.globalAlpha = 0.76; ctx.lineWidth = 2.6; curve(points); ctx.stroke();
      point(points[active][0], points[active][1], 3.5);
    }
    return;
  }
  const stream = mode === "stream";
  const layers = stream ? 3 : 1;
  for (let i = 0; i < layers; i++) {
    const high = values.map((v, j) => [x(j), stream ? 49 + i * 21 + (v % 19) * 0.67 : y(v + 11)]);
    const low = values.map((v, j) => [x(j), stream ? 75 + i * 20 - (v % 17) * 0.37 : y(v - 13)]);
    curve(high); curve([...low].reverse(), false); ctx.closePath();
    ctx.globalAlpha = stream ? 0.38 + i * 0.16 : 0.29; ctx.fill();
    ctx.globalAlpha = 0.9; ctx.lineWidth = 1.6; curve(high); ctx.stroke();
    if (!stream) { curve(low); ctx.stroke(); }
  }
  segment(x(active), 17, x(active), 146, 1, 0.55);
}

export function MonoMore(p: { id: string; label: string; language: Language; ink: Ink }) {
  const mode = p.id.slice("mono-rounded-".length) as Mode;
  const max = mode === "radar" ? 5 : mode === "bullet" ? 3 : mode === "sankey" ? 4 : 7;
  const active = signal(0);
  const width = () => windowSize().width < 450 ? 246 : 326;
  const zh = () => p.language === "zh";
  return <View style={{ alignSelf: "stretch", alignItems: "center", gap: 8 }}>
    <Canvas accessibilityLabel={p.label} style={{ width: width(), height: 158, maxWidth: "100%" }}
      onMouseMove={e => active.set(Math.max(0, Math.min(max, Math.round((e.position.x - 14) * max / (width() - 28)))))}
      draw={ctx => chart(ctx, mode, width(), p.ink, active(), zh())} />
    <Slider accessibilityLabel={zh() ? "图表数据点" : "Chart data point"} min={0} max={max} value={active()}
      onChange={({ value }) => { if (typeof value === "number") active.set(value); }} style={{ width: "72%" }}
      trackStyle={{ height: 24, justifyContent: "center" }}
      indicatorStyle={{ height: 4, backgroundColor: p.ink.border, borderRadius: 2 }}
      rangeStyle={{ height: 4, backgroundColor: p.ink.accent, borderRadius: 2 }}
      thumbStyle={{ width: 13, height: 13, borderRadius: 7, backgroundColor: p.ink.accent }} />
    <Text style={{ color: p.ink.muted, fontSize: 12 }}>{active() + 1} / {max + 1}</Text>
  </View>;
}
