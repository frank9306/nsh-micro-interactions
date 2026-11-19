import { Button, Progress } from "nsh/base";
import { Canvas, Scroll, Text, View, createAnimatedValue, reduceMotion, signal, type MouseEvent } from "nsh";
import type { Ink, Language } from "../model";

export const primitiveNames = new Set(["card-hover", "cursor-trail", "glow-button", "magnetic-button", "mouse-follow",
  "page-transition", "progress-indicator", "scroll-reveal", "spotlight", "sticky-reveal", "tilt-card"]);
const spring = { stiffness: 340, damping: 27 };
const constrain = (n: number) => Math.max(0, Math.min(1, n));

export function PrimitiveMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const zh = () => p.language === "zh";
  const x = createAnimatedValue(0), y = createAnimatedValue(0);
  const amount = createAnimatedValue(0);
  const percent = signal(0);
  const page = signal(0);
  const trace = signal<{ x: number; y: number }[]>([]);
  const location = signal({ x: 98, y: 51 });
  const inside = signal(false);
  const theme = () => ({ color: p.ink.text, fontSize: 14, fontWeight: "650" as const });
  const ring = () => ({ outlineWidth: 2, outlineColor: p.ink.accent, outlineOffset: 2 });
  function move(value: typeof x, next: number) {
    if (reduceMotion()) value.set(next);
    else void value.spring(next, spring);
  }
  function track(event: MouseEvent) {
    const point = event.position;
    inside.set(true);
    location.set(point);
    if (p.id === "cursor-trail") trace.update(items => [...items.slice(-17), point]);
  }
  if (["cursor-trail", "mouse-follow", "spotlight"].includes(p.id)) {
    return <View onMouseEnter={track} onMouseMove={track}
      onMouseLeave={() => { inside.set(false); trace.set([]); }}
      style={{ width: 200, height: 104, overflow: "hidden", backgroundColor: p.ink.panel, borderRadius: 14, borderWidth: 1, borderColor: p.ink.border }}>
      <Canvas accessibilityLabel={p.label} style={{ width: 200, height: 104 }} draw={ctx => {
        if (!inside()) return;
        const point = location();
        if (p.id === "spotlight") {
          const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 75);
          glow.addColorStop(0, p.ink.accent);
          glow.addColorStop(1, "#8a73ea00");
          ctx.fillStyle = glow; ctx.globalAlpha = 0.65; ctx.fillRect(0, 0, 200, 104);
          return;
        }
        const points = p.id === "cursor-trail" && !reduceMotion() ? trace() : [point];
        ctx.fillStyle = p.ink.accent;
        points.forEach(({ x, y }, i) => {
          ctx.beginPath(); ctx.globalAlpha = (i + 1) / points.length;
          ctx.arc(x, y, p.id === "mouse-follow" ? 9 : (i + 2) * 0.45, 0, 2 * Math.PI); ctx.fill();
        });
      }} />
    </View>;
  }
  if (["progress-indicator", "scroll-reveal", "sticky-reveal"].includes(p.id)) {
    const blocks = zh() ? ["交互", "布局", "动效", "响应"] : ["Interaction", "Layout", "Motion", "Response"];
    const marker = () => Math.min(3, Math.floor(percent() / 25));
    return <View style={{ width: "100%", maxWidth: 320, gap: 7 }}>
      <If when={p.id === "progress-indicator"}><Progress accessibilityLabel={zh() ? "滚动进度" : "Scroll progress"} value={percent()}
        trackStyle={{ height: 4, borderRadius: 3, backgroundColor: p.ink.border }}
        indicatorStyle={{ height: 4, borderRadius: 3, backgroundColor: p.ink.accent }} /></If>
      <View style={{ flexDirection: "row", gap: 7, height: 136, borderRadius: 11 }}>
        <Scroll onScroll={({ offset, contentSize, size }) => percent.set(Math.round(constrain(offset.y / Math.max(1, contentSize.height - size.height)) * 100))}
          style={{ flex: 1, backgroundColor: p.ink.panel, borderRadius: 9 }}>
          <View style={{ padding: 6, gap: 5 }}>{blocks.map((text, i) => <View style={{
            height: 80, padding: 10, justifyContent: "center", borderRadius: 8, borderWidth: 1, borderColor: p.ink.border,
            opacity: p.id === "scroll-reveal" && !reduceMotion() ? Math.max(0.22, 1 - Math.abs(percent() - i * 30) / 66) : 1,
            transform: p.id === "scroll-reveal" && !reduceMotion() ? [{ translateY: Math.min(9, Math.abs(percent() - i * 30) / 6) }] : [],
          }}><Text style={theme()}>{text}</Text></View>)}</View>
        </Scroll>
        <If when={p.id === "sticky-reveal"}><View style={{ width: 110, borderRadius: 9, alignItems: "center",
          justifyContent: "center", backgroundColor: p.ink.tint }}>
          <Text style={theme()}>{blocks[marker()]}</Text>
        </View></If>
      </View>
      <Text style={{ ...theme(), color: p.ink.muted, fontSize: 12 }}>{zh() ? "在框内滚动" : "Scroll inside the panel"}</Text>
    </View>;
  }
  if (p.id === "page-transition") {
    return <Button accessibilityLabel={zh() ? "切换示例页面" : "Switch sample page"}
      onPress={() => {
        page.update(value => 1 - value);
        if (!reduceMotion()) { amount.set(0); void amount.keyframes([0, 1], { duration: 820, easing: "easeInOut" }); }
      }}
      class="focus-visible:outline-2" focusVisibleStyle={ring()}
      style={{ width: 192, height: 106, overflow: "hidden", alignItems: "center", justifyContent: "center", borderRadius: 13, backgroundColor: p.ink.panel }}>
      <Text style={theme()}>{zh() ? `第 ${page() + 1} 页` : `Page ${page() + 1}`}</Text>
      {Array.from({ length: 5 }, (_, i) => {
        const start = i * 0.07;
        const travel = amount.interpolate({ inputRange: [start, start + 0.37, start + 0.7], outputRange: [115, 0, -115] });
        return <View style={{ position: "absolute", top: 0, height: 108, width: 40, left: 38 * i,
          backgroundColor: p.ink.accent, translate: [0, travel], pointerEvents: "none" }} />;
      })}
    </Button>;
  }
  const magnetic = p.id === "magnetic-button", glow = p.id === "glow-button", tilt = p.id === "tilt-card";
  function pointer(e: MouseEvent) {
    const target = e.position;
    if (magnetic) { move(x, (target.x - 70) * 0.21); move(y, (target.y - 23) * 0.28); }
    if (tilt) { move(x, (target.x - 92) * 0.15); move(y, (58 - target.y) * 0.22); }
  }
  const lift = amount.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  return <Button accessibilityLabel={p.label} onMouseEnter={() => { inside.set(true); move(amount, 1); }}
    onMouseLeave={() => { inside.set(false); move(amount, 0); move(x, 0); move(y, 0); }}
    onMouseMove={pointer} onPress={() => { inside.update(value => !value); move(amount, Number(inside())); }}
    class="focus-visible:outline-2" focusVisibleStyle={ring()}
    style={{ width: magnetic || glow ? 140 : 184, height: magnetic || glow ? 46 : 112, alignItems: "center", justifyContent: "center",
      backgroundColor: glow && inside() ? p.ink.tint : p.ink.panel, borderRadius: glow || magnetic ? 24 : 17, borderWidth: 1,
      borderColor: inside() ? p.ink.accent : p.ink.border,
      boxShadow: glow && inside() ? `0 0 23px ${p.ink.accent}` : inside() ? "0 12px 20px #18123554" : undefined,
      transform: tilt ? [{ perspective: 640 }, { rotateX: y }, { rotateY: x }] : magnetic ? [{ translateX: x }, { translateY: y }] : [{ translateY: glow ? 0 : lift }],
    }}>
    <Text style={theme()}>{p.label}</Text>
  </Button>;
}
