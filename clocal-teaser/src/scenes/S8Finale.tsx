import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, Label, Punch, Slam, Wordmark } from "../components/kit";

type Props = { dayLabel: string; timeLabel: string };

// 14–17s. "Friday 7:00 PM" hits, then the wordmark — cream on blue — and the URL.
export const S8Finale: React.FC<Props> = ({ dayLabel, timeLabel }) => {
  const frame = useCurrentFrame();
  const logo = frame >= 30;
  return (
    <AbsoluteFill style={{ backgroundColor: C.blue }}>
      {!logo ? (
        <Punch hits={[0, 15]} amount={0.07}>
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
            <Label at={0} color={C.cream} size={30} style={{ marginBottom: 30 }}>
              The drop
            </Label>
            <Slam at={0} size={240} color={C.cream}>
              {dayLabel}
            </Slam>
            <Slam at={15} size={235} color={C.cream}>
              {timeLabel}
            </Slam>
          </AbsoluteFill>
        </Punch>
      ) : (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              overflow: "hidden",
              padding: "10px 0",
            }}
          >
            <div
              style={{
                translate: `0 ${interpolate(frame, [30, 40], [110, 0], { ...clamp, easing: OUT })}%`,
              }}
            >
              <Wordmark width={760} color={C.cream} />
            </div>
          </div>
          <div style={{ height: 150 }} />
          <div
            style={{
              fontFamily: F.tech,
              fontWeight: 500,
              fontSize: 40,
              letterSpacing: "0.16em",
              color: C.cream,
              opacity: interpolate(frame, [40, 46], [0, 1], clamp),
            }}
          >
            THECLOCAL.COM
          </div>
          <div style={{ height: 22 }} />
          <div
            style={{
              fontFamily: F.tech,
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: "0.16em",
              color: C.cream,
              opacity: interpolate(frame, [46, 52], [0, 0.7], clamp),
            }}
          >
            {`EARLY ACCESS 4:00 PM · DROP ${timeLabel.toUpperCase()}`}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
