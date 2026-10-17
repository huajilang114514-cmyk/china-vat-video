import React, { useContext } from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "./theme";

export const useEnter = (delay = 0, distance = 26) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 26 });
  return { opacity: s, transform: `translateY(${(1 - s) * distance}px)` };
};

export const Backdrop: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(1200px 720px at 12% 0%, rgba(228,180,92,0.10), transparent 60%), radial-gradient(900px 700px at 92% 100%, rgba(196,71,58,0.10), transparent 62%), linear-gradient(135deg, #060B14 0%, #0B1322 48%, #080E1A 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          opacity: 0.55,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 20%, rgba(4,8,16,0.72) 78%, rgba(4,8,16,0.92) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 110,
          width: 1,
          background:
            "linear-gradient(180deg, transparent, rgba(228,180,92,0.28), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 110,
          width: 1,
          background:
            "linear-gradient(180deg, transparent, rgba(228,180,92,0.16), transparent)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Ghost: React.FC<{ text: string; size?: number; bottom?: number; right?: number }> =
  ({ text, size = 760, bottom = -220, right = -50 }) => {
    return (
      <div
        style={{
          position: "absolute",
          right,
          bottom,
          fontFamily: FONT_NUM,
          fontSize: size,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: -24,
          color: "rgba(228,180,92,0.045)",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    );
  };

export const SceneDurationContext = React.createContext<number | null>(null);

export const Scene: React.FC<{
  duration?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ duration: durationProp = 300, children, style }) => {
  const ctxDuration = useContext(SceneDurationContext);
  const duration = ctxDuration ?? durationProp;
  const frame = useCurrentFrame();
  const opacity = Math.min(
    interpolate(frame, [0, 9], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(frame, [duration - 10, duration], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  return <AbsoluteFill style={{ opacity, ...style }}>{children}</AbsoluteFill>;
};

export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = COLORS.gold,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: FONT_SANS }}>
      <div
        style={{
          width: 9,
          height: 9,
          backgroundColor: color,
          transform: "rotate(45deg)",
        }}
      />
      <span style={{ color, fontSize: 25, letterSpacing: 8, fontWeight: 600 }}>{children}</span>
      <div style={{ width: 150, height: 1, backgroundColor: COLORS.line }} />
    </div>
  );
};

export const Title: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 96,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontSize: size,
      fontWeight: 700,
      lineHeight: 1.18,
      color: COLORS.ink,
      letterSpacing: 2,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Body: React.FC<{ children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  children,
  size = 40,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT_SANS,
      fontSize: size,
      lineHeight: 1.75,
      color: COLORS.muted,
      letterSpacing: 1,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Panel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  glow?: boolean;
}> = ({ children, style, glow }) => (
  <div
    style={{
      background: COLORS.panel,
      border: `1px solid ${COLORS.line}`,
      borderRadius: 18,
      boxShadow: glow ? "0 0 40px rgba(228,180,92,0.10)" : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{
  children: React.ReactNode;
  color?: string;
  active?: boolean;
  style?: React.CSSProperties;
}> = ({ children, color = COLORS.gold, active = true, style }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "14px 30px",
      borderRadius: 999,
      border: `1px solid ${active ? color : "rgba(255,255,255,0.15)"}`,
      color: active ? color : COLORS.dim,
      backgroundColor: active ? "rgba(228,180,92,0.08)" : "transparent",
      fontFamily: FONT_SANS,
      fontSize: 30,
      letterSpacing: 2,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Seal: React.FC<{ char?: string; size?: number; rotate?: number; style?: React.CSSProperties }> =
  ({ char = "税", size = 150, rotate = -6, style }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        border: "6px solid rgba(196,71,58,0.85)",
        backgroundColor: "rgba(196,71,58,0.9)",
        color: "#F7E9DF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_SANS,
        fontSize: size * 0.52,
        fontWeight: 700,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
        ...style,
      }}
    >
      {char}
    </div>
  );

export const NumTicker: React.FC<{
  from?: number;
  to: number;
  start?: number;
  duration?: number;
  style?: React.CSSProperties;
  decimals?: number;
}> = ({ from = 0, to, start = 0, duration = 40, style, decimals = 0 }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span style={{ fontFamily: FONT_NUM, fontVariantNumeric: "tabular-nums", ...style }}>
      {v.toFixed(decimals)}
    </span>
  );
};

export const Divider: React.FC<{ width?: number | string; style?: React.CSSProperties }> = ({
  width = "100%",
  style,
}) => (
  <div
    style={{
      width,
      height: 1,
      background: "linear-gradient(90deg, rgba(228,180,92,0.5), transparent)",
      ...style,
    }}
  />
);
