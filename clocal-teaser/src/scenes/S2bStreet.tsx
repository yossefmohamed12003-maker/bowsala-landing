import React from "react";
import { AbsoluteFill, Img, interpolate, random, staticFile, useCurrentFrame } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, Mono } from "../components/kit";

// Night-street run: hard cuts on every 8th note, whip-in, shake, flash, grain.
// Drop generated/real street stills into public/street/run-01.jpg … run-08.jpg;
// until then the campaign photos stand in.
export const STREET_SHOTS = [
  "street/run-01.jpg",
  "street/run-02.jpg",
  "street/run-03.jpg",
  "street/run-04.jpg",
  "street/run-05.jpg",
  "street/run-06.jpg",
  "street/run-07.jpg",
  "street/run-08.jpg",
];
const FALLBACK = [
  "plates/warehouse-cases.jpg",
  "photos/look-black.jpg",
  "photos/gawhar-model.jpg",
  "plates/archive-case.jpg",
  "photos/duo-sofa-2.jpg",
  "photos/look-grey.jpg",
  "photos/wound-model.jpg",
  "photos/look-wood.jpg",
];

const CUT = 7.5; // 8th note at 120 BPM / 30fps

const Shot: React.FC<{ src: string; i: number; local: number }> = ({ src, i, local }) => {
  const dir = i % 2 ? 1 : -1;
  const shakeX = (random(`sx${i}-${Math.floor(local)}`) - 0.5) * 14;
  const shakeY = (random(`sy${i}-${Math.floor(local)}`) - 0.5) * 14;
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.ink }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(local, [0, CUT], [1.22, 1.08], { ...clamp, easing: OUT }),
          translate: `${interpolate(local, [0, 3], [dir * 140, 0], { ...clamp, easing: OUT }) + shakeX}px ${shakeY}px`,
          filter: `blur(${interpolate(local, [0, 2.5], [10, 0], clamp)}px) brightness(0.5) contrast(1.45) saturate(0.55)`,
        }}
      />
    </AbsoluteFill>
  );
};

export const S2bStreet: React.FC<{ useFallback?: boolean }> = ({ useFallback = true }) => {
  const frame = useCurrentFrame();
  const shots = useFallback ? FALLBACK : STREET_SHOTS;
  const i = Math.min(shots.length - 1, Math.floor(frame / CUT));
  const local = frame - i * CUT;
  const flash = local < 1 && i % 3 === 0;
  const grainSeed = Math.floor(frame);
  const hh = 23;
  const mm = 41 + Math.floor(frame / 12);
  const ss = (frame * 2) % 60;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Shot src={shots[i]} i={i} local={local} />
      {/* night grade: cool shadows */}
      <AbsoluteFill style={{ backgroundColor: "#0B1030", mixBlendMode: "color", opacity: 0.35 }} />
      {/* vignette */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 100%)" }} />
      {/* grain */}
      <AbsoluteFill
        style={{
          opacity: 0.16,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='${grainSeed % 50}'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
        }}
      />
      {flash ? <AbsoluteFill style={{ backgroundColor: C.cream, opacity: 0.85 }} /> : null}

      <AbsoluteFill style={{ justifyContent: "flex-end", padding: "0 92px 300px" }}>
        <div
          style={{
            fontFamily: F.display,
            fontWeight: 900,
            fontSize: 118,
            letterSpacing: "-0.035em",
            lineHeight: 0.95,
            color: C.cream,
          }}
        >
          {frame >= 0 ? "Quiet luxury" : ""}
          <br />
          <span style={{ opacity: frame >= 30 ? 1 : 0 }}>in the streets.</span>
        </div>
        <Mono at={2} color={C.cream} size={26} style={{ marginTop: 34 }}>
          {`CAIRO / ${hh}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}  ● REC`}
        </Mono>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
