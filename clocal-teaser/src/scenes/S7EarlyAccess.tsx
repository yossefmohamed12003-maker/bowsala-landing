import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand/theme";
import { clamp, FrostField, Hud, Label, Monogram, Punch, Slam } from "../components/kit";

const Typed: React.FC<{ at: number; text: string; color: string; cps?: number }> = ({ at, text, color, cps = 1.4 }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const n = Math.min(text.length, Math.floor((frame - at) * cps));
  const caret = Math.floor(frame / 4) % 2 === 0;
  return (
    <div style={{ fontFamily: F.tech, fontWeight: 500, fontSize: 34, letterSpacing: "0.16em", color }}>
      {text.slice(0, n)}
      <span style={{ opacity: caret ? 1 : 0, color: C.orange }}>▌</span>
    </div>
  );
};

// 12–14s. Early access 4:00 PM · password to your inbox · then the build strobe.
export const S7EarlyAccess: React.FC = () => {
  const frame = useCurrentFrame();
  const strobe = frame >= 45;
  const strobeColors = [C.blue, C.ink, C.cream, C.blue];
  const sc = strobeColors[Math.floor((frame - 45) / 2) % strobeColors.length];
  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      <FrostField color={C.ink} drift={1.2} />
      <Punch hits={[0, 15, 30]} amount={0.04}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
          <Label at={0} color={C.orange} size={28} style={{ marginBottom: 30 }}>
            Members first
          </Label>
          <Slam at={0} size={150} color={C.ink}>
            Early access
          </Slam>
          <Slam at={15} size={235} color={C.blue}>
            4:00 PM
          </Slam>
          <div style={{ height: 60 }} />
          <Typed at={26} text="PASSWORD → YOUR INBOX" color={C.ink} />
          <div style={{ height: 18 }} />
          <Label at={34} color={C.gray500} size={24}>
            Sign up on theclocal.com
          </Label>
        </AbsoluteFill>
      </Punch>
      <Hud tone="light" index="07 / 07" />
      {strobe ? (
        <AbsoluteFill style={{ backgroundColor: sc, alignItems: "center", justifyContent: "center" }}>
          <Monogram
            width={interpolate(frame, [45, 60], [220, 420], clamp)}
            color={sc === C.cream ? C.blue : C.cream}
          />
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
