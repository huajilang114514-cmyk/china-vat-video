import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { CN_NARRATION } from "./cn-narration";
import {
  C1Hook,
  C2Pilot,
  C3_1984,
  C4_1994,
  C5_2009,
  C6_2016,
  C7Rates,
  C8_2024,
  C9Data,
  C10End,
} from "./vat-cn-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;

const DESIGN = [
  { id: "c01", min: 180, component: C1Hook },
  { id: "c02", min: 400, component: C2Pilot },
  { id: "c03", min: 340, component: C3_1984 },
  { id: "c04", min: 500, component: C4_1994 },
  { id: "c05", min: 360, component: C5_2009 },
  { id: "c06", min: 520, component: C6_2016 },
  { id: "c07", min: 360, component: C7Rates },
  { id: "c08", min: 460, component: C8_2024 },
  { id: "c09", min: 360, component: C9Data },
  { id: "c10", min: 300, component: C10End },
];

export const CN_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = CN_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();

export const CN_TOTAL_DURATION = CN_SEGMENTS.reduce((a, b) => a + b.duration, 0);

export const VatCnVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {CN_SEGMENTS.map((s) => {
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
