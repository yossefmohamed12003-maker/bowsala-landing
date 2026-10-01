import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F } from "../brand/theme";
import { headline, Monogram } from "../components/kit";

// Instagram story stills (1080×1920). Key content sits inside the IG safe zone
// (≈250px clear at top and bottom). Dashed boxes mark where the IG link / countdown
// stickers go — they're covered by the sticker once posted.

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
  fontWeight: 500,
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

// Placeholder for an IG sticker: dashed frame + label (the sticker sits on top).
const StickerSlot: React.FC<{ w: number; h: number; label: string; color: string; style?: React.CSSProperties }> = ({
  w,
  h,
  label,
  color,
  style,
}) => (
  <div
    style={{
      width: w,
      height: h,
      border: `3px dashed ${color}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    <span style={{ ...mono(24, color), opacity: 0.6 }}>{label}</span>
  </div>
);

const Arrow: React.FC<{ color: string; size?: number }> = ({ color, size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M32 6 V50 M14 34 L32 54 L50 34" stroke={color} strokeWidth={6} fill="none" strokeLinecap="square" />
  </svg>
);

const Row: React.FC<{ l: string; r: string; color: string; accent?: string }> = ({ l, r, color, accent }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "13px 0", borderBottom: `1px solid ${color}33` }}>
    <span style={mono(28, color)}>{l}</span>
    <span style={mono(28, accent ?? color, { fontWeight: 600 })}>{r}</span>
  </div>
);

// ───────────────────────── DROP STORY ─────────────────────────
export const DropStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img
      src={staticFile("photos/gawhar-model.jpg")}
      style={{
        position: "absolute",
        width: "100%",
        height: 1500,
        objectFit: "cover",
        objectPosition: "50% 20%",
        filter: "contrast(1.08) saturate(0.9)",
      }}
    />
    {/* fade the photo into ink for the info block */}
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0) 34%, ${C.ink} 62%)` }} />
    <Corners color={C.cream} />

    {/* top labels (below the IG header) */}
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(26, C.ink) }}>{"FILE 02 / CL/04\nNO. 01 — GAWHAR"}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      <div style={{ ...mono(26, C.ink), textAlign: "right" }}>{"OCTOBER 2026\nSTATUS / UNLOCKING"}</div>
      <div style={{ width: 22, height: 22, backgroundColor: C.blue }} />
    </div>

    {/* info block */}
    <div style={{ position: "absolute", left: 92, right: 92, top: 830 }}>
      <div style={mono(28, C.orange)}>[ THE DROP ]</div>
      <div style={{ ...headline(104, C.cream), marginTop: 14 }}>{day}</div>
      <div style={{ ...headline(130, C.blue) }}>{drop}</div>
      <div style={{ marginTop: 26 }}>
        <Row l="EARLY ACCESS" r={keyTime} color={C.cream} />
        <Row l="KEY → YOUR INBOX" r="CHECK SPAM" color={C.cream} accent={C.orange} />
        <Row l="PUBLIC DROP" r={drop} color={C.cream} />
      </div>
      <div style={{ ...headline(64, C.cream), marginTop: 34, textAlign: "center" }}>THECLOCAL.COM</div>
    </div>

    {/* link sticker slot + "tap here" marks */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <Arrow color={C.blue} size={52} />
        <span style={caps(30, C.cream, { fontWeight: 600 })}>Tap the link</span>
        <Arrow color={C.blue} size={52} />
      </div>
      <StickerSlot w={760} h={150} label="[ LINK STICKER ]" color={C.cream} />
    </div>
  </AbsoluteFill>
);

// ─────────────────────── EARLY ACCESS STORY ───────────────────────
const BARS = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1];

export const EarlyAccessStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill
    style={{
      backgroundColor: C.cream,
      backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}
  >
    <Corners color={C.ink} />
    {/* header strip like the site */}
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 230,
        padding: "22px 92px",
        borderTop: `2px solid ${C.ink}`,
        borderBottom: `2px solid ${C.ink}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: C.creamTint,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: C.blue }} />
        <span style={caps(22, C.ink)}>[ Secure connection established ]</span>
      </div>
      <span style={caps(20, C.gray500)}>CL/04</span>
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 360 }}>
      <div style={caps(28, C.ink)}>&gt; System unlocks at {keyTime}</div>
      <div
        style={{
          fontFamily: F.display,
          fontWeight: 900,
          fontSize: 128,
          letterSpacing: "-0.035em",
          lineHeight: 0.95,
          color: C.ink,
          textTransform: "uppercase",
          marginTop: 22,
        }}
      >
        [ Early
        <br />
        access ]<span style={{ color: C.blue }}>_</span>
      </div>
    </div>

    {/* countdown sticker slot */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 720, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <span style={caps(24, C.blue, { fontWeight: 600 })}>↓ Set your reminder ↓</span>
      <StickerSlot w={900} h={380} label="[ COUNTDOWN STICKER ]" color={C.blue} style={{ backgroundColor: "rgba(43,0,255,0.04)" }} />
    </div>

    {/* schedule */}
    <div style={{ position: "absolute", left: 92, right: 92, top: 1170 }}>
      <Row l="KEY + EARLY ACCESS" r={keyTime} color={C.ink} accent={C.blue} />
      <Row l="KEY LANDS IN" r="YOUR SPAM" color={C.ink} accent={C.orange} />
      <Row l="PUBLIC DROP" r={drop} color={C.ink} />
      <Row l="DATE" r={day} color={C.ink} />
      <div style={{ ...headline(60, C.ink), marginTop: 30, textAlign: "center" }}>THECLOCAL.COM</div>
    </div>

    {/* footer like the site card */}
    <div
      style={{
        position: "absolute",
        left: 92,
        right: 92,
        top: 1560,
        paddingTop: 26,
        borderTop: `2px dashed ${C.ink}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 3, height: 60 }}>
        {BARS.map((w, i) => (
          <div key={i} style={{ width: w * 2.5, backgroundColor: C.ink }} />
        ))}
      </div>
      <Monogram width={70} color={C.ink} />
      <span style={caps(20, C.ink, { fontWeight: 600 })}>[ Dossier_ID: CL-EA-2026 ]</span>
    </div>
  </AbsoluteFill>
);

