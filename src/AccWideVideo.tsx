import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { WIDE_NARRATION } from "./wide-narration";
import {
  W1Title,
  W2Original,
  W3Operation,
  W4Investment,
  W5Financing,
  W6Structure,
  W7Impact,
  W8End,
} from "./acc-wide-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 20;

const DESIGN = [
  { id: "w01", min: 150, component: W1Title as React.FC<any>, perItem: undefined },
  { id: "w02", min: 270, component: W2Original as React.FC<any>, perItem: undefined },
  { id: "w03", min: 460, component: W3Operation as React.FC<any>, perItem: 4 },
  { id: "w04", min: 640, component: W4Investment as React.FC<any>, perItem: 8 },
  { id: "w05", min: 320, component: W5Financing as React.FC<any>, perItem: 3 },
  { id: "w06", min: 400, component: W6Structure as React.FC<any>, perItem: undefined },
  { id: "w07", min: 350, component: W7Impact as React.FC<any>, perItem: undefined },
  { id: "w08", min: 220, component: W8End as React.FC<any>, perItem: undefined },
];

export const WIDE_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = WIDE_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio, perItemFrames: d.perItem ? Math.max(45, Math.floor((duration - 120) / d.perItem)) : undefined };
  });
})();

export const WIDE_TOTAL_DURATION = WIDE_SEGMENTS.reduce((a, b) => a + b.duration, 0);

export const AccWideVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {WIDE_SEGMENTS.map((s) => {
        const Comp = s.component;
        return (
          <Sequence key={s.id} from={s.from} durationInFrames={s.duration} name={s.id}>
            <SceneDurationContext.Provider value={s.duration}>
              <Comp perItem={s.perItemFrames} />
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
