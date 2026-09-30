import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { C, arabic } from "./brand";
import { PHRASES, splitPhrase, Word } from "./captions";

const WordEl: React.FC<{ w: Word; t: number; fps: number }> = ({ w, t, fps }) => {
  const f = (t - w.start) * fps;
  const p = interpolate(f, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const base: React.CSSProperties = {
    display: "inline-block",
    opacity: p,
    transform: `translateY(${(1 - p) * 16}px)`,
    lineHeight: 1.25,
  };
  if (w.kind === "hl") {
    return (
      <span
        style={{
          ...base,
          color: C.blue,
          backgroundColor: C.cream,
          padding: "0 18px 6px",
          borderRadius: 4,
        }}
      >
        {w.text}
      </span>
    );
  }
  return (
    <span style={{ ...base, color: w.kind === "tech" ? C.orange : C.cream }}>
      {w.text}
    </span>
  );
};

export const Captions: React.FC<{ plated: (t: number) => boolean }> = ({ plated }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const phrase = PHRASES.find((p) => t >= p.start && t < p.end);
  if (!phrase) return null;
  const words = splitPhrase(phrase).filter((w) => t >= w.start);
  const plate = plated(t);

  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top: 1060,
          width: 820,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          dir="rtl"
          style={{
            fontFamily: arabic,
            fontWeight: 700,
            fontSize: 78,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 20,
            rowGap: 6,
            textShadow: plate ? "none" : "0 2px 24px rgba(10,10,10,0.55)",
            backgroundColor: plate ? C.ink : "transparent",
            padding: plate ? "10px 30px 18px" : 0,
          }}
        >
          {words.map((w, i) => (
            <WordEl key={i} w={w} t={t} fps={fps} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
