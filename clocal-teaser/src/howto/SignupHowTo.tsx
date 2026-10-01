import React from "react";
import { Video } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, FrostField, headline, Mono, Plate, Wordmark } from "../components/kit";
import { MailApp } from "./MailApp";
import { Phone, PHONE_W, Tap } from "./Phone";

export type SignupHowToProps = {
  readonly keyTime: string; // when the key email lands (1h before early access)
  readonly earlyAccess: string;
  readonly drop: string;
  readonly day: string;
};

const REC = "howto/signup.mp4";
const PHONE_X = (1080 - PHONE_W) / 2;
const PHONE_Y = 520;

// Section starts (frames @30fps)
const T = {
  intro: 0,
  signup: 90, // rec 0.0 → 7.8s
  spam: 324, // mail app, 8s
  key: 564, // rec 7.6 → 11.0s, then 12.8 → 17.6s
  inside: 810, // rec 17.6 → 21.4s
  outro: 924,
  end: 1050,
};

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

export const SignupHowTo: React.FC<SignupHowToProps> = ({ keyTime, earlyAccess, drop, day }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const step = frame < T.signup ? 0 : frame < T.spam ? 1 : frame < T.key ? 2 : frame < T.inside ? 3 : frame < T.outro ? 4 : 0;

  // camera on the phone: rise in, punch to details at key moments
  const phoneIn = interpolate(frame, [T.signup - 20, T.signup + 4], [1400, 0], { ...clamp, easing: OUT });
  const zoom = interpolate(
    frame,
    [T.signup + 160, T.signup + 172, T.signup + 225, T.signup + 234, T.key + 200, T.key + 212, T.key + 240, T.key + 246],
    [1, 1.4, 1.4, 1, 1, 1.25, 1.25, 1],
    clamp,
  );
  const focus: [number, number] = frame < T.spam ? [0.5, 0.55] : [0.5, 0.33];
  const phoneOut = interpolate(frame, [T.outro - 6, T.outro + 8], [0, 1500], { ...clamp, easing: (t) => t * t });

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Plate src="plates/archive-case.jpg" shade={0.86} push={[1.1, 1.25]} frames={T.end} />
      <FrostField color={C.cream} opacity={0.04} drift={0.3} />

      {/* INTRO */}
      <Sequence from={T.intro} durationInFrames={T.signup} premountFor={fps}>
        <Intro day={day} earlyAccess={earlyAccess} keyTime={keyTime} />
      </Sequence>

      {/* PHONE */}
      {frame >= T.signup - 20 && frame < T.outro + 10 ? (
        <div style={{ position: "absolute", inset: 0, translate: `0 ${phoneIn + phoneOut}px` }}>
          <Phone x={PHONE_X} y={PHONE_Y} zoom={zoom} focus={focus}>
            <Sequence from={T.signup} durationInFrames={T.spam - T.signup} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={0} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
              {/* hide the floating assistive-touch bubble in the recording */}
              <div style={{ position: "absolute", left: "86%", top: "79%", width: "14%", height: "8%", backgroundColor: "#0d0c0b", filter: "blur(6px)" }} />
              <Tap at={90} fx={0.5} fy={0.582} />
              <Tap at={226} fx={0.5} fy={0.617} />
            </Sequence>
            <Sequence from={T.spam} durationInFrames={T.key - T.spam} premountFor={fps} layout="absolute-fill">
              <MailApp keyTime={keyTime} />
            </Sequence>
            <Sequence from={T.key} durationInFrames={102} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={228} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
              <Tap at={20} fx={0.5} fy={0.298} />
            </Sequence>
            <Sequence from={T.key + 102} durationInFrames={144} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={384} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
              <Tap at={123} fx={0.5} fy={0.375} />
            </Sequence>
            <Sequence from={T.inside} durationInFrames={T.outro - T.inside + 10} premountFor={fps} layout="absolute-fill">
              <Video src={staticFile(REC)} trimBefore={528} muted objectFit="cover" style={{ width: "100%", height: "100%" }} />
            </Sequence>
          </Phone>
        </div>
      ) : null}

      {/* CAPTIONS */}
      <Caption step="STEP 01 — SIGN UP" lines={["Go to theclocal.com", "drop your email."]} from={T.signup} to={T.signup + 85} />
      <Caption step="STEP 01 — SIGN UP" lines={["Tap Request", "Clearance."]} from={T.signup + 85} to={T.signup + 160} accent />
      <Caption step="STEP 01 — DONE" lines={["Clearance logged.", "Watch your inbox."]} from={T.signup + 160} to={T.spam} />
      <Caption step={`STEP 02 — ${keyTime}`} lines={["Your key lands", "1 hour before."]} from={T.spam} to={T.spam + 55} />
      <Caption step="STEP 02 — CHECK SPAM" lines={["Not in your inbox?", "Check SPAM."]} from={T.spam + 55} to={T.spam + 185} accent />
      <Caption step="STEP 02 — CHECK SPAM" lines={["Tap “Not spam”", "copy your key."]} from={T.spam + 185} to={T.key} />
      <Caption step="STEP 03 — UNLOCK" lines={["Tap I have the key", "paste your key."]} from={T.key} to={T.key + 200} />
      <Caption step="STEP 03 — UNLOCK" lines={["Tap Initiate", "Override."]} from={T.key + 200} to={T.inside} accent />
      <Caption step={`STEP 04 — ${earlyAccess}`} lines={["You're in.", "Shop the drop first."]} from={T.inside} to={T.outro} />

      {frame < T.outro ? <Frame step={step} /> : null}

      {/* OUTRO */}
      <Sequence from={T.outro} premountFor={fps}>
        <Outro day={day} earlyAccess={earlyAccess} drop={drop} keyTime={keyTime} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ day: string; earlyAccess: string; keyTime: string }> = ({ day, earlyAccess, keyTime }) => {
  const frame = useCurrentFrame();
  const line = (at: number) => ({
    translate: `0 ${interpolate(frame, [at, at + 8], [105, 0], { ...clamp, easing: OUT })}%`,
  });
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
      <Mono at={4} color={C.orange} size={28} style={{ marginBottom: 30 }}>
        {`[ ${day} · EARLY ACCESS ${earlyAccess} ]`}
      </Mono>
      {(["How to", "get early", "access."] as const).map((w, i) => (
        <div key={w} style={{ overflow: "hidden" }}>
          <div style={{ ...headline(108, i === 2 ? C.blue : C.cream), ...line(6 + i * 6) }}>{w}</div>
        </div>
      ))}
      <Mono at={30} color={C.cream} size={28} style={{ marginTop: 40 }}>
        {`4 STEPS · KEY ARRIVES ${keyTime}`}
      </Mono>
    </AbsoluteFill>
  );
};

const Outro: React.FC<{ day: string; earlyAccess: string; drop: string; keyTime: string }> = ({ day, earlyAccess, drop, keyTime }) => {
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
        {`KEY → ${keyTime} · CHECK SPAM\nEARLY ACCESS → ${earlyAccess}\nDROP → ${drop}`}
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
