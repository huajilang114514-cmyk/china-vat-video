import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { ACC_NARRATION } from "./acc-narration";
import {
  A1Hook,
  A2Docs,
  A3Five,
  A4Truth,
  A5MPM,
  A6Unchanged,
  A7End,
} from "./acc-scenes";

const FPS = 30;
const LEAD = 10;
const TAIL = 20;

const DESIGN: { id: string; min: number; component: React.FC }[] = [
  { id: "a01", min: 240, component: A1Hook },
  { id: "a02", min: 440, component: A2Docs },
  { id: "a03", min: 450, component: A3Five },
  { id: "a04", min: 450, component: A4Truth },
  { id: "a05", min: 350, component: A5MPM },
  { id: "a06", min: 240, component: A6Unchanged },
  { id: "a07", min: 420, component: A7End },
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
