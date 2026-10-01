import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand/theme";
import { clamp, Flash, Hud, Label, Punch, Slam } from "../components/kit";

// 10–12s. "End of season sale." on blue → "Limited stock." on ink with a draining counter.
export const S6Sale: React.FC = () => {
  const frame = useCurrentFrame();
  const second = frame >= 30;
  const stock = Math.round(interpolate(frame, [32, 58], [100, 7], { ...clamp, easing: (t) => 1 - (1 - t) ** 3 }));
  return (
    <AbsoluteFill style={{ backgroundColor: second ? C.ink : C.blue }}>
      <Punch hits={[0, 8, 15, 30, 45]} amount={0.045}>
        {!second ? (
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
            <Slam at={0} size={200} color={C.cream}>
              End of
            </Slam>
            <Slam at={8} size={200} color={C.cream}>
              season
            </Slam>
            <Slam at={15} size={200} color={C.cream}>
              sale.
            </Slam>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
            <Slam at={30} size={230} color={C.cream}>
              Limited
            </Slam>
            <Slam at={38} size={230} color={C.cream}>
              stock.
            </Slam>
            <div style={{ marginTop: 50, display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", width: 920 }}>
                <Label at={32} color={C.gray300} size={26}>
                  Stock remaining
                </Label>
                <div
                  style={{
                    fontFamily: F.tech,
                    fontWeight: 600,
                    fontSize: 26,
                    letterSpacing: "0.16em",
                    color: C.orange,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {String(stock).padStart(3, "0")}%
                </div>
              </div>
              <div style={{ width: 920, height: 6, backgroundColor: "#3A3A38" }}>
                <div style={{ width: `${stock}%`, height: "100%", backgroundColor: C.orange }} />
              </div>
            </div>
          </AbsoluteFill>
        )}
      </Punch>
      <Hud tone="dark" index="06 / 07" />
      <Flash at={30} color={C.cream} frames={1} />
    </AbsoluteFill>
  );
};
