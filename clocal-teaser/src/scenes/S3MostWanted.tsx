import { AbsoluteFill } from "remotion";
import { C } from "../brand/theme";
import { FrostField, Hud, Label, Punch, Slam } from "../components/kit";

// 4–6s. Cream ground. "The most wanted / are back."
export const S3MostWanted: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.cream }}>
      <FrostField color={C.ink} drift={0.6} />
      <Punch hits={[0, 15, 30]} amount={0.04}>
        <AbsoluteFill style={{ justifyContent: "center", padding: "0 80px" }}>
          <Slam at={0} size={190} color={C.ink}>
            The most
          </Slam>
          <Slam at={8} size={190} color={C.ink}>
            wanted
          </Slam>
          <Slam at={30} size={190} color={C.blue}>
            are back.
          </Slam>
          <Label at={34} color={C.orange} size={30} style={{ marginTop: 40 }}>
            Restock — limited units
          </Label>
        </AbsoluteFill>
      </Punch>
      <Hud tone="light" index="03 / 07" />
    </AbsoluteFill>
  );
};
