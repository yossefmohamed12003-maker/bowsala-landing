import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand/theme";
import { clamp, Monogram, Punch, Slam } from "../components/kit";

const LINE_H = 46;

const Row: React.FC<{ l: string; r?: string; color?: string; bold?: boolean }> = ({ l, r = "", color = C.ink, bold }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      height: LINE_H,
      alignItems: "center",
      fontFamily: F.mono,
      fontSize: 27,
      fontWeight: bold ? 700 : 400,
      color,
      whiteSpace: "pre",
    }}
  >
    <span>{l}</span>
    <span>{r}</span>
  </div>
);
const Rule = () => <Row l={"- ".repeat(26)} color={C.gray300} />;

// 12–14s. "END OF SEASON SALE." → "LIMITED STOCK." while a receipt prints out of the slot.
export const S6Sale: React.FC = () => {
  const frame = useCurrentFrame();
  const second = frame >= 30;
  // printer feeds in small steps, like a real thermal printer
  const fed = Math.floor(interpolate(frame, [2, 56], [0, 900], clamp) / 23) * 23;
  const stock = Math.round(interpolate(frame, [30, 56], [100, 7], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 }));
  const SLOT_Y = 1600;

  return (
    <AbsoluteFill style={{ backgroundColor: C.blue }}>
      <Punch hits={[0, 15, 30, 45]} amount={0.035}>
        <AbsoluteFill style={{ padding: "290px 92px 0" }}>
          {!second ? (
            <>
              <Slam at={0} size={78} color={C.cream}>
                End of season
              </Slam>
              <Slam at={8} size={140} color={C.cream}>
                sale.
              </Slam>
            </>
          ) : (
            <>
              <Slam at={30} size={100} color={C.cream}>
                Limited
              </Slam>
              <Slam at={36} size={100} color={C.cream}>
                stock.
              </Slam>
            </>
          )}
        </AbsoluteFill>

        {/* receipt rising out of the printer */}
        <div
          style={{
            position: "absolute",
            left: 170,
            width: 740,
            bottom: 1920 - SLOT_Y,
            height: fed,
            overflow: "hidden",
            backgroundColor: C.creamTint,
            boxShadow: "0 0 40px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ padding: "40px 44px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <Monogram width={80} color={C.ink} />
            </div>
            <Row l="CLOCAL — CAIRO" r="CL/04" bold />
            <Row l="02.10.2026" r="19:00" />
            <Rule />
            <Row l="[ END OF SEASON SALE ]" bold color={C.blue} />
            <Row l="ITEM" r="STOCK" color={C.gray500} />
            <Row l="GAWHAR TEE" r="LOW" />
            <Row l="WOUND TEE" r="LOW" />
            <Row l="██████████" r="███" />
            <Rule />
            <Row l="STOCK REMAINING" r={`${String(stock).padStart(3, "0")}%`} color={second ? C.orange : C.ink} bold />
            <Row l="FREE SHIPPING > EGP 2,000" />
            <div style={{ display: "flex", gap: 3, height: 70, marginTop: 20 }}>
              {[3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 3, 1, 2, 2, 1, 3, 1].map((w, i) => (
                <div key={i} style={{ width: w * 3, backgroundColor: C.ink }} />
              ))}
            </div>
          </div>
        </div>

        {/* printer body */}
        <div
          style={{
            position: "absolute",
            left: 110,
            top: SLOT_Y - 14,
            width: 860,
            height: 230,
            backgroundColor: C.ink,
            borderRadius: 24,
            boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ position: "absolute", left: 50, right: 50, top: 0, height: 14, backgroundColor: "#000" }} />
          <div
            style={{
              position: "absolute",
              right: 46,
              bottom: 40,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: frame % 10 < 5 ? C.orange : "#3A3A38",
            }}
          />
          <div style={{ position: "absolute", left: 46, bottom: 34, fontFamily: F.mono, fontSize: 22, color: C.gray300 }}>
            PRINTING / CL-EOS
          </div>
        </div>
      </Punch>
    </AbsoluteFill>
  );
};
