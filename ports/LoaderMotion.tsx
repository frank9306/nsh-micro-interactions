import { Text, View, cleanup, effect, reduceMotion, signal, untracked } from "nsh";
import { Button } from "nsh/base";
import type { Ink, Language } from "../model";
import { phrases } from "../strings";
import { recipes } from "../loaderRecipes";
import { LoaderViews } from "./LoaderViews";

export const loaderNames = new Set(Object.keys(recipes));

export function LoaderMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  const pause = signal(false);
  const elapsed = signal(0);
  const words = () => phrases[p.language];
  effect(() => {
    if (pause() || reduceMotion()) return;
    const start = Date.now() - untracked(elapsed);
    const clock = setInterval(() => elapsed.set(Date.now() - start), 1000 / 30);
    cleanup(() => clearInterval(clock));
  });
  return <View style={{ gap: 11, alignItems: "center" }}>
    <View accessibilityLabel={p.label} style={{ minHeight: 94, minWidth: 158, alignItems: "center", justifyContent: "center" }}>
      <LoaderViews node={recipes[p.id]} time={elapsed()} ink={p.ink} />
    </View>
    <Button accessibilityLabel={pause() ? words().resume : words().pause} onPress={() => pause.update(value => !value)}
      class="focus-visible:outline-2" focusVisibleStyle={{ outlineColor: p.ink.accent, outlineWidth: 2 }}
      style={{ minHeight: 33, paddingHorizontal: 13, borderRadius: 16, backgroundColor: p.ink.panel }}>
      <Text style={{ color: p.ink.text, fontSize: 13 }}>{pause() ? words().resume : words().pause}</Text>
    </Button>
  </View>;
}
