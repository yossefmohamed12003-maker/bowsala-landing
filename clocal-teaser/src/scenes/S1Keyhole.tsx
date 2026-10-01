import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, IN_OUT, OUT } from "../brand/theme";
import { clamp, Hud, Label } from "../components/kit";

// 0–2s. Ink frame, a keyhole. Through it: electric blue and a blurred glimpse.
// Ends by diving through the keyhole into the drop at 2s.
export const S1Keyhole: React.FC = () => {
  const frame = useCurrentFrame();
  const open = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: OUT });
  const dive = interpolate(frame, [44, 60], [1, 28], { ...clamp, easing: Easing2 });
  const s = open * dive;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      {/* what's behind the door */}
      <AbsoluteFill style={{ backgroundColor: C.blue }}>
        <Img
          src={staticFile("photos/gawhar-flat.jpg")}
          style={{
            position: "absolute",
            width: 3200,
            left: interpolate(frame, [0, 60], [-1250, -1050]),
            top: -1000,
            filter: `blur(${interpolate(frame, [0, 50], [40, 22], clamp)}px) grayscale(0.3) contrast(1.1)`,
            mixBlendMode: "luminosity",
            opacity: 0.55,
          }}
        />
      </AbsoluteFill>

      {/* ink door with keyhole cut-out */}
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <mask id="kh">
            <rect width={1080} height={1920} fill="white" />
            <g transform={`translate(540 900) scale(${s})`}>
              <circle cx={0} cy={-40} r={70} fill="black" />
              <path d="M -38 0 L 38 0 L 62 190 L -62 190 Z" fill="black" />
            </g>
          </mask>
        </defs>
        <rect width={1080} height={1920} fill={C.ink} mask="url(#kh)" />
      </svg>

      <AbsoluteFill style={{ opacity: interpolate(frame, [40, 50], [1, 0], clamp) }}>
        <Hud tone="dark" index="00 / 07" />
        <AbsoluteFill style={{ alignItems: "center", top: 1260 }}>
          <Label at={8} color={C.cream} size={30}>
            For those who look closely
          </Label>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Easing2 = IN_OUT;
