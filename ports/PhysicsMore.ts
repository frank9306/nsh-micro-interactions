import type { CanvasRenderingContext2D } from "nsh";
import type { Ink } from "../model";

export const physicsMoreNames = new Set([
  "anim-prism-stack", "anim-modular-tile", "anim-pyramid-build", "anim-blind-pull", "anim-rotating-louvers", "anim-iris-shutter",
  "anim-bubble-level", "anim-kinetic-metronome", "anim-orbital-gimbal", "anim-gelatin-wobble", "anim-slinky-coil", "anim-squash-sphere",
  "anim-domino-chain", "anim-card-cascade", "anim-gear-step", "anim-magnetic-disks", "anim-dual-magnet", "anim-compass-deflect",
  "anim-sudden-brake", "anim-rolling-tumble", "anim-inertia-skid", "anim-neon-sign", "anim-page-turn", "anim-shutter-blocks",
  "anim-matrix-loader", "anim-apple-spinner", "anim-pulse-dots",
]);
const tau = Math.PI * 2;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => (1 - Math.cos(Math.PI * clamp(n))) / 2;
const elastic = (n: number) => {
  const x = clamp(n);
  return x === 0 || x === 1 ? x : 1 - Math.exp(-7 * x) * Math.cos(x * 12);
};

export function physicsMore(ctx: CanvasRenderingContext2D, id: string, time: number, ink: Ink) {
  const phase = time % 3000 / 3000;
  const pulse = Math.sin(phase * Math.PI) ** 2;
  const enter = smooth(phase / 0.36) * (1 - smooth((phase - 0.76) / 0.24));
  const { accent, muted, panel, background, border, tint, onAccent } = ink;
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  function disk(x: number, y: number, radius: number, color = accent) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, radius, 0, tau); ctx.fill();
  }
  function oval(x: number, y: number, rx: number, ry: number, lineWidth: number, color = accent) {
    ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
    ctx.beginPath(); ctx.ellipse(x, y, rx, Math.max(0.2, ry), 0, 0, tau); ctx.stroke();
  }
  function block(x: number, y: number, w: number, h: number, color = accent, radius = 4) {
    const r = Math.min(radius, w / 2, h / 2);
    ctx.fillStyle = color; ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.fill();
  }
  function polygon(points: number[][], color = accent) {
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
    ctx.closePath(); ctx.fill();
  }
  function line(points: number[][], color = accent, thick = 2) {
    ctx.strokeStyle = color; ctx.lineWidth = thick; ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (const [x, y] of points.slice(1)) ctx.lineTo(x, y);
    ctx.stroke();
  }
  function around(x: number, y: number, angle: number, draw: () => void) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(angle); draw(); ctx.restore();
  }
  function text(content: string, x: number, y: number, color = onAccent) {
    ctx.fillStyle = color; ctx.font = "700 13px sans-serif"; ctx.textAlign = "center"; ctx.fillText(content, x, y);
  }
  function timing(i: number, span = 0.49) {
    return elastic((phase - i * 0.048) / span) * (1 - smooth((phase - 0.80) / 0.20));
  }

  switch (id) {
    case "anim-prism-stack":
      for (let i = 0; i < 4; i++) {
        const rise = timing(i);
        const y = 108 - i * 18 - 96 * (1 - rise);
        ctx.globalAlpha = smooth((phase - i * 0.045) * 8);
        polygon([[70, y], [106, y - 14], [143, y], [106, y + 13]], i % 2 ? accent : muted);
        polygon([[70, y], [106, y + 13], [106, y + 25], [70, y + 12]], tint);
        polygon([[106, y + 13], [143, y], [143, y + 12], [106, y + 25]], border);
      }
      break;
    case "anim-modular-tile": {
      const positions = [[81, 42, -52, -22], [112, 42, 53, -32], [81, 74, -29, 32], [112, 74, 61, 28]];
      positions.forEach(([x, y, a, b], i) => {
        const stage = timing(i);
        block(x + a * (1 - stage), y + b * (1 - stage), 27, 27, i % 2 ? muted : accent, i % 2 ? 13 : 5);
      });
      break;
    }
    case "anim-pyramid-build": {
      const pieces = [[70, 101], [95, 101], [120, 101], [82, 78], [108, 78], [95, 55]];
      pieces.forEach(([x, y], i) => {
        const progress = timing(i);
        ctx.globalAlpha = clamp(progress);
        polygon([[x - 6, y + 10], [x + 9, y - 12 - (1 - progress) * 19], [x + 24, y + 10]], i % 2 ? muted : accent);
      });
      break;
    }
    case "anim-blind-pull":
    case "anim-rotating-louvers":
      block(55, 26, 101, 13, border);
      for (let i = 0; i < 6; i++) {
        const spread = id === "anim-blind-pull" ? enter : 1;
        const thickness = id === "anim-blind-pull" ? 5 : Math.max(1, Math.cos(enter * 1.31 - i * 0.065) * 8);
        block(57, 38 + i * 11 * spread, 97, thickness, i % 2 ? muted : accent);
      }
      if (id === "anim-blind-pull") { line([[160, 31], [160, 56 + enter * 38]], muted); disk(160, 58 + enter * 38, 4); }
      break;
    case "anim-iris-shutter":
      disk(105, 66, 52, border); disk(105, 66, 46, background);
      ctx.save(); ctx.beginPath(); ctx.arc(105, 66, 46, 0, tau); ctx.clip();
      for (let i = 0; i < 6; i++) around(105, 66, i * tau / 6 + enter * 0.56, () => {
        const hole = 6 + enter * 24;
        polygon([[hole, -11], [47, -39], [51, 43], [hole, 14]], i % 2 ? muted : accent);
      });
      ctx.restore();
      break;
    case "anim-bubble-level": {
      const tilt = Math.sin(phase * tau * 2) * (1 - phase) * 0.24;
      around(105, 67, tilt, () => {
        block(-64, -16, 128, 32, border, 17); block(-56, -10, 112, 20, tint, 10);
        line([[-17, -9], [-17, 9]], muted, 1); line([[17, -9], [17, 9]], muted, 1);
        block(-11 + 107 * tilt, -8, 22, 16, accent, 8);
      });
      break;
    }
    case "anim-kinetic-metronome":
      polygon([[75, 112], [93, 28], [118, 28], [137, 112]], border);
      around(105, 94, Math.sin(phase * tau * 2) * 0.62, () => {
        line([[0, 3], [0, -71]], accent, 3); block(-6, -49, 12, 11, muted, 3);
      });
      disk(105, 94, 6, accent);
      break;
    case "anim-orbital-gimbal":
      around(105, 66, phase * tau, () => {
        ctx.strokeStyle = accent; ctx.lineWidth = 3;
        const h = Math.cos(phase * tau) * 42;
        ctx.strokeRect(-39, -h, 78, 2 * h);
      });
      around(105, 66, -phase * tau, () => oval(0, 0, 34, Math.abs(Math.sin(phase * tau)) * 30 + 3, 3, muted));
      disk(105, 66, 7, accent);
      break;
    case "anim-gelatin-wobble":
    case "anim-squash-sphere": {
      const jelly = id === "anim-gelatin-wobble";
      const fall = Math.abs(Math.sin(phase * Math.PI * 3)) * (1 - phase * 0.69);
      line([[71, 112], [140, 112]], border);
      ctx.save();
      ctx.translate(105, 87 - 52 * fall); ctx.scale(1.25 - 0.29 * fall, 0.74 + 0.42 * fall);
      if (jelly) block(-22, -22, 44, 44, accent, 8);
      else disk(0, 0, 21);
      ctx.restore();
      break;
    }
    case "anim-slinky-coil":
      for (let i = 0; i < 11; i++) {
        const x = 105 + (i - 5) * (3.7 + 9 * pulse);
        oval(x, 68 + 4 * Math.sin(i * 0.42 + phase * tau) * pulse, 7, 24, 2.3, i % 2 ? accent : muted);
      }
      break;
    case "anim-domino-chain":
      line([[23, 104], [187, 104]], border);
      for (let i = 4; i >= 0; i--) {
        around(44 + i * 28, 101, smooth((phase - i * 0.09) * 7) * 1.23 * (1 - smooth((phase - 0.84) / 0.16)), () => {
          block(-8, -39, 16, 39, i % 2 ? muted : accent);
          disk(0, -28, 2, onAccent); disk(0, -14, 2, onAccent);
        });
      }
      break;
    case "anim-card-cascade":
      for (let i = 0; i < 3; i++) around(105 + (i - 1) * enter * 38, 75 - (i % 2) * 11, (i - 1) * enter * 0.56, () => {
        block(-23, -34, 46, 63, i === 1 ? accent : muted, 7);
        block(-13, -22, 15, 8, border, 2); block(-13, 12, 27, 3, tint);
      });
      break;
    case "anim-gear-step":
      [0, 1].forEach(i => around(83 + i * 44, 66, phase * tau * (i ? -1 : 1) + i * Math.PI / 10, () => {
        const teeth = Array.from({ length: 40 }, (_, j) => {
          const a = tau * j / 40, r = j % 4 === 0 || j % 4 === 3 ? 21 : 28;
          return [Math.cos(a) * r, Math.sin(a) * r];
        });
        polygon(teeth, i ? muted : accent); disk(0, 0, 10, panel);
      }));
      break;
    case "anim-magnetic-disks":
    case "anim-dual-magnet": {
      const magnet = id === "anim-dual-magnet";
      for (let i = 0; i < 2; i++) {
        const x = 105 + (2 * i - 1) * (52 - 33 * pulse);
        ctx.save(); ctx.translate(x, 67); ctx.scale(1 + 0.14 * pulse, 1 - 0.09 * pulse);
        if (magnet) {
          block(-16, -14, 32, 28, i ? muted : accent);
          text(i ? "S" : "N", 0, 5);
        } else disk(0, 0, 19, i ? muted : accent);
        ctx.restore();
      }
      break;
    }
    case "anim-compass-deflect":
      disk(105, 66, 45, border); disk(105, 66, 42, panel);
      for (let i = 0; i < 8; i++) around(105, 66, i * tau / 8, () => line([[0, -35], [0, -39]], muted, 1));
      around(105, 66, Math.sin(phase * tau * 2.2) * Math.exp(-3 * phase) * 2 + 0.64, () => {
        polygon([[-6, 4], [0, -30], [6, 4]], accent); polygon([[-6, -4], [0, 25], [6, -4]], muted);
      });
      disk(105, 66, 4, tint);
      break;
    case "anim-sudden-brake":
    case "anim-rolling-tumble":
    case "anim-inertia-skid": {
      const moving = 42 + 122 * (1 - Math.pow(1 - clamp(phase * 1.55), 3));
      const recoil = Math.sin(18 * phase) * Math.exp(-3.4 * phase);
      line([[17, 103], [194, 103]], border);
      if (id === "anim-sudden-brake") {
        around(moving, 82, recoil * 0.24, () => {
          block(-24, -14, 49, 22, accent, 6); block(-8, -21, 20, 12, muted, 3);
          disk(-14, 10, 6, border); disk(16, 10, 6, border);
        });
      } else if (id === "anim-rolling-tumble") {
        const angle = phase * tau * 2.2;
        around(moving, 87 - 6 * Math.abs(Math.sin(angle * 2)), angle, () => block(-15, -15, 30, 30, accent, 4));
      } else {
        ctx.save(); ctx.translate(moving, 88); ctx.transform(1, 0, 0.36 * recoil, 1, 0, 0);
        block(-26, -14, 52, 28, muted, 5); ctx.restore();
        line([[moving - 67, 100], [moving - 31, 100]], accent, 1.5);
      }
      break;
    }
    case "anim-neon-sign": {
      const outline = [[42, 91], [62, 42], [87, 77], [108, 39], [132, 74], [157, 42], [173, 92]];
      line(outline, border, 3);
      const extent = enter * 6;
      const count = Math.floor(extent);
      const geometry = outline.slice(0, count + 1);
      if (count < 6) {
        const [x, y] = outline[count], [xx, yy] = outline[count + 1];
        geometry.push([x + (xx - x) * (extent - count), y + (yy - y) * (extent - count)]);
      }
      ctx.globalAlpha = 0.22; line(geometry, accent, 11);
      ctx.globalAlpha = 1; line(geometry, accent, 3);
      break;
    }
    case "anim-page-turn": {
      const lift = enter * 53;
      block(61, 31, 93, 72, border, 8);
      polygon([[62, 32], [153, 32], [153 - lift * 0.28, 101 - lift], [61, 101 - lift * 0.84]], tint);
      polygon([[61, 101 - lift * 0.84], [153 - lift * 0.28, 101 - lift], [142, 101 - 0.3 * lift], [69, 102]], muted);
      line([[77, 47], [125, 47]], accent, 3);
      break;
    }
    case "anim-shutter-blocks":
      for (let i = 0; i < 5; i++) {
        const width = 25 + timing(i) * 88;
        block(105 - width / 2, 32 + i * 14, width, 10, i % 2 ? muted : accent);
      }
      break;
    case "anim-matrix-loader":
      for (let i = 0; i < 4; i++) {
        ctx.globalAlpha = 0.22 + 0.78 * Math.max(0, Math.cos((phase - 0.19 * i) * tau));
        block(79 + (i % 2) * 29, 42 + Math.floor(i / 2) * 27, 22, 22, accent, 3);
      }
      break;
    case "anim-apple-spinner":
      for (let i = 0; i < 8; i++) {
        ctx.globalAlpha = 0.23 + 0.77 * ((Math.floor(phase * 24) + 8 - i) % 8) / 7;
        around(105, 66, i * Math.PI / 4, () => block(-2.5, -23, 5, 11, accent, 2));
      }
      break;
    case "anim-pulse-dots":
      for (let i = 0; i < 3; i++) {
        const pulse = 0.38 + 0.62 * Math.max(0, Math.cos(tau * (phase * 2 - i * 0.18)));
        ctx.globalAlpha = pulse;
        disk(84 + i * 21, 66, 5 + pulse * 2);
      }
      break;
  }
}
