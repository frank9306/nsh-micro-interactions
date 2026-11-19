import { Button, Input } from "nsh/base";
import { Canvas, Path2D, Text, View, cleanup, createAnimatedValue, reduceMotion, signal, type ViewStyle } from "nsh";
import type { Ink, Language } from "../model";
import { Glyph } from "./ButtonMotion";
import { MotionStage } from "./MotionStage";

export const actionMorphNames = new Set(["add-to-cart-morph", "play-pause-morph", "search-expand", "shapes-heart-morph"]);
const row: ViewStyle = { flexDirection: "row", alignItems: "center", gap: 8 };
const spring = { stiffness: 410, damping: 27 };
const characters = [
  { x: 31, y: 37, color: "#9333ea", d: "M50 10L63 28H88L71 47L78 72L53 58L28 73L34 48L14 31L38 30Z", eyes: [43, 57, 42] },
  { x: 113, y: 39, color: "#ef4444", d: "M14 50A36 36 0 1 0 86 50A36 36 0 1 0 14 50Z", eyes: [42, 58, 48] },
  { x: 32, y: 93, color: "#3b82f6", d: "M28 58A16 16 0 0 1 42 32A22 22 0 0 1 72 35A16 16 0 0 1 86 58A14 14 0 0 1 76 74H26A14 14 0 0 1 28 58Z", eyes: [47, 61, 54] },
  { x: 107, y: 96, color: "#71717a", d: "M50 16C50 16 22 50 22 66A28 28 0 0 0 78 66C78 50 50 16 50 16Z", eyes: [42, 58, 64] },
  { x: 70, y: 28, color: "#f97316", d: "M50 18L82 74A7 7 0 0 1 76 82H24A7 7 0 0 1 18 74Z", eyes: [43, 57, 62] },
].map(item => ({ ...item, path: new Path2D(item.d) }));
const heart = new Path2D("M50 81C42 74 14 56 14 37C14 16 39 13 50 29C62 13 86 17 86 38C86 55 62 75 50 81Z");

export function ActionMorph(p: { id: string; label: string; ink: Ink; language: Language }) {
  const zh = () => p.language === "zh";
  const on = signal(false);
  const count = signal(0);
  const query = signal("");
  const restart = signal(0);
  const motion = createAnimatedValue(0);
  let reset: ReturnType<typeof setTimeout> | undefined;
  cleanup(() => { if (reset !== undefined) clearTimeout(reset); });
  function animate(next: boolean) {
    on.set(next);
    if (reduceMotion()) motion.set(Number(next));
    else void motion.spring(Number(next), spring);
  }
  const both = () => ({ outlineWidth: 2, outlineOffset: 2, outlineColor: p.ink.accent });
  const shell = (): ViewStyle => ({ ...row, minHeight: 42, paddingHorizontal: 13, justifyContent: "center",
    borderRadius: 24, borderWidth: 1, borderColor: p.ink.border, backgroundColor: p.ink.panel });
  function Word(q: { label: string; accent?: boolean }) {
    return <Text style={{ color: q.accent ? p.ink.onAccent : p.ink.text, fontSize: 14, fontWeight: "650" }}>{q.label}</Text>;
  }
  function Tap(q: { label: string; press: () => void; icon?: string; iconOnly?: boolean; active?: boolean }) {
    return <Button accessibilityLabel={q.label} onPress={q.press} class="focus-visible:outline-2" focusVisibleStyle={both()}
      activeStyle={reduceMotion() ? undefined : { transform: [{ scale: 0.96 }] }}
      style={{ ...shell(), backgroundColor: q.active ? p.ink.accent : p.ink.panel }}>
      <If when={q.icon}><Glyph name={q.icon!} color={q.active ? p.ink.onAccent : p.ink.text} /></If>
      <If when={!q.iconOnly}><Word label={q.label} accent={q.active} /></If>
    </Button>;
  }
  if (p.id === "add-to-cart-morph") {
    const alpha = motion.interpolate({ inputRange: [0, 0.3, 1], outputRange: [1, 1, 0] });
    const x = motion.interpolate({ inputRange: [0, 1], outputRange: [-28, 97] });
    const y = motion.interpolate({ inputRange: [0, 0.5, 1], outputRange: [5, -29, -5] });
    return <View style={{ ...row, flexWrap: "wrap", justifyContent: "center" }}>
      <Tap label={on() ? (zh() ? "已加入" : "Added") : count() ? (zh() ? "再加一件" : "Add more") : (zh() ? "加入购物车" : "Add to cart")}
        icon={on() ? "check" : undefined} active={on()} press={() => {
          if (reset !== undefined) clearTimeout(reset);
          count.update(value => value + 1);
          motion.set(0);
          animate(true);
          reset = setTimeout(() => { on.set(false); motion.set(0); }, 900);
        }} />
      <View style={{ ...shell(), minWidth: 42 }}><Word label={String(count())} /></View>
      <If when={on() && !reduceMotion()}><View style={{ position: "absolute", left: 35, top: 8, pointerEvents: "none",
        opacity: alpha, translate: [x, y], borderRadius: 10, backgroundColor: p.ink.tint, padding: 3 }}>
        <Word label="+1" />
      </View></If>
      <If when={count() > 0}><Tap label={zh() ? "清空购物车" : "Reset cart"} press={() => {
        if (reset !== undefined) clearTimeout(reset);
        count.set(0); on.set(false); motion.set(0);
      }} icon="refresh-cw" iconOnly /></If>
    </View>;
  }
  if (p.id === "play-pause-morph") {
    return <Button accessibilityLabel={on() ? (zh() ? "暂停音轨" : "Pause track") : (zh() ? "播放音轨" : "Play track")}
      onPress={() => animate(!on())} style={{ ...shell(), width: 60, height: 60, borderRadius: 31, paddingHorizontal: 0 }}
      class="focus-visible:outline-2" focusVisibleStyle={both()} selected={on()}>
      <View style={{ position: "absolute", opacity: motion.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
        transform: [{ rotate: motion.interpolate({ inputRange: [0, 1], outputRange: [0, -40] }) }] }}>
        <Glyph name="play" color={p.ink.text} size={24} />
      </View>
      <View style={{ position: "absolute", opacity: motion }}>
        <Glyph name="pause" color={p.ink.accent} size={24} />
      </View>
    </Button>;
  }
  if (p.id === "search-expand") {
    const search = () => zh() ? "搜索组件" : "Search components";
    return <View class="transition-all duration-300 motion-reduce:transition-none"
      style={{ ...shell(), minHeight: 46, width: on() ? 234 : 46, paddingHorizontal: 0, overflow: "hidden" }}>
      <Tap label={zh() ? "展开搜索栏" : "Expand search bar"} press={() => animate(true)} icon="search" iconOnly />
      <If when={on()}>
        <Input ref={ref => ref.focus()} accessibilityLabel={zh() ? "输入搜索词" : "Enter search term"} placeholder={search()}
          value={query()} onChange={({ value }) => query.set(value)}
          style={{ flex: 1, minWidth: 0, fontSize: 14, color: p.ink.text }} />
        <Tap label={query() ? (zh() ? "清空搜索" : "Clear search") : (zh() ? "关闭搜索栏" : "Collapse search bar")}
          press={() => { if (query()) query.set(""); else animate(false); }} icon="x" iconOnly />
      </If>
    </View>;
  }
  const bounded = (n: number) => Math.min(1, Math.max(0, n));
  return <Each of={[restart()]}>{() => <MotionStage label={p.label} ink={p.ink} language={p.language}>{time =>
    <Button accessibilityLabel={zh() ? "重播形状变换" : "Replay shape morph"} onPress={() => restart.update(value => value + 1)}
      class="focus-visible:outline-2" focusVisibleStyle={both()} style={{ borderRadius: 14 }}>
      <Canvas style={{ width: 184, height: 132 }} draw={ctx => {
        const t = reduceMotion() ? 3100 : time() % 5200;
        ctx.translate(19, 0);
        if (t < 2080) {
          const remaining = 1 - bounded((t - 1800) / 280);
          characters.forEach((figure, i) => {
            const arrive = Math.max(0.1, bounded((t - i * 30) / 350));
            ctx.save();
            ctx.translate(73 + (figure.x - 73) * remaining, 65 + (figure.y - 65) * remaining);
            ctx.scale(arrive * remaining * 0.52, arrive * remaining * 0.52);
            ctx.translate(-50, -50);
            ctx.globalAlpha = remaining;
            ctx.fillStyle = figure.color;
            ctx.fill(figure.path);
            ctx.fillStyle = "#111111";
            for (const eye of figure.eyes.slice(0, 2)) {
              ctx.beginPath(); ctx.arc(eye, figure.eyes[2], 3, 0, 2 * Math.PI); ctx.fill();
            }
            ctx.restore();
          });
        } else {
          const a = bounded((t - 2080) / 335);
          const size = 0.3 + 0.76 * a + Math.sin(a * Math.PI) * 0.15;
          ctx.translate(73, 65);
          ctx.scale(size, size);
          ctx.translate(-50, -50);
          ctx.fillStyle = "#ed5688";
          ctx.fill(heart);
        }
      }} />
    </Button>
  }</MotionStage>}</Each>;
}
