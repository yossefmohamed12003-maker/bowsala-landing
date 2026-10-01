import { AbsoluteFill } from "remotion";
import { C } from "../brand/theme";
import { FrostField, Mono, Punch, Slam } from "../components/kit";

// 4–6s. Cream ground. "THE MOST WANTED / ARE BACK."
export const S3MostWanted: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      <FrostField color={C.ink} drift={0.6} />
      <Punch hits={[0, 15, 30]} amount={0.04}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 92px" }}>
          <Mono at={0} color={C.ink} size={28} style={{ marginBottom: 36 }}>
            CL/02 — ARCHIVE
          </Mono>
          <Slam at={0} size={114} color={C.ink}>
            The most
          </Slam>
          <Slam at={8} size={114} color={C.ink}>
            wanted
          </Slam>
          <Slam at={30} size={114} color={C.blue}>
            are back.
          </Slam>
          <Mono at={34} color={C.orange} size={28} style={{ marginTop: 40 }}>
            RESTOCK / LIMITED UNITS
          </Mono>
        </AbsoluteFill>
      </Punch>
    </AbsoluteFill>
  );
};
