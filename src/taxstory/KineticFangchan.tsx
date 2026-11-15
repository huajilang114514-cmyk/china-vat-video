import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { COLORS, FONT_NUM, FONT_SANS } from "../theme";
import { TAX_NARRATION } from "./narration";
import storiesData from "./stories.json";

type Beat = { id: string; narration: string; kicker: string; title: string; body?: string };
type Story = { id: string; tax: string; title: string; subtitle: string; image?: string; imageCaption?: string; beats: Beat[] };
const STORY = (storiesData as unknown as Story[]).find((s) => s.id === "fangchan")!;
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
        <KineticTitle text="房产税" size={220} delay={2} />
        <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.gold, letterSpacing: 5, opacity: clamp01((frame - 18) / 12) }}>自住为什么不用交？答案在1986年</div>
        <div style={{ display: "flex", gap: 16, marginTop: 42 }}>
          {["1986 条例", "1.2% / 12%", "自住免征", "5212 亿元"].map((t, i) => {
            const a = clamp01((frame - 30 - i * 7) / 10);
            return <div key={t} style={{ padding: "10px 22px", border: "1px solid rgba(228,180,92,0.6)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 22, opacity: a, transform: "translateY(" + (1 - a) * 20 + "px)" }}>{t}</div>;
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 200, textAlign: "right" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 90, fontWeight: 700, color: "rgba(228,180,92,0.9)" }}>76<span style={{ fontSize: 28 }}> 年</span></div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, letterSpacing: 3 }}>从城市房产税到房产税</div>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          {["1950 城市房产税", "1986 暂行条例", "2011 沪渝试点", "2021 试点授权", "2025 5212 亿"].map((t, i) => (
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
        <div style={{ fontFamily: FONT_NUM, fontSize: 360, fontWeight: 700, color: COLORS.goldSoft, lineHeight: 0.9 }}>1950</div>
      </div>
      <div style={{ position: "absolute", left: 120, top: 700, opacity: clamp01((frame - 20) / 14) }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: "#F7F2E7" }}>城市房产税开征</div>
        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>按房价或租金，向房屋所有人征收</div>
      </div>
      <div style={{ position: "absolute", right: 110, bottom: 120, display: "flex", gap: 18 }}>
        {["房价", "租金", "营业"].map((t, i) => <div key={t} style={{ padding: "10px 22px", border: "1px solid rgba(228,180,92,0.4)", color: COLORS.muted, fontFamily: FONT_SANS, fontSize: 20, opacity: clamp01((frame - 26 - i * 8) / 12) }}>{t}</div>)}
      </div>
      <Burst at={2} />
    </AbsoluteFill>
  );
};

const YEARS = [1950, 1986, 2011, 2021];
const LABELS = ["城市房产税", "暂行条例", "沪渝试点", "试点授权"];
const ShotHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(5).duration;
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

const ShotChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { l: "自住", v: 0, d: "个人非营业用房 · 免征" },
    { l: "从价", v: 1.2, d: "房产余值 × 1.2%" },
    { l: "出租", v: 12, d: "租金 × 12%" },
  ];
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.10, filter: "grayscale(0.4)" }} />
      <div style={{ position: "absolute", left: 110, top: 90 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>三种情形 · 三种算法</div>
        <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 64, fontWeight: 700, color: "#F7F2E7" }}>自住不征，出租 12%</div>
        <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>自用按余值 1.2%，出租按租金 12%</div>
      </div>
      <div style={{ position: "absolute", left: 140, right: 140, top: 420, display: "flex", alignItems: "flex-end", gap: 60, height: 460 }}>
        {items.map((x, i) => {
          const s = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 12, stiffness: 140 }, durationInFrames: 26 });
          const h = Math.max(6, (x.v / 12) * 400 * s);
          return (
            <div key={x.l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 64, color: COLORS.goldSoft, opacity: s }}>{x.v}%</div>
              <div style={{ width: "100%", height: h, background: "linear-gradient(180deg, rgba(228,180,92,0.95), rgba(228,180,92,0.2))", marginTop: 8 }} />
              <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 34, color: "#F7F2E7" }}>{x.l}</div>
              <div style={{ marginTop: 6, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim }}>{x.d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 120, display: "flex", gap: 20 }}>
        {["从价计征", "从租计征", "个人非营业免征"].map((x) => <span key={x} style={{ padding: "8px 18px", border: "1px solid rgba(228,180,92,0.35)", color: COLORS.muted, fontFamily: FONT_SANS, fontSize: 18 }}>{x}</span>)}
      </div>
    </AbsoluteFill>
  );
};

const ShotDetail: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(6).duration;
  const cards = [
    { t: "自住", v: "0", u: "元", d: "个人非营业用房免征" },
    { t: "出租", v: "12%", u: "租金", d: "按租金收入计征" },
    { t: "自用经营", v: "1.2%", u: "房产余值", d: "按余值从价计征" },
  ];
  return (
    <AbsoluteFill style={{ padding: "100px 110px", background: "#05080E" }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>房产税怎么算</div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: "#F7F2E7" }}>三种情形，三种税负</div>
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
      <div style={{ display: "flex", gap: 20, marginTop: 50 }}>
        {[
          { t: "1950", v: "城市房产税", d: "按房价或租金" },
          { t: "1986", v: "暂行条例", d: "10月1日施行" },
          { t: "2011", v: "沪渝试点", d: "部分个人住房" },
          { t: "2021", v: "试点授权", d: "五年授权" },
        ].map((c, i) => {
          const pp = clamp01((frame - 42 - i * 8) / 14);
          return (
            <div key={c.t} style={{ flex: 1, padding: "18px 20px", borderLeft: "2px solid rgba(228,180,92,0.5)", opacity: pp, transform: "translateX(" + (1 - pp) * -20 + "px)" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: COLORS.gold }}>{c.t}</div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.goldSoft, marginTop: 4 }}>{c.v}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 15, color: COLORS.dim, marginTop: 4 }}>{c.d}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 40, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>个人非营业免征 · 从价 1.2% · 从租 12% · 地方税</div>
    </AbsoluteFill>
  );
};

const ShotData: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(7).duration;
  const p = clamp01(frame / dur);
  const v = Math.round(easeOutExpo(p) * 5212);
  const { fps } = useVideoConfig();
  const slam = spring({ frame, fps, config: { damping: 10, stiffness: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, filter: "grayscale(0.5)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", transform: "scale(" + (1.12 - slam * 0.12) + ")" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 260, fontWeight: 700, color: "#F3D08A", lineHeight: 1 }}>{v}<span style={{ fontSize: 72, marginLeft: 12 }}>亿元</span></div>
        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 32, color: COLORS.muted, letterSpacing: 4 }}>2025 年全国房产税</div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 50 }}>
          {["地方税", "从价+从租", "2025", "≈14.3 亿/天"].map((t, i) => <div key={t} style={{ padding: "8px 22px", border: "1px solid rgba(228,180,92,0.5)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 24, opacity: clamp01((frame - 18 - i * 6) / 10) }}>{t}</div>)}
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 180, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 2 }}>
        <div>1950 城市房产税</div><div>1986 暂行条例</div><div>2011 沪渝试点</div><div>2021 试点授权</div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 180, textAlign: "right", fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 2 }}>
        <div>自住 · 免征</div><div>出租 · 12%</div><div>自用 · 1.2%</div><div>地方 · 100%</div>
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
      <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 58, fontWeight: 700, color: "#F7F2E7" }}>九个税种，九段历史</div>
      <div style={{ position: "absolute", right: 80, bottom: 70, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: "rgba(228,180,92,0.05)" }}>1604—2025</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginTop: 44 }}>
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
          <div style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold }}>1986</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft, marginTop: 4 }}>房产税</div>
        </div>
        <div style={{ border: "1px dashed rgba(255,255,255,0.18)", padding: "20px 22px" }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>更多税种</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted, marginTop: 8 }}>持续更新中</div>
        </div>
      </div>
      <div style={{ marginTop: 34, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>每一期，都是一个税种的来路</div>
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 150, height: 2, background: "rgba(228,180,92,0.25)" }}>
        {[{ t: "印花税", y: "1604" }, { t: "企业所得税", y: "1799" }, { t: "个人所得税", y: "1799" }, { t: "关税", y: "1842" }, { t: "增值税", y: "1918" }, { t: "车船税", y: "1951" }, { t: "房产税", y: "1986" }, { t: "消费税", y: "1994" }, { t: "烟叶税", y: "2006" }].map((x, i) => (
          <div key={x.t + x.y} style={{ position: "absolute", left: (i / 8) * 100 + "%", top: -8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: i === 6 ? COLORS.gold : "rgba(255,255,255,0.25)" }} />
            <div style={{ marginTop: 12, transform: "translateX(-50%)", textAlign: "center", fontFamily: FONT_NUM, fontSize: 18, color: i === 6 ? COLORS.goldSoft : COLORS.dim }}>{x.y}</div>
            <div style={{ transform: "translateX(-50%)", textAlign: "center", fontFamily: FONT_SANS, fontSize: 13, color: COLORS.dim, whiteSpace: "nowrap" }}>{x.t}</div>
          </div>
        ))}
      </div>
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
      <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 76, fontWeight: 700, color: "#F7F2E7", lineHeight: 1.35, opacity: p }}>房子是用来住的，<br />税制也在寻找边界。</div>
      <div style={{ marginTop: 30, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, opacity: clamp01((frame - 20) / 16) }}>房产税的故事，也是中国楼市的故事</div>
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

export const KineticFangchan: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#05080E" }}>
      <Sequence from={S(0).from} durationInFrames={S(0).duration}><ShotHook /></Sequence>
      <Sequence from={S(1).from} durationInFrames={S(1).duration}><Shot1951 /></Sequence>
      <Sequence from={S(2).from} durationInFrames={S(5).from - S(2).from}><ShotChart /></Sequence>
      <Sequence from={S(5).from} durationInFrames={S(5).duration}><ShotHistory /></Sequence>
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
