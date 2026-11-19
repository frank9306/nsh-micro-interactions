import { inventory } from "./inventory";
import { spreadStyles } from "./ports/CardMotion";
import { loaderNames } from "./ports/LoaderMotion";
import { textNames } from "./ports/TextMotion";
import type { Entry } from "./model";

export type Port = "button" | "card" | "loader" | "text";
export function portFor(entry: Entry): Port | undefined {
  if (entry.family === "buttons" && entry.effect && entry.icons?.length) return "button";
  if (Object.hasOwn(spreadStyles, entry.id)) return "card";
  if (loaderNames.has(entry.id)) return "loader";
  if (textNames.has(entry.id)) return "text";
}
export { inventory };
