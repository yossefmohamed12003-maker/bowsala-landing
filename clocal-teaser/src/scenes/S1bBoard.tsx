import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F } from "../brand/theme";
import { BoardCamera, centerOf } from "../components/Board";
import { clamp } from "../components/kit";

const WIDE = { x: 1100, y: 750, z: 0.46 };
const A = centerOf("gawhar");
const B = centerOf("wordmark");
const D = centerOf("arabic");

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// 2–4s. Through the keyhole: the evidence board. Wide, then whip-zooms on the beats.
export const S1bBoard: React.FC = () => {
  const frame = useCurrentFrame();
  const times = [0, 12, 16, 27, 31, 42, 46, 56, 60];
  const o = { ...clamp, easing: ease };
  const cx = interpolate(frame, times, [WIDE.x, WIDE.x, A.x, A.x + 20, B.x, B.x - 20, D.x, D.x + 10, D.x], o);
  const cy = interpolate(frame, times, [WIDE.y, WIDE.y - 10, A.y, A.y - 10, B.y, B.y, D.y, D.y, D.y], o);
  const zoom = interpolate(frame, times, [WIDE.z, 0.5, 1.9, 2.0, 1.75, 1.85, 2.05, 2.2, 4.2], o);
  const blur = interpolate(frame, [12, 14, 16, 27, 29, 31, 42, 44, 46, 56, 60], [0, 16, 0, 0, 16, 0, 0, 16, 0, 0, 24], clamp);
  const exhibit = frame >= 16 && frame < 27 ? "A" : frame >= 31 && frame < 42 ? "B" : frame >= 46 && frame < 57 ? "C" : null;

  return (
    <AbsoluteFill style={{ backgroundColor: C.creamDeep }}>
      <BoardCamera cx={cx} cy={cy} zoom={zoom} blur={blur} />
      {exhibit ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: 260 }}>
          <div
            style={{
              backgroundColor: C.ink,
              color: C.cream,
              fontFamily: F.mono,
              fontSize: 30,
              letterSpacing: "0.04em",
              padding: "14px 24px",
            }}
          >
            {`[ EXHIBIT ${exhibit} ]`}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
