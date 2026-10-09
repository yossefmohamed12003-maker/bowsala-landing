import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F } from "../brand/theme";
import { headline, Wordmark } from "../components/kit";

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

    <div style={{ position: "absolute", left: 92, right: 92, top: 1130 }}>
      <div style={headline(70, C.cream)}>Bring it</div>
      <div style={headline(70, C.blue)}>back?</div>
    </div>

    <PollSlot color={C.cream} top={1332} />
  </AbsoluteFill>
);

// ─────────────── POLL — alternative ideas ───────────────
// Slot measured from the IG poll sticker (2 options, no question line): 562×290, radius 34.
const PollSlot: React.FC<{ color: string; top: number }> = ({ color, top }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center" }}>
    <div style={{ width: 562, height: 290, borderRadius: 34, border: `1.5px dashed ${color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ ...mono(22, color), opacity: 0.5 }}>[ POLL ]</span>
    </div>
  </div>
);

// B — case file: front & back as evidence on cream, the verdict is yours.
export const PollB: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.cream }}>
    <Corners color={`${C.ink}99`} len={120} />
    <div style={{ position: "absolute", left: 92, right: 92, top: 250, display: "flex", justifyContent: "space-between" }}>
      <span style={mono(24, C.ink)}>CASE FILE / DRAGON CREWNECK</span>
      <span style={mono(24, C.orange)}>SOLD OUT</span>
    </div>
    <div style={{ position: "absolute", left: 92, right: 92, top: 320, display: "flex", gap: 16 }}>
      {[
        ["dragon/front.jpg", "50% 35%", "FRONT"],
        ["dragon/back.jpg", "30% 55%", "BACK"],
      ].map(([src, pos, label]) => (
        <div key={label} style={{ flex: 1 }}>
          <Img src={staticFile(src)} style={{ width: "100%", height: 640, objectFit: "cover", objectPosition: pos, display: "block" }} />
          <div style={{ ...mono(20, C.gray500), marginTop: 10 }}>{label}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", left: 92, right: 92, top: 1040 }}>
      <div style={mono(22, C.gray500)}>LAST SEASON'S BEST SELLER</div>
      <div style={{ ...headline(76, C.ink), marginTop: 14 }}>Restock it?</div>
    </div>
    <PollSlot color={C.ink} top={1332} />
  </AbsoluteFill>
);

// C — the SOLD OUT stamp: warehouse portrait, stamped, question underneath.
export const PollC: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img src={staticFile("dragon/warehouse.jpg")} style={{ position: "absolute", left: 0, top: 0, width: "100%", height: 1500, objectFit: "cover", objectPosition: "50% 30%" }} />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0) 18%, rgba(10,10,10,0) 55%, ${C.ink} 78%)` }} />
    <Corners color={C.cream} len={150} />
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(28, C.cream) }}>{"DRAGON CREWNECK\nLAST SEASON / BEST SELLER"}</div>
    <div
      style={{
        position: "absolute",
        left: 250,
        top: 820,
        rotate: "-10deg",
        border: `8px solid ${C.orange}`,
        padding: "8px 30px",
        ...headline(96, C.orange),
        backgroundColor: "rgba(10,10,10,0.25)",
      }}
    >
      SOLD OUT
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 1110, textAlign: "center" }}>
      <div style={headline(70, C.cream)}>Should it</div>
      <div style={headline(70, C.cream)}>come back?</div>
    </div>
    <PollSlot color={C.cream} top={1332} />
  </AbsoluteFill>
);

// D — contact strip: three frames of the Dragon on top, oversized name, poll.
export const PollD: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Corners color={`${C.cream}99`} len={120} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 220, display: "flex", gap: 8, justifyContent: "center" }}>
      {[
        ["dragon/sky.jpg", "50% 40%"],
        ["dragon/girl-low.jpg", "50% 40%"],
        ["dragon/fence.jpg", "60% 40%"],
      ].map(([src, pos]) => (
        <Img key={src} src={staticFile(src)} style={{ width: 340, height: 600, objectFit: "cover", objectPosition: pos }} />
      ))}
    </div>
    <div style={{ position: "absolute", left: 92, right: 92, top: 860, display: "flex", justifyContent: "space-between" }}>
      <span style={mono(22, C.gray300)}>LAST SEASON'S #1</span>
      <span style={mono(22, C.orange)}>STATUS / SOLD OUT</span>
    </div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 920, textAlign: "center" }}>
      <div style={headline(150, C.cream)}>Dragon</div>
      <div style={{ ...mono(26, C.cream), marginTop: 6 }}>CREWNECK — RESTOCK OR NOT?</div>
    </div>
    <PollSlot color={C.cream} top={1332} />
  </AbsoluteFill>
);

// ─────────────── PRICE STORY — Basic Tee, EOS price ───────────────
const STUDIO = "#DDDCE2"; // matches the studio backdrop so the photo bleeds in seamlessly

export const PriceStory: React.FC<{ name: string; was: string; now: string }> = ({ name, was, now }) => (
  <AbsoluteFill style={{ backgroundColor: STUDIO }}>
    {/* model, cropped head to hips, bleeding into the backdrop */}
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 270,
        width: 820,
        height: 960,
        overflow: "hidden",
        WebkitMaskImage: "radial-gradient(ellipse 62% 70% at 50% 42%, #000 62%, transparent 100%)",
        maskImage: "radial-gradient(ellipse 62% 70% at 50% 42%, #000 62%, transparent 100%)",
      }}
    >
      <Img src={staticFile("basic/woman.jpg")} style={{ width: 820, height: "auto", display: "block", marginTop: -20, filter: "brightness(0.97)" }} />
    </div>

    {/* header */}
    <div style={{ position: "absolute", left: 80, right: 80, top: 210, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Wordmark width={170} color={C.ink} />
      <span style={mono(24, C.ink, { letterSpacing: "0.16em" })}>{name}</span>
    </div>

    {/* flat lay, overlapping the model */}
    <Img src={staticFile("basic/flat-cutout.png")} style={{ position: "absolute", left: 600, top: 560, width: 420, filter: "drop-shadow(0 22px 26px rgba(10,10,10,0.25))" }} />
    <div style={{ position: "absolute", right: 80, top: 970, ...mono(20, C.gray500, { textAlign: "right" }) }}>{"FIG. 01 — FRONT\nBLACK"}</div>

    {/* price */}
    <div style={{ position: "absolute", left: 80, right: 80, top: 1210, borderTop: `1.5px solid ${C.ink}33`, paddingTop: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={mono(22, C.ink)}>100% COTTON · RELAXED FIT</span>
        <span style={mono(22, C.orange)}>END OF SEASON</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginTop: 18 }}>
        <span style={mono(24, C.gray500)}>INSTEAD OF</span>
        <span style={{ position: "relative", ...headline(46, C.gray500) }}>
          {was}
          <span style={{ position: "absolute", left: -6, right: -6, top: "48%", height: 5, backgroundColor: C.blue }} />
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginTop: 4 }}>
        <span style={{ ...headline(250, C.ink), lineHeight: 0.86, letterSpacing: "-0.04em" }}>{now}</span>
        <span style={{ ...mono(40, C.ink), marginBottom: 14 }}>EGP</span>
      </div>
    </div>

    {/* link sticker slot */}
    <div style={{ position: "absolute", left: 0, right: 0, top: 1545, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <span style={mono(22, C.blue, { fontWeight: 600, letterSpacing: "0.16em" })}>SHOP NOW ↓</span>
      <div style={{ width: 500, height: 100, borderRadius: 24, border: `1.5px dashed ${C.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ ...mono(20, C.ink), opacity: 0.4 }}>[ LINK ]</span>
      </div>
    </div>
  </AbsoluteFill>
);

// ─────────────── PRICE — premium streetwear directions ───────────────
const Grain2: React.FC<{ opacity?: number }> = ({ opacity = 0.14 }) => (
  <AbsoluteFill
    style={{
      opacity,
      mixBlendMode: "overlay",
      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' seed='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
    }}
  />
);

const LinkSlot: React.FC<{ color: string; top: number; label?: string }> = ({ color, top, label = "[ LINK ]" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top, display: "flex", justifyContent: "center" }}>
    <div style={{ width: 500, height: 100, borderRadius: 24, border: `1.5px dashed ${color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ ...mono(20, color), opacity: 0.5 }}>{label}</span>
    </div>
  </div>
);

// A — editorial: monochrome portrait, tight crop, quiet price.
export const PriceA: React.FC<{ was: string; now: string }> = ({ was, now }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <Img
      src={staticFile("basic/woman.jpg")}
      style={{ position: "absolute", left: -260, top: -120, width: 1600, height: "auto", filter: "grayscale(1) contrast(1.45) brightness(0.72)" }}
    />
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.85) 100%)" }} />
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0) 20%, rgba(10,10,10,0) 50%, ${C.ink} 72%)` }} />
    <Corners color={C.cream} len={150} />
    <div style={{ position: "absolute", left: 92, top: 250, ...mono(26, C.cream) }}>{"CL/04\nNO. 03 — BASIC TEE"}</div>
    <div style={{ position: "absolute", right: 92, top: 250, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
      <div style={{ ...mono(26, C.cream), textAlign: "right" }}>{"100% COTTON\nRELAXED FIT"}</div>
      <div style={{ width: 22, height: 22, backgroundColor: C.blue }} />
    </div>

    <div style={{ position: "absolute", left: 92, right: 92, top: 1210 }}>
      <div style={headline(96, C.cream)}>The basic.</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 26, marginTop: 26, paddingTop: 22, borderTop: `1px solid ${C.cream}40` }}>
        <span style={headline(84, C.cream)}>{`${now} EGP`}</span>
        <span style={{ position: "relative", ...mono(30, C.gray300) }}>
          {was}
          <span style={{ position: "absolute", left: -4, right: -4, top: "50%", height: 3, backgroundColor: C.orange }} />
        </span>
      </div>
      <div style={{ ...mono(20, C.gray300), marginTop: 12 }}>END OF SEASON — WHILE STOCK LASTS</div>
    </div>
    <LinkSlot color={C.cream} top={1560} label="[ SHOP — THECLOCAL.COM ]" />
    <Grain2 />
  </AbsoluteFill>
);

// B — object: the tee alone on ink under a single light, label like a hangtag.
export const PriceB: React.FC<{ was: string; now: string }> = ({ was, now }) => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse 55% 32% at 50% 40%, rgba(246,238,227,0.16) 0%, rgba(10,10,10,0) 100%)" }} />
    <Corners color={`${C.cream}99`} len={120} />
    <div style={{ position: "absolute", left: 0, right: 0, top: 250, textAlign: "center", ...mono(24, C.gray300, { letterSpacing: "0.2em" }) }}>
      CLOCAL — BASIC TEE — BLACK
    </div>
    <Img
      src={staticFile("basic/flat-cutout.png")}
      style={{ position: "absolute", left: 90, top: 360, width: 900, filter: "brightness(1.35) contrast(1.1) drop-shadow(0 40px 60px rgba(0,0,0,0.8))" }}
    />
    {/* hangtag */}
    <div style={{ position: "absolute", left: 640, top: 1030, rotate: "-6deg", width: 300, backgroundColor: C.cream, padding: "22px 24px", boxShadow: "0 20px 40px rgba(0,0,0,0.5)" }}>
      <div style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: C.ink, margin: "0 auto 16px" }} />
      <div style={mono(18, C.gray500)}>EOS PRICE</div>
      <div style={{ ...headline(64, C.ink), marginTop: 6 }}>{now}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
        <span style={mono(18, C.ink)}>EGP</span>
        <span style={{ ...mono(18, C.gray500), textDecoration: `line-through ${C.orange} 2px` }}>{`WAS ${was}`}</span>
      </div>
    </div>
    <div style={{ position: "absolute", left: 92, right: 92, top: 1320 }}>
      <div style={headline(80, C.cream)}>Built to repeat.</div>
      <div style={{ ...mono(22, C.gray300), marginTop: 14 }}>100% COTTON · RELAXED FIT · END OF SEASON</div>
    </div>
    <LinkSlot color={C.cream} top={1540} label="[ SHOP — THECLOCAL.COM ]" />
    <Grain2 opacity={0.1} />
  </AbsoluteFill>
);
