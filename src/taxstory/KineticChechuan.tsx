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
const TAIL = 8;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

const segs = (() => {
  let acc = 0;
  return STORY.beats.map((b) => {
    const n = TAX_NARRATION[STORY.id + "-" + b.id];
    const duration = Math.max(90, (n ? Math.ceil(n.seconds * FPS) : 90) + LEAD + TAIL);
    const from = acc; acc += duration;
    return { ...b, duration, from, audio: n?.audio };
  });
})();
const S = (i: number) => segs[i];

const Burst: React.FC<{ at: number; count?: number }> = ({ at, count = 36 }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const p = clamp01((frame - at) / 20);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2;
        const r = 30 + easeOutExpo(p) * (240 + (i % 6) * 90);
        return <div key={i} style={{ position: "absolute", left: 960 + Math.cos(a) * r, top: 500 + Math.sin(a) * r * 0.6, width: 3, height: 3, background: "rgba(228,180,92," + (1 - p) + ")", boxShadow: "0 0 10px rgba(228,180,92,0.9)" }} />;
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
        return <span key={i} style={{ display: "inline-block", transform: "translateY(" + (1 - s) * 160 + "px) scale(" + (0.6 + s * 0.4) + ") rotate(" + (1 - s) * (i % 2 ? 6 : -6) + "deg)", opacity: s }}>{c}</span>;
      })}
    </div>
  );
};

const ShotHook: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(0).duration;
  const p = clamp01(frame / dur);
  const zoom = 1.2 - easeOutExpo(clamp01(frame / 50)) * 0.2;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(" + zoom + ") translateX(" + (p - 0.5) * 50 + "px)", filter: "brightness(0.42)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(5,8,14,0.94), rgba(5,8,14,0.5) 55%, rgba(5,8,14,0.8))" }} />
      <div style={{ position: "absolute", left: 110, top: 280 }}>
        <KineticTitle text="车船税" size={220} delay={2} />
        <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.gold, letterSpacing: 5, opacity: clamp01((frame - 18) / 12) }}>不是买车时交，是持有期间每年交</div>
        <div style={{ display: "flex", gap: 16, marginTop: 42 }}>
          {["1951 起点", "2012 立法", "七档排量", "1080 亿元"].map((t, i) => {
            const a = clamp01((frame - 30 - i * 7) / 10);
            return <div key={t} style={{ padding: "10px 22px", border: "1px solid rgba(228,180,92,0.6)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 22, opacity: a, transform: "translateY(" + (1 - a) * 20 + "px)" }}>{t}</div>;
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 200, textAlign: "right" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 90, fontWeight: 700, color: "rgba(228,180,92,0.9)" }}>70<span style={{ fontSize: 28 }}> 年</span></div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, letterSpacing: 3 }}>从牌照税到车船税</div>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          {["1951 牌照税", "1986 使用税", "2007 合并", "2012 立法", "2025 1080 亿"].map((t, i) => (
            <div key={t} style={{ padding: "6px 14px", borderRight: "2px solid rgba(228,180,92,0.5)", fontFamily: FONT_SANS, fontSize: 18, color: i % 2 ? COLORS.muted : COLORS.goldSoft, opacity: 0.5 + i * 0.1 }}>{t}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Shot1951: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slam = spring({ frame, fps, config: { damping: 9, stiffness: 260 }, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 35% 45%, rgba(228,180,92,0.2), transparent 60%)" }} />
      <div style={{ position: "absolute", left: 110, top: 250, transform: "scale(" + (1.6 - slam * 0.6) + ")", opacity: slam }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 360, fontWeight: 700, color: COLORS.goldSoft, lineHeight: 0.9 }}>1951</div>
      </div>
      <div style={{ position: "absolute", left: 120, top: 700, opacity: clamp01((frame - 20) / 14) }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: "#F7F2E7" }}>车船使用牌照税开征</div>
        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>按牌照和吨位征收，一用三十多年</div>
      </div>
      <div style={{ position: "absolute", right: 110, bottom: 120, display: "flex", gap: 18 }}>
        {["牌照", "吨位", "按年"].map((t, i) => <div key={t} style={{ padding: "10px 22px", border: "1px solid rgba(228,180,92,0.4)", color: COLORS.muted, fontFamily: FONT_SANS, fontSize: 20, opacity: clamp01((frame - 26 - i * 8) / 12) }}>{t}</div>)}
      </div>
      <Burst at={2} />
    </AbsoluteFill>
  );
};

const YEARS = [1951, 1986, 2007, 2012];
const LABELS = ["牌照税", "使用税", "两税合并", "车船税法"];
const ShotHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(5).from - S(2).from;
  const p = clamp01(frame / dur);
  const idx = Math.min(3, Math.floor(easeOutExpo(p) * 4 * 1.1));
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", right: 0, top: 0, width: 900, height: "100%", objectFit: "cover", opacity: 0.16, filter: "grayscale(0.5)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(90deg,#05080E 40%,rgba(5,8,14,0.7) 70%,rgba(5,8,14,0.92))" }} />
      <div style={{ position: "absolute", left: 110, top: 240 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 22, letterSpacing: 6, color: COLORS.gold }}>一条线，70 年</div>
        <div style={{ marginTop: 12, fontFamily: FONT_NUM, fontSize: 170, fontWeight: 700, color: "#F3D08A", lineHeight: 1 }}>{YEARS[idx]}</div>
        <div style={{ marginTop: 6, fontFamily: FONT_SANS, fontSize: 54, fontWeight: 700, color: "#F7F2E7" }}>{LABELS[idx]}</div>
        <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
          {["税种沿革", "税率分档", "立法进程"].map((t) => <span key={t} style={{ padding: "7px 14px", border: "1px solid rgba(228,180,92,0.4)", color: COLORS.muted, fontFamily: FONT_SANS, fontSize: 16 }}>{t}</span>)}
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 200, width: 560 }}>
        {YEARS.map((y, i) => (
          <div key={y} style={{ display: "flex", justifyContent: "space-between", padding: "16px 10px", borderBottom: "1px solid rgba(255,255,255,0.08)", background: i === idx ? "rgba(228,180,92,0.12)" : "transparent", opacity: i <= idx ? 1 : 0.35 }}>
            <span style={{ fontFamily: FONT_NUM, fontSize: 38, color: i === idx ? "#F3D08A" : COLORS.muted }}>{y}</span>
            <span style={{ fontFamily: FONT_SANS, fontSize: 20, color: i === idx ? "#F7F2E7" : COLORS.dim }}>{LABELS[i]}</span>
            <span style={{ color: COLORS.gold }}>{i === idx ? "▶" : ""}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 150, height: 3, background: "rgba(255,255,255,0.12)" }}>
        <div style={{ width: easeOutExpo(p) * 100 + "%", height: "100%", background: "linear-gradient(90deg,rgba(228,180,92,0.3),#E4B45C)", boxShadow: "0 0 24px rgba(228,180,92,0.8)" }} />
      </div>
    </AbsoluteFill>
  );
};

const BRACKETS = [
  { l: "1.0L 以下", v: 360, lo: 60 },
  { l: "1.0—1.6L", v: 540, lo: 300 },
  { l: "1.6—2.0L", v: 660, lo: 360 },
  { l: "2.0—2.5L", v: 1200, lo: 660 },
  { l: "2.5—3.0L", v: 2400, lo: 1200 },
  { l: "3.0—4.0L", v: 3600, lo: 2400 },
  { l: "4.0L 以上", v: 5400, lo: 3600 },
];
const ShotChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const span = S(5).duration;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#05080E" }}>
      <div style={{ position: "absolute", left: 110, top: 70 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>乘用车 · 按排量分档</div>
        <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 64, fontWeight: 700, color: "#F7F2E7" }}>排量越大，税越高</div>
      </div>
      <div style={{ position: "absolute", left: 110, top: 200, display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontFamily: FONT_NUM, fontSize: 36, color: COLORS.goldSoft }}>60 元</span>
        <span style={{ fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim }}>最低</span>
        <span style={{ width: 300, height: 2, background: "linear-gradient(90deg,rgba(228,180,92,0.2),rgba(228,180,92,0.9))" }} />
        <span style={{ fontFamily: FONT_NUM, fontSize: 36, color: COLORS.goldSoft }}>5400 元</span>
        <span style={{ fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim }}>最高</span>
        <span style={{ fontFamily: FONT_NUM, fontSize: 28, color: "#F3D08A", marginLeft: 10 }}>×90 倍</span>
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 300, height: 640 }}>
        {[0, 1000, 2000, 3000, 4000, 5400].map((v) => (
          <div key={v} style={{ position: "absolute", left: 0, right: 0, bottom: (v / 5400) * 100 + "%", borderTop: "1px dashed rgba(255,255,255,0.08)" }}>
            <span style={{ position: "absolute", left: -50, top: -10, fontFamily: FONT_NUM, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 300, display: "flex", alignItems: "flex-end", gap: 24, height: 640 }}>
        {BRACKETS.map((b, i) => {
          const s = spring({ frame: frame - 6 - i * 3, fps, config: { damping: 12, stiffness: 160 }, durationInFrames: 24 });
          return (
            <div key={b.l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 24, color: COLORS.goldSoft, marginBottom: 6, opacity: s }}>{b.lo}–{b.v}</div>
              <div style={{ width: "100%", height: (b.v / 5400) * 620 * s, background: "linear-gradient(180deg,rgba(228,180,92,0.95),rgba(228,180,92,0.18))" }} />
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.muted }}>{b.l}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const ShotDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(6).duration;
  const cards = [
    { t: "商用车", v: "480—1440", u: "元 / 年（客车）", d: "货车按整备质量，每吨 16—120 元" },
    { t: "船舶", v: "3—6", u: "元 / 净吨", d: "拖船、非机动船另有优惠" },
    { t: "新能源", v: "0", u: "元", d: "纯电动、燃料电池车船免征" },
  ];
  return (
    <AbsoluteFill style={{ padding: "100px 110px", background: "#05080E" }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>不止乘用车</div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: "#F7F2E7" }}>客车、货车、船舶，各有算法</div>
      <div style={{ display: "flex", gap: 26, marginTop: 60 }}>
        {cards.map((c, i) => {
          const p = clamp01((frame - 10 - i * 10) / 16);
          return (
            <div key={c.t} style={{ flex: 1, border: "1px solid rgba(228,180,92,0.35)", background: "rgba(255,255,255,0.03)", padding: "30px 28px", opacity: p, transform: "translateY(" + (1 - p) * 30 + "px)" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold }}>{c.t}</div>
              <div style={{ marginTop: 14, fontFamily: FONT_NUM, fontSize: 76, color: COLORS.goldSoft, lineHeight: 1 }}>{c.v}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: COLORS.muted, marginTop: 6 }}>{c.u}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, marginTop: 18, lineHeight: 1.7 }}>{c.d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 44, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>乘用车七档 · 商用车按质量 · 船舶按吨位 · 新能源免征</div>
    </AbsoluteFill>
  );
};

const ShotData: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(7).duration;
  const p = clamp01(frame / dur);
  const v = Math.round(easeOutExpo(p) * 1080);
  const { fps } = useVideoConfig();
  const slam = spring({ frame, fps, config: { damping: 10, stiffness: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, filter: "grayscale(0.5)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", transform: "scale(" + (1.12 - slam * 0.12) + ")" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 260, fontWeight: 700, color: "#F3D08A", lineHeight: 1 }}>{v}<span style={{ fontSize: 72, marginLeft: 12 }}>亿元</span></div>
        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 32, color: COLORS.muted, letterSpacing: 4 }}>2025 年全国车船税</div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 50 }}>
          {["地方税", "交强险代收", "按年缴纳", "≈2.96 亿/天"].map((t, i) => <div key={t} style={{ padding: "8px 22px", border: "1px solid rgba(228,180,92,0.5)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 24, opacity: clamp01((frame - 18 - i * 6) / 10) }}>{t}</div>)}
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 180, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 2 }}>
        <div>1951 牌照税</div><div>1986 使用税</div><div>2007 合并</div><div>2012 立法</div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 180, textAlign: "right", fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 2 }}>
        <div>乘用车 · 排量</div><div>商用车 · 质量</div><div>船舶 · 净吨位</div><div>新能源 · 免征</div>
      </div>
      <Burst at={0} count={50} />
    </AbsoluteFill>
  );
};

const RECAP = [
  { t: "增值税", y: "1918" }, { t: "企业所得税", y: "1799" }, { t: "个人所得税", y: "1799" },
  { t: "印花税", y: "1604" }, { t: "消费税", y: "1994" }, { t: "关税", y: "1842" },
];
const ShotRecap: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(8).duration;
  return (
    <AbsoluteFill style={{ padding: "90px 110px", background: "#05080E" }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>系列回顾</div>
      <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 58, fontWeight: 700, color: "#F7F2E7" }}>七个税种，七段历史</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 44 }}>
        {RECAP.map((r, i) => {
          const p = clamp01((frame - 8 - i * 5) / 14);
          return (
            <div key={r.t} style={{ border: "1px solid rgba(228,180,92,0.3)", background: "rgba(255,255,255,0.03)", padding: "20px 22px", opacity: p, transform: "scale(" + (0.92 + p * 0.08) + ")" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.goldSoft }}>{r.y}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: "#F7F2E7", marginTop: 4 }}>{r.t}</div>
            </div>
          );
        })}
        <div style={{ border: "1px solid rgba(228,180,92,0.7)", background: "rgba(228,180,92,0.10)", padding: "20px 22px" }}>
          <div style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold }}>1951</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft, marginTop: 4 }}>车船税</div>
        </div>
      </div>
      <div style={{ marginTop: 34, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>每一期，都是一个税种的来路</div>
    </AbsoluteFill>
  );
};

const ShotEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(9).duration;
  const p = clamp01(frame / 40);
  return (
    <AbsoluteFill style={{ justifyContent: "center", padding: "0 140px", background: "#05080E" }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 22, letterSpacing: 6, color: COLORS.gold, opacity: p }}>小结</div>
      <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 76, fontWeight: 700, color: "#F7F2E7", lineHeight: 1.35, opacity: p }}>一辆车，从买到用，<br />税制一路相随。</div>
      <div style={{ marginTop: 30, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, opacity: clamp01((frame - 20) / 16) }}>车船税，是持有环节最直观的一道税</div>
      <div style={{ marginTop: 50, display: "flex", gap: 14, opacity: clamp01((frame - 30) / 16) }}>
        {["增值税", "企业所得税", "个人所得税", "印花税", "消费税", "关税"].map((t) => <span key={t} style={{ padding: "6px 14px", border: "1px solid rgba(255,255,255,0.15)", fontSize: 15, color: COLORS.dim, fontFamily: FONT_SANS }}>{t}</span>)}
      </div>
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  if (frame < at) return null;
  const o = Math.max(0, 1 - (frame - at) / 6);
  return <AbsoluteFill style={{ background: "rgba(255,244,220," + o * 0.5 + ")", pointerEvents: "none" }} />;
};

export const KineticChechuan: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#05080E" }}>
      <Sequence from={S(0).from} durationInFrames={S(0).duration}><ShotHook /></Sequence>
      <Sequence from={S(1).from} durationInFrames={S(1).duration}><Shot1951 /></Sequence>
      <Sequence from={S(2).from} durationInFrames={S(5).from - S(2).from}><ShotHistory /></Sequence>
      <Sequence from={S(5).from} durationInFrames={S(5).duration}><ShotChart /></Sequence>
      <Sequence from={S(6).from} durationInFrames={S(6).duration}><ShotDetail /></Sequence>
      <Sequence from={S(7).from} durationInFrames={S(7).duration}><ShotData /></Sequence>
      <Sequence from={S(8).from} durationInFrames={S(8).duration}><ShotRecap /></Sequence>
      <Sequence from={S(9).from} durationInFrames={S(9).duration}><ShotEnd /></Sequence>
      <Flash at={S(1).from} />
      <Flash at={S(2).from} />
      <Flash at={S(5).from} />
      <Flash at={S(6).from} />
      <Flash at={S(7).from} />
      <Flash at={S(8).from} />
      {segs.map((s) => (
        <Sequence key={s.id} from={s.from} durationInFrames={s.duration}>
          {s.audio ? <Sequence from={LEAD} durationInFrames={s.duration - LEAD}><Audio src={staticFile(s.audio)} /></Sequence> : null}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
