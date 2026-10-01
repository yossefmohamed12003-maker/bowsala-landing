import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, IN_OUT, OUT } from "../brand/theme";
import { clamp, Mono } from "../components/kit";

// 0–2s. Ink frame, a keyhole. Through it: the warehouse set from the posts, out of focus.
// Ends by diving through the keyhole into the drop at 2s.
export const S1Keyhole: React.FC = () => {
  const frame = useCurrentFrame();
  const open = interpolate(frame, [0, 14], [0, 1], { ...clamp, easing: OUT });
  const dive = interpolate(frame, [44, 60], [1, 28], { ...clamp, easing: IN_OUT });
  const s = open * dive;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <AbsoluteFill style={{ backgroundColor: C.ink }}>
        <Img
          src={staticFile("plates/warehouse-cases.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: interpolate(frame, [0, 60], [1.35, 1.05], clamp),
            filter: `blur(${interpolate(frame, [0, 56], [24, 0], clamp)}px)`,
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

      <AbsoluteFill style={{ alignItems: "center", top: 1260, opacity: interpolate(frame, [40, 48], [1, 0], clamp) }}>
        <Mono at={8} color={C.cream} size={30}>
          For those who look closely
        </Mono>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
