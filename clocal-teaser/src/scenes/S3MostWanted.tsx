import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, F } from "../brand/theme";
import { clamp, Punch, Slam } from "../components/kit";

// A contact sheet on a light table; a loupe finds the two most-wanted frames.
const THUMBS = [
  "photos/look-wood.jpg",
  "photos/duo-sofa.jpg",
  "photos/look-black.jpg",
  "photos/gawhar-flat.jpg", // 3 — circled
  "photos/post-cl02.jpg",
  "photos/look-grey.jpg",
  "photos/duo-sofa-2.jpg",
  "photos/wound-model.jpg", // 7 — circled
  "photos/post-thenew.jpg",
];
const COLS = 3;
const SHEET = { x: 150, y: 690, w: 780, rot: -1.5 };
const CELL_W = 216;
const CELL_H = 268;
const GAP_X = 30;
const GAP_Y = 46;
const PAD = 35;

const cellCenter = (i: number) => ({
  x: SHEET.x + PAD + (i % COLS) * (CELL_W + GAP_X) + CELL_W / 2,
  y: SHEET.y + PAD + Math.floor(i / COLS) * (CELL_H + GAP_Y) + CELL_H / 2,
});

const Circle: React.FC<{ i: number; from: number }> = ({ i, from }) => {
  const frame = useCurrentFrame();
  const c = cellCenter(i);
  const rx = CELL_W * 0.62;
  const ry = CELL_H * 0.6;
  const len = 2 * Math.PI * Math.sqrt((rx * rx + ry * ry) / 2) * 1.12;
  const p = interpolate(frame, [from, from + 8], [0, 1], clamp);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <ellipse
        cx={c.x}
        cy={c.y}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={C.orange}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={len}
        strokeDashoffset={len * (1 - p)}
        transform={`rotate(-8 ${c.x} ${c.y})`}
      />
    </svg>
  );
};

const Sheet: React.FC = () => (
  <AbsoluteFill>
    <div
      style={{
        position: "absolute",
        left: SHEET.x,
        top: SHEET.y,
        width: SHEET.w,
        padding: PAD,
        backgroundColor: C.creamTint,
        boxShadow: "0 18px 40px rgba(0,0,0,0.18)",
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELL_W}px)`,
        columnGap: GAP_X,
        rowGap: GAP_Y,
      }}
    >
      {THUMBS.map((src, i) => (
        <div key={i} style={{ position: "relative" }}>
          <Img src={staticFile(src)} style={{ width: CELL_W, height: CELL_H, objectFit: "cover", display: "block" }} />
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: -32,
              fontFamily: F.mono,
              fontSize: 18,
              color: C.orange,
              letterSpacing: "0.04em",
              whiteSpace: "pre",
            }}
          >
            {`${String(i + 1).padStart(2, "0")}A   CL/04`}
          </div>
        </div>
      ))}
    </div>
    <Circle i={3} from={6} />
    <Circle i={7} from={34} />
  </AbsoluteFill>
);

const Loupe: React.FC<{ x: number; y: number; r: number; mag: number }> = ({ x, y, r, mag }) => (
  <>
    <div
      style={{
        position: "absolute",
        left: x - r + 26,
        top: y - r + 34,
        width: 2 * r,
        height: 2 * r,
        borderRadius: r,
        backgroundColor: "rgba(0,0,0,0.28)",
        filter: "blur(18px)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: x - r,
        top: y - r,
        width: 2 * r,
        height: 2 * r,
        borderRadius: r,
        overflow: "hidden",
        border: `16px solid ${C.ink}`,
        boxSizing: "border-box",
        backgroundColor: C.creamTint,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -(x - r) - 16,
          top: -(y - r) - 16,
          width: 1080,
          height: 1920,
          transformOrigin: `${x}px ${y}px`,
          scale: mag,
        }}
      >
        <Sheet />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: r,
          background: "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 40%)",
        }}
      />
    </div>
  </>
);

// 6–8s. A loupe over the contact sheet: "THE MOST WANTED / ARE BACK."
export const S3MostWanted: React.FC = () => {
  const frame = useCurrentFrame();
  const a = cellCenter(3);
  const b = cellCenter(7);
  const ease = (t: number) => 1 - (1 - t) ** 4;
  const lx = interpolate(frame, [0, 10, 28, 36], [a.x + 260, a.x, a.x + 6, b.x], { ...clamp, easing: ease });
  const ly = interpolate(frame, [0, 10, 28, 36], [a.y + 380, a.y, a.y - 4, b.y], { ...clamp, easing: ease });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 45%, #FFFDF8 0%, ${C.creamTint} 45%, ${C.creamDeep} 100%)`,
      }}
    >
      <Punch hits={[0, 30]} amount={0.03}>
        <AbsoluteFill style={{ rotate: `${SHEET.rot}deg` }}>
          <Sheet />
          <Loupe x={lx} y={ly} r={210} mag={2.3} />
        </AbsoluteFill>
        <AbsoluteFill style={{ padding: "270px 92px 0" }}>
          <Slam at={0} size={100} color={C.ink}>
            The most
          </Slam>
          <Slam at={6} size={100} color={C.ink}>
            wanted
          </Slam>
          <Slam at={30} size={100} color={C.blue}>
            are back.
          </Slam>
        </AbsoluteFill>
      </Punch>
    </AbsoluteFill>
  );
};
