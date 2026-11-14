import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { COLORS, FONT_NUM, FONT_SANS } from "../theme";
import { TAX_NARRATION } from "./narration";
import storiesData from "./stories.json";

type Beat = { id: string; narration: string; kicker: string; title: string; body?: string };
type Story = { id: string; tax: string; title: string; subtitle: string; image?: string; imageCaption?: string; beats: Beat[] };
const STORY = (storiesData as unknown as Story[]).find((s) => s.id === "chechuan")!;
const FPS = 30;
const LEAD = 4;
const TAIL = 10;

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInExpo = (t: number) => (t <= 0 ? 0 : Math.pow(2, 10 * (t - 1)));
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const segs = (() => {
  let acc = 0;
  return STORY.beats.map((b) => {
    const n = TAX_NARRATION[STORY.id + "-" + b.id];
    const duration = Math.max(100, (n ? Math.ceil(n.seconds * FPS) : 100) + LEAD + TAIL);
    const from = acc; acc += duration;
    return { ...b, duration, from, audio: n?.audio };
  });
})();
const TOTAL = segs.reduce((a, b) => a + b.duration, 0);
const S = (i: number) => segs[i];

const Burst: React.FC<{ at: number; count?: number; color?: string }> = ({ at, count = 36, color = "228,180,92" }) => {
  const frame = useCurrentFrame();
  const p = clamp01((frame - at) / 22);
  if (frame < at) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 + (i % 3) * 0.1;
        const r = 40 + easeOutExpo(p) * (300 + (i % 5) * 120);
        return <div key={i} style={{ position: "absolute", left: 960 + Math.cos(a) * r, top: 520 + Math.sin(a) * r * 0.6, width: 3, height: 3, background: "rgba(" + color + "," + (1 - p) + ")", boxShadow: "0 0 12px rgba(" + color + ",0.9)" }} />;
      })}
    </AbsoluteFill>
  );
};

const KineticTitle: React.FC<{ text: string; delay?: number; size?: number }> = ({ text, delay = 0, size = 200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ display: "flex", fontFamily: FONT_SANS, fontSize: size, fontWeight: 700, color: "#F7F2E7", letterSpacing: 4, textShadow: "0 20px 80px rgba(0,0,0,0.8)" }}>
      {Array.from(text).map((c, i) => {
        const s = spring({ frame: frame - delay - i * 3, fps, config: { damping: 11, stiffness: 220 }, durationInFrames: 22 });
        return <span key={i} style={{ display: "inline-block", transform: "translateY(" + (1 - s) * 180 + "px) scale(" + (0.6 + s * 0.4) + ") rotate(" + (1 - s) * (i % 2 ? 6 : -6) + "deg)", opacity: s }}>{c}</span>;
      })}
    </div>
  );
};

const ShotHook: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(0).duration;
  const p = clamp01(frame / dur);
  const zoom = 1.22 - easeOutExpo(clamp01(frame / 50)) * 0.22;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(" + zoom + ") translateX(" + (p - 0.5) * 60 + "px)", filter: "brightness(0.42) saturate(0.9)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(5,8,14,0.92) 0%, rgba(5,8,14,0.45) 55%, rgba(5,8,14,0.75) 100%)" }} />
      <div style={{ position: "absolute", left: 110, top: 300 }}>
        <KineticTitle text="车船税" size={230} delay={2} />
        <div style={{ marginTop: 20, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.gold, letterSpacing: 6, opacity: clamp01((frame - 18) / 12) }}>不是买车时交，是持有期间每年交</div>
        <div style={{ display: "flex", gap: 18, marginTop: 46 }}>
          {["1951 起点", "2012 立法", "每年缴纳"].map((t, i) => {
            const a = clamp01((frame - 30 - i * 8) / 10);
            return <div key={t} style={{ padding: "12px 26px", border: "1px solid rgba(228,180,92,0.6)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 24, opacity: a, transform: "translateY(" + (1 - a) * 20 + "px)" }}>{t}</div>;
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, bottom: 80, fontFamily: FONT_NUM, fontSize: 28, color: "rgba(255,255,255,0.45)", letterSpacing: 3 }}>01 / 05</div>
    </AbsoluteFill>
  );
};

const Shot1951: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = S(1).duration;
  const slam = spring({ frame, fps, config: { damping: 9, stiffness: 260 }, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 35% 45%, rgba(228,180,92,0.20), transparent 60%)" }} />
      <div style={{ position: "absolute", left: 110, top: 240, transform: "scale(" + (1.6 - slam * 0.6) + ")", opacity: slam }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 360, fontWeight: 700, color: COLORS.goldSoft, lineHeight: 0.9, textShadow: "0 0 80px rgba(228,180,92,0.35)" }}>1951</div>
      </div>
      <div style={{ position: "absolute", left: 120, top: 700, opacity: clamp01((frame - 20) / 14) }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 64, fontWeight: 700, color: "#F7F2E7" }}>车船使用牌照税开征</div>
        <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>对车、船按牌照和吨位征税，一用就是三十多年</div>
      </div>
      <Burst at={2} />
      <div style={{ position: "absolute", right: 110, top: 300, width: 520, border: "1px solid rgba(228,180,92,0.35)", transform: "rotate(-2deg)", opacity: clamp01((frame - 26) / 16) }}>
        <Img src={staticFile(STORY.image!)} style={{ width: "100%", display: "block", filter: "grayscale(0.2)" }} />
        <div style={{ padding: 10, fontFamily: FONT_SANS, fontSize: 14, color: COLORS.dim }}>{STORY.imageCaption}</div>
      </div>
    </AbsoluteFill>
  );
};

const BRACKETS = [
  { l: "1.0L 以下", v: 360 },
  { l: "1.0—1.6L", v: 540 },
  { l: "1.6—2.0L", v: 660 },
  { l: "2.0—2.5L", v: 1200 },
  { l: "2.5—3.0L", v: 2400 },
  { l: "3.0—4.0L", v: 3600 },
  { l: "4.0L 以上", v: 5400 },
];

const ShotBrackets: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const span = S(4).from - S(2).from;
  const p = clamp01(frame / span);
  const camScale = 1 + easeOutExpo(p) * 0.10;
  const camX = -easeOutExpo(p) * 20;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#05080E" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#05080E,#0A1220)" }} />
      <div style={{ position: "absolute", inset: 0, transform: "scale(" + camScale + ") translateX(" + camX + "px)", transformOrigin: "70% 60%" }}>
        <div style={{ position: "absolute", left: 110, top: 80 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, letterSpacing: 6, color: COLORS.gold }}>乘用车 · 按排量分档</div>
          <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 68, fontWeight: 700, color: "#F7F2E7" }}>排量越大，税越高</div>
          <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted }}>1.0L 以下最低，4.0L 以上最高；新能源车船免征</div>
        </div>
        <div style={{ position: "absolute", left: 110, right: 110, top: 330, display: "flex", alignItems: "flex-end", gap: 26, height: 560 }}>
          {BRACKETS.map((b, i) => {
            const s = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 12, stiffness: 160 }, durationInFrames: 24 });
            const h = (b.v / 5400) * 500 * s;
            return (
              <div key={b.l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <div style={{ fontFamily: FONT_NUM, fontSize: 26, color: COLORS.goldSoft, marginBottom: 8, opacity: s }}>{b.v}</div>
                <div style={{ width: "100%", height: h, background: "linear-gradient(180deg, rgba(228,180,92,0.95), rgba(228,180,92,0.18))", boxShadow: "0 0 30px rgba(228,180,92,0.25)" }} />
                <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.muted, textAlign: "center" }}>{b.l}</div>
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", right: 120, top: 170, textAlign: "right" }}>
          <div style={{ fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: "#F3D08A", lineHeight: 1 }}>5400<span style={{ fontSize: 40 }}> 元</span></div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>4.0L 以上年税额上限</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ShotHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(4).duration;
  const p = clamp01(frame / dur);
  const years = [1951, 1986, 2007, 2012, 2018];
  const idx = Math.min(years.length - 1, Math.floor(easeOutExpo(p) * years.length * 1.2));
  const cur = years[idx];
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 80, top: 40, fontFamily: FONT_NUM, fontSize: 90, fontWeight: 700, color: "rgba(228,180,92,0.18)" }}>{cur}</div>
      <div style={{ position: "absolute", left: 110, top: 260 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 22, letterSpacing: 6, color: COLORS.gold }}>一条线，70 年</div>
        <div style={{ marginTop: 16, fontFamily: FONT_NUM, fontSize: 170, fontWeight: 700, color: "#F3D08A", lineHeight: 1 }}>{cur}</div>
        <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 54, fontWeight: 700, color: "#F7F2E7" }}>{["牌照税开征", "车船使用税", "两税合并", "车船税法", "新能源免征"][idx]}</div>
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 220, height: 3, background: "rgba(255,255,255,0.12)" }}>
        <div style={{ width: easeOutExpo(p) * 100 + "%", height: "100%", background: "linear-gradient(90deg, rgba(228,180,92,0.3), #E4B45C)", boxShadow: "0 0 30px rgba(228,180,92,0.8)" }} />
      </div>
      {years.map((y, i) => (
        <div key={y} style={{ position: "absolute", left: 110 + (i / (years.length - 1)) * (1700), bottom: 160, width: 2, height: 40, background: i <= idx ? COLORS.gold : "rgba(255,255,255,0.2)" }} />
      ))}
      <Burst at={4} count={30} />
    </AbsoluteFill>
  );
};

const ShotData: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(6).from + S(6).duration - S(5).from;
  const p = clamp01(frame / dur);
  const v = Math.round(easeOutExpo(p) * 1080);
  const { fps } = useVideoConfig();
  const slam = spring({ frame, fps, config: { damping: 10, stiffness: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, rgba(228,180,92,0.18), transparent 62%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, textAlign: "center", transform: "scale(" + (1.15 - slam * 0.15) + ")" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 280, fontWeight: 700, color: "#F3D08A", lineHeight: 1, textShadow: "0 0 80px rgba(228,180,92,0.35)" }}>{v}<span style={{ fontSize: 80, marginLeft: 14 }}>亿元</span></div>
        <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 34, color: COLORS.muted, letterSpacing: 4 }}>2025 年全国车船税</div>
        <div style={{ marginTop: 46, display: "flex", justifyContent: "center", gap: 60 }}>
          {["地方税", "按年缴纳", "交强险代收"].map((t, i) => <div key={t} style={{ padding: "10px 26px", border: "1px solid rgba(228,180,92,0.5)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 26, opacity: clamp01((frame - 20 - i * 8) / 10) }}>{t}</div>)}
        </div>
      </div>
      <Burst at={0} count={50} />
      <div style={{ position: "absolute", left: 110, bottom: 90, right: 110, display: "flex", justifyContent: "space-between", fontFamily: FONT_SANS, fontSize: 18, color: "rgba(255,255,255,0.35)" }}>
        <span>1951 牌照税</span><span>2007 合并</span><span>2012 立法</span><span>2025 数据</span>
      </div>
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const o = Math.max(0, 1 - (frame - at) / 7);
  return <AbsoluteFill style={{ background: "rgba(255,244,220," + o * 0.55 + ")", pointerEvents: "none" }} />;
};

export const KineticChechuan: React.FC = () => {
  const shots = [S(0), S(1), S(2), S(4), S(5)];
  return (
    <AbsoluteFill style={{ backgroundColor: "#05080E" }}>
      <Sequence from={S(0).from} durationInFrames={S(0).duration}><ShotHook /></Sequence>
      <Sequence from={S(1).from} durationInFrames={S(1).duration}><Shot1951 /></Sequence>
      <Sequence from={S(2).from} durationInFrames={S(4).from - S(2).from}><ShotBrackets /></Sequence>
      <Sequence from={S(4).from} durationInFrames={S(4).duration}><ShotHistory /></Sequence>
      <Sequence from={S(5).from} durationInFrames={S(6).from + S(6).duration - S(5).from}><ShotData /></Sequence>
      <Flash at={S(1).from} />
      <Flash at={S(2).from} />
      <Flash at={S(4).from} />
      <Flash at={S(5).from} />
      {segs.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.duration}>
          {s.audio ? <Sequence from={LEAD} durationInFrames={s.duration - LEAD}><Audio src={staticFile(s.audio)} /></Sequence> : null}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
