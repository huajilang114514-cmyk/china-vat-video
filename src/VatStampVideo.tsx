import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { STAMP_NARRATION } from "./stamp-narration";
import { T1Hook, T2Origin, T3ChinaEarly, T4_1988, T5Securities, T6Unilateral, T7_2021, T8Data, T9Principles, T10End } from "./stamp-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "s01", min: 180, component: T1Hook },
  { id: "s02", min: 460, component: T2Origin },
  { id: "s03", min: 400, component: T3ChinaEarly },
  { id: "s04", min: 480, component: T4_1988 },
  { id: "s05", min: 480, component: T5Securities },
  { id: "s06", min: 320, component: T6Unilateral },
  { id: "s07", min: 520, component: T7_2021 },
  { id: "s08", min: 400, component: T8Data },
  { id: "s09", min: 400, component: T9Principles },
  { id: "s10", min: 300, component: T10End },
];
export const STAMP_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = STAMP_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const STAMP_TOTAL_DURATION = STAMP_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const VatStampVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {STAMP_SEGMENTS.map((s) => {
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
