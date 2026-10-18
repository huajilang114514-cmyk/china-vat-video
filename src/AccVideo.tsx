import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { ACC_NARRATION } from "./acc-narration";
import {
  A1Hook,
  A2Docs,
  A3Five,
  A4Compare,
  A5Truth,
  A6MPM,
  A7Unchanged,
  A8End,
} from "./acc-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 16;

const DESIGN: { id: string; min: number; component: React.FC }[] = [
  { id: "a01", min: 150, component: A1Hook },
  { id: "a02", min: 360, component: A2Docs },
  { id: "a03", min: 400, component: A3Five },
  { id: "a04", min: 400, component: A4Compare },
  { id: "a05", min: 330, component: A5Truth },
  { id: "a06", min: 300, component: A6MPM },
  { id: "a07", min: 330, component: A7Unchanged },
  { id: "a08", min: 300, component: A8End },
];

export const ACC_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = ACC_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();

export const ACC_TOTAL_DURATION = ACC_SEGMENTS.reduce((a, b) => a + b.duration, 0);

export const AccVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {ACC_SEGMENTS.map((s) => {
        const Comp = s.component;
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
