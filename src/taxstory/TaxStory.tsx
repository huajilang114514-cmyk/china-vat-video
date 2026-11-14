import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { COLORS, FONT_NUM, FONT_SANS } from "../theme";
import { TAX_NARRATION } from "./narration";
import storiesData from "./stories.json";
import { BarsBlock, DocuBackdrop, FactChip, HeroPhoto, Kicker, KineticTitle, PaperCard, PhotoReveal, SceneFade, Seal, StatBlock, TimelineFlow, Wipe, YearStamp, ease, useIn } from "./ui";

type Beat = {
  id: string; kind: string; narration: string; kicker: string; title: string; body?: string;
  year?: string; items?: { y: string; t: string }[]; stat?: { value: number; suffix: string; label: string; decimals?: number };
};
type Story = { id: string; tax: string; en: string; title: string; subtitle: string; accent?: string; image?: string; imageCaption?: string; chips?: string[]; beats: Beat[] };
const STORIES = storiesData as unknown as Story[];

const FPS = 30;
const LEAD = 6;
const TAIL = 24;
const MIN = 150;

export const storySegments = (story: Story) => {
  let acc = 0;
  return story.beats.map((b) => {
    const n = TAX_NARRATION[story.id + "-" + b.id];
    const frames = n ? Math.ceil(n.seconds * FPS) : 120;
    const duration = Math.max(MIN, frames + LEAD + TAIL);
    const seg = { ...b, duration, from: acc, audio: n?.audio, year: b.year };
    acc += duration;
    return seg;
  });
};

export const storyDuration = (id: string) => {
  const s = STORIES.find((x) => x.id === id)!;
  return storySegments(s).reduce((a, b) => a + b.duration, 0);
};

const River: React.FC<{ story: Story; total: number }> = ({ story, total }) => {
  const frame = useCurrentFrame();
  const segs = storySegments(story);
  const p = interpolate(frame, [0, total], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 54, height: 2, background: "rgba(228,180,92,0.18)" }} />
      <div style={{ position: "absolute", left: 80, width: (1760) * p, bottom: 54, height: 2, background: "linear-gradient(90deg, rgba(228,180,92,0.2), rgba(228,180,92,0.95))", boxShadow: "0 0 18px rgba(228,180,92,0.6)" }} />
      {segs.map((s, i) => {
        const at = (s.from / total) * 1760 + 80;
        const on = frame >= s.from;
        return (
          <div key={s.id} style={{ position: "absolute", left: at, bottom: 40, width: 2, height: on ? 22 : 8, background: on ? COLORS.gold : "rgba(255,255,255,0.2)" }} />
        );
      })}
      <div style={{ position: "absolute", left: Math.max(80, 80 + p * 1760 - 18), bottom: 30, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.gold, fontFamily: FONT_SANS, fontSize: 26, textShadow: "0 0 20px rgba(228,180,92,0.9)" }}>税</div>
    </AbsoluteFill>
  );
};

const BeatView: React.FC<{ beat: Beat; story: Story; index: number }> = ({ beat, story, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const accent = COLORS.gold;
  const appear = useIn(6, 16);
  if (beat.kind === "hook") {
    return (
      <AbsoluteFill style={{ padding: "150px 110px" }}>
        {story.image ? <HeroPhoto src={story.image} caption={story.imageCaption} delay={4} /> : null}
        <div style={{ position: "relative", width: 1000 }}>
        <Kicker delay={2}>{beat.kicker}</Kicker>
        <div style={{ marginTop: 40 }}><KineticTitle text={beat.title} size={118} delay={8} /></div>
        <div style={{ marginTop: 34, fontFamily: FONT_SANS, fontSize: 34, color: COLORS.muted, opacity: ease(frame, 26, 16), letterSpacing: 2 }}>{beat.body}</div>
        <div style={{ marginTop: 34, display: "flex", gap: 14, flexWrap: "wrap" }}>{(story.chips || []).map((c, i) => <FactChip key={c} delay={30 + i * 6}>{c}</FactChip>)}</div>
        <div style={{ position: "absolute", right: 120, top: 120, fontFamily: FONT_NUM, fontSize: 300, color: "rgba(228,180,92,0.06)", fontWeight: 700 }}>{String(index + 1).padStart(2, "0")}</div>
        </div>
        <div style={{ position: "absolute", right: 90, bottom: 140, opacity: appear, transform: "scale(" + (0.8 + appear * 0.2) + ")" }}><Seal char="税" size={130} delay={18} /></div>
      </AbsoluteFill>
    );
  }
  if (beat.kind === "origin") {
    return (
      <AbsoluteFill style={{ padding: "130px 110px" }}>
        <YearStamp year={beat.year || ""} delay={4} />
        <Kicker delay={2}>{beat.kicker}</Kicker>
        <div style={{ marginTop: 30, fontFamily: FONT_NUM, fontSize: 200, fontWeight: 700, color: COLORS.goldSoft, opacity: ease(frame, 6, 18), lineHeight: 1 }}>{beat.year}</div>
        <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 64, fontWeight: 700, color: COLORS.ink, opacity: ease(frame, 14, 18) }}>{beat.title}</div>
        <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted, maxWidth: 1100, lineHeight: 1.8, opacity: ease(frame, 22, 18) }}>{beat.body}</div>
        <div style={{ position: "absolute", right: 120, bottom: 170 }}><PaperCard delay={16} width={420}><div style={{ fontFamily: FONT_SANS, fontSize: 22, color: "#8A5A12", letterSpacing: 3 }}>{story.tax} · {story.en}</div><div style={{ marginTop: 16, fontFamily: FONT_NUM, fontSize: 70, color: "#1B2230", fontWeight: 700 }}>{beat.year}</div><div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 18, color: "#5A6070", lineHeight: 1.7 }}>{story.subtitle}</div></PaperCard></div>
      </AbsoluteFill>
    );
  }
  if (beat.kind === "timeline") {
    return (
      <AbsoluteFill style={{ padding: "120px 110px" }}>
        <Kicker delay={2}>{beat.kicker}</Kicker>
        <div style={{ marginTop: 22, fontFamily: FONT_SANS, fontSize: 76, fontWeight: 700, color: COLORS.ink, opacity: ease(frame, 8, 16) }}>{beat.title}</div>
        <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, opacity: ease(frame, 16, 16) }}>{beat.body}</div>
        <TimelineFlow items={beat.items || []} delay={18} />
      </AbsoluteFill>
    );
  }
  if (beat.kind === "story") {
    return (
      <AbsoluteFill style={{ padding: "130px 110px", flexDirection: "row", gap: 70, alignItems: "center" }}>
        <div style={{ flex: 1, maxWidth: 860 }}>
          <Kicker delay={2}>{beat.kicker}</Kicker>
          <div style={{ marginTop: 24, fontFamily: FONT_SANS, fontSize: 70, fontWeight: 700, lineHeight: 1.25, color: COLORS.ink, opacity: ease(frame, 8, 18) }}>{beat.title}</div>
          <div style={{ marginTop: 24, fontFamily: FONT_SANS, fontSize: 30, lineHeight: 1.8, color: COLORS.muted, opacity: ease(frame, 18, 18) }}>{beat.body}</div>
          <div style={{ marginTop: 34, width: 120, height: 3, background: "linear-gradient(90deg,#E4B45C,transparent)" }} />
        </div>
        {story.image ? <PhotoReveal src={story.image} caption={story.imageCaption || ""} width={720} delay={10} /> : (
          <PaperCard delay={12} width={520} rotate={-2}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: "#8A5A12", letterSpacing: 3 }}>WHY IT MATTERS</div>
            <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 28, color: "#1B2230", lineHeight: 1.6 }}>{beat.body}</div>
          </PaperCard>
        )}
      </AbsoluteFill>
    );
  }
  if (beat.kind === "law") {
    return (
      <AbsoluteFill style={{ padding: "120px 110px", flexDirection: "row", gap: 60, alignItems: "center" }}>
        <PaperCard delay={6} width={520} rotate={-1.2}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: "#8A5A12", letterSpacing: 4 }}>中华人民共和国</div>
          <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 40, fontWeight: 700, color: "#1B2230", lineHeight: 1.4 }}>{beat.title}</div>
          <div style={{ marginTop: 20, height: 1, background: "rgba(0,0,0,0.15)" }} />
          {Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ marginTop: 14, height: 10, width: (90 - i * 8) + "%", background: "rgba(27,34,48,0.16)", borderRadius: 3 }} />)}
          <div style={{ marginTop: 26, display: "flex", justifyContent: "flex-end" }}><div style={{ width: 84, height: 84, border: "3px solid rgba(196,71,58,0.85)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "#C4473A", fontSize: 40, fontWeight: 700, transform: "rotate(-8deg)" }}>法</div></div>
        </PaperCard>
        <div style={{ flex: 1 }}>
          <Kicker delay={2}>{beat.kicker}</Kicker>
          <div style={{ marginTop: 26, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.goldSoft, opacity: ease(frame, 8, 16) }}>{beat.year}</div>
          <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: COLORS.ink, opacity: ease(frame, 14, 16) }}>{beat.title}</div>
          <div style={{ marginTop: 22, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, lineHeight: 1.8, opacity: ease(frame, 22, 16) }}>{beat.body}</div>
        </div>
      </AbsoluteFill>
    );
  }
  if (beat.kind === "data") {
    const stat = beat.stat!;
    return (
      <AbsoluteFill style={{ padding: "110px 110px" }}>
        <Kicker delay={2}>{beat.kicker}</Kicker>
        <div style={{ marginTop: 26, display: "flex", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1 }}><StatBlock value={stat.value} suffix={stat.suffix} label={stat.label} decimals={stat.decimals || 0} delay={10} /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 56, fontWeight: 700, color: COLORS.ink, opacity: ease(frame, 12, 16) }}>{beat.title}</div>
            <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, lineHeight: 1.8, opacity: ease(frame, 20, 16) }}>{beat.body}</div>
          </div>
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ padding: "0 110px", justifyContent: "center" }}>
      <Kicker delay={2}>{beat.kicker}</Kicker>
      <div style={{ marginTop: 30, fontFamily: FONT_SANS, fontSize: 84, fontWeight: 700, lineHeight: 1.3, color: COLORS.ink, opacity: ease(frame, 8, 20) }}>{beat.title}</div>
      <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 32, color: COLORS.muted, opacity: ease(frame, 18, 18) }}>{beat.body}</div>
      <div style={{ marginTop: 40, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim, letterSpacing: 4, opacity: ease(frame, 28, 18) }}>税种系列 · 起源 / 发展 / 原理</div>
    </AbsoluteFill>
  );
};

export const TaxStory: React.FC<{ storyId: string }> = ({ storyId }) => {
  const story = STORIES.find((s) => s.id === storyId)!;
  const segs = storySegments(story);
  const total = segs.reduce((a, b) => a + b.duration, 0);
  return (
    <AbsoluteFill style={{ backgroundColor: "#050A12" }}>
      <DocuBackdrop />
      {segs.map((s, i) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.duration}>
          <SceneFade duration={s.duration}>
            <BeatView beat={s as unknown as Beat} story={story} index={i} />
          </SceneFade>
          <Wipe delay={2} />
          {s.audio ? <Sequence from={LEAD} durationInFrames={s.duration - LEAD}><Audio src={staticFile(s.audio)} /></Sequence> : null}
        </Sequence>
      ))}
      <River story={story} total={total} />
    </AbsoluteFill>
  );
};
