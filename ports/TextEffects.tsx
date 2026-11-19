import { Button } from "nsh/base";
import { Canvas, Text, View, cleanup, reduceMotion, signal } from "nsh";
import type { Ink, Language } from "../model";

export const effectNames = new Set(["blur-text", "blur-up-char", "blur-up-word", "dia-text-reveal", "reveal-text", "text-reveal",
  "shimmer-text", "skew-x-char", "tracking-in-text", "tracking-out-text", "typewriter-text"]);
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const ease = (n: number) => 1 - Math.pow(1 - clamp(n), 3);
const group = { flexDirection: "row", alignItems: "center", justifyContent: "center" } as const;

export function TextEffects(p: { id: string; ink: Ink; language: Language }) {
  const time = signal(1700);
  const zh = () => p.language === "zh";
  const wording = () => zh() ? "让文字 动起来" : "Motion in focus";
  const needsCanvas = ["dia-text-reveal", "shimmer-text", "reveal-text", "text-reveal"].includes(p.id);
  let timer: ReturnType<typeof setInterval> | undefined;
  function stop() {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
  }
  cleanup(stop);
  function play() {
    stop();
    if (reduceMotion()) { time.set(1700); return; }
    const start = Date.now();
    time.set(0);
    timer = setInterval(() => {
      const elapsed = Math.min(1700, Date.now() - start);
      time.set(elapsed);
      if (elapsed === 1700) stop();
    }, 1000 / 30);
  }
  const text = () => ({ color: p.ink.text, fontSize: 26, fontWeight: "700" as const });
  const chunks = () => p.id === "blur-up-word" ? wording().split(" ") : [...wording()];
  return <View style={{ alignItems: "center", gap: 7 }}>
    <If when={needsCanvas} else={<View style={{ minHeight: 68, justifyContent: "center", alignItems: "center" }}>
      <If when={p.id === "typewriter-text"}>
        <Text style={text()}>
          {wording().slice(0, Math.floor(time() / 74))}
          {time() < 1660 && Math.floor(time() / 260) % 2 === 0 ? "▌" : ""}
        </Text>
      </If>
      <If when={p.id === "blur-text"}>
        <Text style={{ ...text(), opacity: ease(time() / 650), filter: `blur(${9 * (1 - ease(time() / 660))}px)`,
          transform: [{ scale: 0.9 + ease(time() / 650) / 10 }] }}>{wording()}</Text>
      </If>
      <If when={p.id.startsWith("tracking-")}>
        <Text style={{ ...text(), opacity: ease(time() / 700),
          letterSpacing: (p.id === "tracking-in-text" ? 6 : -3) * (1 - ease(time() / 1000)) }}>{wording()}</Text>
      </If>
      <If when={p.id.startsWith("blur-up") || p.id === "skew-x-char"}>
        <View style={{ ...group, gap: p.id === "blur-up-word" ? 7 : 0, flexWrap: "wrap" }}>
          {chunks().map((segment, i) => {
            const blend = () => ease((time() - i * 46) / 530);
            return <View style={{
              opacity: blend(), filter: p.id === "skew-x-char" ? undefined : `blur(${8 * (1 - blend())}px)`,
              transform: p.id === "skew-x-char" ? [{ skewX: -26 * (1 - blend()) }] : [{ translateY: 17 * (1 - blend()) }],
            }}><Text style={text()}>{segment === " " ? "\u00a0" : segment}</Text></View>;
          })}
        </View>
      </If>
    </View>}>
      <Canvas accessibilityLabel={wording()} style={{ width: 232, height: 68 }} draw={ctx => {
        const f = ease(time() / 1560);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "700 26px sans-serif";
        ctx.fillStyle = p.ink.text;
        if (p.id === "shimmer-text") {
          const x = -54 + (time() / 1700) * 340;
          const shine = ctx.createLinearGradient(x - 60, 0, x + 60, 0);
          shine.addColorStop(0, p.ink.muted);
          shine.addColorStop(0.5, p.ink.accent);
          shine.addColorStop(1, p.ink.muted);
          ctx.fillStyle = shine;
        } else if (p.id === "dia-text-reveal") {
          const x = -50 + 310 * f;
          const shine = ctx.createLinearGradient(x - 28, 6, x + 22, 55);
          shine.addColorStop(0, p.ink.text);
          shine.addColorStop(0.43, "#6cbffa");
          shine.addColorStop(0.71, "#3175ee");
          shine.addColorStop(1, "#3175ee00");
          ctx.fillStyle = shine;
        } else {
          ctx.beginPath();
          ctx.rect(0, 34, 232, -31 * f);
          ctx.rect(0, 34, 232, 31 * f);
          ctx.clip();
        }
        ctx.fillText(wording(), 116, 34);
      }} />
    </If>
    <Button accessibilityLabel={zh() ? "重播" : "Replay"} onPress={play}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineWidth: 2, outlineColor: p.ink.accent }}
      style={{ minHeight: 35, paddingHorizontal: 13, borderRadius: 18, justifyContent: "center", backgroundColor: p.ink.panel }}>
      <Text style={{ color: p.ink.text, fontSize: 13 }}>{zh() ? "重播" : "Replay"}</Text>
    </Button>
  </View>;
}
