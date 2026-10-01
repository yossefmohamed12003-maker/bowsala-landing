import React from "react";
import { Audio, Video } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, FrostField, headline, Mono, Plate, Wordmark } from "../components/kit";
import { MailApp } from "./MailApp";
import { Phone, PHONE_W, Tap } from "./Phone";

export type SignupHowToProps = {
  readonly keyTime: string; // password email lands = early access opens
  readonly drop: string; // public drop
  readonly day: string;
};

const REC = "howto/signup.mp4";
const PHONE_X = (1080 - PHONE_W) / 2;
const PHONE_Y = 520;

// Recording is sped up so the reel moves fast. Section starts (frames @30fps):
const R1 = 1.6; // sign-up part
const R_MAIL = 1.5;
const R2A = 1.6; // "I have the key" + typing
const R2B = 1.8; // typing + override
const R3 = 1.5; // unlocked site
const T = {
  intro: 0,
  signup: 60, // rec 0.0 → 7.8s
  spam: 60 + Math.round(234 / R1), // mail app
  keyA: 0,
  keyB: 0,
  inside: 0,
  outro: 0,
  end: 0,
};
T.keyA = T.spam + Math.round(240 / R_MAIL);
T.keyB = T.keyA + Math.round(102 / R2A);
T.inside = T.keyB + Math.round(144 / R2B);
T.outro = T.inside + Math.round(114 / R3);
T.end = T.outro + 94;
export const HOWTO_DURATION = T.end;

// every on-screen tap (global frames) — also drives the tap sound
const TAPS = [
  T.signup + Math.round(90 / R1),
  T.signup + Math.round(226 / R1),
  T.spam + Math.round(112 / R_MAIL),
  T.spam + Math.round(190 / R_MAIL),
  T.keyA + Math.round(20 / R2A),
  T.keyB + Math.round(123 / R2B),
];

const Caption: React.FC<{ step: string; lines: [string, string?]; from: number; to: number; accent?: boolean }> = ({
  step,
  lines,
  from,
  to,
  accent,
}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const t = frame - from;
  const y = interpolate(t, [0, 8], [40, 0], { ...clamp, easing: OUT });
  const o = interpolate(t, [0, 5], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", left: 92, right: 92, top: 210, translate: `0 ${y}px`, opacity: o }}>
      <Mono color={C.orange} size={26}>
        {step}
      </Mono>
      <div style={{ ...headline(58, C.cream), whiteSpace: "normal", lineHeight: 1.02, marginTop: 16 }}>{lines[0]}</div>
      {lines[1] ? (
        <div style={{ ...headline(58, accent ? C.blue : C.cream), whiteSpace: "normal", lineHeight: 1.02 }}>{lines[1]}</div>
      ) : null}
    </div>
  );
};

// HUD: corner brackets + guide label + step counter (matches the teaser posts).
const Frame: React.FC<{ step: number }> = ({ step }) => {
  const corner = (pos: React.CSSProperties) => (
    <div style={{ position: "absolute", width: 150, height: 92, ...pos }} />
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {corner({ left: 56, top: 56, borderLeft: `2px solid ${C.cream}`, borderTop: `2px solid ${C.cream}` })}
      {corner({ right: 56, top: 56, borderRight: `2px solid ${C.cream}`, borderTop: `2px solid ${C.cream}` })}
      {corner({ left: 56, bottom: 56, borderLeft: `2px solid ${C.cream}`, borderBottom: `2px solid ${C.cream}` })}
      {corner({ right: 56, bottom: 56, borderRight: `2px solid ${C.cream}`, borderBottom: `2px solid ${C.cream}` })}
      <div style={{ position: "absolute", left: 92, top: 92 }}>
        <Mono color={C.cream} size={26}>
          {"CL/04\nEARLY ACCESS GUIDE"}
        </Mono>
      </div>
      <div style={{ position: "absolute", right: 92, top: 92, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
        <Mono color={C.cream} size={26} style={{ textAlign: "right" }}>
          {step > 0 ? `STEP ${String(step).padStart(2, "0")} / 04` : "SYS / READY"}
        </Mono>
        <div style={{ width: 22, height: 22, backgroundColor: C.blue }} />
      </div>
      <div style={{ position: "absolute", left: 92, bottom: 92 }}>
        <Mono color={C.cream} size={22}>
          THECLOCAL.COM
        </Mono>
      </div>
      <div style={{ position: "absolute", right: 92, bottom: 92 }}>
        <Mono color={C.cream} size={22}>
          CAIRO · EST. 2023
        </Mono>
      </div>
    </AbsoluteFill>
  );
};

export const SignupHowTo: React.FC<SignupHowToProps> = ({ keyTime, drop, day }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step = frame < T.signup ? 0 : frame < T.spam ? 1 : frame < T.keyA ? 2 : frame < T.inside ? 3 : frame < T.outro ? 4 : 0;

  // camera on the phone: rise in, punch to details at key moments
  const phoneIn = interpolate(frame, [T.signup - 14, T.signup + 4], [1400, 0], { ...clamp, easing: OUT });
  const zA = T.signup + Math.round(165 / R1);
  const zB = T.keyB + Math.round(99 / R2B);
  const zoom = interpolate(frame, [zA, zA + 8, T.spam - 6, T.spam, zB, zB + 6, T.inside - 4, T.inside], [1, 1.3, 1.3, 1, 1, 1.25, 1.25, 1], clamp);
  const focus: [number, number] = frame < T.spam ? [0.5, 0.55] : [0.5, 0.33];
  const phoneOut = interpolate(frame, [T.outro - 6, T.outro + 6], [0, 1500], { ...clamp, easing: (t) => t * t });
  // quick whip between sections
  const whip = [T.spam, T.keyA, T.inside].reduce(
    (acc, t0) => acc + interpolate(frame, [t0 - 3, t0, t0 + 4], [0, 1, 0], clamp),
    0,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Plate src="plates/archive-case.jpg" shade={0.86} push={[1.1, 1.25]} frames={T.end} />
      <FrostField color={C.cream} opacity={0.04} drift={0.3} />

      <Sequence from={T.intro} durationInFrames={T.signup} premountFor={fps}>
        <Intro day={day} keyTime={keyTime} drop={drop} />
      </Sequence>

      {frame >= T.signup - 14 && frame < T.outro + 8 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            translate: `${whip * 60}px ${phoneIn + phoneOut}px`,
            filter: whip > 0.05 ? `blur(${whip * 8}px)` : undefined,
          }}
        >
          <Phone x={PHONE_X} y={PHONE_Y} zoom={zoom} focus={focus}>
            <Sequence from={T.signup} durationInFrames={T.spam - T.signup} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={0} playbackRate={R1} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
              {/* hide the floating assistive-touch bubble in the recording */}
              <div style={{ position: "absolute", left: "86%", top: "79%", width: "14%", height: "8%", backgroundColor: "#0d0c0b", filter: "blur(6px)" }} />
              <Tap at={TAPS[0] - T.signup} fx={0.5} fy={0.582} />
              <Tap at={TAPS[1] - T.signup} fx={0.5} fy={0.617} />
            </Sequence>
            <Sequence from={T.spam} durationInFrames={240} playbackRate={R_MAIL} premountFor={fps} layout="absolute-fill">
              <MailApp keyTime={keyTime} />
            </Sequence>
            <Sequence from={T.keyA} durationInFrames={T.keyB - T.keyA} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={228} playbackRate={R2A} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
              <Tap at={TAPS[4] - T.keyA} fx={0.5} fy={0.298} />
            </Sequence>
            <Sequence from={T.keyB} durationInFrames={T.inside - T.keyB} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={384} playbackRate={R2B} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
              <Tap at={TAPS[5] - T.keyB} fx={0.5} fy={0.375} />
            </Sequence>
            <Sequence from={T.inside} durationInFrames={T.outro - T.inside + 8} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={528} playbackRate={R3} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
            </Sequence>
          </Phone>
        </div>
      ) : null}

      <Caption step="STEP 01 — SIGN UP" lines={["Drop your email on", "theclocal.com"]} from={T.signup} to={T.signup + 50} />
      <Caption step="STEP 01 — SIGN UP" lines={["Tap Request", "Clearance."]} from={T.signup + 50} to={T.signup + 100} accent />
      <Caption step="STEP 01 — DONE" lines={["Clearance logged.", "Watch your inbox."]} from={T.signup + 100} to={T.spam} />
      <Caption step={`STEP 02 — ${keyTime}`} lines={["Your key lands", `at ${keyTime}.`]} from={T.spam} to={T.spam + 40} accent />
      <Caption step="STEP 02 — CHECK SPAM" lines={["Not in your inbox?", "Check SPAM."]} from={T.spam + 40} to={T.spam + 122} accent />
      <Caption step="STEP 02 — CHECK SPAM" lines={["Tap “Not spam”", "copy your key."]} from={T.spam + 122} to={T.keyA} />
      <Caption step="STEP 03 — UNLOCK" lines={["Tap I have the key", "paste your key."]} from={T.keyA} to={T.keyB + 40} />
      <Caption step="STEP 03 — UNLOCK" lines={["Tap Initiate", "Override."]} from={T.keyB + 40} to={T.inside} accent />
      <Caption step="STEP 04 — YOU'RE IN" lines={["You're in.", "Shop it first."]} from={T.inside} to={T.outro} />

      {frame < T.outro ? <Frame step={step} /> : null}

      <Sequence from={T.outro} premountFor={fps}>
        <Outro day={day} keyTime={keyTime} drop={drop} />
      </Sequence>

      <Audio src={staticFile("audio/howto.wav")} premountFor={fps} />
      {TAPS.map((t) => (
        <Audio key={t} from={t} src={staticFile("audio/tap.wav")} volume={0.7} premountFor={fps} />
      ))}
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ day: string; keyTime: string; drop: string }> = ({ day, keyTime, drop }) => {
  const frame = useCurrentFrame();
  const line = (at: number) => ({
    translate: `0 ${interpolate(frame, [at, at + 8], [105, 0], { ...clamp, easing: OUT })}%`,
  });
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
      <Mono at={4} color={C.orange} size={28} style={{ marginBottom: 30 }}>
        {`[ ${day} · KEY ${keyTime} · DROP ${drop} ]`}
      </Mono>
      {(["How to", "get early", "access."] as const).map((w, i) => (
        <div key={w} style={{ overflow: "hidden" }}>
          <div style={{ ...headline(108, i === 2 ? C.blue : C.cream), ...line(4 + i * 4) }}>{w}</div>
        </div>
      ))}
      <Mono at={18} color={C.cream} size={28} style={{ marginTop: 40 }}>
        {`4 STEPS · 20 SECONDS`}
      </Mono>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ day: string; drop: string; keyTime: string }> = ({ day, drop, keyTime }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.blue, alignItems: "center", justifyContent: "center" }}>
      <div style={{ overflow: "hidden", padding: "10px 0" }}>
        <div style={{ translate: `0 ${interpolate(frame, [4, 14], [110, 0], { ...clamp, easing: OUT })}%` }}>
          <Wordmark width={700} color={C.cream} />
        </div>
      </div>
      <div style={{ height: 120 }} />
      <Mono at={14} color={C.cream} size={34} style={{ textAlign: "center", lineHeight: 1.6 }}>
        {`KEY + EARLY ACCESS → ${keyTime}\nCHECK YOUR SPAM\nPUBLIC DROP → ${drop}`}
      </Mono>
      <div style={{ height: 40 }} />
      <Mono at={22} color={C.cream} size={26} style={{ opacity: 0.75 }}>
        {`${day} · THECLOCAL.COM`}
      </Mono>
      <div style={{ position: "absolute", bottom: 150, fontFamily: F.mono, fontSize: 22, color: C.cream, opacity: 0.6 }}>
        SIGN UP NOW
      </div>
    </AbsoluteFill>
  );
};
