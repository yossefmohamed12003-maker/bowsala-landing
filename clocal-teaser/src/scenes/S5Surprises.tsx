import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, Monogram, Plate, Punch, Slam } from "../components/kit";

// Ink stamp that slams onto the page on its frame.
const Stamp: React.FC<{ at: number; text: string; color: string; x: number; y: number; rot: number; size: number }> = ({
  at,
  text,
  color,
  x,
  y,
  rot,
  size,
}) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        rotate: `${rot}deg`,
        scale: interpolate(frame, [at, at + 3], [1.9, 1], { ...clamp, easing: OUT }),
        opacity: interpolate(frame, [at, at + 2], [0, 0.95], clamp),
        backgroundColor: "rgba(251,246,239,0.8)",
        border: `7px solid ${color}`,
        padding: "10px 26px",
        fontFamily: F.headline,
        fontWeight: 900,
        fontStretch: "125%",
        fontSize: size,
        letterSpacing: "0.02em",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

const Line: React.FC<{ w: number }> = ({ w }) => <div style={{ width: w, height: 22, backgroundColor: C.ink, marginTop: 16 }} />;

// 10–12s. "+ BIG SURPRISES." The dossier opens; everything inside is redacted; CLASSIFIED.
export const S5Surprises: React.FC = () => {
  const frame = useCurrentFrame();
  const open = interpolate(frame, [2, 12], [0, 1], { ...clamp, easing: OUT });
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Plate src="plates/archive-case.jpg" shade={0.82} push={[1.25, 1.32]} origin="50% 70%" />
      <Punch hits={[0, 30, 45]} amount={0.04}>
        <AbsoluteFill style={{ padding: "300px 92px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
            <Slam at={0} size={130} color={C.blue}>
              +
            </Slam>
            <Slam at={4} size={130} color={C.cream}>
              Big
            </Slam>
          </div>
          <Slam at={8} size={100} color={C.cream}>
            surprises.
          </Slam>
        </AbsoluteFill>

        {/* the dossier */}
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 760,
            width: 920,
            height: 880,
            rotate: "-2deg",
            translate: `0 ${interpolate(frame, [0, 10], [500, 0], { ...clamp, easing: OUT })}px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 40,
              top: -46,
              width: 300,
              height: 70,
              backgroundColor: C.creamDeep,
              padding: "14px 22px",
              fontFamily: F.mono,
              fontSize: 22,
              color: C.ink,
            }}
          >
            CL/04 — DOSSIER
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundColor: C.creamDeep, boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }} />
          <div
            style={{
              position: "absolute",
              left: 34,
              top: 34,
              right: 34,
              bottom: 34,
              backgroundColor: C.creamTint,
              padding: 44,
              transformOrigin: "left center",
              rotate: `0 1 0 ${interpolate(open, [0, 1], [-70, 0])}deg`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: F.mono, fontSize: 22, color: C.ink, whiteSpace: "pre", lineHeight: 1.5 }}>
                {"SUBJECT / UNKNOWN\nMATERIAL / UNKNOWN\nRELEASE / 02.10 — 19:00"}
              </div>
              <Monogram width={90} color={C.ink} />
            </div>
            <div style={{ display: "flex", gap: 26, marginTop: 40 }}>
              {["photos/look-black.jpg", "photos/duo-sofa-2.jpg"].map((src, i) => (
                <div key={src} style={{ position: "relative", width: 300, height: 380, rotate: `${i ? 2 : -2}deg` }}>
                  <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(10px) grayscale(1)" }} />
                  <div style={{ position: "absolute", left: 0, right: 0, top: i ? 40 : 120, height: i ? 260 : 180, backgroundColor: C.ink }} />
                </div>
              ))}
            </div>
            <Line w={760} />
            <Line w={540} />
            <Line w={680} />
          </div>
        </div>

        <Stamp at={30} text="CLASSIFIED" color={C.orange} x={150} y={1120} rot={-9} size={78} />
        <Stamp at={45} text="EYES ONLY" color={C.blue} x={470} y={1400} rot={5} size={54} />
      </Punch>
    </AbsoluteFill>
  );
};
