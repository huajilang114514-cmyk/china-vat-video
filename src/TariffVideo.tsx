import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import "./fonts";
import { Backdrop, SceneDurationContext } from "./components";
import { TARIFF_NARRATION } from "./tariff-narration";
import { T1Hook, T2Origin, T3Nanking, T4_1929, T5_1985, T6TradeWar, T7Types, T8Data, T9End } from "./tariff-scenes";

const FPS = 30;
const LEAD = 8;
const TAIL = 18;
const DESIGN = [
  { id: "t01", min: 190, component: T1Hook },
  { id: "t02", min: 460, component: T2Origin },
  { id: "t03", min: 520, component: T3Nanking },
  { id: "t04", min: 400, component: T4_1929 },
  { id: "t05", min: 460, component: T5_1985 },
  { id: "t06", min: 440, component: T6TradeWar },
  { id: "t07", min: 360, component: T7Types },
  { id: "t08", min: 400, component: T8Data },
  { id: "t09", min: 330, component: T9End },
];
export const TARIFF_SEGMENTS = (() => {
  let acc = 0;
  return DESIGN.map((d) => {
    const n = TARIFF_NARRATION[d.id];
    const audioFrames = n ? Math.ceil(n.seconds * FPS) : 0;
    const duration = Math.max(d.min, audioFrames + LEAD + TAIL);
    const from = acc;
    acc += duration;
    return { ...d, duration, from, audio: n?.audio };
  });
})();
export const TARIFF_DURATION = TARIFF_SEGMENTS.reduce((a, b) => a + b.duration, 0);
export const TariffVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#070C16" }}>
      <Backdrop />
      {TARIFF_SEGMENTS.map((s) => {
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
