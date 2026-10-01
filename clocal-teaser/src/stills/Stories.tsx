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

const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.12 }) => (
  <AbsoluteFill
    style={{
      opacity,
      mixBlendMode: "overlay",
      pointerEvents: "none",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' seed='7'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
    }}
  />
);

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

const Cross: React.FC<{ x: number; y: number; color: string }> = ({ x, y, color }) => (
  <div style={{ position: "absolute", left: x - 12, top: y - 12, width: 24, height: 24 }}>
    <div style={{ position: "absolute", left: 11, top: 0, width: 2, height: 24, backgroundColor: color }} />
    <div style={{ position: "absolute", left: 0, top: 11, width: 24, height: 2, backgroundColor: color }} />
  </div>
);

const Barcode: React.FC<{ color: string; h?: number; scale?: number }> = ({ color, h = 64, scale = 2.4 }) => (
  <div style={{ display: "flex", gap: 3, height: h }}>
    {[3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1].map((w, i) => (
      <div key={i} style={{ width: w * scale, backgroundColor: color }} />
    ))}
  </div>
);

const Hand: React.FC<{ color: string; size?: number; rot?: number }> = ({ color, size = 96, rot = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ rotate: `${rot}deg` }}>
    <path
      d="M26 6c2.8 0 5 2.2 5 5v17l3-.6c2.6-.5 5 1.3 5.3 3.9l.1.7 2.3-.4c2.5-.4 4.8 1.4 5.1 3.9l.1.6 1.5-.2c2.6-.3 4.9 1.6 5.1 4.2l.5 7.4C55 56 48.5 62 40.6 62H34c-5 0-9.6-2.6-12.2-6.8L12.4 39.8c-1.4-2.3-.7-5.3 1.6-6.7 2.2-1.4 5.1-.8 6.6 1.3L21 35V11c0-2.8 2.2-5 5-5z"
      fill={color}
    />
  </svg>
);

// ───────────────────────── DROP STORY ─────────────────────────
// Echoes the teaser's beats: most wanted are back → + big surprises → EOS sale / limited stock.
const Print: React.FC<{ src?: string; x: number; y: number; w: number; h: number; rot: number; label: string; redacted?: boolean }> = ({
  src,
  x,
  y,
  w,
  h,
  rot,
  label,
  redacted,
}) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, rotate: `${rot}deg` }}>
    <div style={{ backgroundColor: C.creamTint, padding: 10, boxShadow: "0 22px 40px rgba(0,0,0,0.55)", position: "relative" }}>
      <div style={{ width: w - 20, height: h, overflow: "hidden", position: "relative", backgroundColor: C.ink }}>
        {src ? (
          <Img
            src={staticFile(src)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 22%",
              filter: redacted ? "blur(14px) grayscale(1) brightness(0.6)" : "contrast(1.08)",
            }}
          />
        ) : null}
        {redacted ? (
          <>
            <div style={{ position: "absolute", left: 0, right: 0, top: "34%", height: "30%", backgroundColor: C.ink }} />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                translate: "-50% -50%",
                rotate: "-14deg",
                border: `5px solid ${C.orange}`,
                padding: "6px 14px",
                ...headline(34, C.orange),
                backgroundColor: "rgba(10,10,10,0.6)",
              }}
            >
              CLASSIFIED
            </div>
          </>
        ) : null}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px 2px" }}>
        <span style={mono(18, C.ink, { fontWeight: 600 })}>{label}</span>
        <span style={mono(18, C.orange)}>CL/04</span>
      </div>
    </div>
  </div>
);

export const DropStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img
      src={staticFile("plates/warehouse-cases.jpg")}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.2, filter: "grayscale(0.3) blur(2px)" }}
    />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.2) 30%, ${C.ink} 75%)` }} />
    <Corners color={C.cream} />

    <div style={{ position: "absolute", left: 92, top: 250, ...mono(26, C.cream) }}>{"FILE 02 / CL/04\nTHE DROP"}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      <div style={{ ...mono(26, C.cream), textAlign: "right" }}>{"OCTOBER 2026\nSTATUS / UNLOCKING"}</div>
      <div style={{ width: 22, height: 22, backgroundColor: C.blue }} />
    </div>

    {/* the most wanted are back */}
    <div style={{ position: "absolute", left: 92, right: 92, top: 372 }}>
      <div style={headline(66, C.cream)}>The most wanted</div>
      <div style={headline(66, C.blue)}>are back.</div>
    </div>

    {/* prints: Gawhar, Wound, + new (classified) */}
    <Print src="photos/gawhar-model.jpg" x={52} y={548} w={318} h={380} rot={-4} label="NO.01 GAWHAR" />
    <Print src="photos/wound-model.jpg" x={381} y={530} w={318} h={380} rot={1.5} label="NO.02 WOUND" />
    <Print src="photos/look-black.jpg" x={710} y={556} w={318} h={380} rot={4.5} label="NO.03 ██████" redacted />
    <div
      style={{
        position: "absolute",
        right: 70,
        top: 990,
        display: "flex",
        alignItems: "baseline",
        gap: 10,
        rotate: "4deg",
      }}
    >
      <span style={headline(44, C.blue)}>+</span>
      <span style={headline(40, C.cream)}>Big surprises.</span>
    </div>

    {/* end of season sale band */}
    <div
      style={{
        position: "absolute",
        left: -40,
        right: -40,
        top: 1080,
        height: 236,
        backgroundColor: C.blue,
        rotate: "-2.5deg",
        padding: "26px 132px",
        boxShadow: "0 24px 50px rgba(0,0,0,0.5)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={mono(24, C.cream)}>[ END OF SEASON SALE ]</span>
        <span style={mono(24, C.cream)}>FREE SHIPPING &gt; EGP 2,000</span>
      </div>
      <div style={{ ...headline(76, C.cream), marginTop: 10 }}>Limited stock.</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 14 }}>
        <span style={mono(20, C.cream)}>STOCK REMAINING</span>
        <div style={{ flex: 1, height: 8, backgroundColor: "rgba(246,238,227,0.3)" }}>
          <div style={{ width: "7%", height: "100%", backgroundColor: C.orange }} />
        </div>
        <span style={mono(22, C.orange, { fontWeight: 700 })}>007%</span>
      </div>
    </div>

    {/* the drop */}
    <div style={{ position: "absolute", left: 92, right: 92, top: 1350 }}>
      <div style={mono(26, C.orange)}>[ THE DROP ]</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 8 }}>
        <span style={headline(62, C.cream)}>{day}</span>
        <span style={{ ...headline(62, C.cream), borderBottom: `6px solid ${C.blue}` }}>{drop}</span>
      </div>
      <div style={{ ...mono(20, C.gray300), marginTop: 10 }}>{`EARLY ACCESS ${keyTime} · KEY LANDS IN YOUR SPAM`}</div>
    </div>

    {/* link slot */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1520, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ ...caps(22, C.cream), display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ color: C.blue }}>↓</span>
        <span>Tap · theclocal.com</span>
        <span style={{ color: C.blue }}>↓</span>
      </div>
      <div style={{ position: "relative", marginTop: 12 }}>
        <div
          style={{
            width: 700,
            height: 104,
            borderRadius: 52,
            border: `3px solid ${C.blue}`,
            boxShadow: "0 0 0 9px rgba(43,0,255,0.18), 0 0 56px rgba(43,0,255,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...mono(20, C.cream), opacity: 0.45 }}>[ LINK STICKER ]</span>
        </div>
        <div style={{ position: "absolute", right: -66, top: 40 }}>
          <Hand color={C.cream} size={96} rot={-28} />
        </div>
      </div>
    </div>
    <Grain />
  </AbsoluteFill>
);

// ─────────────────────── EARLY ACCESS STORY ───────────────────────
const Padlock: React.FC<{ color: string; size?: number }> = ({ color, size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64">
    <path d="M20 28V20a12 12 0 0 1 24 0v8" stroke={color} strokeWidth={6} fill="none" />
    <rect x={12} y={28} width={40} height={30} fill={color} />
    <rect x={30} y={38} width={4} height={10} fill={C.ink} />
  </svg>
);

const Node: React.FC<{ time: string; label: string; color: string; filled: boolean }> = ({ time, label, color, filled }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 280 }}>
    <div style={{ width: 34, height: 34, borderRadius: 17, border: `4px solid ${color}`, backgroundColor: filled ? color : C.cream }} />
    <div style={{ ...headline(44, color) }}>{time}</div>
    <div style={{ ...mono(21, C.ink), textAlign: "center" }}>{label}</div>
  </div>
);

export const EarlyAccessStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill
    style={{
      backgroundColor: C.cream,
      backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    }}
  >
    {/* ink head block */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 790, backgroundColor: C.ink, overflow: "hidden" }}>
      <Img
        src={staticFile("plates/archive-case.jpg")}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.14, filter: "grayscale(0.4)" }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 240,
          padding: "20px 92px",
          borderTop: `1px solid ${C.cream}55`,
          borderBottom: `1px solid ${C.cream}55`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: C.blue, boxShadow: `0 0 16px ${C.blue}` }} />
          <span style={caps(22, C.cream, { fontWeight: 500 })}>[ Secure connection established ]</span>
        </div>
        <span style={caps(20, C.gray300, { fontWeight: 500 })}>SYS-V.2.0</span>
      </div>
      <div style={{ position: "absolute", left: 92, right: 92, top: 370, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <div style={caps(26, C.cream, { fontWeight: 500 })}>&gt; System unlocks at {keyTime}</div>
          <div
            style={{
              fontFamily: F.display,
              fontWeight: 900,
              fontSize: 122,
              letterSpacing: "-0.035em",
              lineHeight: 0.95,
              color: C.cream,
              textTransform: "uppercase",
              marginTop: 22,
            }}
          >
            [ Early
            <br />
            access ]<span style={{ color: C.blue }}>_</span>
          </div>
        </div>
        <div style={{ marginBottom: 12 }}>
          <Padlock color={C.blue} size={124} />
        </div>
      </div>
    </div>

    {/* countdown window */}
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: 840,
        border: `3px solid ${C.ink}`,
        backgroundColor: C.creamTint,
        boxShadow: "14px 14px 0 rgba(10,10,10,0.9)",
      }}
    >
      <div style={{ backgroundColor: C.ink, padding: "16px 26px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[C.orange, C.cream, C.blue].map((c) => (
            <div key={c} style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: c }} />
          ))}
        </div>
        <span style={caps(20, C.cream, { fontWeight: 500 })}>T-minus / CL-EA-2026</span>
      </div>
      <div style={{ position: "relative", height: 340, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Cross x={28} y={28} color={C.ink} />
        <Cross x={912} y={28} color={C.ink} />
        <Cross x={28} y={312} color={C.ink} />
        <Cross x={912} y={312} color={C.ink} />
        <div
          style={{
            width: 780,
            height: 250,
            border: `3px dashed ${C.blue}`,
            backgroundColor: "rgba(43,0,255,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span style={caps(22, C.blue)}>↓ Set your reminder ↓</span>
          <span style={{ ...mono(22, C.blue), opacity: 0.55 }}>[ COUNTDOWN STICKER ]</span>
        </div>
      </div>
    </div>

    {/* timeline */}
    <div style={{ position: "absolute", left: 70, right: 70, top: 1290 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={mono(24, C.orange)}>[ THE SCHEDULE ]</span>
        <span style={mono(24, C.ink, { fontWeight: 700 })}>{day}</span>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 140, right: 140, top: 16, height: 3, backgroundColor: C.ink }} />
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <Node time={keyTime} label={"KEY HITS\nYOUR SPAM"} color={C.orange} filled />
          <Node time={keyTime} label={"EARLY ACCESS\nOPENS"} color={C.blue} filled />
          <Node time={drop} label={"PUBLIC\nDROP"} color={C.ink} filled={false} />
        </div>
      </div>
    </div>

    {/* footer */}
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: 1590,
        paddingTop: 24,
        borderTop: `2px dashed ${C.ink}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Barcode color={C.ink} h={56} scale={2.2} />
      <div style={{ ...headline(40, C.ink) }}>THECLOCAL.COM</div>
    </div>
    <Grain opacity={0.08} />
  </AbsoluteFill>
);
