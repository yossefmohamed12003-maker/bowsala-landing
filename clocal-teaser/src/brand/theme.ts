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

// Headlines follow the live teaser posts: heavy, extended, uppercase ("THE NEW clocal").
// Archivo (wdth 125, wght 900) matches that cut. Satoshi (brand display face) sets the
// site-style UI (access card, receipts headers); Geist + Inter per the brand book.
const DISPLAY_FILE = "fonts/Satoshi-Variable.woff2";

const variable = (family: string, file: string, stretch?: string) =>
  loadFont({ family, url: staticFile(file), weight: "100 900", display: "block", ...(stretch ? { stretch } : {}) });

variable("ClocalHeadline", "fonts/Archivo-Variable.woff2", "62% 125%");
variable("ClocalDisplay", DISPLAY_FILE);
variable("Inter", "fonts/Inter-Variable.ttf");
variable("Geist", "fonts/Geist-Variable.woff2");
variable("Geist Mono", "fonts/GeistMono-Variable.woff2");

export const F = {
  headline: "ClocalHeadline, sans-serif",
  display: "ClocalDisplay, sans-serif",
  body: "Inter, sans-serif",
  tech: "Geist, sans-serif",
  mono: "'Geist Mono', monospace",
};

// Snappy ease used for every slam/reveal.
export const OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

// 120 BPM @ 30fps → 1 beat = 15 frames, 1 bar = 60 frames.
export const BEAT = 15;
export const BAR = 60;
