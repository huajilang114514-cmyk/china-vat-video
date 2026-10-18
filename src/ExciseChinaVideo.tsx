import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { EXCC_NARRATION } from "./excc-narration";
import { C1Hook, C2_1994, C3Items, C4_2006, C5_2008, C6_2015, C7_2016, C8_2022, C9_Data, C10End } from "./excise-c-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "c01", min: 220, component: C1Hook },
  { id: "c02", min: 500, component: C2_1994 },
  { id: "c03", min: 360, component: C3Items },
  { id: "c04", min: 360, component: C4_2006 },
  { id: "c05", min: 420, component: C5_2008 },
  { id: "c06", min: 380, component: C6_2015 },
  { id: "c07", min: 320, component: C7_2016 },
  { id: "c08", min: 420, component: C8_2022 },
  { id: "c09", min: 400, component: C9_Data },
  { id: "c10", min: 300, component: C10End },
];
export const EXCC_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = EXCC_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const EXCC_DURATION = EXCC_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const ExciseChinaVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {EXCC_SEGMENTS.map((s) => {
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
