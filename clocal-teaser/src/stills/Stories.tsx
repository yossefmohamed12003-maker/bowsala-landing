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
const ListRow: React.FC<{ l: string; r: string; color: string; rColor?: string }> = ({ l, r, color, rColor }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 0", borderTop: `1px solid ${color}40` }}>
    <span style={mono(25, color)}>{l}</span>
    <span style={mono(25, rColor ?? color)}>{r}</span>
  </div>
);

export const DropStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Corners color={`${C.cream}99`} len={120} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 250, display: "flex", justifyContent: "space-between" }}>
      <span style={mono(24, C.cream)}>FILE 02 / CL/04</span>
      <span style={mono(24, C.cream)}>OCTOBER 2026</span>
    </div>

    {/* two prints, straight */}
    <div style={{ position: "absolute", left: 92, right: 92, top: 320, display: "flex", gap: 16 }}>
      {[
        ["photos/gawhar-model.jpg", "NO.01 GAWHAR"],
        ["photos/wound-model.jpg", "NO.02 WOUND"],
      ].map(([src, label]) => (
        <div key={label} style={{ flex: 1 }}>
          <Img src={staticFile(src)} style={{ width: "100%", height: 600, objectFit: "cover", objectPosition: "50% 18%", display: "block" }} />
          <div style={{ ...mono(20, C.gray300), marginTop: 12 }}>{label}</div>
        </div>
      ))}
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1010 }}>
      <div style={headline(60, C.cream)}>The most wanted</div>
      <div style={headline(60, C.cream)}>are back.</div>
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1170 }}>
      <ListRow l="NO.03 ███████" r="NEW PIECES" color={C.cream} />
      <ListRow l="END OF SEASON SALE" r="LIMITED STOCK" color={C.cream} />
      <ListRow l="EARLY ACCESS" r={keyTime} color={C.cream} />
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1428, paddingTop: 26, borderTop: `1px solid ${C.cream}40`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span style={headline(58, C.cream)}>{day}</span>
      <span style={headline(58, C.blue)}>{drop}</span>
    </div>

    {/* link sticker slot — sized to IG's link sticker at default scale (~500×104) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1556, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 500,
          height: 104,
          borderRadius: 24,
          border: `1.5px dashed ${C.cream}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ ...mono(20, C.cream), opacity: 0.5 }}>[ LINK ]</span>
      </div>
      <span style={mono(20, C.gray300)}>TAP — THECLOCAL.COM</span>
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
        paddingBottom: 22,
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

    <div style={{ position: "absolute", left: 92, right: 92, top: 350 }}>
      <div style={caps(24, C.ink, { fontWeight: 500 })}>&gt; {day} — {drop}</div>
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 900,
          fontSize: 132,
          letterSpacing: "-0.035em",
          lineHeight: 0.95,
          color: C.ink,
          textTransform: "uppercase",
          marginTop: 24,
        }}
      >
        [ The
        <br />
        drop ]<span style={{ color: C.blue }}>_</span>
      </div>
    </div>

    {/* countdown sticker slot */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <span style={mono(22, C.gray500)}>SET YOUR REMINDER</span>
      <div
        style={{
          width: 820,
          height: 360,
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

    <div style={{ position: "absolute", left: 92, right: 92, top: 1220 }}>
      <ListRow l="GAWHAR & WOUND" r="BACK" color={C.ink} />
      <ListRow l="NEW PIECES" r="███████" color={C.ink} />
      <ListRow l="END OF SEASON SALE" r="LIMITED STOCK" color={C.ink} />
      <ListRow l="EARLY ACCESS · CHECK SPAM" r={keyTime} color={C.ink} rColor={C.blue} />
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1580, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={mono(24, C.ink)}>THECLOCAL.COM</span>
      <span style={mono(24, C.gray500)}>CAIRO · EST. 2023</span>
    </div>
  </AbsoluteFill>
);
