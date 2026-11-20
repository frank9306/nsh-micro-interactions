import type { Ink, Language } from "../model";
import { recipes } from "../loaderRecipes";
import { LoaderViews, localizeLoader } from "./LoaderViews";
import { MotionStage } from "./MotionStage";

export const loaderNames = new Set(Object.keys(recipes));

const chineseRecipes = Object.fromEntries(Object.entries(recipes).map(([id, recipe]) => [id, localizeLoader(recipe, id)]));

export function LoaderMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  return <MotionStage label={p.label} ink={p.ink} language={p.language}
    reducedPreview={{ time: 850, status: p.language === "zh" ? "正在加载…" : "Loading…" }}>{time =>
    <LoaderViews node={(p.language === "zh" ? chineseRecipes : recipes)[p.id]} time={time()} ink={p.ink} />
  }</MotionStage>;
}
