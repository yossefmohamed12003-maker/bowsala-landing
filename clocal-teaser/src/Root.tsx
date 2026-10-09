import { Composition, Folder, Still } from "remotion";
import { HOWTO_DURATION, SignupHowTo } from "./howto/SignupHowTo";
import { CountdownA, CountdownB, CountdownC, CountdownStory, DropStory, LiveStory, OpenStory, PollB, PollC, PollD, PollStory, PriceA, PriceB, PriceM, PriceStory, PromoStory } from "./stills/Stories";
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
          id="StoryCountdown"
          component={CountdownStory}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
        <Still
          id="StoryCountdownA"
          component={CountdownA}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
        <Still
          id="StoryCountdownB"
          component={CountdownB}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
        <Still
          id="StoryCountdownC"
          component={CountdownC}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
        <Still
          id="StoryLive"
          component={LiveStory}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM", stock: 23 }}
        />
        <Still
          id="StoryOpen"
          component={OpenStory}
          width={1080}
          height={1920}
          defaultProps={{ day: "FRI 02.10", keyTime: "4:00 PM", drop: "5:00 PM" }}
        />
        <Still
          id="StoryPromo"
          component={PromoStory}
          width={1080}
          height={1920}
          defaultProps={{ code: "6OCTOBER", amount: "EGP 50" }}
        />
        <Still id="StoryPoll" component={PollStory} width={1080} height={1920} />
        <Still id="StoryPollB" component={PollB} width={1080} height={1920} />
        <Still id="StoryPollC" component={PollC} width={1080} height={1920} />
        <Still id="StoryPollD" component={PollD} width={1080} height={1920} />
        <Still id="StoryPriceBasicTee" component={PriceStory} width={1080} height={1920} defaultProps={{ name: "BASIC TEE", was: "600", now: "249" }} />
        <Still id="StoryPriceA" component={PriceA} width={1080} height={1920} defaultProps={{ was: "600", now: "249" }} />
        <Still id="StoryPriceB" component={PriceB} width={1080} height={1920} defaultProps={{ was: "600", now: "249" }} />
        <Still id="StoryPriceM" component={PriceM} width={1080} height={1920} defaultProps={{ was: "600", now: "249" }} />
      </Folder>
    </>
  );
};
