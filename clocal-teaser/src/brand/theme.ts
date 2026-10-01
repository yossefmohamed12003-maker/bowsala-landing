import { loadFont } from "@remotion/fonts";
import { Easing, staticFile } from "remotion";

// clocal core palette — 60% cream · 30% ink · 10% blue. Orange = technical detail only.
export const C = {
  cream: "#F6EEE3",
  creamTint: "#FBF6EF",
  creamDeep: "#EFE5D6",
  ink: "#0A0A0A",
  black: "#000000",
  blue: "#2B00FF",
  orange: "#FF4200",
  gray500: "#6B675F",
  gray300: "#A69F92",
  hairline: "#E2D7C6",
} as const;

// Primary display face per the brand book is Satoshi (Black 900).
// Satoshi isn't reachable from this environment; DM Sans (variable) stands in until
// Satoshi-Variable.woff2 is dropped into public/fonts — then set DISPLAY_FILE below.
const DISPLAY_FILE = "fonts/DMSans-Variable.woff2";

const variable = (family: string, file: string) =>
  loadFont({ family, url: staticFile(file), weight: "100 1000", display: "block" });

variable("ClocalDisplay", DISPLAY_FILE);
variable("Inter", "fonts/Inter-Variable.woff2");
variable("Geist", "fonts/Geist-Variable.woff2");

export const F = {
  display: "ClocalDisplay, sans-serif",
  body: "Inter, sans-serif",
  tech: "Geist, monospace",
};

// Snappy ease used for every slam/reveal.
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

// 120 BPM @ 30fps → 1 beat = 15 frames, 1 bar = 60 frames.
export const BEAT = 15;
export const BAR = 60;
