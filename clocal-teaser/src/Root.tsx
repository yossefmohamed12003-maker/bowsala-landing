import { Composition } from "remotion";
import { SignupHowTo } from "./howto/SignupHowTo";
import { Teaser } from "./Teaser";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClocalTeaser"
        component={Teaser}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          dayLabel: "FRI 02.10",
          timeLabel: "7:00 PM",
          dropLabel: "OCTOBER 2026",
        }}
      />
      {/* Silent cut for adding a trending/licensed track in Instagram or CapCut. Cuts sit on a 120 BPM grid. */}
      <Composition
        id="ClocalTeaserNoMusic"
        component={Teaser}
        durationInFrames={690}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          dayLabel: "FRI 02.10",
          timeLabel: "7:00 PM",
          dropLabel: "OCTOBER 2026",
          withMusic: false,
        }}
      />
      <Composition
        id="SignupHowTo"
        component={SignupHowTo}
        durationInFrames={1050}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ keyTime: "3:00 PM", earlyAccess: "4:00 PM", drop: "7:00 PM", day: "FRI 02.10" }}
      />
    </>
  );
};
