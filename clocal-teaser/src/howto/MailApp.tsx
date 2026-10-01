import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, Monogram, Wordmark } from "../components/kit";
import { SCREEN_W, Tap } from "./Phone";

// A generic (unbranded) phone mail app, showing where the clocal key lands: Spam.
const UI = {
  bg: "#FFFFFF",
  text: "#111111",
  sub: "#6E6E73",
  line: "#E5E5EA",
  accent: "#0A84FF",
};

const StatusBar: React.FC<{ time: string }> = ({ time }) => (
  <div
    style={{
      height: 70,
      padding: "22px 44px 0",
      display: "flex",
      justifyContent: "space-between",
      fontFamily: F.body,
      fontWeight: 600,
      fontSize: 22,
      color: UI.text,
    }}
  >
    <span>{time}</span>
    <span style={{ letterSpacing: 2 }}>▮▮▮ ▰</span>
  </div>
);

const Row: React.FC<{
  from: string;
  time: string;
  subject: string;
  preview: string;
  unread?: boolean;
  avatar?: React.ReactNode;
  highlight?: number;
}> = ({ from, time, subject, preview, unread, avatar, highlight = 0 }) => (
  <div
    style={{
      display: "flex",
      gap: 18,
      padding: "20px 26px",
      borderBottom: `1px solid ${UI.line}`,
      backgroundColor: `rgba(43,0,255,${0.08 * highlight})`,
    }}
  >
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#D1D1D6",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {avatar}
    </div>
    <div style={{ flex: 1, minWidth: 0, fontFamily: F.body }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 23, fontWeight: unread ? 700 : 600, color: UI.text }}>{from}</span>
        <span style={{ fontSize: 18, color: UI.sub }}>{time}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: unread ? 600 : 400, color: UI.text, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {subject}
      </div>
      <div style={{ fontSize: 18, color: UI.sub, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {preview}
      </div>
    </div>
  </div>
);

const ClocalAvatar = () => (
  <div style={{ width: "100%", height: "100%", backgroundColor: C.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Monogram width={30} color={C.cream} />
  </div>
);

const Mailbox: React.FC<{ title: string; children: React.ReactNode; back?: string; time: string }> = ({ title, children, back, time }) => (
  <AbsoluteFill style={{ backgroundColor: UI.bg }}>
    <StatusBar time={time} />
    <div style={{ padding: "16px 26px 0", fontFamily: F.body, fontSize: 22, color: UI.accent }}>‹ {back ?? "Mailboxes"}</div>
    <div style={{ padding: "8px 26px 14px", fontFamily: F.body, fontSize: 48, fontWeight: 800, color: UI.text, letterSpacing: "-0.02em" }}>{title}</div>
    <div style={{ margin: "0 26px 10px", height: 50, borderRadius: 14, backgroundColor: "#EFEFF4", fontFamily: F.body, fontSize: 20, color: UI.sub, padding: "13px 18px" }}>
      Search
    </div>
    {children}
  </AbsoluteFill>
);

const KEY_ROW = {
  from: "clocal",
  subject: "[ DECRYPTION KEY ] CL/04 — Early access",
  preview: "Your key is inside. Valid from 4:00 PM, Fri 02.10…",
};

// Opened email: spam banner + the clocal key email.
const OpenedEmail: React.FC<{ keyTime: string; notSpamAt: number; rescued: boolean }> = ({ keyTime, notSpamAt, rescued }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: UI.bg }}>
      <StatusBar time={keyTime.replace(" PM", "")} />
      <div style={{ padding: "16px 26px 0", fontFamily: F.body, fontSize: 22, color: UI.accent }}>‹ Spam</div>
      <div style={{ padding: "14px 26px 0", fontFamily: F.body, fontSize: 28, fontWeight: 700, color: UI.text, lineHeight: 1.25 }}>
        {KEY_ROW.subject}
      </div>
      <div style={{ display: "flex", gap: 16, padding: "18px 26px", alignItems: "center" }}>
        <div style={{ width: 54, height: 54, borderRadius: 27, overflow: "hidden" }}>
          <ClocalAvatar />
        </div>
        <div style={{ fontFamily: F.body }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: UI.text }}>
            clocal <span style={{ fontWeight: 400, color: UI.sub, fontSize: 19 }}>· {keyTime}</span>
          </div>
          <div style={{ fontSize: 19, color: UI.sub }}>theclocal@gmail.com</div>
        </div>
      </div>
      {/* spam banner */}
      <div
        style={{
          margin: "0 26px",
          padding: "16px 18px",
          borderRadius: 14,
          backgroundColor: rescued ? "#E8F5E9" : "#FFF4E5",
          fontFamily: F.body,
          fontSize: 19,
          color: UI.text,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span>{rescued ? "✓ Moved to Inbox" : "This message is in Spam."}</span>
        {!rescued ? (
          <span
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              border: `2px solid ${UI.accent}`,
              color: UI.accent,
              fontWeight: 700,
              scale: interpolate(frame, [notSpamAt - 1, notSpamAt, notSpamAt + 3], [1, 0.92, 1], clamp),
            }}
          >
            Not spam
          </span>
        ) : null}
      </div>
      {/* the branded email body */}
      <div style={{ margin: "22px 26px 0", backgroundColor: C.cream, border: `2px solid ${C.ink}` }}>
        <div style={{ backgroundColor: C.ink, padding: "26px 0", display: "flex", justifyContent: "center" }}>
          <Wordmark width={200} color={C.cream} />
        </div>
        <div style={{ padding: "26px 26px 30px" }}>
          <div style={{ fontFamily: F.tech, fontSize: 16, letterSpacing: "0.16em", color: C.ink }}>&gt; CLEARANCE GRANTED</div>
          <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 40, letterSpacing: "-0.03em", color: C.ink, marginTop: 12, lineHeight: 1 }}>
            [ YOUR KEY ]
          </div>
          <div
            style={{
              marginTop: 20,
              border: `2px solid ${C.ink}`,
              padding: "18px 0",
              textAlign: "center",
              fontFamily: F.mono,
              fontSize: 34,
              letterSpacing: "0.3em",
              color: C.ink,
              backgroundColor: C.creamTint,
            }}
          >
            <span style={{ filter: "blur(7px)" }}>CL04KEY</span>
          </div>
          <div style={{ fontFamily: F.tech, fontSize: 15, letterSpacing: "0.14em", color: C.gray500, marginTop: 16, lineHeight: 1.6 }}>
            VALID FROM 4:00 PM · FRI 02.10
            <br />
            ENTER IT ON THECLOCAL.COM → [ I HAVE THE KEY ]
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Timeline (local frames): 0–55 Inbox (nothing there) → 55–120 Spam list → tap → 125–240 opened email.
export const MailApp: React.FC<{ keyTime: string }> = ({ keyTime }) => {
  const frame = useCurrentFrame();
  const clock = keyTime.replace(" PM", "");
  const slide = interpolate(frame, [52, 62], [0, -SCREEN_W], { ...clamp, easing: OUT });
  const open = interpolate(frame, [122, 132], [SCREEN_W, 0], { ...clamp, easing: OUT });
  const NOT_SPAM_AT = 190;

  return (
    <AbsoluteFill style={{ backgroundColor: UI.bg }}>
      <div style={{ position: "absolute", inset: 0, translate: `${slide}px 0` }}>
        <Mailbox title="Inbox" time={clock}>
          <Row from="Calendar" time="2:41 PM" subject="Reminder: Friday" preview="You have 1 event tomorrow" avatar={<span style={{ fontSize: 26 }}>📅</span>} />
          <Row from="Newsletter" time="1:12 PM" subject="This week's picks" preview="Read more inside…" />
          <Row from="Receipts" time="11:03 AM" subject="Your order receipt" preview="Thanks for your purchase…" />
          <div style={{ padding: "40px 26px", fontFamily: F.body, fontSize: 22, color: UI.sub, textAlign: "center", lineHeight: 1.4 }}>
            No key from clocal here?
            <br />
            <b style={{ color: UI.text }}>It's in Spam.</b>
          </div>
        </Mailbox>
      </div>
      <div style={{ position: "absolute", inset: 0, translate: `${slide + SCREEN_W}px 0` }}>
        <Mailbox title="Spam" time={clock}>
          <Row
            from={KEY_ROW.from}
            time={keyTime}
            subject={KEY_ROW.subject}
            preview={KEY_ROW.preview}
            unread
            avatar={<ClocalAvatar />}
            highlight={interpolate(frame, [70, 80, 110, 118], [0, 1, 1, 0.4], clamp)}
          />
          <Row from="Promo" time="Yesterday" subject="You won't believe this deal" preview="Click now…" />
        </Mailbox>
      </div>
      <div style={{ position: "absolute", inset: 0, translate: `${open}px 0` }}>
        {frame >= 120 ? <OpenedEmail keyTime={keyTime} notSpamAt={NOT_SPAM_AT} rescued={frame >= NOT_SPAM_AT + 4} /> : null}
      </div>
      <Tap at={112} fx={0.5} fy={0.255} />
      <Tap at={NOT_SPAM_AT} fx={0.79} fy={0.265} />
    </AbsoluteFill>
  );
};
