import React from "react";
import {
  AbsoluteFill,
  Composition,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { C } from "./brand";
import { Captions } from "./Captions";
import { LatinCard, MarkCard, WordCard } from "./Cards";

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);

// Jump-cut punch-ins on the talking head: [from second, scale]
const PUNCH: [number, number][] = [
  [0, 1.0], [2.166, 1.12], [4.533, 1.0], [6.066, 1.15], [10.0, 1.0],
  [11.366, 1.12], [14.233, 1.0], [16.733, 1.14], [18.733, 1.0], [26.2, 1.12],
  [28.1, 1.0], [32.566, 1.14], [34.933, 1.0], [35.7, 1.12], [39.066, 1.0],
  [41.166, 1.15], [43.366, 1.0], [46.4, 1.12], [48.666, 1.0], [51.066, 1.1],
  [52.5, 1.18],
];

// Gawhar × Wound cutaways from the brand book — flat mockup and white-studio shots only
// (no lifestyle shots: they show the unreleased sweatpants). [start, end, file, fit]
type Fit = "flat" | "studio" | "detail";
const BROLL: [number, number, string, Fit][] = [
  [20.166, 21.933, "p16_3", "flat"],
  [21.933, 23.5, "p16_1", "studio"],
  [24.966, 26.9, "p16_2", "studio"],
  [28.766, 30.3, "p16_3", "detail"],
  [30.3, 31.3, "p16_1", "detail"],
];

const TalkingHead: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const scale = [...PUNCH].reverse().find(([from]) => t >= from)?.[1] ?? 1;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <AbsoluteFill style={{ transform: `scale(${scale})`, transformOrigin: "50% 24%" }}>
        <Video
          src={staticFile("main.mp4")}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "url(#grade)" }}
        />
      </AbsoluteFill>
      {/* Grade: deep true blacks (S-curve), natural skin — only a touch of the golden-hour
          orange pulled back so skin reads clean rather than grey. */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="grade" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0 0.03 0.125 0.305 0.515 0.705 0.855 0.955 1" />
            <feFuncG type="table" tableValues="0 0.03 0.125 0.305 0.515 0.705 0.855 0.955 1" />
            <feFuncB type="table" tableValues="0 0.03 0.125 0.305 0.515 0.705 0.855 0.955 1" />
          </feComponentTransfer>
          <feColorMatrix
            type="matrix"
            values="0.96 0.03 0 0 0  0 1 0 0 0  0 0.02 1.02 0 0  0 0 0 1 0"
          />
          <feColorMatrix type="saturate" values="1.02" />
        </filter>
      </svg>
    </AbsoluteFill>
  );
};

const Still: React.FC<{ file: string; dur: number; fit: Fit }> = ({ file, dur, fit }) => {
  const frame = useCurrentFrame();
  // flat: whole tee on its white ground · studio: full look, cover · detail: push in on the print
  const [z0, z1] = fit === "detail" ? [1.55, 1.7] : [1.02, 1.08];
  return (
    <AbsoluteFill style={{ backgroundColor: fit === "flat" ? "#FFFFFF" : C.ink, overflow: "hidden" }}>
      <Img
        src={staticFile(`broll/${file}.jpg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit === "flat" ? "contain" : "cover",
          transform: `scale(${interpolate(frame, [0, dur], [z0, z1])})`,
          transformOrigin: fit === "detail" ? "50% 38%" : "50% 50%",
        }}
      />
    </AbsoluteFill>
  );
};

export const ClocalReel: React.FC = () => {
  const { fps } = useVideoConfig();
  const inBroll = (t: number) => BROLL.some(([a, b]) => t >= a && t < b);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <TalkingHead />

      {BROLL.map(([a, b, file, fit]) => (
        <Sequence key={a} name={`B-roll ${file}`} from={s(a)} durationInFrames={s(b) - s(a)} premountFor={fps}>
          <Still file={file} dur={s(b) - s(a)} fit={fit} />
        </Sequence>
      ))}

      <Captions plated={inBroll} />

      <Sequence name="Card: رجعنا" from={s(8.066)} durationInFrames={s(8.966) - s(8.066)} premountFor={fps}>
        <WordCard tone="blue" words={["فاحنا", "رجعنا."]} stagger={9} />
      </Sequence>
      <Sequence name="Card: rebrand" from={s(8.966)} durationInFrames={s(10.0) - s(8.966)} premountFor={fps}>
        <MarkCard tone="cream" mark="wordmark" color={C.blue} width={760} line="rebranding أقوى" />
      </Sequence>
      <Sequence name="Card: الجمعة" from={s(23.5)} durationInFrames={s(24.966) - s(23.5)} premountFor={fps}>
        <WordCard tone="blue" words={["الـdrop", "الجاية", "يوم", "الجمعة."]} size={170} stagger={9} label="NEXT DROP — FRIDAY" />
      </Sequence>
      <Sequence name="Card: EOS sale" from={s(31.3)} durationInFrames={s(32.566) - s(31.3)} premountFor={fps}>
        <LatinCard tone="cream" lines={["end of", "season", "sale."]} />
      </Sequence>
      <Sequence name="Card: كلوكال" from={s(42.666)} durationInFrames={s(43.366) - s(42.666)} premountFor={fps}>
        <MarkCard tone="ink" mark="arabic" color={C.orange} width={720} />
      </Sequence>
      <Sequence name="Card: الهايب" from={s(53.7)} durationInFrames={s(55.1) - s(53.7)} premountFor={fps}>
        <WordCard tone="blue" words={["الـproducts", "بتاعتنا", "هي", "الـhype."]} size={150} stagger={8} />
      </Sequence>
      <Sequence name="Outro" from={s(55.1)} premountFor={fps}>
        <MarkCard tone="cream" mark="wordmark" color={C.blue} width={760} footer="QUIET LUXURY IN THE STREETS" />
      </Sequence>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="ClocalReel"
      component={ClocalReel}
      durationInFrames={1728}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
