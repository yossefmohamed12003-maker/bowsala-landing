import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, OUT } from "../brand/theme";
import { clamp, Flash, headline, Mono } from "../components/kit";

// Product name as a window onto the garment: the photo only shows through the letters.
// Implemented with a multiply layer (white text on black) so it renders reliably.
const Window: React.FC<{ word: string; photo: string; from: number; pan: [number, number]; top: number }> = ({
  word,
  photo,
  from,
  pan,
  top,
}) => {
  const frame = useCurrentFrame() - from;
  return (
    <AbsoluteFill style={{ backgroundColor: C.black, isolation: "isolate" }}>
      <Img
        src={staticFile(photo)}
        style={{
          position: "absolute",
          width: 2600,
          left: -760,
          top: interpolate(frame, [0, 30], pan),
          filter: "grayscale(0.15) contrast(1.15)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: C.black,
          mixBlendMode: "multiply",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            ...headline(160, "white"),
            marginTop: top,
            scale: interpolate(frame, [0, 10, 30], [1.25, 1.02, 1], { ...clamp, easing: OUT }),
          }}
        >
          {word}
        </div>
      </AbsoluteFill>
      {/* hairline outline keeps the name legible where the garment is dark */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            ...headline(160, "white"),
            color: "transparent",
            WebkitTextStroke: `2px ${C.cream}`,
            marginTop: top,
            scale: interpolate(frame, [0, 10, 30], [1.25, 1.02, 1], { ...clamp, easing: OUT }),
          }}
        >
          {word}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 6–8s. GAWHAR, then WOUND — the most-wanted, seen only through their names.
export const S4Products: React.FC = () => {
  const frame = useCurrentFrame();
  const second = frame >= 30;
  return (
    <AbsoluteFill style={{ backgroundColor: C.black }}>
      {!second ? (
        <Window word="Gawhar" photo="photos/gawhar-flat.jpg" from={0} pan={[-700, -900]} top={0} />
      ) : (
        <Window word="Wound" photo="photos/wound-model.jpg" from={30} pan={[-500, -700]} top={0} />
      )}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <Mono at={second ? 33 : 3} color={C.cream} size={28} style={{ marginTop: 340 }}>
          {second ? "NO. 02 / WOUND" : "NO. 01 / GAWHAR"}
        </Mono>
      </AbsoluteFill>
      <Flash at={30} color={C.blue} frames={2} />
    </AbsoluteFill>
  );
};
