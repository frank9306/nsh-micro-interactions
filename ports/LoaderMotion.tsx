import type { Ink, Language } from "../model";
import { recipes } from "../loaderRecipes";
import { LoaderViews } from "./LoaderViews";
import { MotionStage } from "./MotionStage";

export const loaderNames = new Set(Object.keys(recipes));

export function LoaderMotion(p: { id: string; label: string; ink: Ink; language: Language }) {
  return <MotionStage label={p.label} ink={p.ink} language={p.language}>{time =>
    <LoaderViews node={recipes[p.id]} time={time()} ink={p.ink} />
  }</MotionStage>;
}
