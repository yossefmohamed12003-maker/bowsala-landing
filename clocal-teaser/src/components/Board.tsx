import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F } from "../brand/theme";
import { ArabicMark, Monogram, Wordmark } from "./kit";

// The evidence board: every campaign photo and brand artefact pinned to felt and tied
// together with string. Coordinates are in board space (BOARD_W × BOARD_H).
export const BOARD_W = 2200;
export const BOARD_H = 1500;
const PHOTO_RATIO = 4 / 3; // all prints are 3:4 portrait

type Item = {
  id: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  rot: number;
  photo?: string;
  card?: React.ReactNode;
  cardBg?: string;
};

const swatches = [C.blue, C.ink, C.cream, C.orange];

export const ITEMS: Item[] = [
  { id: "gawhar", x: 90, y: 90, w: 330, rot: -3, photo: "photos/gawhar-flat.jpg" },
  { id: "duo", x: 470, y: 60, w: 360, rot: 2, photo: "photos/duo-sofa.jpg" },
  { id: "post-new", x: 880, y: 110, w: 330, rot: -1.5, photo: "photos/post-thenew.jpg" },
  { id: "wound", x: 1260, y: 70, w: 320, rot: 3, photo: "photos/wound-model.jpg" },
  { id: "post-cl03", x: 1640, y: 100, w: 340, rot: -2, photo: "photos/post-cl03.jpg" },

  {
    id: "swatch",
    x: 110,
    y: 620,
    w: 340,
    h: 250,
    rot: 2.5,
    cardBg: C.creamTint,
    card: (
      <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 16, height: "100%" }}>
        <div style={{ display: "flex", gap: 10, flex: 1 }}>
          {swatches.map((s) => (
            <div key={s} style={{ flex: 1, backgroundColor: s, border: `1px solid ${C.hairline}` }} />
          ))}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: C.ink }}>60 / 30 / 10 — ONE FLASH</div>
      </div>
    ),
  },
  {
    id: "wordmark",
    x: 520,
    y: 650,
    w: 470,
    h: 260,
    rot: -2,
    cardBg: C.cream,
    card: (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Wordmark width={360} color={C.blue} />
      </AbsoluteFill>
    ),
  },
  { id: "gawhar-model", x: 1040, y: 590, w: 300, rot: 2, photo: "photos/gawhar-model.jpg" },
  {
    id: "arabic",
    x: 1400,
    y: 660,
    w: 380,
    h: 230,
    rot: -3,
    cardBg: C.ink,
    card: (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <ArabicMark width={260} color={C.orange} />
      </AbsoluteFill>
    ),
  },
  { id: "post-cl02", x: 1830, y: 600, w: 300, rot: 2.5, photo: "photos/post-cl02.jpg" },

  { id: "look-black", x: 100, y: 990, w: 270, rot: -2, photo: "photos/look-black.jpg" },
  {
    id: "note",
    x: 430,
    y: 1080,
    w: 380,
    h: 230,
    rot: 3,
    cardBg: C.creamTint,
    card: (
      <div style={{ padding: 26, fontFamily: F.mono, fontSize: 24, lineHeight: 1.5, color: C.ink, whiteSpace: "pre" }}>
        {"FILE 02 / CL/04\nMATERIAL / UNKNOWN\nSTATUS / LOCKED"}
        <div style={{ width: 18, height: 18, backgroundColor: C.blue, marginTop: 14 }} />
      </div>
    ),
  },
  { id: "look-wood", x: 880, y: 1000, w: 270, rot: -1, photo: "photos/look-wood.jpg" },
  { id: "look-grey", x: 1210, y: 980, w: 270, rot: 2, photo: "photos/look-grey.jpg" },
  {
    id: "ticket",
    x: 1540,
    y: 1120,
    w: 330,
    h: 170,
    rot: -2.5,
    cardBg: C.cream,
    card: (
      <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 3, height: 70 }}>
          {[3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2].map((w, i) => (
            <div key={i} style={{ width: w * 2, backgroundColor: C.ink }} />
          ))}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 18, color: C.ink }}>[ DOSSIER_ID: CL-EA-2026 ]</div>
      </div>
    ),
  },
  {
    id: "tag",
    x: 1930,
    y: 1060,
    w: 190,
    h: 250,
    rot: 4,
    cardBg: C.blue,
    card: (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Monogram width={110} color={C.cream} />
      </AbsoluteFill>
    ),
  },
];

const heightOf = (it: Item) => it.h ?? it.w * PHOTO_RATIO;
export const centerOf = (id: string) => {
  const it = ITEMS.find((i) => i.id === id)!;
  return { x: it.x + it.w / 2, y: it.y + heightOf(it) / 2, w: it.w, h: heightOf(it) };
};
const pinOf = (it: Item) => ({ x: it.x + it.w / 2, y: it.y + 18 });

// String network (pairs of item ids).
const STRINGS: [string, string][] = [
  ["gawhar", "duo"],
  ["duo", "wordmark"],
  ["gawhar", "swatch"],
  ["swatch", "wordmark"],
  ["post-new", "wordmark"],
  ["post-new", "gawhar-model"],
  ["wound", "gawhar-model"],
  ["wound", "arabic"],
  ["post-cl03", "arabic"],
  ["arabic", "post-cl02"],
  ["post-cl02", "tag"],
  ["gawhar-model", "look-wood"],
  ["wordmark", "note"],
  ["note", "look-black"],
  ["note", "look-wood"],
  ["look-grey", "ticket"],
  ["arabic", "look-grey"],
  ["ticket", "tag"],
  ["duo", "post-new"],
];

const Pin: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div
    style={{
      position: "absolute",
      left: x - 11,
      top: y - 11,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: C.orange,
      boxShadow: "0 3px 5px rgba(0,0,0,0.35), inset -3px -3px 0 rgba(0,0,0,0.18)",
    }}
  />
);

export const Board: React.FC = () => {
  const byId = Object.fromEntries(ITEMS.map((i) => [i.id, i]));
  return (
    <div
      style={{
        position: "absolute",
        width: BOARD_W,
        height: BOARD_H,
        backgroundColor: C.creamTint,
        padding: 36,
        boxShadow: "0 40px 90px rgba(0,0,0,0.28)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundColor: C.hairline,
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "6px 6px, 9px 9px",
          overflow: "hidden",
        }}
      >
        {ITEMS.map((it) => (
          <div
            key={it.id}
            style={{
              position: "absolute",
              left: it.x - 36,
              top: it.y - 36,
              width: it.w,
              height: heightOf(it),
              rotate: `${it.rot}deg`,
              backgroundColor: it.cardBg ?? "#fff",
              padding: it.photo ? 10 : 0,
              boxShadow: "0 8px 18px rgba(0,0,0,0.22)",
              overflow: "hidden",
            }}
          >
            {it.photo ? (
              <Img src={staticFile(it.photo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ position: "relative", width: "100%", height: "100%" }}>{it.card}</div>
            )}
          </div>
        ))}
        <svg width={BOARD_W} height={BOARD_H} style={{ position: "absolute", left: -36, top: -36 }}>
          {STRINGS.map(([a, b]) => {
            const p = pinOf(byId[a]);
            const q = pinOf(byId[b]);
            return <line key={a + b} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={C.orange} strokeWidth={3} opacity={0.85} />;
          })}
        </svg>
        <div style={{ position: "absolute", left: -36, top: -36 }}>
          {ITEMS.map((it) => {
            const p = pinOf(it);
            return <Pin key={it.id} x={p.x} y={p.y} />;
          })}
        </div>
      </div>
    </div>
  );
};

// Places the board under a camera: (cx, cy) in board space lands at frame centre, at `zoom`.
export const BoardCamera: React.FC<{ cx: number; cy: number; zoom: number; blur?: number }> = ({
  cx,
  cy,
  zoom,
  blur = 0,
}) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse at 50% 40%, ${C.creamTint} 0%, ${C.creamDeep} 55%, #D9CDBB 100%)`,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 540,
        top: 960,
        width: 0,
        height: 0,
        scale: zoom,
        filter: blur > 0.3 ? `blur(${blur}px)` : undefined,
      }}
    >
      <div style={{ position: "absolute", left: -cx, top: -cy }}>
        <Board />
      </div>
    </div>
  </AbsoluteFill>
);
