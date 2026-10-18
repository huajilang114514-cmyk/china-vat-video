import React from "react";
import { Composition } from "remotion";
import { VatVideo, TOTAL_DURATION } from "./VatVideo";
import { AccVideo, ACC_TOTAL_DURATION } from "./AccVideo";
import { AccWideVideo, WIDE_TOTAL_DURATION } from "./AccWideVideo";
import { VatHistVideo, HIST_TOTAL_DURATION } from "./VatHistVideo";
import { VatCnVideo, CN_TOTAL_DURATION } from "./VatCnVideo";
import { VatCorpVideo, CORP_TOTAL_DURATION } from "./VatCorpVideo";
import { VatCitVideo, CIT_TOTAL_DURATION } from "./VatCitVideo";
import { PitForeignVideo, PITF_DURATION } from "./PitForeignVideo";
import { PitChinaVideo, PITC_DURATION } from "./PitChinaVideo";

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
      <Composition
        id="VatHistory"
        component={VatHistVideo}
        durationInFrames={HIST_TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VatChina"
        component={VatCnVideo}
        durationInFrames={CN_TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VatCorporate"
        component={VatCorpVideo}
        durationInFrames={CORP_TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="VatCIT"
        component={VatCitVideo}
        durationInFrames={CIT_TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition id="PitForeign" component={PitForeignVideo} durationInFrames={PITF_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="PitChina" component={PitChinaVideo} durationInFrames={PITC_DURATION} fps={30} width={1920} height={1080} />
    </>
  );
};