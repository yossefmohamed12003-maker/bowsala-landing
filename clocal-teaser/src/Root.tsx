import { Composition } from "remotion";
import { Teaser } from "./Teaser";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ClocalTeaser"
      component={Teaser}
      durationInFrames={630}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ dayLabel: "FRI 02.10", timeLabel: "7:00 PM", dropLabel: "OCTOBER 2026" }}
    />
  );
};
