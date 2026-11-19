import { Text, View, type ViewStyle } from "nsh";
import type { Ink } from "../model";

type Frame = number | string;
type Channel = "x" | "y" | "scale" | "scaleX" | "scaleY" | "rotate" | "rotateX" | "rotateY"
  | "opacity" | "width" | "height" | "borderWidth" | "borderRadius" | "backgroundColor";
type Timing = { duration?: number; repeat?: number | "infinite"; repeatType?: string; delay?: number;
  ease?: string; times?: number[]; repeatDelay?: number };
export type LoaderNode = {
  classes?: string;
  style?: ViewStyle & { background?: string };
  animation?: Partial<Record<Channel, Frame | Frame[]>>;
  initial?: Partial<Record<Channel, Frame>>;
  timing?: Timing;
  children?: (LoaderNode | string)[];
};

function curve(value: number, ease?: string) {
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
  const between = curve(Math.max(0, Math.min(1, (phase - marks[upper - 1]) / span)), timing.ease);
  const current = frames[upper - 1];
  const next = frames[upper];
  const unit = typeof current === "string" && current.endsWith("%") || typeof next === "string" && next.endsWith("%") ? "%" : "";
  const a = parseFloat(String(current));
  const b = parseFloat(String(next));
  const value = a + (b - a) * between;
  return unit ? value + unit : value;
}

function styleFor(node: LoaderNode, time: number, ink: Ink): ViewStyle {
  const { background, ...staticStyle } = node.style ?? {};
  const style: ViewStyle = { ...staticStyle };
  const classes = node.classes?.split(/\s+/) ?? [];
  if (classes.includes("flex") && !classes.includes("flex-col")) style.flexDirection = "row";
  const space = /(?:^|\s)space-[xy]-(\d+(?:\.\d+)?)(?:\s|$)/.exec(node.classes ?? "");
  if (space) style.gap = Number(space[1]) * 4;
  if (background) {
    if (background.includes("gradient(")) style.backgroundImage = background;
    else style.backgroundColor = background;
  }
  if (classes.some(value => /^(?:dark:)?bg-(?:white|black|zinc-\d+|neutral-\d+)$/.test(value))) {
    style.backgroundColor = classes.some(value => /^bg-(?:zinc|neutral)-[123]00$/.test(value)) ? ink.border : ink.accent;
  }
  if (!node.animation) return style;
  const timing = node.timing ?? {};
  const point = fraction(timing, time);
  const transforms: NonNullable<ViewStyle["transform"]> = [];
  const position: [number | string, number | string] = [0, 0];
  for (const [key, frame] of Object.entries(node.animation)) {
    const fallback = key.startsWith("scale") || key === "opacity" ? 1 : 0;
    const frames = Array.isArray(frame) ? frame : [node.initial?.[key as Channel] ?? fallback, frame];
    const value = sample(frames, point, timing);
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

export function LoaderViews(p: { node: LoaderNode; time: number; ink: Ink }) {
  return <View class={p.node.classes} style={styleFor(p.node, p.time, p.ink)}>
    {p.node.children?.map(child => typeof child === "string"
      ? <Text style={{ color: p.ink.text }}>{child}</Text>
      : <LoaderViews node={child} time={p.time} ink={p.ink} />)}
  </View>;
}
