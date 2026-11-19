import { Button } from "nsh/base";
import { Canvas, reduceMotion, signal, type CanvasRenderingContext2D } from "nsh";
import type { Ink, Language } from "../model";
import { MotionStage } from "./MotionStage";
import { physicsMore, physicsMoreNames } from "./PhysicsMore";

export const physicsNames = new Set(["anim-card-peel", "anim-bookmark-corner", "anim-elastic-tag", "anim-split-gate",
  "anim-shutter-slide", "anim-origami-envelope", "anim-card-dispenser", "anim-sticky-note", "anim-receipt-tape",
  "anim-circuit-trace", "anim-hex-lattice", "anim-stroke-waveform", "anim-roller-blind", "anim-scroll-canvas",
  "anim-ribbon-banner", "anim-tension-capsule", "anim-droplet-squish", "anim-segmented-link", ...physicsMoreNames]);
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => (1 - Math.cos(Math.PI * clamp(x))) / 2;
const tau = 2 * Math.PI;

function paint(ctx: CanvasRenderingContext2D, id: string, elapsed: number, ink: Ink) {
  const phase = (elapsed % 3000) / 3000;
  const progress = smooth(phase / 0.36) * (1 - smooth((phase - 0.72) / 0.28));
  const snap = progress + 0.12 * Math.sin(23 * phase) * Math.exp(-5 * phase) * progress;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  function polygon(points: number[][], fill: string) {
    ctx.fillStyle = fill; ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
    ctx.closePath(); ctx.fill();
  }
  function box(x: number, y: number, w: number, h: number, radius: number, fill: string) {
    const r = Math.min(radius, w / 2, h / 2);
    ctx.fillStyle = fill;
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath(); ctx.fill();
  }
  function line(points: number[][], color: string, thick = 2, drawn = 1) {
    if (drawn <= 0) return;
    const lengths = points.slice(1).map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
    let remaining = lengths.reduce((sum, value) => sum + value, 0) * drawn;
    ctx.strokeStyle = color; ctx.lineWidth = thick; ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 0; i < lengths.length && remaining > 0; i++) {
      const [x, y] = points[i], [xx, yy] = points[i + 1];
      const share = lengths[i] > 0 ? Math.min(1, remaining / lengths[i]) : 1;
      ctx.lineTo(x + (xx - x) * share, y + (yy - y) * share);
      remaining -= lengths[i];
    }
    ctx.stroke();
  }
  const dot = (x: number, y: number, r: number, fill: string) => {
    ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, r, 0, tau); ctx.fill();
  };
  const note = (x: number, y: number, w: number, h: number, main: string) => {
    box(x, y, w, h, 8, main);
    box(x + 10, y + 10, w * 0.38, 4, 2, ink.accent);
    box(x + 10, y + 19, w * 0.64, 3, 1.5, ink.muted);
  };

  if (id === "anim-card-peel" || id === "anim-bookmark-corner" || id === "anim-sticky-note") {
    const sticky = id === "anim-sticky-note";
    if (id === "anim-bookmark-corner") {
      const peel = progress * 34;
      box(46, 30, 114, 70, 10, ink.border);
      polygon([[46, 30], [160 - peel, 30], [160, 30 + peel], [160, 100], [46, 100]], ink.panel);
      polygon([[160 - peel, 30], [160 - peel / 2, 30 + peel * 0.7], [160, 30 + peel]], ink.accent);
      box(58, 49, 41, 5, 3, ink.accent); box(58, 61, 62, 3, 2, ink.muted);
    } else {
      const base = sticky ? "#dbb572" : ink.tint;
      if (sticky) box(56, 42, 100, 60, 7, "#866647");
      else note(52, 34, 106, 67, ink.border);
      const edge = progress * 59, width = progress * 9;
      const y = sticky ? 40 : 33;
      polygon([[52, y], [158, y], [158 - width, y + 67 - edge], [52 + width, y + 67 - edge]], base);
      polygon([[52 + width, y + 67 - edge], [158 - width, y + 67 - edge], [151, y + 67 - 0.65 * edge], [60, y + 67 - 0.65 * edge]], ink.accent);
    }
    return;
  }
  if (id === "anim-split-gate" || id === "anim-shutter-slide" || id === "anim-origami-envelope") {
    box(42, 29, 126, 75, 11, ink.border);
    if (id === "anim-origami-envelope") {
      box(48, 36, 114, 65, 7, ink.tint);
      note(67, 48 - progress * 20, 76, 45, ink.panel);
      polygon([[49, 39], [103, 73], [163, 39], [163, 100], [49, 100]], ink.border);
      polygon([[49, 39], [163, 39], [105, 39 + (1 - progress * 1.82) * 36]], ink.accent);
    } else {
      dot(105, 66, 18, ink.accent);
      line([[96, 66], [103, 73], [116, 58]], ink.onAccent, 2.5);
      const vertical = id === "anim-split-gate";
      ctx.save(); ctx.beginPath(); ctx.rect(42, 29, 126, 75); ctx.clip();
      if (vertical) {
        box(43 - progress * 55, 30, 62, 73, 6, ink.panel);
        box(106 + progress * 55, 30, 61, 73, 6, ink.panel);
        line([[97 - progress * 55, 56], [97 - progress * 55, 75]], ink.muted);
        line([[114 + progress * 55, 56], [114 + progress * 55, 75]], ink.muted);
      } else {
        box(43, 30 - progress * 35, 124, 35, 6, ink.panel);
        box(43, 66 + progress * 35, 124, 37, 6, ink.panel);
      }
      ctx.restore();
    }
    return;
  }
  if (id === "anim-card-dispenser" || id === "anim-receipt-tape") {
    const receipt = id === "anim-receipt-tape";
    const top = receipt ? 40 : 92;
    ctx.save(); ctx.beginPath(); ctx.rect(47, receipt ? top : 10, 115, receipt ? 107 : top - 9); ctx.clip();
    const y = receipt ? top - 84 + Math.round(progress * 6) * 13 : top - 69 * snap;
    note(68, y, 74, receipt ? 90 : 67, receipt ? "#ded2bc" : ink.tint);
    if (receipt) for (let i = 0; i < 4; i++) box(78, y + 36 + i * 9, 37 + (i % 2) * 11, 2, 1, "#806a4f");
    ctx.restore();
    box(49, top - 6, 113, 18, 7, ink.border);
    box(60, top - 2, 91, 4, 2, ink.background);
    return;
  }
  if (id === "anim-circuit-trace" || id === "anim-hex-lattice" || id === "anim-stroke-waveform") {
    const drawn = smooth(phase / 0.51);
    ctx.globalAlpha = 0.23 + 0.77 * (1 - smooth((phase - 0.81) / 0.19));
    if (id === "anim-circuit-trace") {
      const geometry = [[26, 84], [61, 84], [80, 55], [128, 55], [146, 37], [183, 37]];
      line(geometry, ink.border, 3); line(geometry, ink.accent, 3, drawn);
      dot(26, 84, 4, ink.accent);
      if (drawn > 0.98) dot(183, 37, 6 + 2 * Math.sin(phase * tau * 3), ink.accent);
    } else if (id === "anim-hex-lattice") {
      [[105, 63], [74, 63], [136, 63], [89, 37], [121, 37], [89, 89], [121, 89]].forEach(([x, y], i) => {
        const path = Array.from({ length: 7 }, (_, j) => [x + 17 * Math.cos(j * Math.PI / 3), y + 17 * Math.sin(j * Math.PI / 3)]);
        line(path, ink.accent, 2, clamp(drawn * 1.7 - i * 0.11));
      });
    } else {
      const path = [[24, 72], [55, 72], [65, 54], [74, 87], [89, 38], [102, 97], [114, 62], [127, 73], [182, 73]];
      line(path, ink.border, 2); line(path, ink.accent, 2.5, drawn);
    }
    ctx.globalAlpha = 1;
    return;
  }
  if (id === "anim-roller-blind" || id === "anim-scroll-canvas" || id === "anim-ribbon-banner") {
    if (id === "anim-roller-blind") {
      const h = 8 + 64 * snap;
      box(59, 35, 92, h, 4, ink.tint);
      for (let y = 39; y < 32 + h; y += 7) line([[61, y], [149, y]], ink.border, 1);
      box(54, 30, 102, 11, 5, ink.muted);
      box(58, 30 + h, 94, 6, 3, ink.accent);
    } else if (id === "anim-scroll-canvas") {
      const w = 28 + progress * 103;
      box(105 - w / 2, 36, w, 58, 5, "#d8ba85");
      box(99 - w / 2, 33, 10, 64, 4, "#8a6648");
      box(101 + w / 2, 33, 10, 64, 4, "#8a6648");
      if (progress > 0.5) for (let i = 0; i < 3; i++) box(83, 51 + i * 9, 39 + 7 * (i % 2), 3, 1, "#95754d");
    } else {
      const w = 28 + progress * 110;
      polygon([[105 - w / 2, 52], [105 + w / 2, 52], [112 + w / 2, 68],
        [105 + w / 2, 84], [105 - w / 2, 84], [112 - w / 2, 68]], ink.accent);
      if (progress > 0.55) box(87, 65, 39, 5, 3, ink.onAccent);
    }
    return;
  }
  if (id === "anim-elastic-tag") {
    const yy = 27 + 31 * snap;
    line([[105, 20], [105 - Math.sin(phase * tau) * 5, yy + 7]], ink.muted, 2);
    box(82, yy, 47, 47, 8, ink.accent);
    dot(105, yy + 8, 3.5, ink.background);
    box(91, yy + 22, 28, 3, 2, ink.onAccent);
  } else if (id === "anim-droplet-squish") {
    const bounce = Math.abs(Math.sin(3.4 * phase * Math.PI)) * (1 - phase * 0.54);
    ctx.save(); ctx.translate(105, 91 - 44 * bounce); ctx.scale(1.24 - bounce * 0.32, 0.78 + bounce * 0.34);
    dot(0, 0, 20, ink.accent); ctx.restore();
    line([[73, 109], [137, 109]], ink.border, 2);
  } else if (id === "anim-segmented-link") {
    for (let i = 0; i < 4; i++) {
      const x = 105 + (i - 1.5) * (22 + snap * 16);
      box(x - 14, 49 + Math.sin(i + phase * 4) * 4 * progress, 28, 28, 13, i % 2 ? ink.accent : ink.tint);
    }
  } else {
    const half = 27 + 34 * snap, h = 35 - 7 * progress;
    box(105 - half, 67 - h / 2, half * 2, h, h / 2, ink.accent);
    dot(105 - half * 0.45, 67, 4, ink.onAccent);
    dot(105 + half * 0.45, 67, 4, ink.onAccent);
  }
}

export function PhysicsMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const origin = signal(0);
  return <MotionStage label={p.label} ink={p.ink} language={p.language}>{time =>
    <Button accessibilityLabel={p.language === "zh" ? "重播动效" : "Replay motion"} onPress={() => origin.set(time())}
      onMouseEnter={() => origin.set(time())}
      focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }} class="focus-visible:outline-2"
      style={{ borderRadius: 13 }}>
      <Canvas style={{ width: 210, height: 131 }} draw={ctx => {
        const elapsed = reduceMotion() ? 1500 : Math.max(0, time() - origin());
        if (physicsMoreNames.has(p.id)) physicsMore(ctx, p.id, elapsed, p.ink);
        else paint(ctx, p.id, elapsed, p.ink);
      }} />
    </Button>
  }</MotionStage>;
}
