import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F } from "../brand/theme";
import { headline } from "../components/kit";

// Instagram story stills (1080×1920). Key content stays inside the IG safe zone
// (≈250px clear at top, ≈250px at bottom). Marked slots are where the IG link /
// countdown stickers go — the sticker covers the slot once posted.

export type StoryProps = {
  readonly day: string;
  readonly keyTime: string;
  readonly drop: string;
};

const mono = (size: number, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: F.mono,
  fontSize: size,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color,
  whiteSpace: "pre",
  lineHeight: 1.4,
  ...extra,
});
const caps = (size: number, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: F.tech,
  fontWeight: 600,
  fontSize: size,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color,
  whiteSpace: "nowrap",
  ...extra,
});

const Corners: React.FC<{ color: string; inset?: number; len?: number }> = ({ color, inset = 56, len = 150 }) => {
  const c = (pos: React.CSSProperties) => <div style={{ position: "absolute", width: len, height: len * 0.62, ...pos }} />;
  const b = `2px solid ${color}`;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {c({ left: inset, top: inset, borderLeft: b, borderTop: b })}
      {c({ right: inset, top: inset, borderRight: b, borderTop: b })}
      {c({ left: inset, bottom: inset, borderLeft: b, borderBottom: b })}
      {c({ right: inset, bottom: inset, borderRight: b, borderBottom: b })}
    </AbsoluteFill>
  );
};

// ───────────────────────── DROP STORY ─────────────────────────
// Quiet version: two straight prints, one headline, a dossier list, the date as the hero.
export const DropStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    {/* products as the hero: two full-bleed columns */}
    {[
      ["photos/gawhar-model.jpg", "Gawhar", "NO.01", 0],
      ["photos/wound-model.jpg", "Wound", "NO.02", 543],
    ].map(([src, name, no, x]) => (
      <div key={name as string} style={{ position: "absolute", left: x as number, top: 0, width: 537, height: 1330, overflow: "hidden" }}>
        <Img
          src={staticFile(src as string)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", scale: 1.12, transformOrigin: "50% 30%" }}
        />
        <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 14%, rgba(10,10,10,0) 70%, ${C.ink} 100%)` }} />
        <div style={{ position: "absolute", left: 40, bottom: 44 }}>
          <div style={mono(20, C.gray300)}>{no as string}</div>
          <div style={headline(62, C.cream)}>{name as string}</div>
        </div>
      </div>
    ))}
    <Corners color={`${C.cream}99`} len={120} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 1356 }}>
      <div style={headline(40, C.cream)}>The most wanted are back.</div>
      <div style={{ ...mono(21, C.gray300), marginTop: 14 }}>+ NEW PIECES ███████ · END OF SEASON SALE — LIMITED STOCK</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.cream}40` }}>
        <span style={headline(52, C.cream)}>{day}</span>
        <span style={headline(52, C.blue)}>{drop}</span>
      </div>
      <div style={{ ...mono(19, C.gray300), marginTop: 8 }}>{`EARLY ACCESS ${keyTime} · KEY LANDS IN YOUR SPAM`}</div>
    </div>

    {/* link sticker slot — IG link sticker at default scale (~500×104) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1580, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 500,
          height: 100,
          borderRadius: 24,
          border: `1.5px dashed ${C.cream}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ ...mono(20, C.cream), opacity: 0.5 }}>[ LINK — THECLOCAL.COM ]</span>
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────────────── COUNTDOWN STORY ───────────────────────
// About the drop in general, with a slot sized to IG's countdown sticker (~820×360, rounded).
export const CountdownStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.cream }}>
    <Corners color={`${C.ink}99`} len={120} />
    <div
      style={{
        position: "absolute",
        left: 92,
        right: 92,
        top: 250,
        paddingBottom: 20,
        borderBottom: `1px solid ${C.ink}40`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.blue }} />
        <span style={caps(20, C.ink, { fontWeight: 500 })}>[ File 02 / CL/04 ]</span>
      </div>
      <span style={caps(20, C.gray500, { fontWeight: 500 })}>October 2026</span>
    </div>

    {/* product hero: the Gawhar flat, white knocked into the cream ground */}
    <Img
      src={staticFile("photos/gawhar-flat-tight.jpg")}
      style={{
        position: "absolute",
        left: 40,
        top: 318,
        width: 1000,
        height: 670,
        objectFit: "contain",
        mixBlendMode: "multiply",
      }}
    />
    <div style={{ position: "absolute", left: 92, top: 1000, ...mono(20, C.ink) }}>{"NO.01 GAWHAR\nTHE MOST WANTED"}</div>
    <div style={{ position: "absolute", right: 92, top: 1000, ...mono(20, C.ink), textAlign: "right" }}>{"BACK + NEW PIECES\nEOS SALE"}</div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1086, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 84, letterSpacing: "-0.035em", lineHeight: 1, color: C.ink, textTransform: "uppercase" }}>
        [ The drop ]<span style={{ color: C.blue }}>_</span>
      </div>
      <div style={{ ...mono(24, C.ink), textAlign: "right" }}>{`${day}\n${drop}`}</div>
    </div>

    {/* countdown sticker slot — IG countdown at default scale (~820×360) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1210, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: 820,
          height: 340,
          borderRadius: 36,
          border: `1.5px dashed ${C.ink}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ ...mono(22, C.ink), opacity: 0.35 }}>[ COUNTDOWN ]</span>
      </div>
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1584, display: "flex", justifyContent: "space-between" }}>
      <span style={mono(22, C.blue)}>{`EARLY ACCESS ${keyTime} · CHECK SPAM`}</span>
      <span style={mono(22, C.ink)}>THECLOCAL.COM</span>
    </div>
  </AbsoluteFill>
);
