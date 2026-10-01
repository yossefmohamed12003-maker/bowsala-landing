import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, staticFile, useVideoConfig } from "remotion";
import { Hud } from "./components/Hud";
import { S1Keyhole } from "./scenes/S1Keyhole";
import { S1bBoard } from "./scenes/S1bBoard";
import { S2bStreet } from "./scenes/S2bStreet";
import { S2Identity } from "./scenes/S2Identity";
import { S3MostWanted } from "./scenes/S3MostWanted";
import { S4Products } from "./scenes/S4Products";
import { S5Surprises } from "./scenes/S5Surprises";
import { S6Sale } from "./scenes/S6Sale";
import { S7Access } from "./scenes/S7Access";
import { S7EarlyAccess } from "./scenes/S7EarlyAccess";
import { S8Finale } from "./scenes/S8Finale";

export type TeaserProps = {
  readonly dayLabel: string;
  readonly timeLabel: string;
  readonly dropLabel: string;
};

// 120 BPM, every scene is one bar (60 frames) and every cut lands on a beat.
export const Teaser: React.FC<TeaserProps> = ({ dayLabel, timeLabel, dropLabel }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <Sequence name="Keyhole" from={0} durationInFrames={60} premountFor={fps}>
        <S1Keyhole />
      </Sequence>
      <Sequence name="Evidence board" from={60} durationInFrames={60} premountFor={fps}>
        <S1bBoard />
      </Sequence>
      <Sequence name="New identity" from={120} durationInFrames={60} premountFor={fps}>
        <S2Identity />
      </Sequence>
      <Sequence name="Street run" from={180} durationInFrames={60} premountFor={fps}>
        <S2bStreet />
      </Sequence>
      <Sequence name="Most wanted" from={240} durationInFrames={60} premountFor={fps}>
        <S3MostWanted />
      </Sequence>
      <Sequence name="Gawhar & Wound" from={300} durationInFrames={60} premountFor={fps}>
        <S4Products />
      </Sequence>
      <Sequence name="Big surprises" from={360} durationInFrames={60} premountFor={fps}>
        <S5Surprises />
      </Sequence>
      <Sequence name="EOS sale" from={420} durationInFrames={60} premountFor={fps}>
        <S6Sale />
      </Sequence>
      <Sequence name="Access restricted" from={480} durationInFrames={60} premountFor={fps}>
        <S7Access />
      </Sequence>
      <Sequence name="Early access" from={540} durationInFrames={60} premountFor={fps}>
        <S7EarlyAccess />
      </Sequence>
      <Sequence name="Finale" from={600} durationInFrames={90} premountFor={fps}>
        <S8Finale dayLabel={dayLabel} timeLabel={timeLabel} />
      </Sequence>
      <Hud dropLabel={dropLabel} />
      <Audio name="Music" src={staticFile("audio/teaser.wav")} premountFor={fps} />
    </AbsoluteFill>
  );
};
