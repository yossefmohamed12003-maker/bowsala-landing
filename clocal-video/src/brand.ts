import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Clocal Brand Book Vol.01 — 60% cream · 30% ink · 10% blue. Orange = technical detail only.
export const C = {
  cream: "#F6EEE3",
  ink: "#0A0A0A",
  blue: "#2B00FF",
  orange: "#FF4200",
  gray500: "#6B675F",
};

// Fonts are bundled in public/fonts so renders work offline.
const ARABIC_RANGE =
  "U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC";

export const arabic = "IBM Plex Sans Arabic";
loadFont({ family: arabic, url: staticFile("fonts/PlexArabic-500-ar.woff2"), weight: "500", unicodeRange: ARABIC_RANGE });
loadFont({ family: arabic, url: staticFile("fonts/PlexArabic-700-ar.woff2"), weight: "700", unicodeRange: ARABIC_RANGE });
loadFont({ family: arabic, url: staticFile("fonts/PlexArabic-700-lat.woff2"), weight: "700" });

// Satoshi (brand display face) is not on Google Fonts; Inter Black is the stand-in.
export const display = "Inter";
loadFont({ family: display, url: staticFile("fonts/Inter-900.woff2"), weight: "900" });

export const technical = "Geist";
loadFont({ family: technical, url: staticFile("fonts/Geist-500.woff2"), weight: "500" });
