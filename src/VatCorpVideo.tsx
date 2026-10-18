import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { CORP_NARRATION } from "./corp-narration";
import { X1Hook, X2Pitt, X3US, X4UK1965, X5Double, X6HighRates, X7Cuts, X8Competition, X9PillarTwo, X10End } from "./corp-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "x01", min: 180, component: X1Hook },
  { id: "x02", min: 420, component: X2Pitt },
  { id: "x03", min: 460, component: X3US },
  { id: "x04", min: 400, component: X4UK1965 },
  { id: "x05", min: 440, component: X5Double },
  { id: "x06", min: 380, component: X6HighRates },
  { id: "x07", min: 460, component: X7Cuts },
  { id: "x08", min: 440, component: X8Competition },
  { id: "x09", min: 460, component: X9PillarTwo },
  { id: "x10", min: 320, component: X10End },
];
export const CORP_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = CORP_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const CORP_TOTAL_DURATION = CORP_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const VatCorpVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {CORP_SEGMENTS.map((s) => {
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
