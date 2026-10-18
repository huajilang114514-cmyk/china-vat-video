import React from "react";
import { Composition } from "remotion";
import { VatVideo, TOTAL_DURATION } from "./VatVideo";
import { AccVideo, ACC_TOTAL_DURATION } from "./AccVideo";

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
    </>
  );
};
