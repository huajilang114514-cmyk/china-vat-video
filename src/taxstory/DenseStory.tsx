import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { COLORS, FONT_NUM, FONT_SANS } from "../theme";
import { TAX_NARRATION } from "./narration";
import storiesData from "./stories.json";
import { DocuBackdrop, ease } from "./ui";

type Beat = { id: string; kind: string; narration: string; kicker: string; title: string; body?: string; year?: string };
type Story = { id: string; tax: string; en: string; title: string; subtitle: string; image?: string; imageCaption?: string; chips?: string[]; beats: Beat[] };
const STORIES = storiesData as unknown as Story[];
const FPS = 30;
const LEAD = 4;
const TAIL = 10;

const EVENTS = [
  { year: 1951, label: "牌照税开征" },
  { year: 1986, label: "车船使用税" },
  { year: 2007, label: "两税合并" },
  { year: 2012, label: "车船税法" },
  { year: 2012.4, label: "按排量分档" },
  { year: 2018, label: "新能源免征" },
  { year: 2025, label: "约 1080 亿元" },
];
const BEAT_YEARS = [1951, 1986, 2007, 2012, 2012.2, 2012.4, 2025];

export const DenseStory: React.FC<{ storyId: string }> = ({ storyId }) => {
  const story = STORIES.find((s) => s.id === storyId)!;
  const frame = useCurrentFrame();
  const segs = story.beats.map((b) => {
    const n = TAX_NARRATION[story.id + "-" + b.id];
    const frames = n ? Math.ceil(n.seconds * FPS) : 100;
    return { ...b, duration: Math.max(100, frames + LEAD + TAIL), audio: n?.audio };
  });
  let acc = 0;
  const segsWithFrom = segs.map((s) => { const from = acc; acc += s.duration; return { ...s, from }; });
  const total = acc;
  const p = interpolate(frame, [0, total], [0, 1], { extrapolateRight: "clamp" });
  const activeIdx = Math.max(0, segsWithFrom.findIndex((s, i) => frame >= s.from && (i === segsWithFrom.length - 1 || frame < segsWithFrom[i + 1].from)));
  const active = segsWithFrom[activeIdx];
  const curYear = active ? BEAT_YEARS[activeIdx] : 1951;
  const yearProgress = (curYear - 1951) / (2025 - 1951);
  const X0 = 110, X1 = 1810;
  const x = X0 + yearProgress * (X1 - X0);
  const lineGrow = X0 + p * (X1 - X0);

  return (
    <AbsoluteFill style={{ backgroundColor: "#050A12" }}>
      <DocuBackdrop />
      <AbsoluteFill style={{ padding: "64px 90px" }}>
        {/* top row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 9, height: 9, background: COLORS.gold, transform: "rotate(45deg)" }} />
              <span style={{ fontFamily: FONT_SANS, fontSize: 22, letterSpacing: 6, color: COLORS.gold }}>{story.tax} · {story.en}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 18, letterSpacing: 3, color: COLORS.dim, marginLeft: 12 }}>1951 — 2025</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginTop: 10 }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 116, fontWeight: 700, color: COLORS.goldSoft, lineHeight: 1 }}>{Math.round(curYear)}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 38, fontWeight: 700, color: COLORS.ink }}>{active?.title}</div>
            </div>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted, maxWidth: 760, lineHeight: 1.6 }}>{active?.body}</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[{ v: "1.0L", l: "最低档" }, { v: "4.0L+", l: "最高档" }, { v: "1080", l: "亿元 / 2025" }].map((s, i) => (
              <div key={s.l} style={{ width: 156, padding: "16px 18px", border: "1px solid rgba(228,180,92,0.35)", background: "rgba(255,255,255,0.03)", borderRadius: 10, opacity: 0.5 + 0.5 * ease(frame, 20 + i * 10, 16) }}>
                <div style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.goldSoft }}>{s.v}</div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 15, color: COLORS.dim, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* photo inset + live detail */}
        <div style={{ position: "absolute", right: 90, top: 300, width: 400 }}>
          {story.image ? (
            <div style={{ border: "1px solid rgba(228,180,92,0.35)", padding: 8, background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
              <div style={{ overflow: "hidden", height: 230 }}>
                <Img src={staticFile(story.image)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(" + (1.02 + p * 0.05) + ")" }} />
              </div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 13, color: COLORS.dim }}>{story.imageCaption}</div>
            </div>
          ) : null}
          <div style={{ marginTop: 16, padding: "14px 16px", borderLeft: "2px solid " + COLORS.gold, background: "rgba(228,180,92,0.05)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 15, color: COLORS.gold, letterSpacing: 2 }}>本段要点</div>
            <div style={{ marginTop: 6, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.muted, lineHeight: 1.7 }}>{active?.body}</div>
          </div>
        </div>

        {/* left column extra facts */}
        <div style={{ position: "absolute", left: 90, top: 470, width: 300 }}>
          {["乘用车按排量", "商用车按整备质量", "船舶按净吨位", "交强险代收代缴"].map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, opacity: 0.45 + 0.55 * ease(frame, 30 + i * 12, 18) }}>
              <div style={{ width: 6, height: 6, background: COLORS.gold, transform: "rotate(45deg)" }} />
              <span style={{ fontFamily: FONT_SANS, fontSize: 18, color: COLORS.muted }}>{t}</span>
            </div>
          ))}
          <div style={{ marginTop: 20, fontFamily: FONT_NUM, fontSize: 60, color: "rgba(228,180,92,0.9)" }}>{Math.round(interpolate(frame, [0, total], [0, 1080]))}<span style={{ fontSize: 20 }}> 亿元</span></div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: COLORS.dim }}>2025 全国车船税（滚动）</div>
        </div>

        {/* timeline */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 130, height: 220 }}>
          <div style={{ position: "absolute", left: X0, right: 1920 - X1, top: 96, height: 1, background: "rgba(255,255,255,0.14)" }} />
          <div style={{ position: "absolute", left: X0, top: 95, height: 3, width: Math.max(0, lineGrow - X0), background: "linear-gradient(90deg, rgba(228,180,92,0.25), rgba(228,180,92,1))", boxShadow: "0 0 20px rgba(228,180,92,0.8)" }} />
          {EVENTS.map((e, i) => {
            const ex = X0 + ((e.year - 1951) / (2025 - 1951)) * (X1 - X0);
            const on = frame >= (segsWithFrom[Math.min(i, segsWithFrom.length - 1)]?.from ?? 0);
            const up = i % 2 === 0;
            return (
              <div key={e.label} style={{ position: "absolute", left: ex - 7, top: 88, width: 14, height: 14, borderRadius: 999, background: on ? COLORS.gold : "rgba(255,255,255,0.18)", boxShadow: on ? "0 0 18px rgba(228,180,92,0.9)" : undefined }} />
            );
          })}
          {EVENTS.map((e, i) => {
            const ex = X0 + ((e.year - 1951) / (2025 - 1951)) * (X1 - X0);
            const reached = frame >= (segsWithFrom[Math.min(i, segsWithFrom.length - 1)]?.from ?? 0);
            const up = i % 2 === 0;
            return (
              <div key={e.label + "l"} style={{ position: "absolute", left: Math.max(6, ex - 74), top: up ? 20 : 118, width: 148, textAlign: "center", opacity: reached ? 1 : 0.3 }}>
                <div style={{ fontFamily: FONT_NUM, fontSize: 22, color: reached ? COLORS.gold : "rgba(255,255,255,0.25)" }}>{Math.round(e.year)}</div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 14, color: reached ? COLORS.muted : "rgba(255,255,255,0.2)", marginTop: 2 }}>{e.label}</div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: x - 9, top: 81, width: 18, height: 18, borderRadius: 999, background: "#F3D08A", boxShadow: "0 0 26px 10px rgba(228,180,92,0.9)" }} />
          <div style={{ position: "absolute", left: X0, bottom: 8, fontFamily: FONT_SANS, fontSize: 15, color: COLORS.dim, letterSpacing: 2 }}>车船税简史 · 一条线看完 70 年</div>
          <div style={{ position: "absolute", right: 110, bottom: 8, display: "flex", gap: 22 }}>
            {["1951 牌照税", "2007 合并", "2012 立法", "2025 数据"].map((t) => <span key={t} style={{ fontFamily: FONT_SANS, fontSize: 14, color: "rgba(255,255,255,0.35)" }}>{t}</span>)}
          </div>
        </div>
      </AbsoluteFill>

      {segsWithFrom.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.duration}>
          {s.audio ? <Sequence from={LEAD} durationInFrames={s.duration - LEAD}><Audio src={staticFile(s.audio)} /></Sequence> : null}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
