import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { EXCF_NARRATION } from "./excf-narration";
import { E1Hook, E2Salt, E3Excise1643, E4Whiskey, E5SinTax, E6Modern, E7EU, E8Debate, E9End } from "./excise-f-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "e01", min: 200, component: E1Hook },
  { id: "e02", min: 460, component: E2Salt },
  { id: "e03", min: 400, component: E3Excise1643 },
  { id: "e04", min: 420, component: E4Whiskey },
  { id: "e05", min: 440, component: E5SinTax },
  { id: "e06", min: 420, component: E6Modern },
  { id: "e07", min: 360, component: E7EU },
  { id: "e08", min: 320, component: E8Debate },
  { id: "e09", min: 340, component: E9End },
];
export const EXCF_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = EXCF_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const EXCF_DURATION = EXCF_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const ExciseForeignVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {EXCF_SEGMENTS.map((s) => {
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
