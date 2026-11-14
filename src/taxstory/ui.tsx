import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "../theme";

export const useIn = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping }, durationInFrames: 28 });
  return s;
};

export const ease = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const rnd = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export const DocuBackdrop: React.FC<{ accent?: string }> = ({ accent = "228,180,92" }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  return (
    <AbsoluteFill style={{ backgroundColor: "#050A12", overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "linear-gradient(135deg,#050A12 0%,#0A1424 50%,#070D18 100%)" }} />
      <div style={{ position: "absolute", width: 1200, height: 1200, left: -260 + Math.sin(t * 0.22) * 90, top: -320 + Math.cos(t * 0.18) * 70, background: "radial-gradient(circle, rgba(" + accent + ",0.16), transparent 62%)" }} />
      <div style={{ position: "absolute", width: 1000, height: 1000, right: -240 + Math.cos(t * 0.2) * 80, bottom: -300 + Math.sin(t * 0.16) * 60, background: "radial-gradient(circle, rgba(196,71,58,0.12), transparent 65%)" }} />
      <AbsoluteFill style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize: "96px 96px", opacity: 0.5 }} />
      {Array.from({ length: 26 }).map((_, i) => {
        const x = rnd(i + 1) * 1920;
        const speed = 12 + rnd(i + 7) * 26;
        const y = 1080 - ((frame * speed) / 30 + rnd(i + 3) * 1200) % 1300;
        const size = 2 + rnd(i + 11) * 3;
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: 999, background: "rgba(" + accent + ",0.35)" }} />;
      })}
      <div style={{ position: "absolute", top: 0, bottom: 0, width: 380, left: ((frame * 9) % 2400) - 400, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.035),transparent)", transform: "skewX(-14deg)" }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 78% 70% at 50% 45%, transparent 20%, rgba(3,7,14,0.78) 80%, rgba(3,7,14,0.95) 100%)" }} />
    </AbsoluteFill>
  );
};

export const SceneFade: React.FC<{ children: React.ReactNode; duration: number }> = ({ children, duration }) => {
  const frame = useCurrentFrame();
  const o = Math.min(ease(frame, 0, 10), 1 - ease(frame, duration - 12, 12));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const Wipe: React.FC<{ delay?: number; accent?: string }> = ({ delay = 0, accent = "228,180,92" }) => {
  const frame = useCurrentFrame();
  const p = ease(frame, delay, 18);
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -200, bottom: -200, width: 260, left: -400 + p * 2600, background: "linear-gradient(90deg, transparent, rgba(" + accent + ",0.30), rgba(255,255,255,0.55), rgba(" + accent + ",0.30), transparent)", transform: "skewX(-16deg)", filter: "blur(2px)", opacity: 1 - p * 0.35 }} />
    </AbsoluteFill>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; delay?: number; accent?: string }> = ({ children, delay = 0, accent = COLORS.gold }) => {
  const s = useIn(delay);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, opacity: s, transform: "translateX(" + (1 - s) * -30 + "px)" }}>
      <div style={{ width: 10, height: 10, background: accent, transform: "rotate(45deg)" }} />
      <span style={{ fontFamily: FONT_SANS, fontSize: 24, letterSpacing: 8, color: accent, fontWeight: 600 }}>{children}</span>
      <div style={{ width: 140, height: 1, background: "linear-gradient(90deg,rgba(" + (accent === COLORS.gold ? "228,180,92" : "255,255,255") + ",0.5),transparent)" }} />
    </div>
  );
};

export const KineticTitle: React.FC<{ text: string; delay?: number; size?: number; accent?: string; color?: string }> = ({ text, delay = 0, size = 108, accent = COLORS.goldSoft, color = COLORS.ink }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = Array.from(text);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", fontFamily: FONT_SANS, fontSize: size, fontWeight: 700, lineHeight: 1.12, letterSpacing: 3 }}>
      {chars.map((c, i) => {
        const s = spring({ frame: frame - delay - i * 2, fps, config: { damping: 16, stiffness: 130 }, durationInFrames: 26 });
        const isGold = c === "税" || c === "房" || c === "契" || c === "烟" || c === "叶";
        return (
          <span key={i} style={{ display: "inline-block", color: isGold && i > 0 ? accent : color, opacity: s, transform: "translateY(" + (1 - s) * 60 + "px) scale(" + (0.8 + s * 0.2) + ")", filter: "blur(" + (1 - s) * 6 + "px)" }}>{c}</span>
        );
      })}
    </div>
  );
};

export const YearStamp: React.FC<{ year: string; delay?: number; accent?: string }> = ({ year, delay = 0, accent = COLORS.gold }) => {
  const s = useIn(delay, 14);
  return (
    <div style={{ position: "absolute", right: -10, top: -40, fontFamily: FONT_NUM, fontSize: 420, fontWeight: 700, lineHeight: 1, letterSpacing: -10, color: "rgba(228,180,92,0.07)", transform: "translateY(" + (1 - s) * 40 + "px) scale(" + (0.94 + s * 0.06) + ")" }}>{year}</div>
  );
};

export const PaperCard: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; width?: number | string; style?: React.CSSProperties }> = ({ children, delay = 0, rotate = -1.5, width = 520, style }) => {
  const s = useIn(delay, 18);
  return (
    <div style={{ width, background: "#F8F3E9", borderRadius: 10, padding: 34, boxShadow: "0 40px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(228,180,92,0.35)", transform: "translateY(" + (1 - s) * 50 + "px) rotate(" + rotate + "deg) scale(" + (0.96 + s * 0.04) + ")", opacity: s, ...style }}>{children}</div>
  );
};

export const TimelineFlow: React.FC<{ items: { y: string; t: string }[]; delay?: number; accent?: string }> = ({ items, delay = 0, accent = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const grow = ease(frame, delay, 40);
  return (
    <div style={{ position: "relative", marginTop: 70, width: "100%" }}>
      <div style={{ position: "absolute", top: 9, left: 0, height: 2, width: grow * 100 + "%", background: "linear-gradient(90deg, rgba(" + (accent === COLORS.gold ? "228,180,92" : "255,255,255") + ",0.85), rgba(228,180,92,0.2))" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {items.map((x, i) => {
          const s = useIn(delay + 12 + i * 10, 12);
          return (
            <div key={x.y} style={{ width: 300, textAlign: "center", opacity: s, transform: "translateY(" + (1 - s) * 30 + "px)" }}>
              <div style={{ width: 20, height: 20, borderRadius: 999, margin: "0 auto", background: accent, boxShadow: "0 0 0 8px rgba(228,180,92,0.12), 0 0 26px rgba(228,180,92,0.55)" }} />
              <div style={{ marginTop: 22, fontFamily: FONT_NUM, fontSize: 40, color: accent, fontWeight: 700 }}>{x.y}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, lineHeight: 1.6 }}>{x.t}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StatBlock: React.FC<{ value: number; suffix?: string; label: string; decimals?: number; delay?: number }> = ({ value, suffix = "", label, decimals = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const s = useIn(delay, 18);
  const v = interpolate(frame, [delay, delay + 46], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ opacity: s, transform: "scale(" + (0.9 + s * 0.1) + ")", textAlign: "center" }}>
      <div style={{ fontFamily: FONT_NUM, fontSize: 190, fontWeight: 700, color: COLORS.goldSoft, lineHeight: 1, textShadow: "0 0 60px rgba(228,180,92,0.25)" }}>{v.toFixed(decimals)}<span style={{ fontSize: 64, marginLeft: 12 }}>{suffix}</span></div>
      <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, letterSpacing: 3 }}>{label}</div>
    </div>
  );
};

export const BarsBlock: React.FC<{ items: { l: string; v: number }[]; max: number; unit?: string; delay?: number }> = ({ items, max, unit = "%", delay = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ marginTop: 34, width: "100%" }}>
      {items.map((x, i) => {
        const p = ease(frame, delay + i * 8, 26);
        return (
          <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 18, opacity: 0.35 + p * 0.65 }}>
            <div style={{ width: 250, textAlign: "right", fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>{x.l}</div>
            <div style={{ flex: 1, height: 26, background: "rgba(255,255,255,0.06)", borderRadius: 6 }}>
              <div style={{ width: (x.v / max) * 100 * p + "%", height: "100%", borderRadius: 6, background: "linear-gradient(90deg,rgba(228,180,92,0.95),rgba(228,180,92,0.35))" }} />
            </div>
            <div style={{ width: 120, fontFamily: FONT_NUM, fontSize: 26, color: COLORS.goldSoft }}>{x.v}{unit}</div>
          </div>
        );
      })}
    </div>
  );
};

export const Seal: React.FC<{ char?: string; size?: number; delay?: number }> = ({ char = "税", size = 110, delay = 0 }) => {
  const s = useIn(delay, 12);
  return (
    <div style={{ width: size, height: size, border: "4px solid rgba(196,71,58,0.9)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#D25A4B", fontFamily: FONT_SANS, fontSize: size * 0.5, fontWeight: 700, transform: "rotate(-8deg) scale(" + s + ")", opacity: s }}>{char}</div>
  );
};

export const PhotoReveal: React.FC<{ src: string; caption: string; width: number; delay?: number }> = ({ src, caption, width, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = ease(frame, delay, 30);
  const zoom = 1.06 + frame * 0.00025;
  return (
    <div style={{ width, opacity: Math.min(1, p * 2) }}>
      <div style={{ padding: 10, background: "rgba(248,243,233,0.06)", border: "1px solid rgba(228,180,92,0.4)", borderRadius: 8, boxShadow: "0 30px 70px rgba(0,0,0,0.65)" }}>
        <div style={{ overflow: "hidden", borderRadius: 3, clipPath: "inset(0 " + (1 - p) * 100 + "% 0 0)" }}>
          <Img src={staticFile(src)} style={{ width: "100%", display: "block", transform: "scale(" + zoom + ")" }} />
        </div>
      </div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim }}>{caption}</div>
    </div>
  );
};

export const HeroPhoto: React.FC<{ src: string; caption?: string; delay?: number; width?: number }> = ({ src, caption, delay = 0, width = 980 }) => {
  const frame = useCurrentFrame();
  const p = ease(frame, delay, 34);
  const zoom = 1.04 + frame * 0.0002;
  return (
    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width, overflow: "hidden", clipPath: "inset(0 0 0 " + (1 - p) * 100 + "%)" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(" + zoom + ")", filter: "saturate(0.85) contrast(1.05)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#050A12 0%,rgba(5,10,18,0.75) 28%,rgba(5,10,18,0.15) 62%,rgba(5,10,18,0.55) 100%)" }} />
      {caption ? <div style={{ position: "absolute", right: 34, bottom: 96, fontFamily: FONT_SANS, fontSize: 15, color: "rgba(255,255,255,0.55)" }}>{caption}</div> : null}
    </div>
  );
};

export const FactChip: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const s = useIn(delay, 12);
  return <div style={{ opacity: s, transform: "translateY(" + (1 - s) * 24 + "px)", border: "1px solid rgba(228,180,92,0.45)", background: "rgba(228,180,92,0.08)", borderRadius: 999, padding: "12px 24px", fontFamily: FONT_SANS, fontSize: 24, color: COLORS.goldSoft, letterSpacing: 2 }}>{children}</div>;
};
