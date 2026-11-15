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
import { VatStampVideo, STAMP_TOTAL_DURATION } from "./VatStampVideo";
import { ExciseForeignVideo, EXCF_DURATION } from "./ExciseForeignVideo";
import { ExciseChinaVideo, EXCC_DURATION } from "./ExciseChinaVideo";
import { TariffVideo, TARIFF_DURATION } from "./TariffVideo";
import { TaxStory, storyDuration } from "./taxstory/TaxStory";
import { DenseStory } from "./taxstory/DenseStory";
import { KineticChechuan } from "./taxstory/KineticChechuan";
import { KineticYanye } from "./taxstory/KineticYanye";
import { KineticFangchan } from "./taxstory/KineticFangchan";
import { KineticQishui } from "./taxstory/KineticQishui";
import { KineticQishui2 } from "./taxstory/KineticQishui2";

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
      <Composition id="VatStamp" component={VatStampVideo} durationInFrames={STAMP_TOTAL_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="ExciseForeign" component={ExciseForeignVideo} durationInFrames={EXCF_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="ExciseChina" component={ExciseChinaVideo} durationInFrames={EXCC_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="Tariff" component={TariffVideo} durationInFrames={TARIFF_DURATION} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-yanye" component={TaxStory} defaultProps={{ storyId: "yanye" }} durationInFrames={storyDuration("yanye")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-fangchan" component={TaxStory} defaultProps={{ storyId: "fangchan" }} durationInFrames={storyDuration("fangchan")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-qishui" component={TaxStory} defaultProps={{ storyId: "qishui" }} durationInFrames={storyDuration("qishui")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-chechuan" component={TaxStory} defaultProps={{ storyId: "chechuan" }} durationInFrames={storyDuration("chechuan")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-chengzhen" component={TaxStory} defaultProps={{ storyId: "chengzhen" }} durationInFrames={storyDuration("chengzhen")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-ziyuan" component={TaxStory} defaultProps={{ storyId: "ziyuan" }} durationInFrames={storyDuration("ziyuan")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-gengdi" component={TaxStory} defaultProps={{ storyId: "gengdi" }} durationInFrames={storyDuration("gengdi")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-huanjing" component={TaxStory} defaultProps={{ storyId: "huanjing" }} durationInFrames={storyDuration("huanjing")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-tudi" component={TaxStory} defaultProps={{ storyId: "tudi" }} durationInFrames={storyDuration("tudi")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-chegou" component={TaxStory} defaultProps={{ storyId: "chegou" }} durationInFrames={storyDuration("chegou")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-chengjian" component={TaxStory} defaultProps={{ storyId: "chengjian" }} durationInFrames={storyDuration("chengjian")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStory-chuanbo" component={TaxStory} defaultProps={{ storyId: "chuanbo" }} durationInFrames={storyDuration("chuanbo")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStoryDense-chechuan" component={DenseStory} defaultProps={{ storyId: "chechuan" }} durationInFrames={storyDuration("chechuan")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStoryKinetic-chechuan" component={KineticChechuan} durationInFrames={storyDuration("chechuan")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStoryKinetic-qishui2" component={KineticQishui2} durationInFrames={storyDuration("qishui")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStoryKinetic-qishui" component={KineticQishui} durationInFrames={storyDuration("qishui")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStoryKinetic-fangchan" component={KineticFangchan} durationInFrames={storyDuration("fangchan")} fps={30} width={1920} height={1080} />
      <Composition id="TaxStoryKinetic-yanye" component={KineticYanye} durationInFrames={storyDuration("yanye")} fps={30} width={1920} height={1080} />
    </>
  );
};