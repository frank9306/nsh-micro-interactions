import { Canvas, Path2D, Text, View, type CanvasRenderingContext2D, type ViewStyle } from "nsh";
import type { Ink } from "../model";

type Frame = number | string;
type Channel = "x" | "y" | "scale" | "scaleX" | "scaleY" | "rotate" | "rotateX" | "rotateY"
  | "opacity" | "width" | "height" | "top" | "gap" | "borderWidth" | "borderRadius" | "strokeDashoffset" | "strokeWidth";
type Timing = { duration?: number; repeat?: number | "infinite"; repeatType?: string; delay?: number;
  ease?: string; times?: number[]; repeatDelay?: number; type?: "spring"; bounce?: number };
export type LoaderNode = {
  classes?: string;
  kind?: string;
  attributes?: Record<string, Frame>;
  style?: ViewStyle & { background?: string };
  animation?: Partial<Record<Channel, Frame | Frame[]>>;
  initial?: Partial<Record<Channel, Frame>>;
  timing?: Timing & Partial<Record<Channel, Timing>>;
  children?: (LoaderNode | string)[];
};

export function localizeLoader(node: LoaderNode, id: string): LoaderNode {
  const letters = id === "spring-text-pop" ? [..."内容正在加载中..."]
    : id === "text-shimmer-wave" ? [..."正在思考请稍等…"] : undefined;
  const words: Record<string, string> = { Loading: "加载中", Thinking: "思考中", Wait: "请稍候", "loading...": "加载中…", "&gt;": ">" };
  let index = 0;
  function visit(value: LoaderNode): LoaderNode {
    return { ...value, children: value.children?.map(child => typeof child === "string"
      ? letters?.[index++] ?? words[child] ?? child : visit(child)) };
  }
  return visit(node);
}

function curve(value: number, timing: Timing) {
  const { ease } = timing;
  if (timing.type === "spring" && value !== 0 && value !== 1) {
    const damping = 4 + 8 * (1 - (timing.bounce ?? 0.2));
    const frequency = 8 + 18 * (timing.bounce ?? 0.2);
    return 1 - Math.exp(-damping * value) * Math.cos(frequency * value);
  }
  if (ease === "circIn") return 1 - Math.sqrt(1 - value * value);
  if (ease === "linear") return value;
  if (ease === "easeInOut") return (1 - Math.cos(Math.PI * value)) / 2;
  if (ease === "easeIn") return value * value;
  return 1 - (1 - value) * (1 - value);
}

function fraction(timing: Timing, time: number) {
  const duration = Math.max(1, (timing.duration ?? 0.3) * 1000);
  const period = duration + (timing.repeatDelay ?? 0) * 1000;
  const elapsed = Math.max(0, time - (timing.delay ?? 0) * 1000);
  const loop = Math.floor(elapsed / period);
  const limit = timing.repeat === "infinite" ? Infinity : (timing.repeat ?? 0) + 1;
  const last = Math.min(loop, limit - 1);
  const progress = loop >= limit ? 1 : Math.min((elapsed % period) / duration, 1);
  return timing.repeatType !== "loop" && timing.repeatType && last % 2 === 1 ? 1 - progress : progress;
}

function sample(frames: Frame[], phase: number, timing: Timing): Frame {
  if (frames.length === 1) return frames[0];
  const marks = timing.times?.length === frames.length ? timing.times : frames.map((_, i) => i / (frames.length - 1));
  const nextIndex = marks.findIndex(mark => mark >= phase);
  const upper = nextIndex === -1 ? marks.length - 1 : Math.max(1, nextIndex);
  const span = Math.max(marks[upper] - marks[upper - 1], 0.00001);
  const between = curve(Math.max(0, Math.min(1, (phase - marks[upper - 1]) / span)), timing);
  const current = frames[upper - 1];
  const next = frames[upper];
  const unit = typeof current === "string" && current.endsWith("%") || typeof next === "string" && next.endsWith("%") ? "%" : "";
  const a = parseFloat(String(current));
  const b = parseFloat(String(next));
  const value = a + (b - a) * between;
  return unit ? value + unit : value;
}

function channel(node: LoaderNode, key: Channel, time: number, fallback: Frame = 0): Frame {
  const frame = node.animation?.[key];
  if (frame === undefined) return fallback;
  const timing = { ...node.timing, ...node.timing?.[key] };
  const frames = Array.isArray(frame) ? frame : [node.initial?.[key] ?? fallback, frame];
  return sample(frames, fraction(timing, time), timing);
}

function styleFor(node: LoaderNode, time: number, ink: Ink): ViewStyle {
  const { background, ...staticStyle } = node.style ?? {};
  const style: ViewStyle = { ...staticStyle };
  const classes = node.classes?.split(/\s+/) ?? [];
  if (classes.includes("flex") && !classes.includes("flex-col")) style.flexDirection = "row";
  const columns = classes.find(part => /^grid-cols-\d+$/.test(part));
  if (columns) {
    style.display = "grid";
    style.gridTemplateColumns = `repeat(${columns.slice(10)}, minmax(0, 1fr))`;
  }
  const space = /(?:^|\s)space-[xy]-(\d+(?:\.\d+)?)(?:\s|$)/.exec(node.classes ?? "");
  if (space) style.gap = Number(space[1]) * 4;
  if (background) {
    if (background.includes("gradient(")) style.backgroundImage = background;
    else style.backgroundColor = background;
  }
  if (classes.some(value => /^(?:dark:)?bg-(?:white|black|zinc-\d+|neutral-\d+)$/.test(value))) {
    style.backgroundColor = classes.some(value => /^bg-(?:zinc|neutral)-[123]00$/.test(value)) ? ink.border : ink.accent;
  }
  const edges = { t: "borderTopColor", r: "borderRightColor", b: "borderBottomColor", l: "borderLeftColor" } as const;
  for (const name of classes) {
    const match = /^border-(?:([trbl])-)?(?:zinc-\d+|neutral-\d+|black|white)(?:\/(\d+))?$/.exec(name);
    if (!match) continue;
    const edge = match[1] as keyof typeof edges | undefined;
    style[edge ? edges[edge] : "borderColor"] = match[2] ? ink.muted : ink.accent;
  }
  if (!node.animation) return style;
  const transforms: NonNullable<ViewStyle["transform"]> = [];
  const position: [number | string, number | string] = [0, 0];
  for (const key of Object.keys(node.animation)) {
    const fallback = key.startsWith("scale") || key === "opacity" ? 1 : 0;
    const value = channel(node, key as Channel, time, fallback);
    switch (key) {
      case "x": position[0] = value; break;
      case "y": position[1] = value; break;
      case "scale": transforms.push({ scale: Number(value) }); break;
      case "scaleX": transforms.push({ scaleX: Number(value) }); break;
      case "scaleY": transforms.push({ scaleY: Number(value) }); break;
      case "rotate": transforms.push({ rotate: value }); break;
      case "rotateX": transforms.push({ rotateX: value }); break;
      case "rotateY": transforms.push({ rotateY: value }); break;
      case "opacity": style.opacity = Number(value); break;
      case "width": style.width = value as ViewStyle["width"]; break;
      case "height": style.height = value as ViewStyle["height"]; break;
      case "top": style.top = value as ViewStyle["top"]; break;
      case "gap": style.gap = Number(value); break;
      case "borderWidth": style.borderWidth = Number(value); break;
      case "borderRadius": {
        const dim = /(?:^|\s)(?:size|w|h)-(\d+(?:\.\d+)?)(?:\s|$)/.exec(node.classes ?? "");
        const width = typeof style.width === "number" ? style.width : (dim ? 4 * Number(dim[1]) : 24);
        style.borderRadius = typeof value === "string" ? parseFloat(value) * width / 100 : value;
        break;
      }
    }
  }
  if (transforms.length) style.transform = transforms;
  if (position[0] || position[1]) style.translate = position;
  return style;
}

const vectorPaths = new Map<string, Path2D>();
function coordinates(value: Frame | undefined) {
  return String(value ?? "").trim().split(/[\s,]+/).filter(Boolean).map(Number);
}

function drawVector(ctx: CanvasRenderingContext2D, node: LoaderNode, time: number, ink: Ink, cx: number, cy: number, fill?: string, stroke?: string) {
  const a = node.attributes ?? {};
  const n = (name: string) => Number(a[name] ?? 0);
  const explicit = (key: "fill" | "stroke", inherited: string | undefined) => {
    if (a[key] !== undefined) return a[key] === "currentColor" ? ink.accent : String(a[key]);
    const color = node.classes?.split(/\s+/).find(part => part.startsWith(key + "-"));
    return color === undefined ? inherited : color.endsWith("-none") ? "none"
      : /-(?:200|300)$/.test(color) ? ink.border : ink.accent;
  };
  const fillColor = explicit("fill", fill) ?? ink.text;
  const strokeColor = explicit("stroke", stroke);
  ctx.save();
  ctx.globalAlpha = Number(ctx.globalAlpha) * Number(channel(node, "opacity", time, 1));
  const angle = Number(channel(node, "rotate", time, 0));
  const scale = Number(channel(node, "scale", time, 1));
  if (angle || scale !== 1) {
    ctx.translate(cx, cy);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(scale, scale);
    ctx.translate(-cx, -cy);
  }
  ctx.translate(Number(channel(node, "x", time)), Number(channel(node, "y", time)));
  if (node.kind === "svg" || node.kind === "g") {
    for (const child of node.children ?? []) if (typeof child !== "string") drawVector(ctx, child, time, ink, cx, cy, fillColor, strokeColor);
    ctx.restore();
    return;
  }
  ctx.beginPath();
  let path: Path2D | undefined;
  if (node.kind === "circle") ctx.arc(n("cx"), n("cy"), n("r"), 0, Math.PI * 2);
  if (node.kind === "ellipse") ctx.ellipse(n("cx"), n("cy"), n("rx"), n("ry"), 0, 0, Math.PI * 2);
  if (node.kind === "rect") ctx.rect(n("x"), n("y"), n("width"), n("height"));
  if (node.kind === "line") { ctx.moveTo(n("x1"), n("y1")); ctx.lineTo(n("x2"), n("y2")); }
  if (node.kind === "polygon" || node.kind === "polyline") {
    const points = coordinates(a.points);
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i + 1 < points.length; i += 2) ctx.lineTo(points[i], points[i + 1]);
    if (node.kind === "polygon") ctx.closePath();
  }
  if (node.kind === "path" && a.d) {
    const key = String(a.d);
    path = vectorPaths.get(key);
    if (!path) { path = new Path2D(key); vectorPaths.set(key, path); }
  }
  if (fillColor !== "none" && node.kind !== "line") {
    ctx.fillStyle = fillColor;
    if (path) ctx.fill(path);
    else ctx.fill();
  }
  if (strokeColor && strokeColor !== "none") {
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = a.strokeLinecap === "round" ? "round" : "butt";
    ctx.lineJoin = a.strokeLinejoin === "round" ? "round" : "miter";
    ctx.lineWidth = Number(channel(node, "strokeWidth", time, n("strokeWidth") || 1));
    ctx.setLineDash(coordinates(a.strokeDasharray));
    ctx.lineDashOffset = Number(channel(node, "strokeDashoffset", time, n("strokeDashoffset")));
    if (path) ctx.stroke(path);
    else ctx.stroke();
  }
  ctx.restore();
}

function VectorLoader(p: { node: LoaderNode; time: number; ink: Ink }) {
  const [left, top, width, height] = coordinates(p.node.attributes?.viewBox);
  const size = (axis: "w" | "h", fallback: number) => {
    const unit = new RegExp(`(?:^|\\s)(?:${axis}|size)-(\\d+(?:\\.\\d+)?)(?:\\s|$)`).exec(p.node.classes ?? "");
    return unit ? Number(unit[1]) * 4 : fallback;
  };
  const w = size("w", Math.min(72, width || 40));
  const h = size("h", height ? w * height / width : w);
  return <Canvas style={{ width: w, height: h }} draw={ctx => {
    ctx.scale(w / (width || w), h / (height || h));
    ctx.translate(-(left || 0), -(top || 0));
    drawVector(ctx, p.node, p.time, p.ink, (left || 0) + (width || w) / 2, (top || 0) + (height || h) / 2);
  }} />;
}

export function LoaderViews(p: { node: LoaderNode; time: number; ink: Ink }) {
  if (p.node.kind === "svg") return <VectorLoader {...p} />;
  return <View class={p.node.classes} style={styleFor(p.node, p.time, p.ink)}>
    {p.node.children?.map(child => typeof child === "string"
      ? <Text style={{ color: p.ink.text }}>{child}</Text>
      : <LoaderViews node={child} time={p.time} ink={p.ink} />)}
  </View>;
}
