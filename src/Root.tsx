import React from "react";
import { Composition } from "remotion";
import { VatVideo, TOTAL_DURATION } from "./VatVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="VatExplainer"
      component={VatVideo}
      durationInFrames={TOTAL_DURATION}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
