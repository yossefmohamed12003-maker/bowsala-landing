import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../brand/theme";
import { clamp, Mono } from "./kit";

// Which background each stretch of the timeline sits on → HUD ink or cream.
// [startFrame, tone]; "none" hides the HUD (strobe build).
const TONES: [number, "dark" | "light" | "none"][] = [
  [0, "dark"],
  [120, "light"],
  [180, "dark"],
  [420, "light"],
  [465, "none"],
  [480, "dark"],
];

const Corner: React.FC<{ pos: "tl" | "tr" | "bl" | "br"; color: string; len: number }> = ({ pos, color, len }) => {
  const top = pos[0] === "t";
  const left = pos[1] === "l";
  return (
    <div
      style={{
        position: "absolute",
        width: len,
        height: len * 0.62,
        [top ? "top" : "bottom"]: 56,
        [left ? "left" : "right"]: 56,
        [top ? "borderTop" : "borderBottom"]: `2px solid ${color}`,
        [left ? "borderLeft" : "borderRight"]: `2px solid ${color}`,
      }}
    />
  );
};

// The frame from the teaser posts: corner brackets, file code, status, blue square.
// The unlock counter runs across the whole reel: LOCKED → UNLOCKING xx% → UNLOCKED.
export const Hud: React.FC<{ dropLabel: string }> = ({ dropLabel }) => {
  const frame = useCurrentFrame();
  const tone = [...TONES].reverse().find(([f]) => frame >= f)![1];
  if (tone === "none") return null;
  const fg = tone === "dark" ? C.cream : C.ink;
  const len = interpolate(frame, [0, 12], [0, 190], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 });
  const pct = Math.round(interpolate(frame, [60, 465], [0, 99], clamp));
  const status =
    frame < 52 ? "STATUS / LOCKED" : frame < 480 ? `UNLOCKING / ${String(pct).padStart(3, "0")}%` : "STATUS / UNLOCKED";
  const blink = frame < 480 ? Math.floor(frame / 8) % 2 === 0 : true;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Corner pos="tl" color={fg} len={len} />
      <Corner pos="tr" color={fg} len={len} />
      <Corner pos="bl" color={fg} len={len} />
      <Corner pos="br" color={fg} len={len} />

      <div style={{ position: "absolute", left: 92, top: 92 }}>
        <Mono at={4} color={fg} size={30}>
          {"FILE 02\nCL/04"}
        </Mono>
      </div>
      <div style={{ position: "absolute", right: 92, top: 92, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
        <Mono at={6} color={fg} size={30} style={{ textAlign: "right" }}>
          {`${dropLabel}\n${status}`}
        </Mono>
        <div style={{ width: 24, height: 24, backgroundColor: C.blue, opacity: blink ? 1 : 0.15 }} />
      </div>
      <div style={{ position: "absolute", left: 92, bottom: 92 }}>
        <Mono at={8} color={fg} size={24}>
          THECLOCAL.COM
        </Mono>
      </div>
      <div style={{ position: "absolute", right: 92, bottom: 92 }}>
        <Mono at={8} color={fg} size={24}>
          CAIRO · EST. 2023
        </Mono>
      </div>
    </AbsoluteFill>
  );
};
