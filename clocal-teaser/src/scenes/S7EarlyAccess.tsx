import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand/theme";
import { clamp, FrostField, Monogram, Mono, Punch, Slam } from "../components/kit";

const Typed: React.FC<{ at: number; text: string; color: string; cps?: number }> = ({ at, text, color, cps = 1.4 }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const n = Math.min(text.length, Math.floor((frame - at) * cps));
  const caret = Math.floor(frame / 4) % 2 === 0;
  return (
    <div style={{ fontFamily: F.mono, fontSize: 34, letterSpacing: "0.04em", color }}>
      {text.slice(0, n)}
      <span style={{ opacity: caret ? 1 : 0, color: C.blue }}>▌</span>
    </div>
  );
};

// 12–14s. EARLY ACCESS 4:00 PM · password to your inbox · then the build strobe.
export const S7EarlyAccess: React.FC = () => {
  const frame = useCurrentFrame();
  const strobe = frame >= 45;
  const strobeColors = [C.blue, C.ink, C.cream, C.blue];
  const sc = strobeColors[Math.floor((frame - 45) / 2) % strobeColors.length];
  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      <FrostField color={C.ink} drift={1.2} />
      <Punch hits={[0, 15, 30]} amount={0.04}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
          <Mono at={0} color={C.orange} size={28} style={{ marginBottom: 30 }}>
            MEMBERS FIRST
          </Mono>
          <Slam at={0} size={86} color={C.ink}>
            Early access
          </Slam>
          <Slam at={15} size={145} color={C.blue}>
            4:00 PM
          </Slam>
          <div style={{ height: 60 }} />
          <Typed at={26} text="PASSWORD → YOUR INBOX" color={C.ink} />
          <div style={{ height: 18 }} />
          <Mono at={34} color={C.gray500} size={24}>
            SIGN UP ON THECLOCAL.COM
          </Mono>
        </AbsoluteFill>
      </Punch>
      {strobe ? (
        <AbsoluteFill style={{ backgroundColor: sc, alignItems: "center", justifyContent: "center" }}>
          <Monogram width={interpolate(frame, [45, 60], [220, 420], clamp)} color={sc === C.cream ? C.blue : C.cream} />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
