import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, F, OUT } from "../brand/theme";
import { clamp, Plate, Punch } from "../components/kit";

// Mirrors the live early-access page on theclocal.com so viewers recognise it when they land.
const caps = (size: number, color: string, extra?: React.CSSProperties): React.CSSProperties => ({
  fontFamily: F.tech,
  fontWeight: 500,
  fontSize: size,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color,
  whiteSpace: "nowrap",
  ...extra,
});

const Cross: React.FC<{ x: "left" | "right"; y: "top" | "bottom" }> = ({ x, y }) => (
  <div style={{ position: "absolute", [x]: 26, [y]: 24, ...caps(30, C.ink, { letterSpacing: 0 }) }}>+</div>
);

const BARS = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 1, 1, 2, 1, 3];
const Barcode: React.FC = () => (
  <div style={{ display: "flex", gap: 3, height: 70, alignItems: "stretch" }}>
    {BARS.map((w, i) => (
      <div key={i} style={{ width: w * 2, backgroundColor: C.ink }} />
    ))}
  </div>
);

const EMAIL = "YOU@INBOX.COM";

// 12–14s. [ ACCESS RESTRICTED ]_ → email types in → REQUEST CLEARANCE pressed on the beat.
export const S7Access: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = EMAIL.slice(0, Math.max(0, Math.floor((frame - 12) * 0.8)));
  const pressed = frame >= 30;
  const caret = Math.floor(frame / 5) % 2 === 0;
  const W = 900;

  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <Plate src="plates/archive-case.jpg" shade={0.62} push={[1.08, 1.16]} origin="50% 40%" />
      <Punch hits={[30, 45]} amount={0.035}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              width: W,
              backgroundColor: C.cream,
              position: "relative",
              translate: `0 ${interpolate(frame, [0, 9], [260, 0], { ...clamp, easing: OUT })}px`,
              opacity: interpolate(frame, [0, 4], [0, 1], clamp),
              boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            }}
          >
            {/* header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "30px 36px",
                borderBottom: `2px solid ${C.ink}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: C.blue }} />
                <div style={caps(22, C.ink)}>[ Secure connection established ]</div>
              </div>
              <div style={caps(20, C.gray500)}>SYS-V.2.0</div>
            </div>

            {/* body on grid paper */}
            <div
              style={{
                position: "relative",
                padding: "70px 64px 60px",
                backgroundImage: `linear-gradient(${C.hairline} 1px, transparent 1px), linear-gradient(90deg, ${C.hairline} 1px, transparent 1px)`,
                backgroundSize: "36px 36px",
              }}
            >
              <Cross x="left" y="top" />
              <Cross x="right" y="top" />
              <Cross x="left" y="bottom" />
              <Cross x="right" y="bottom" />

              <div style={caps(26, C.ink)}>&gt; System lock initiated</div>
              <div
                style={{
                  fontFamily: F.display,
                  fontWeight: 800,
                  fontSize: 104,
                  letterSpacing: "-0.035em",
                  lineHeight: 0.98,
                  color: C.ink,
                  marginTop: 44,
                  textTransform: "uppercase",
                }}
              >
                [ Access
                <br />
                restricted ]<span style={{ opacity: caret ? 1 : 0 }}>_</span>
              </div>
              <div style={caps(24, C.ink, { whiteSpace: "normal", lineHeight: 1.7, marginTop: 40, letterSpacing: "0.1em" })}>
                Next drop is secured. Enter your email to receive the decryption key (password) before public release.
              </div>

              {/* email field */}
              <div
                style={{
                  marginTop: 50,
                  border: `2px solid ${C.ink}`,
                  padding: "34px 34px",
                  display: "flex",
                  gap: 30,
                  alignItems: "center",
                }}
              >
                <div style={caps(30, C.ink, { fontWeight: 700, letterSpacing: 0 })}>&gt;</div>
                {typed.length === 0 ? (
                  <div style={caps(26, C.gray300, { letterSpacing: "0.08em" })}>Enter email for decryption key_</div>
                ) : (
                  <div style={caps(30, C.ink, { letterSpacing: "0.08em" })}>
                    {typed}
                    <span style={{ opacity: caret && !pressed ? 1 : 0, color: C.blue }}>▌</span>
                  </div>
                )}
              </div>

              {/* button */}
              <div
                style={{
                  marginTop: 34,
                  height: 116,
                  backgroundColor: pressed ? C.blue : C.ink,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  scale: interpolate(frame, [29, 30, 34], [1, 0.96, 1], clamp),
                }}
              >
                <div style={caps(32, C.cream, { fontWeight: 600 })}>
                  {pressed ? "> Clearance requested ✓" : "> Request clearance"}
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: 40, ...caps(22, pressed ? C.blue : C.gray500) }}>
                {pressed ? "[ Key arrives before 4:00 PM ]" : "[ I have the key ]"}
              </div>

              <div style={{ borderTop: `2px dashed ${C.ink}`, marginTop: 56, paddingTop: 36, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Barcode />
                <div style={caps(22, C.ink, { fontWeight: 600 })}>[ Dossier_ID: CL-EA-2026 ]</div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </Punch>
    </AbsoluteFill>
  );
};
