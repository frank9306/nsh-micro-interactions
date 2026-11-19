import { inventory } from "./inventory";
import { spreadStyles } from "./ports/CardMotion";
import { depthNames } from "./ports/CardDepth";
import { loaderNames } from "./ports/LoaderMotion";
import { textNames } from "./ports/TextMotion";
import { uiNames } from "./ports/UiMotion";
import { chartNames } from "./ports/ChartMotion";
import { aiNames } from "./ports/AiMotion";
import { shapeNames } from "./ports/ShapeMotion";
import { effectNames } from "./ports/TextEffects";
import { actionMorphNames } from "./ports/ActionMorph";
import { specialLoaderNames } from "./ports/LoaderSpecial";
import { ditherNames } from "./ports/DitherMotion";
import { monoMoreNames } from "./ports/MonoMore";
import { studioNames } from "./ports/AiStudio";
import { primitiveNames } from "./ports/PrimitiveMotion";
import { physicsNames } from "./ports/PhysicsMotion";
import { uiMoreNames } from "./ports/UiMore";
import type { Entry } from "./model";

export type Port = "button" | "card" | "depth" | "loader" | "specialLoader" | "text" | "textEffect"
  | "ui" | "uiMore" | "chart" | "monoMore" | "dither" | "ai" | "aiStudio" | "shape" | "shapeStudio" | "actionMorph" | "primitive" | "physics";
export function portFor(entry: Entry): Port | undefined {
  if (entry.family === "buttons" && entry.effect && entry.icons?.length) return "button";
  if (Object.hasOwn(spreadStyles, entry.id)) return "card";
  if (depthNames.has(entry.id)) return "depth";
  if (shapeNames.has(entry.id)) return "shape";
  if (actionMorphNames.has(entry.id)) return "actionMorph";
  if (loaderNames.has(entry.id)) return "loader";
  if (specialLoaderNames.has(entry.id)) return "specialLoader";
  if (textNames.has(entry.id)) return "text";
  if (effectNames.has(entry.id)) return "textEffect";
  if (uiNames.has(entry.id)) return "ui";
  if (chartNames.has(entry.id)) return "chart";
  if (monoMoreNames.has(entry.id)) return "monoMore";
  if (ditherNames.has(entry.id)) return "dither";
  if (aiNames.has(entry.id)) return "ai";
  if (studioNames.has(entry.id)) return "aiStudio";
  if (primitiveNames.has(entry.id)) return "primitive";
  if (physicsNames.has(entry.id)) return "physics";
  if (uiMoreNames.has(entry.id)) return "uiMore";
  if (entry.id === "morphing-shapes-studio") return "shapeStudio";
}
export { inventory };
