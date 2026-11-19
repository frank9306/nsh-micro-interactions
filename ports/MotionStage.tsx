import { Button } from "nsh/base";
import { cleanup, effect, reduceMotion, signal, Text, untracked, View, type JSX } from "nsh";
import type { Ink, Language } from "../model";
import { phrases } from "../strings";

export function MotionStage(p: { label: string; ink: Ink; language: Language; children: (time: () => number) => JSX.Element }) {
  const paused = signal(false);
  const elapsed = signal(0);
  const title = () => phrases[p.language][paused() ? "resume" : "pause"];
  effect(() => {
    if (paused() || reduceMotion()) return;
    const start = Date.now() - untracked(elapsed);
    const clock = setInterval(() => elapsed.set(Date.now() - start), 1000 / 30);
    cleanup(() => clearInterval(clock));
  });
  return <View style={{ gap: 11, alignItems: "center" }}>
    <View accessibilityLabel={p.label} style={{ minHeight: 94, minWidth: 158, alignItems: "center", justifyContent: "center" }}>
      {p.children(elapsed)}
    </View>
    <Button accessibilityLabel={title()} onPress={() => paused.update(value => !value)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineColor: p.ink.accent, outlineWidth: 2 }}
      style={{ minHeight: 33, paddingHorizontal: 13, borderRadius: 16, backgroundColor: p.ink.panel }}>
      <Text style={{ color: p.ink.text, fontSize: 13 }}>{title()}</Text>
    </Button>
  </View>;
}
