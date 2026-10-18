import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { PITF_NARRATION } from "./pitf-narration";
import { F1Hook, F2Pitt, F3Europe, F4US1913, F5HighRates, F6Withholding, F7Cuts, F8Variants, F9End } from "./pit-f-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "f01", min: 180, component: F1Hook },
  { id: "f02", min: 300, component: F2Pitt },
  { id: "f03", min: 300, component: F3Europe },
  { id: "f04", min: 320, component: F4US1913 },
  { id: "f05", min: 300, component: F5HighRates },
  { id: "f06", min: 320, component: F6Withholding },
  { id: "f07", min: 380, component: F7Cuts },
  { id: "f08", min: 300, component: F8Variants },
  { id: "f09", min: 340, component: F9End },
];
export const PITF_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = PITF_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const PITF_DURATION = PITF_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const PitForeignVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {PITF_SEGMENTS.map((s) => {
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
