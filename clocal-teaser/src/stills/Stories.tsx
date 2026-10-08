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
// Countdown slot measured from the IG countdown sticker at default scale: 640×365, radius 28.
export const CountdownStory: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    {/* the warehouse set from the live posts */}
    <Img
      src={staticFile("plates/warehouse-cases.jpg")}
      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.82) contrast(1.05)" }}
    />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.15) 30%, rgba(10,10,10,0.15) 55%, rgba(10,10,10,0.7) 100%)" }} />

    {/* frame exactly like the posts */}
    <Corners color={C.cream} len={150} />
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(28, C.cream) }}>{`CL/04\nEARLY ACCESS ${keyTime}`}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
      <div style={{ ...mono(28, C.cream), textAlign: "right" }}>{`${day}\nDROP ${drop}`}</div>
      <div style={{ width: 24, height: 24, backgroundColor: C.blue }} />
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={headline(118, C.cream)}>The drop</div>
    </div>

    <CountdownSlot color={C.cream} top={910} />
  </AbsoluteFill>
);

// ─────────────── COUNTDOWN — alternative directions ───────────────
const CountdownSlot: React.FC<{ color: string; top: number }> = ({ color, top }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center" }}>
    <div
      style={{
        width: 640,
        height: 365,
        borderRadius: 28,
        border: `1.5px dashed ${color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ ...mono(22, color), opacity: 0.45 }}>[ COUNTDOWN ]</span>
    </div>
  </div>
);

// A — pairs with the drop story: same dark ground, the two products up top.
export const CountdownA: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    {[
      ["photos/gawhar-model.jpg", 0],
      ["photos/wound-model.jpg", 543],
    ].map(([src, x]) => (
      <div key={src as string} style={{ position: "absolute", left: x as number, top: 0, width: 537, height: 1000, overflow: "hidden" }}>
        <Img src={staticFile(src as string)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%", scale: 1.2, transformOrigin: "50% 22%" }} />
        <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0) 60%, ${C.ink} 100%)` }} />
      </div>
    ))}
    <Corners color={`${C.cream}99`} len={120} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 1010 }}>
      <div style={mono(22, C.gray300)}>GAWHAR & WOUND — BACK · + NEW PIECES · EOS SALE</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 16 }}>
        <span style={headline(64, C.cream)}>The drop</span>
        <span style={headline(64, C.blue)}>{drop}</span>
      </div>
    </div>
    <CountdownSlot color={C.cream} top={1180} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 1550, display: "flex", justifyContent: "space-between" }}>
      <span style={mono(22, C.cream)}>{`${day} · EARLY ACCESS ${keyTime}`}</span>
      <span style={mono(22, C.gray300)}>THECLOCAL.COM</span>
    </div>
  </AbsoluteFill>
);

// B — one full-bleed campaign photo, almost no type.
export const CountdownB: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img src={staticFile("photos/duo-sofa.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0) 45%, rgba(10,10,10,0.92) 70%, ${C.ink} 100%)` }} />
    <Corners color={`${C.cream}99`} len={120} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 1080 }}>
      <div style={mono(22, C.cream)}>[ THE DROP — CL/04 ]</div>
      <div style={{ ...headline(78, C.cream), marginTop: 12 }}>{`${day}`}</div>
      <div style={headline(78, C.blue)}>{drop}</div>
    </div>
    <CountdownSlot color={C.cream} top={1290} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 1650, display: "flex", justifyContent: "space-between" }}>
      <span style={mono(20, C.cream)}>{`EARLY ACCESS ${keyTime} · CHECK SPAM`}</span>
      <span style={mono(20, C.gray300)}>THECLOCAL.COM</span>
    </div>
  </AbsoluteFill>
);

// C — the website's access card, over the warehouse.
export const CountdownC: React.FC<StoryProps> = ({ day, keyTime, drop }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img src={staticFile("plates/archive-case.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }} />
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: 300,
        backgroundColor: C.cream,
        boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ padding: "26px 36px", borderBottom: `2px solid ${C.ink}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: C.blue }} />
          <span style={mono(20, C.ink)}>[ SECURE CONNECTION ESTABLISHED ]</span>
        </div>
        <span style={mono(20, C.gray500)}>SYS-V.2.0</span>
      </div>
      <div
        style={{
          padding: "50px 50px 46px",
          backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      >
        <div style={mono(24, C.ink)}>{`> UNLOCKS ${day} — ${keyTime}`}</div>
        <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 100, letterSpacing: "-0.035em", lineHeight: 0.95, color: C.ink, textTransform: "uppercase", marginTop: 26 }}>
          [ Access
          <br />
          restricted ]<span style={{ color: C.blue }}>_</span>
        </div>
        <div style={{ ...mono(22, C.ink, { whiteSpace: "normal", lineHeight: 1.6 }), marginTop: 30 }}>
          {`GAWHAR & WOUND ARE BACK. NEW PIECES. END OF SEASON SALE. EARLY ACCESS ${keyTime} — PUBLIC DROP ${drop}.`}
        </div>
        <div
          style={{
            marginTop: 40,
            height: 300,
            borderRadius: 32,
            border: `1.5px dashed ${C.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ ...mono(22, C.ink), opacity: 0.4 }}>[ COUNTDOWN ]</span>
        </div>
        <div style={{ marginTop: 40, paddingTop: 26, borderTop: `2px dashed ${C.ink}`, display: "flex", justifyContent: "space-between" }}>
          <span style={mono(20, C.blue)}>KEY LANDS IN YOUR SPAM</span>
          <span style={mono(20, C.ink)}>[ DOSSIER_ID: CL-EA-2026 ]</span>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────── LIVE STORY — early access is in, public at 5 ───────────────
export const LiveStory: React.FC<StoryProps & { stock: number }> = ({ day, drop, stock }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img src={staticFile("plates/archive-case.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.78) contrast(1.05)" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 28%, rgba(10,10,10,0.4) 58%, rgba(10,10,10,0.88) 72%, rgba(10,10,10,0.92) 100%)" }} />

    <Corners color={C.cream} len={150} />
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(28, C.cream) }}>{"CL/04\nEARLY ACCESS / LIVE"}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
      <div style={{ ...mono(28, C.cream), textAlign: "right" }}>{`${day}\nPUBLIC ${drop}`}</div>
      <div style={{ width: 24, height: 24, backgroundColor: C.orange }} />
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center" }}>
      <div style={headline(96, C.cream)}>Stock is</div>
      <div style={headline(96, C.cream)}>going fast.</div>
    </div>

    <CountdownSlot color={C.cream} top={910} />

    <div style={{ position: "absolute", left: 220, right: 220, top: 1300 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={mono(22, C.cream)}>STOCK REMAINING</span>
        <span style={mono(22, C.orange, { fontWeight: 700 })}>{`${String(stock).padStart(3, "0")}%`}</span>
      </div>
      <div style={{ height: 6, backgroundColor: "rgba(246,238,227,0.25)", marginTop: 12 }}>
        <div style={{ width: `${stock}%`, height: "100%", backgroundColor: C.orange }} />
      </div>
      <div style={{ ...mono(22, C.cream), textAlign: "center", marginTop: 26 }}>{`OPENS TO ALL AT ${drop} — DON'T MISS IT`}</div>
    </div>

    {/* shop now + link sticker slot */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1450, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={headline(44, C.cream)}>Shop now</span>
        <svg width={40} height={44} viewBox="0 0 40 44">
          <path d="M20 2 V38 M6 25 L20 40 L34 25" stroke={C.blue} strokeWidth={7} fill="none" />
        </svg>
      </div>
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
        <span style={{ ...mono(20, C.cream), opacity: 0.5 }}>[ LINK ]</span>
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────── OPEN STORY — public is live, grab your size ───────────────
const Thumb: React.FC<{ src: string; w: number; h: number; pos?: string }> = ({ src, w, h, pos = "50% 50%" }) => (
  <Img src={staticFile(src)} style={{ width: w, height: h, objectFit: "cover", objectPosition: pos, display: "block" }} />
);

const OfferRow: React.FC<{ thumbs: React.ReactNode; title: [string, string]; lines: string; accent?: string }> = ({ thumbs, title, lines, accent }) => (
  <div style={{ display: "flex", gap: 36, padding: "26px 0", borderTop: `1px solid ${C.cream}40` }}>
    <div style={{ display: "flex", gap: 8, width: 268, flexShrink: 0 }}>{thumbs}</div>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={headline(40, C.cream)}>{title[0]}</div>
      <div style={headline(40, C.cream)}>{title[1]}</div>
      <div style={{ ...mono(20, accent ?? C.gray300, { lineHeight: 1.5 }), marginTop: 14 }}>{lines}</div>
    </div>
  </div>
);

export const OpenStory: React.FC<StoryProps> = ({ day }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img src={staticFile("plates/warehouse-cases.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.3) 0%, ${C.ink} 40%)` }} />
    <Corners color={C.cream} len={150} />
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(28, C.cream) }}>{"CL/04\nSTATUS / OPEN"}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
      <div style={{ ...mono(28, C.cream), textAlign: "right" }}>{`${day}\nLIVE NOW`}</div>
      <div style={{ width: 24, height: 24, backgroundColor: C.blue }} />
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 380 }}>
      <div style={headline(84, C.cream)}>It's open.</div>
      <div style={headline(84, C.blue)}>Get your size.</div>
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 590 }}>
      <OfferRow
        thumbs={
          <>
            <Thumb src="photos/gawhar-model.jpg" w={61} h={250} pos="50% 30%" />
            <Thumb src="photos/wound-model.jpg" w={61} h={250} pos="50% 30%" />
            <Thumb src="photos/sleeve.jpg" w={61} h={250} />
            <Thumb src="photos/sleeve-black.jpg" w={61} h={250} />
          </>
        }
        title={["Free pair", "of sleeves"]}
        lines={"WITH EVERY GAWHAR & WOUND\n+ ADD AN EXTRA PAIR\n  IN ANOTHER COLOR"}
      />
      <OfferRow
        thumbs={<Thumb src="photos/sweatpants-grey-flat.jpg" w={268} h={250} pos="50% 40%" />}
        title={["Our first ever", "sweatpants"]}
        lines="NOW LIVE"
        accent={C.cream}
      />
      <OfferRow
        thumbs={<Thumb src="photos/basic-tee-black.jpg" w={268} h={250} pos="50% 25%" />}
        title={["Basic tees", "& tops"]}
        lines="END OF SEASON SALE"
        accent={C.orange}
      />
    </div>

    <div style={{ position: "absolute", left: 0, right: 0, top: 1524, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={headline(44, C.cream)}>Shop now</span>
        <svg width={40} height={44} viewBox="0 0 40 44">
          <path d="M20 2 V38 M6 25 L20 40 L34 25" stroke={C.blue} strokeWidth={7} fill="none" />
        </svg>
      </div>
      <div style={{ width: 500, height: 100, borderRadius: 24, border: `1.5px dashed ${C.cream}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(20, C.cream), opacity: 0.5 }}>[ LINK ]</span>
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────── PROMO STORY — Gawhar only, one code, one CTA ───────────────
export const PromoStory: React.FC<{ code: string; amount: string }> = ({ code, amount }) => (
  <AbsoluteFill style={{ backgroundColor: C.cream }}>
    <Corners color={`${C.ink}99`} len={120} />

    <div style={{ position: "absolute", left: 0, right: 0, top: 290, textAlign: "center" }}>
      <div style={headline(104, C.ink)}>{`${amount} off`}</div>
      <div style={{ ...mono(26, C.ink), marginTop: 18 }}>EVERYTHING ON THECLOCAL.COM</div>
    </div>

    <Img
      src={staticFile("photos/gawhar-flat-cutout.png")}
      style={{
        position: "absolute",
        left: 120,
        top: 520,
        width: 840,
        height: 640,
        objectFit: "contain",
        filter: "drop-shadow(0 28px 36px rgba(10,10,10,0.22))",
      }}
    />

    {/* the code — the one thing to remember */}
    <div style={{ position: "absolute", left: 140, right: 140, top: 1200, backgroundColor: C.blue, padding: "26px 0 30px", textAlign: "center" }}>
      <div style={mono(24, C.cream)}>USE CODE</div>
      <div style={{ ...headline(88, C.cream), letterSpacing: "0.02em", marginTop: 8 }}>{code}</div>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1410, textAlign: "center", ...mono(24, C.ink) }}>FOR 24 HOURS ONLY</div>

    {/* link sticker slot */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1480, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 500, height: 100, borderRadius: 24, border: `1.5px dashed ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(20, C.ink), opacity: 0.4 }}>[ LINK ]</span>
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────── POLL STORY — restock the Dragon Crewneck? ───────────────
export const PollStory: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img src={staticFile("dragon/front.jpg")} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 1440, objectFit: "cover", objectPosition: "50% 20%" }} />
    <AbsoluteFill
      style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.35) 14%, rgba(10,10,10,0) 24%, rgba(10,10,10,0) 58%, ${C.ink} 75%)` }}
    />
    <Corners color={C.cream} len={150} />
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(28, C.cream) }}>{"DRAGON CREWNECK\nLAST SEASON"}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
      <div style={{ ...mono(28, C.cream), textAlign: "right" }}>{"BEST SELLER\nSOLD OUT"}</div>
      <div style={{ width: 24, height: 24, backgroundColor: C.blue }} />
    </div>

    {/* the back print, as a detail */}
    <div style={{ position: "absolute", right: 80, top: 1000, width: 250, rotate: "3deg", backgroundColor: C.cream, padding: 8 }}>
      <Img src={staticFile("dragon/back-print.jpg")} style={{ width: "100%", height: 210, objectFit: "cover", display: "block" }} />
      <div style={{ ...mono(16, C.ink), padding: "8px 2px 0" }}>BACK — DRAGONS</div>
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1170 }}>
      <div style={headline(70, C.cream)}>Bring it</div>
      <div style={headline(70, C.blue)}>back?</div>
    </div>

    {/* poll sticker slot (~640×340) */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1335, display: "flex", justifyContent: "center" }}>
      <div style={{ width: 640, height: 330, borderRadius: 28, border: `1.5px dashed ${C.cream}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(22, C.cream), opacity: 0.5 }}>[ POLL ]</span>
      </div>
    </div>
  </AbsoluteFill>
);
