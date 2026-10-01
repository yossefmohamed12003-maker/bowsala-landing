import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { C } from "../brand/theme";
import { clamp } from "../components/kit";

// iPhone-style mockup. The screen is SCREEN_W × SCREEN_H (matches the 720×1560 recording).
export const SCREEN_W = 560;
export const SCREEN_H = Math.round((560 * 1560) / 720);
const BEZEL = 18;
export const PHONE_W = SCREEN_W + BEZEL * 2;
export const PHONE_H = SCREEN_H + BEZEL * 2;

export const Phone: React.FC<{
  x: number;
  y: number;
  zoom?: number;
  focus?: [number, number]; // focus point as fractions of the screen
  children: React.ReactNode;
}> = ({ x, y, zoom = 1, focus = [0.5, 0.5], children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: PHONE_W,
      height: PHONE_H,
      scale: zoom,
      transformOrigin: `${BEZEL + focus[0] * SCREEN_W}px ${BEZEL + focus[1] * SCREEN_H}px`,
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: 86,
        backgroundColor: "#141414",
        boxShadow: "0 0 0 3px #3A3A38, 0 50px 120px rgba(0,0,0,0.6)",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: BEZEL,
        top: BEZEL,
        width: SCREEN_W,
        height: SCREEN_H,
        borderRadius: 70,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {children}
    </div>
    {/* side buttons */}
    <div style={{ position: "absolute", right: -6, top: 300, width: 6, height: 140, borderRadius: 3, backgroundColor: "#2a2a2a" }} />
    <div style={{ position: "absolute", left: -6, top: 260, width: 6, height: 90, borderRadius: 3, backgroundColor: "#2a2a2a" }} />
    <div style={{ position: "absolute", left: -6, top: 370, width: 6, height: 90, borderRadius: 3, backgroundColor: "#2a2a2a" }} />
  </div>
);

// Tap indicator: a dot plus an expanding ring at a point on the screen (fractions).
export const Tap: React.FC<{ at: number; fx: number; fy: number }> = ({ at, fx, fy }) => {
  const frame = useCurrentFrame();
  if (frame < at - 4 || frame > at + 18) return null;
  const t = frame - at;
  const ring = interpolate(t, [0, 16], [30, 130], clamp);
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: fx * SCREEN_W - 32,
          top: fy * SCREEN_H - 32,
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "rgba(246,238,227,0.75)",
          border: `3px solid ${C.blue}`,
          scale: interpolate(t, [-4, 0, 3, 18], [0.4, 1, 0.85, 0.6], clamp),
          opacity: interpolate(t, [-4, -1, 10, 18], [0, 1, 1, 0], clamp),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: fx * SCREEN_W - ring / 2,
          top: fy * SCREEN_H - ring / 2,
          width: ring,
          height: ring,
          borderRadius: ring / 2,
          border: `4px solid ${C.blue}`,
          opacity: interpolate(t, [0, 16], [0.9, 0], clamp),
        }}
      />
    </>
  );
};
