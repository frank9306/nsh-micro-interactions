import { Canvas, Text, View, cleanup, effect, reduceMotion, signal } from "nsh";
import { Button } from "nsh/base";
import type { Ink, Language } from "../model";
import { phrases } from "../strings";

type Dots = { duration: number; delay: number; count?: number; opacity?: number; jump?: number; squeeze?: boolean; grid?: boolean };
const dots: Record<string, Dots> = {
  "pulse-dots": { duration: 1400, delay: 200, opacity: 0.2 },
  "bounce-dots": { duration: 600, delay: 100, jump: 8 },
  "fade-dots": { duration: 1500, delay: 200, opacity: 0 },
  "wave-dots": { duration: 1000, delay: 150, count: 5, jump: 8 },
  "bobbing-dots": { duration: 1200, delay: 150, jump: 10 },
  "bouncing-dots": { duration: 800, delay: 100, jump: 20, squeeze: true },
  "grid-dots": { duration: 1500, delay: 200, opacity: 0.3, count: 9, grid: true },
};
export const loaderNames = new Set([...Object.keys(dots), "classic-spinner", "ios-spinner", "skeleton-loader",
  "pulse-dot", "triple-dot-spinner", "square-spinner", "line-spinner", "accordion-loader", "bar-sweep", "bar-cascade", "breathe-ring", "concentric-pulse"]);

const turn = Math.PI * 2;
const wave = (t: number, period: number) => (1 - Math.cos(turn * t / period)) / 2;
const phase = (t: number, period: number) => ((t % period) + period) % period / period;

export function LoaderMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const pause = signal(false);
  const elapsed = signal(0);
  const words = () => phrases[p.language];
  effect(() => {
    if (pause() || reduceMotion()) return;
    const clock = setInterval(() => elapsed.update(t => t + 1000 / 30), 1000 / 30);
    cleanup(() => clearInterval(clock));
  });
  return <View style={{ gap: 11, alignItems: "center" }}>
    <Canvas accessibilityLabel={p.label} style={{ width: 176, height: 94 }} draw={ctx => {
      const t = elapsed();
      const id = p.id;
      const fill = p.ink.accent;
      ctx.translate(88, 47);
      ctx.fillStyle = fill;
      ctx.strokeStyle = fill;
      ctx.lineCap = "round";
      function dot(x: number, y: number, radius: number, opacity = 1, squeeze = 1) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(x, y);
        ctx.scale(1, squeeze);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, turn);
        ctx.fill();
        ctx.restore();
      }
      function capsule(x: number, y: number, width: number, height: number, opacity = 1) {
        ctx.globalAlpha = opacity;
        ctx.fillRect(x, y, width, height);
        ctx.globalAlpha = 1;
      }
      const recipe = dots[id];
      if (recipe) {
        for (let i = 0; i < (recipe.count ?? 3); i++) {
          const lag = (recipe.grid ? i % 3 + Math.floor(i / 3) : i) * recipe.delay;
          const w = wave(t - lag, recipe.duration);
          const x = recipe.grid ? (i % 3 - 1) * 13 : (i - ((recipe.count ?? 3) - 1) / 2) * 16;
          const y = recipe.grid ? (Math.floor(i / 3) - 1) * 13 : -(recipe.jump ?? 0) * w;
          dot(x, y, recipe.grid ? 4.5 - 2.25 * w : 4.5,
            recipe.opacity === undefined ? 1 : recipe.opacity + (1 - recipe.opacity) * w, recipe.squeeze ? 0.8 + 0.3 * w : 1);
        }
        return;
      }
      if (id === "skeleton-loader") {
        ctx.fillStyle = p.ink.muted;
        dot(-55, -11, 12, 0.3 + 0.35 * wave(t, 1500));
        capsule(-31, -17, 60, 5, 0.25 + 0.35 * wave(t - 200, 1500));
        capsule(-31, -7, 84, 4, 0.25 + 0.35 * wave(t - 400, 1500));
        capsule(-67, 13, 112, 5, 0.25 + 0.35 * wave(t - 600, 1500));
      } else if (id === "classic-spinner" || id === "ios-spinner") {
        for (let i = 0; i < 12; i++) {
          ctx.save();
          ctx.rotate(i * turn / 12);
          capsule(-1.2, -18, 2.4, 7, 1 - 0.8 * phase(t - i * (1000 / 12), 1000));
          ctx.restore();
        }
      } else if (id === "triple-dot-spinner") {
        ctx.rotate(turn * phase(t, 2000));
        for (let i = 0; i < 3; i++) {
          const angle = i * turn / 3;
          dot(14 * Math.cos(angle), 14 * Math.sin(angle), 3.5);
        }
      } else if (id === "square-spinner") {
        ctx.rotate(turn * wave(t, 1200) / 4);
        capsule(-12, -12, 24, 24);
      } else if (id === "line-spinner" || id === "breathe-ring" || id === "concentric-pulse") {
        const count = id === "concentric-pulse" ? 3 : 1;
        for (let i = 0; i < count; i++) {
          const w = wave(t, 3000);
          const f = phase(t - i * 600, 2000);
          const angle = id === "line-spinner" ? turn * phase(t, 1200) : 0;
          const radius = id === "breathe-ring" ? 14 + w * 5 : id === "line-spinner" ? 15 : 5 + f * 20;
          ctx.lineWidth = id === "breathe-ring" ? 6 - 4 * w : 2.6;
          ctx.globalAlpha = count === 3 ? 1 - f : 1;
          ctx.beginPath();
          ctx.arc(0, 0, radius, angle, angle + (id === "line-spinner" ? turn * 0.77 : turn));
          ctx.stroke();
        }
      } else if (id === "pulse-dot") {
        const f = phase(t, 1500);
        dot(0, 0, 4);
        dot(0, 0, f * 17 + 1, 0.8 * (1 - f));
      } else if (id === "accordion-loader") {
        for (let i = 0; i < 3; i++) {
          const width = 38 * (1 - wave(t - i * 150, 1500) * 0.8);
          capsule(-width / 2, i * 8 - 9, width, 4);
        }
      } else if (id === "bar-sweep") {
        capsule(-28, -3, 56, 6, 0.19);
        capsule(-28 + wave(t, 1500) * 26, -3, 30, 6);
      } else if (id === "bar-cascade") {
        for (let i = 0; i < 5; i++) {
          const height = 8 + wave(t - i * 100, 1000) * 16;
          capsule(i * 9 - 20, -height / 2, 5, height);
        }
      }
    }} />
    <Button accessibilityLabel={pause() ? words().resume : words().pause} onPress={() => pause.update(value => !value)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineColor: p.ink.accent, outlineWidth: 2 }}
      style={{ minHeight: 33, paddingHorizontal: 13, borderRadius: 16, backgroundColor: p.ink.panel }}>
      <Text style={{ color: p.ink.text, fontSize: 13 }}>{pause() ? words().resume : words().pause}</Text>
    </Button>
  </View>;
}
