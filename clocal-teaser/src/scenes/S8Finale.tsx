import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, OUT } from "../brand/theme";
import { clamp, Mono, Punch, Slam, Wordmark } from "../components/kit";

type Props = { dayLabel: string; timeLabel: string };

// 16–19s. "FRI 02.10 / 7:00 PM" hits, then the wordmark — cream on blue — and the URL.
export const S8Finale: React.FC<Props> = ({ dayLabel, timeLabel }) => {
  const frame = useCurrentFrame();
  const logo = frame >= 30;
  return (
    <AbsoluteFill style={{ backgroundColor: C.blue }}>
      {!logo ? (
        <Punch hits={[0, 15]} amount={0.07}>
          <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
            <Mono at={0} color={C.cream} size={30} style={{ marginBottom: 30 }}>
              THE DROP
            </Mono>
            <Slam at={0} size={135} color={C.cream}>
              {dayLabel}
            </Slam>
            <Slam at={15} size={145} color={C.cream}>
              {timeLabel}
            </Slam>
          </AbsoluteFill>
        </Punch>
      ) : (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ overflow: "hidden", padding: "10px 0" }}>
            <div style={{ translate: `0 ${interpolate(frame, [30, 40], [110, 0], { ...clamp, easing: OUT })}%` }}>
              <Wordmark width={760} color={C.cream} />
            </div>
          </div>
          <div style={{ height: 140 }} />
          <Mono at={40} color={C.cream} size={40}>
            THECLOCAL.COM
          </Mono>
          <div style={{ height: 22 }} />
          <Mono at={46} color={C.cream} size={28} style={{ opacity: 0.8, textAlign: "center" }}>
            {`EARLY ACCESS 4:00 PM\n${dayLabel} · ${timeLabel}`}
          </Mono>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
