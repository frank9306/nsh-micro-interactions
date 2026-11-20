import { Canvas, View } from "nsh";
import type { Ink, Language } from "../model";
import { MotionStage } from "./MotionStage";

export const specialLoaderNames = new Set(["apple-equalizer", "apple-unlock", "intersecting-rings",
  "liquid-dots", "magnetic-dots", "text-shimmer", "wave-physics-loader"]);
const tau = Math.PI * 2;
const cycle = (time: number, duration: number) => (time % duration) / duration;

export function LoaderSpecial(p: { id: string; label: string; ink: Ink; language: Language }) {
  return <MotionStage label={p.label} ink={p.ink} language={p.language}
    reducedPreview={{ time: 850, status: p.language === "zh" ? "正在加载…" : "Loading…" }}>{elapsed => {
    if (p.id === "intersecting-rings") return <View style={{ width: 120, height: 96, alignItems: "center", justifyContent: "center" }}>
      {[1, 2].map(i => <View style={{
        position: "absolute", width: 44, height: 44, borderRadius: 24, borderWidth: 3, borderColor: i === 1 ? p.ink.accent : p.ink.muted,
        transform: [{ perspective: 800 }, { rotateX: cycle(elapsed(), 2200) * (i === 1 ? 360 : 180) },
          { rotateY: cycle(elapsed(), 2200) * (i === 2 ? 360 : 180) }],
      }} />)}
    </View>;
    return <Canvas style={{ width: 208, height: 98 }} draw={ctx => {
      const time = elapsed();
      ctx.fillStyle = p.ink.accent;
      if (p.id === "liquid-dots" || p.id === "magnetic-dots") {
        const liquid = p.id === "liquid-dots";
        const shift = liquid ? 16 * Math.cos(cycle(time, 2000) * tau) : 13 + 8 * Math.cos(cycle(time, 1500) * tau);
        const sigma = liquid ? 10.3 : 8.0;
        const full = liquid ? 35 : 29;
        for (let y = -20; y < 20; y++) {
          for (let x = -full; x < full; x++) {
            const field = Math.exp(-((x - shift) ** 2 + y ** 2) / (2 * sigma ** 2))
              + Math.exp(-((x + shift) ** 2 + y ** 2) / (2 * sigma ** 2));
            if (field > 0.54) ctx.fillRect(104 + x, 49 + y, 1, 1);
          }
        }
        return;
      }
      if (p.id === "apple-equalizer") {
        for (let i = 0; i < 4; i++) {
          const offset = [0, 341, 128, 437][i];
          const f = cycle(Math.max(0, time - offset), 800);
          const ball = Math.sin(Math.PI * f);
          const h = 6 + 26 * (1 - Math.sqrt(Math.max(0, 1 - ball ** 2)));
          ctx.fillRect(89 + i * 9, 70 - h, 6, h);
        }
        return;
      }
      if (p.id === "apple-unlock" || p.id === "text-shimmer") {
        const instruction = p.id === "apple-unlock";
        const english = instruction ? "Slide to unlock" : "Thinking";
        const title = p.language === "zh" ? (instruction ? "滑动解锁" : "思考中") : english;
        const x = -56 + 310 * cycle(time, instruction ? 2200 : 1500);
        const gradient = ctx.createLinearGradient(x - 49, 0, x + 49, 0);
        gradient.addColorStop(0, p.ink.muted);
        gradient.addColorStop(0.5, p.ink.text);
        gradient.addColorStop(1, p.ink.muted);
        ctx.fillStyle = gradient;
        ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "600 19px sans-serif";
        ctx.fillText(title, 104, 49);
        return;
      }
      const fraction = 1 - Math.abs(1 - 2 * cycle(time, 4400));
      const ballIndex = fraction * 14;
      const bounce = (fraction * 4) % 1;
      const bounceHeight = 4 * bounce * (1 - bounce);
      const indentation = Math.max(0, 1 - bounceHeight * 2);
      for (let i = 0; i < 15; i++) {
        const distance = Math.abs(i - ballIndex);
        const wave = distance < 3 ? Math.cos(distance * Math.PI / 6) : 0;
        const dent = distance < 1.5 ? Math.cos(distance * Math.PI / 3) * indentation * 20 : 0;
        const h = 0.49 * Math.max(4, 16 + wave * 48 - dent);
        ctx.fillStyle = wave > 0.57 ? p.ink.accent : p.ink.border;
        ctx.fillRect(32 + i * 10, 86 - h, 6, h);
      }
      ctx.fillStyle = p.ink.accent;
      ctx.translate(35 + ballIndex * 10, 83 - 0.49 * (64 - 20 * indentation + bounceHeight * 60));
      ctx.scale(1 + indentation * 0.25, 1 - indentation * 0.3);
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, tau); ctx.fill();
    }} />;
  }}</MotionStage>;
}
