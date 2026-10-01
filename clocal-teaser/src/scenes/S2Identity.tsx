import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../brand/theme";
import { ArabicMark, clamp, Mono, Plate, Punch, Slam, Wordmark } from "../components/kit";
import { OUT } from "../brand/theme";

// 2–4s. The drop hits. "THE NEW clocal" (echoing the post) → "NEVER BASIC."
export const S2Identity: React.FC = () => {
  const frame = useCurrentFrame();
  const second = frame >= 30;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      {!second ? (
        <Plate src="plates/warehouse-cases.jpg" shade={0.5} push={[1.05, 1.14]} frames={30} />
      ) : (
        <Plate src="plates/archive-case.jpg" shade={0.55} push={[1.12, 1.02]} frames={30} />
      )}
      <Punch hits={[0, 15, 30, 45]} amount={0.05}>
        {!second ? (
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <Slam at={0} size={150} color={C.cream}>
              The new
            </Slam>
            {frame >= 15 ? (
              <div style={{ overflow: "hidden", marginTop: 8 }}>
                <div style={{ translate: `0 ${interpolate(frame, [15, 22], [105, 0], { ...clamp, easing: OUT })}%` }}>
                  <Wordmark width={820} color={C.blue} />
                </div>
              </div>
            ) : (
              <div style={{ height: 186 }} />
            )}
            <Mono at={18} color={C.cream} size={28} style={{ marginTop: 50, textAlign: "center" }}>
              {"A new chapter of elevated essentials\nand statement silhouettes."}
            </Mono>
          </AbsoluteFill>
        ) : (
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
            <Slam at={30} size={180} color={C.cream}>
              Never
            </Slam>
            <Slam at={45} size={180} color={C.cream}>
              basic.
            </Slam>
          </AbsoluteFill>
        )}
      </Punch>
      {/* the secret identity — three frames, for those who look closely */}
      {frame >= 56 && frame < 59 ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", backgroundColor: C.ink }}>
          <ArabicMark width={760} color={C.orange} />
        </AbsoluteFill>
      ) : null}
      <AbsoluteFill style={{ backgroundColor: C.cream, opacity: interpolate(frame, [0, 3], [0.9, 0], clamp) }} />
    </AbsoluteFill>
  );
};
