import React from "react";
import { AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import "../fonts";
import { COLORS, FONT_NUM, FONT_SANS } from "../theme";
import { TAX_NARRATION } from "./narration";
import storiesData from "./stories.json";

type Beat = { id: string; narration: string; kicker: string; title: string; body?: string };
type Story = { id: string; tax: string; title: string; subtitle: string; image?: string; imageCaption?: string; beats: Beat[] };
const STORY = (storiesData as unknown as Story[]).find((s) => s.id === "yanye")!;
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
        <KineticTitle text="烟叶税" size={220} delay={2} />
        <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.gold, letterSpacing: 5, opacity: clamp01((frame - 18) / 12) }}>从田头到烟厂，它先交一次税</div>
        <div style={{ display: "flex", gap: 16, marginTop: 42 }}>
          {["2006 开征", "20% 税率", "收购环节", "约 100 亿元"].map((t, i) => {
            const a = clamp01((frame - 30 - i * 7) / 10);
            return <div key={t} style={{ padding: "10px 22px", border: "1px solid rgba(228,180,92,0.6)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 22, opacity: a, transform: "translateY(" + (1 - a) * 20 + "px)" }}>{t}</div>;
          })}
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 200, textAlign: "right" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 90, fontWeight: 700, color: "rgba(228,180,92,0.9)" }}>20<span style={{ fontSize: 28 }}> 年</span></div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, letterSpacing: 3 }}>从农业税到烟叶税</div>
        <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
          {["2006 暂行条例", "2017 烟叶税法", "2018 正式施行", "2025 约 100 亿"].map((t, i) => (
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
        <div style={{ fontFamily: FONT_NUM, fontSize: 360, fontWeight: 700, color: COLORS.goldSoft, lineHeight: 0.9 }}>2006</div>
      </div>
      <div style={{ position: "absolute", left: 120, top: 700, opacity: clamp01((frame - 20) / 14) }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: "#F7F2E7" }}>烟叶税暂行条例施行</div>
        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>取消烟叶特产农业税，改征烟叶税</div>
      </div>
      <div style={{ position: "absolute", right: 110, bottom: 120, display: "flex", gap: 18 }}>
        {["专卖", "收购", "20%"].map((t, i) => <div key={t} style={{ padding: "10px 22px", border: "1px solid rgba(228,180,92,0.4)", color: COLORS.muted, fontFamily: FONT_SANS, fontSize: 20, opacity: clamp01((frame - 26 - i * 8) / 12) }}>{t}</div>)}
      </div>
      <Burst at={2} />
    </AbsoluteFill>
  );
};

const YEARS = [2006, 2017, 2018];
const LABELS = ["暂行条例", "烟叶税法", "正式施行"];
const ShotHistory: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(5).from - S(2).from;
  const p = clamp01(frame / dur);
  const idx = Math.min(2, Math.floor(easeOutExpo(p) * 3 * 1.15));
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
  const dur = S(5).duration;
  const p = clamp01(frame / (dur * 0.7));
  const grow = spring({ frame: frame - 4, fps, config: { damping: 16, stiffness: 90 }, durationInFrames: 40 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.10, filter: "grayscale(0.4)" }} />
      <div style={{ position: "absolute", left: 110, top: 90 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>一担烟叶 · 钱怎么分</div>
        <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 66, fontWeight: 700, color: "#F7F2E7" }}>收购价里，20% 是税</div>
        <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>烟叶税 = 收购金额 × 20%，由收购单位缴纳</div>
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, top: 380 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>
          <span>收购金额 100 元</span><span>烟叶税 20 元 · 烟农 80 元</span>
        </div>
        <div style={{ marginTop: 14, height: 90, display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid rgba(228,180,92,0.45)" }}>
          <div style={{ width: (1 - p * 0.8) * 100 + "%", background: "rgba(255,255,255,0.10)", transition: "none" }} />
          <div style={{ width: p * 80 * 0.2 * 5 + "%", background: "linear-gradient(90deg, rgba(228,180,92,0.9), rgba(228,180,92,0.55))", boxShadow: "0 0 30px rgba(228,180,92,0.5)" }} />
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 40, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>
          <span>烟农所得 80%</span><span style={{ color: COLORS.gold }}>烟叶税 20%</span>
        </div>
      </div>
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 150, display: "flex", gap: 24 }}>
        {[
          { k: "20%", l: "税率", d: "从价计征" },
          { k: "收购环节", l: "环节", d: "一次缴清" },
          { k: "收购单位", l: "纳税人", d: "不是烟农" },
          { k: "地方", l: "归属", d: "100% 归地方" },
        ].map((x, i) => {
          const a = clamp01((frame - 20 - i * 8) / 14);
          return (
            <div key={x.l} style={{ flex: 1, padding: "20px 24px", border: "1px solid rgba(228,180,92,0.35)", background: "rgba(255,255,255,0.03)", opacity: a, transform: "translateY(" + (1 - a) * 20 + "px)" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 42, color: COLORS.goldSoft }}>{x.k}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 18, color: "#F7F2E7", marginTop: 4 }}>{x.l}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 16, color: COLORS.dim }}>{x.d}</div>
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
    { t: "烟农", v: "80%", u: "收购价归烟农", d: "交售烟叶的主要收入" },
    { t: "烟叶税", v: "20%", u: "收购金额", d: "由收购单位缴纳" },
    { t: "地方", v: "100%", u: "归地方", d: "产区财政的重要来源" },
  ];
  return (
    <AbsoluteFill style={{ padding: "100px 110px", background: "#05080E" }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 6, color: COLORS.gold }}>一担烟叶，钱怎么分</div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 62, fontWeight: 700, color: "#F7F2E7" }}>收购价里，税占多少</div>
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
          { t: "专卖品", v: "国家定价", d: "收购价统一制定" },
          { t: "从价计征", v: "20%", d: "按收购金额计算" },
          { t: "收购环节", v: "一次缴清", d: "由收购单位申报" },
          { t: "产区", v: "全部归地方", d: "支持烟叶生产" },
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
      <div style={{ marginTop: 40, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>专卖定价 · 从价计征 · 收购环节缴纳 · 收入归地方</div>
    </AbsoluteFill>
  );
};

const ShotData: React.FC = () => {
  const frame = useCurrentFrame();
  const dur = S(7).duration;
  const p = clamp01(frame / dur);
  const v = Math.round(easeOutExpo(p) * 100);
  const { fps } = useVideoConfig();
  const slam = spring({ frame, fps, config: { damping: 10, stiffness: 200 }, durationInFrames: 22 });
  return (
    <AbsoluteFill style={{ background: "#05080E", overflow: "hidden" }}>
      <Img src={staticFile(STORY.image!)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.08, filter: "grayscale(0.5)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, textAlign: "center", transform: "scale(" + (1.12 - slam * 0.12) + ")" }}>
        <div style={{ fontFamily: FONT_NUM, fontSize: 260, fontWeight: 700, color: "#F3D08A", lineHeight: 1 }}>{v}<span style={{ fontSize: 72, marginLeft: 12 }}>亿元</span></div>
        <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 32, color: COLORS.muted, letterSpacing: 4 }}>2025 年全国烟叶税</div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 50 }}>
          {["地方税", "收购环节", "产区财源", "≈2740 万/天"].map((t, i) => <div key={t} style={{ padding: "8px 22px", border: "1px solid rgba(228,180,92,0.5)", color: "#F3D08A", fontFamily: FONT_SANS, fontSize: 24, opacity: clamp01((frame - 18 - i * 6) / 10) }}>{t}</div>)}
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, top: 180, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 2 }}>
        <div>2006 暂行条例</div><div>2017 烟叶税法</div><div>2018 正式施行</div><div>2025 约 100 亿</div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 180, textAlign: "right", fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 2 }}>
        <div>专卖品 · 国家定价</div><div>收购单位 · 纳税</div><div>20% · 从价</div><div>地方 · 100%</div>
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
      <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 58, fontWeight: 700, color: "#F7F2E7" }}>八个税种，八段历史</div>
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
          <div style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold }}>2006</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft, marginTop: 4 }}>烟叶税</div>
        </div>
        <div style={{ border: "1px dashed rgba(255,255,255,0.18)", padding: "20px 22px" }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>更多税种</div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted, marginTop: 8 }}>持续更新中</div>
        </div>
      </div>
      <div style={{ marginTop: 34, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>每一期，都是一个税种的来路</div>
      <div style={{ position: "absolute", left: 110, right: 110, bottom: 150, height: 2, background: "rgba(228,180,92,0.25)" }}>
        {[{ t: "印花税", y: "1604" }, { t: "企业所得税", y: "1799" }, { t: "个人所得税", y: "1799" }, { t: "关税", y: "1842" }, { t: "增值税", y: "1918" }, { t: "车船税", y: "1951" }, { t: "消费税", y: "1994" }, { t: "烟叶税", y: "2006" }].map((x, i) => (
          <div key={x.t + x.y} style={{ position: "absolute", left: (i / 7) * 100 + "%", top: -8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: i === 7 ? COLORS.gold : "rgba(255,255,255,0.25)" }} />
            <div style={{ marginTop: 12, transform: "translateX(-50%)", textAlign: "center", fontFamily: FONT_NUM, fontSize: 18, color: i === 7 ? COLORS.goldSoft : COLORS.dim }}>{x.y}</div>
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
      <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 76, fontWeight: 700, color: "#F7F2E7", lineHeight: 1.35, opacity: p }}>一片烟叶，从田里到烟厂，<br />税已先行。</div>
      <div style={{ marginTop: 30, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, opacity: clamp01((frame - 20) / 16) }}>烟叶税，是专卖制度的第一环</div>
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

export const KineticYanye: React.FC = () => {
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
