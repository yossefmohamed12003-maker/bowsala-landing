import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, OUT } from "../brand/theme";
import { clamp, Mono, Plate, Punch, Slam } from "../components/kit";

// A redacted line: a bar that wipes across, flickering on 16ths.
const Redacted: React.FC<{ at: number; width: number; label: string }> = ({ at, width, label }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const w = interpolate(frame, [at, at + 6], [0, width], { ...clamp, easing: OUT });
  const flicker = Math.floor((frame - at) / 4) % 3 === 2 ? 0.75 : 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 30 }}>
      <div style={{ width: w, height: 84, backgroundColor: C.cream, opacity: flicker }} />
      <Mono at={at + 4} color={C.cream} size={24}>
        {label}
      </Mono>
    </div>
  );
};

// 8–10s. "+ BIG SURPRISES." over the archive case, then classified bars.
export const S5Surprises: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Plate src="plates/archive-case.jpg" shade={0.78} push={[1.2, 1.3]} origin="50% 70%" />
      <Punch hits={[0, 15, 30, 45]} amount={0.04}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 20 }}>
            <Slam at={0} size={170} color={C.blue}>
              +
            </Slam>
            <Slam at={4} size={170} color={C.cream}>
              Big
            </Slam>
          </div>
          <Slam at={8} size={100} color={C.cream}>
            surprises.
          </Slam>
          <Redacted at={30} width={520} label={"MATERIAL /\nUNKNOWN"} />
          <Redacted at={38} width={400} label={"STATUS /\nLOCKED"} />
          <Redacted at={45} width={620} label="" />
        </AbsoluteFill>
      </Punch>
    </AbsoluteFill>
  );
};
