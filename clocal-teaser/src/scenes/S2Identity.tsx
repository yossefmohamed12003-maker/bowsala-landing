import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../brand/theme";
import { ArabicMark, clamp, Hud, Punch, Slam } from "../components/kit";

// 2–4s. The drop hits. "New identity." on blue → "Same streets." on ink.
export const S2Identity: React.FC = () => {
  const frame = useCurrentFrame();
  const onInk = frame >= 30;
  return (
    <AbsoluteFill style={{ backgroundColor: onInk ? C.ink : C.blue }}>
      <Punch hits={[0, 15, 30, 45]} amount={0.06}>
        {!onInk ? (
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
            <Slam at={0} size={250} color={C.cream}>
              New
            </Slam>
            <Slam at={15} size={200} color={C.cream}>
              identity.
            </Slam>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
            <Slam at={30} size={250} color={C.cream}>
              Same
            </Slam>
            <Slam at={45} size={250} color={C.cream}>
              streets.
            </Slam>
          </AbsoluteFill>
        )}
      </Punch>
      <Hud tone="dark" index={onInk ? "02 / 07" : "01 / 07"} />
      {/* the secret identity — two frames, for those who look closely */}
      {frame >= 56 && frame < 59 ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", backgroundColor: C.ink }}>
          <ArabicMark width={760} color={C.orange} />
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill
        style={{
          backgroundColor: C.cream,
          opacity: interpolate(frame, [0, 3], [0.9, 0], clamp),
        }}
      />
    </AbsoluteFill>
  );
};
