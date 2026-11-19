import { Canvas } from "nsh";
import type { Ink, Language } from "../model";
import { shapes } from "../morphRecipes";
import { MotionStage } from "./MotionStage";

export type ShapeRecipe = {
  duration: number; borderRadius: string[]; rotate?: number[];
  scale?: number[]; scaleX?: number[]; scaleY?: number[]; skewX?: number[]; skewY?: number[];
};
export const shapeNames = new Set(Object.keys(shapes));
const size = 48;
const side = size / 2;
const cubic = 0.5522847498;
type Corners = [number, number, number, number];

function expand(spec: string): Corners {
  const values = spec.trim().split(/\s+/).map(token => token.endsWith("%") ? parseFloat(token) * size / 100 : parseFloat(token));
  const [a, b = a, c = a, d = b] = values;
  return [a, b, c, d];
}

function radii(spec: string): Corners[] {
  const [horizontal, vertical = horizontal] = spec.split("/");
  const x = expand(horizontal), y = expand(vertical);
  const max = Math.max(size, x[0] + x[1], x[2] + x[3], y[0] + y[3], y[1] + y[2]);
  const normalized = (corners: Corners) => corners.map(value => value * size / max) as Corners;
  return [normalized(x), normalized(y)];
}

function segment(length: number, phase: number) {
  const place = phase * (length - 1);
  const index = Math.min(length - 2, Math.floor(place));
  return { index, alpha: (1 - Math.cos(Math.PI * (place - index))) / 2 };
}

function at(frames: number[] | undefined, phase: number, fallback: number) {
  if (!frames) return fallback;
  const { index, alpha } = segment(frames.length, phase);
  return frames[index] + (frames[index + 1] - frames[index]) * alpha;
}

export function ShapeMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const recipe = shapes[p.id];
  const corners = recipe.borderRadius.map(radii);
  const radians = (degree: number) => degree * Math.PI / 180;
  return <MotionStage label={p.label} ink={p.ink} language={p.language}>{time =>
    <Canvas style={{ width: 156, height: 100 }} draw={ctx => {
      const phase = (time() % (recipe.duration * 1000)) / (recipe.duration * 1000);
      const { index, alpha } = segment(corners.length, phase);
      const get = (axis: number) => corners[index][axis].map((value, i) => value + (corners[index + 1][axis][i] - value) * alpha);
      const [a, b, c, d] = get(0);
      const [e, f, g, h] = get(1);
      const overall = at(recipe.scale, phase, 1);
      ctx.translate(78, 50);
      ctx.rotate(radians(at(recipe.rotate, phase, 0)));
      ctx.transform(1, Math.tan(radians(at(recipe.skewY, phase, 0))), Math.tan(radians(at(recipe.skewX, phase, 0))), 1, 0, 0);
      ctx.scale(overall * at(recipe.scaleX, phase, 1), overall * at(recipe.scaleY, phase, 1));
      ctx.fillStyle = p.ink.accent;
      ctx.beginPath();
      ctx.moveTo(-side + a, -side);
      ctx.lineTo(side - b, -side);
      ctx.bezierCurveTo(side - b + b * cubic, -side, side, -side + f - f * cubic, side, -side + f);
      ctx.lineTo(side, side - g);
      ctx.bezierCurveTo(side, side - g + g * cubic, side - c + c * cubic, side, side - c, side);
      ctx.lineTo(-side + d, side);
      ctx.bezierCurveTo(-side + d - d * cubic, side, -side, side - h + h * cubic, -side, side - h);
      ctx.lineTo(-side, -side + e);
      ctx.bezierCurveTo(-side, -side + e - e * cubic, -side + a - a * cubic, -side, -side + a, -side);
      ctx.closePath();
      ctx.fill();
    }} />
  }</MotionStage>;
}
