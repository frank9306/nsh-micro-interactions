export type Language = "en" | "zh";
export type Ink = {
  background: string;
  panel: string;
  stage: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
  tint: string;
};
export type Entry = {
  id: string;
  name: string;
  family: string;
  source: string;
  preview?: string;
  effect?: string;
  icons?: string[];
  ink?: string | null;
};

export const repository = "https://github.com/frank9306/nsh-micro-interactions";
export const themes: Record<"dark" | "light", Ink> = {
  dark: { background: "#10101a", panel: "#161625", stage: "#1d1c30", border: "#33314a",
    text: "#f4f1fc", muted: "#b7b0cb", accent: "#c8b4ff", onAccent: "#25193e", tint: "#2a2241" },
  light: { background: "#f6f4fc", panel: "#ffffff", stage: "#eeecf7", border: "#ded9ed",
    text: "#241b36", muted: "#605774", accent: "#5630a8", onAccent: "#ffffff", tint: "#e9defb" },
};
