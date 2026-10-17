import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { NARRATION } from "./narration";
import {
  S1Hook,
  S2What,
  S3Repeat,
  S4France,
  S5ChinaStart,
  S6_1994,
  S7Reform,
  S8Law,
  S9Outro,
} from "./scenes";

const FPS = 30;
const AUDIO_LEAD = 12;
const AUDIO_TAIL = 18;

const DESIGN: { id: string; min: number; component: React.FC }[] = [
  { id: "s01", min: 300, component: S1Hook },
  { id: "s02", min: 470, component: S2What },
  { id: "s03", min: 440, component: S3Repeat },
  { id: "s04", min: 440, component: S4France },
  { id: "s05", min: 480, component: S5ChinaStart },
  { id: "s06", min: 520, component: S6_1994 },
  { id: "s07", min: 500, component: S7Reform },
  { id: "s08", min: 470, component: S8Law },
  { id: "s09", min: 440, component: S9Outro },
];

export const SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + AUDIO_LEAD + AUDIO_TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();

export const TOTAL_DURATION = SEGMENTS.reduce((a, b) => a + b.duration, 0);

export const VatVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {SEGMENTS.map((s) => {
        const Comp = s.component;
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={s.id}>
            <SceneDurationContext.Provider value={s.duration}>
              <Comp />
            </SceneDurationContext.Provider>
            {s.audio ? (
              <Sequence from={AUDIO_LEAD} durationInFrames={s.duration - AUDIO_LEAD} name={"audio-" + s.id}>
                <Audio src={staticFile(s.audio)} />
              </Sequence>
            ) : null}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
