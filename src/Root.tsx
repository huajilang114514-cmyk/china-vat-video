import React from "react";
import { Composition } from "remotion";
import { VatVideo, TOTAL_DURATION } from "./VatVideo";
import { AccVideo, ACC_TOTAL_DURATION } from "./AccVideo";
import { AccWideVideo, WIDE_TOTAL_DURATION } from "./AccWideVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="VatExplainer"
        component={VatVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AccountingReform"
        component={AccVideo}
        durationInFrames={ACC_TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AccountingWide"
        component={AccWideVideo}
        durationInFrames={WIDE_TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};