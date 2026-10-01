import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, FrostField, Hud, Label, Punch, Slam } from "../components/kit";

// A redacted line: a bar that wipes across, flickering on 16ths.
const Redacted: React.FC<{ at: number; width: number; label: string }> = ({ at, width, label }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const w = interpolate(frame, [at, at + 6], [0, width], { ...clamp, easing: OUT });
  const flicker = Math.floor((frame - at) / 4) % 3 === 2 ? 0.75 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 34 }}>
      <div style={{ width: w, height: 92, backgroundColor: C.cream, opacity: flicker }} />
      <Label at={at + 4} color={C.orange} size={24}>
        {label}
      </Label>
    </div>
  );
};

// 8–10s. "+ Big surprises." then classified bars.
export const S5Surprises: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <FrostField color={C.cream} opacity={0.06} drift={-0.8} />
      <Punch hits={[0, 15, 30, 45]} amount={0.04}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24 }}>
            <Slam at={0} size={210} color={C.blue}>
              +
            </Slam>
            <Slam at={4} size={210} color={C.cream}>
              Big
            </Slam>
          </div>
          <Slam at={8} size={210} color={C.cream}>
            surprises.
          </Slam>
          <Redacted at={30} width={620} label="[ Classified ]" />
          <Redacted at={38} width={460} label="[ 19:00 ]" />
          <Redacted at={45} width={700} label="" />
        </AbsoluteFill>
      </Punch>
      <Hud tone="dark" index="05 / 07" />
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 300,
          fontFamily: F.tech,
          fontSize: 22,
          letterSpacing: "0.16em",
          color: C.gray300,
          opacity: interpolate(frame, [2, 6], [0, 1], clamp),
        }}
      >
        FILE NOT FOR VIEWING
      </div>
    </AbsoluteFill>
  );
};
