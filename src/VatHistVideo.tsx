import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { HIST_NARRATION } from "./hist-narration";
import {
  V1Hook,
  V2Turnover,
  V2bMechanism,
  V3Siemens,
  V4Laure,
  V5Europe,
  V6Global,
  V6bUS,
  V6cRates,
  V7Why,
  V8Costs,
  V9End,
} from "./vat-hist-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;

const DESIGN = [
  { id: "v01", min: 180, component: V1Hook },
  { id: "v02", min: 300, component: V2Turnover },
  { id: "v10", min: 360, component: V2bMechanism },
  { id: "v03", min: 400, component: V3Siemens },
  { id: "v04", min: 460, component: V4Laure },
  { id: "v05", min: 440, component: V5Europe },
  { id: "v06", min: 500, component: V6Global },
  { id: "v11", min: 300, component: V6bUS },
  { id: "v12", min: 300, component: V6cRates },
  { id: "v07", min: 380, component: V7Why },
  { id: "v08", min: 400, component: V8Costs },
  { id: "v09", min: 300, component: V9End },
];

export const HIST_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = HIST_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();

export const HIST_TOTAL_DURATION = HIST_SEGMENTS.reduce((a, b) => a + b.duration, 0);

export const VatHistVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {HIST_SEGMENTS.map((s) => {
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
