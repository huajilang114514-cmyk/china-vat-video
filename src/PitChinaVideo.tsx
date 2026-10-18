import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { PITC_NARRATION } from "./pitc-narration";
import { P1Hook, P2_1980, P3_1986, P4_1994, P5Thresholds, P6_2018, P7_After, P8Data, P9End } from "./pit-c-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "p01", min: 180, component: P1Hook },
  { id: "p02", min: 300, component: P2_1980 },
  { id: "p03", min: 300, component: P3_1986 },
  { id: "p04", min: 420, component: P4_1994 },
  { id: "p05", min: 300, component: P5Thresholds },
  { id: "p06", min: 380, component: P6_2018 },
  { id: "p07", min: 340, component: P7_After },
  { id: "p08", min: 320, component: P8Data },
  { id: "p09", min: 320, component: P9End },
];
export const PITC_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = PITC_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const PITC_DURATION = PITC_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const PitChinaVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {PITC_SEGMENTS.map((s) => {
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
