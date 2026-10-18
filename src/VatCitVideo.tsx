import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { CIT_NARRATION } from "./cit-narration";
import { Z1Hook, Z2_1980, Z3_1981, Z4_1984, Z5_1991, Z6_1994, Z7_2007, Z8_After, Z9Data, Z10End } from "./cit-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "z01", min: 180, component: Z1Hook },
  { id: "z02", min: 480, component: Z2_1980 },
  { id: "z03", min: 380, component: Z3_1981 },
  { id: "z04", min: 380, component: Z4_1984 },
  { id: "z05", min: 460, component: Z5_1991 },
  { id: "z06", min: 380, component: Z6_1994 },
  { id: "z07", min: 520, component: Z7_2007 },
  { id: "z08", min: 420, component: Z8_After },
  { id: "z09", min: 420, component: Z9Data },
  { id: "z10", min: 320, component: Z10End },
];
export const CIT_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = CIT_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const CIT_TOTAL_DURATION = CIT_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const VatCitVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {CIT_SEGMENTS.map((s) => {
        const Comp = s.component as React.FC;
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={s.id}>
            <SceneDurationContext.Provider value={s.duration}>
              <Comp />
            </SceneDurationContext.Provider>
            {s.audio ? (
              <Sequence from={LEAD} durationInFrames={s.duration - LEAD} name={"audio-" + s.id}>
                <Audio src={staticFile(s.audio)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
