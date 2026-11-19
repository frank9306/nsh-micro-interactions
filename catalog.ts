import { inventory } from "./inventory";
import { spreadStyles } from "./ports/CardMotion";
import { depthNames } from "./ports/CardDepth";
import { loaderNames } from "./ports/LoaderMotion";
import { textNames } from "./ports/TextMotion";
import { uiNames } from "./ports/UiMotion";
import { chartNames } from "./ports/ChartMotion";
import { aiNames } from "./ports/AiMotion";
import type { Entry } from "./model";

export type Port = "button" | "card" | "depth" | "loader" | "text" | "ui" | "chart" | "ai";
export function portFor(entry: Entry): Port | undefined {
  if (entry.family === "buttons" && entry.effect && entry.icons?.length) return "button";
  if (Object.hasOwn(spreadStyles, entry.id)) return "card";
  if (depthNames.has(entry.id)) return "depth";
  if (loaderNames.has(entry.id)) return "loader";
  if (textNames.has(entry.id)) return "text";
  if (uiNames.has(entry.id)) return "ui";
  if (chartNames.has(entry.id)) return "chart";
  if (aiNames.has(entry.id)) return "ai";
}
export { inventory };
