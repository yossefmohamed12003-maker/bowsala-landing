import { Composition, Folder, Still } from "remotion";
import { HOWTO_DURATION, SignupHowTo } from "./howto/SignupHowTo";
import { DropStory, EarlyAccessStory } from "./stills/Stories";
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
        durationInFrames={HOWTO_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ keyTime: "4:00 PM", drop: "5:00 PM", day: "FRI 02.10" }}
      />
      <Folder name="Stories">
        <Still
          id="StoryDrop"
          component={DropStory}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
        <Still
          id="StoryEarlyAccess"
          component={EarlyAccessStory}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
      </Folder>
    </>
  );
};
