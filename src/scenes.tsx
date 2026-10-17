import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "./theme";
import {
  Body,
  Chip,
  Divider,
  Ghost,
  Kicker,
  NumTicker,
  Panel,
  Scene,
  Seal,
  Title,
  useEnter,
} from "./components";

const PAD: React.CSSProperties = { padding: "120px 140px" };

/* ------------------------------------------------------------------ */
/* 01 片头                                                             */
/* ------------------------------------------------------------------ */
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 200 },
    durationInFrames: 34,
  });
  const sub = useEnter(42, 18);
  const rates = useEnter(66, 18);
  const sealSpring = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, stiffness: 160 },
    durationInFrames: 30,
  });

  return (
    <Scene duration={300}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ opacity: interpolate(frame, [6, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <Kicker>CHINA VAT · 1979 — 2026</Kicker>
        </div>

        <div
          style={{
            marginTop: 56,
            fontFamily: FONT_SANS,
            fontSize: 210,
            fontWeight: 700,
            letterSpacing: 16,
            lineHeight: 1,
            background: "linear-gradient(180deg, #FBEFD6 8%, #E4B45C 62%, #B9823A 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            transform: "translateY(" + (1 - titleSpring) * 40 + "px) scale(" + (0.94 + titleSpring * 0.06) + ")",
            opacity: titleSpring,
          }}
        >
          增值税
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: FONT_SANS,
            fontSize: 52,
            color: COLORS.ink,
            letterSpacing: 6,
            opacity: sub.opacity,
            transform: sub.transform,
          }}
        >
          从法国舶来品，到中国第一大税种
        </div>

        <div
          style={{
            marginTop: 26,
            fontFamily: FONT_SANS,
            fontSize: 32,
            color: COLORS.muted,
            letterSpacing: 4,
            opacity: rates.opacity,
            transform: rates.transform,
          }}
        >
          现行三档税率　13%　·　9%　·　6%
        </div>

        <div
          style={{
            marginTop: 90,
            display: "flex",
            gap: 18,
            alignItems: "center",
            opacity: rates.opacity,
          }}
        >
          {["1954 诞生于法国", "1979 中国试点", "2026 增值税法施行"].map((t, i) => (
            <div
              key={t}
              style={{
                fontFamily: FONT_SANS,
                fontSize: 26,
                color: COLORS.dim,
                letterSpacing: 3,
                padding: "12px 26px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 999,
                marginRight: i === 2 ? 0 : 12,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          right: 180,
          bottom: 170,
          opacity: sealSpring,
          transform: "scale(" + (0.6 + sealSpring * 0.4) + ") rotate(-8deg)",
        }}
      >
        <Seal size={132} />
      </div>
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 02 什么是增值税                                                      */
/* ------------------------------------------------------------------ */
export const S2What: React.FC = () => {
  const t1 = useEnter(4, 30);
  const t2 = useEnter(16, 30);
  const chips = useEnter(40, 20);
  const f1 = useEnter(26, 26);
  const f2 = useEnter(38, 26);
  const f3 = useEnter(52, 26);
  const ex = useEnter(86, 20);

  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={t1}>
          <Kicker>01 · 税收原理</Kicker>
        </div>

        <div style={{ marginTop: 44, width: 840, ...t2 }}>
          <Title size={76}>增值税，对“增值额”征税</Title>
        </div>

        <div style={{ marginTop: 36, width: 820, ...chips }}>
          <Body size={36} style={{ lineHeight: 1.9 }}>
            商品和服务每流转一道，只对新增的那部分价值计税；
            上一环节已经缴过的税，可以抵掉。
          </Body>
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 46, ...chips }}>
          <Chip>增值额</Chip>
          <Chip>抵扣链</Chip>
          <Chip>价外税</Chip>
        </div>

        <Panel
          glow
          style={{
            position: "absolute",
            right: 140,
            top: 250,
            width: 780,
            padding: "58px 60px 52px",
          }}
        >
          <div style={{ ...f1, fontFamily: FONT_SANS, fontSize: 34, letterSpacing: 6, color: COLORS.muted }}>
            一般计税方法
          </div>
          <div style={{ ...f2, marginTop: 26, fontFamily: FONT_SANS, fontSize: 58, color: COLORS.ink, letterSpacing: 2 }}>
            应纳税额
          </div>
          <div style={{ ...f2, marginTop: 10, fontFamily: FONT_NUM, fontSize: 54, color: COLORS.gold, whiteSpace: "nowrap" }}>
            = 销项税额 − 进项税额
          </div>
          <Divider style={{ margin: "40px 0" }} />
          <div style={{ ...f3, fontFamily: FONT_SANS, fontSize: 34, color: COLORS.muted, lineHeight: 1.7 }}>
            卖出商品时收取的税
            <br />
            减去 购进原料时已经支付的税
          </div>
          <div
            style={{
              ...ex,
              marginTop: 44,
              fontFamily: FONT_SANS,
              fontSize: 27,
              color: COLORS.goldSoft,
              padding: "18px 26px",
              border: "1px solid " + COLORS.line,
              borderRadius: 12,
              backgroundColor: "rgba(228,180,92,0.06)",
            }}
          >
            销项 130 − 进项 100 = 应缴 30（万元）
          </div>
        </Panel>
      </AbsoluteFill>
      <Ghost text="VAT" size={640} bottom={-190} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 03 重复征税                                                          */
/* ------------------------------------------------------------------ */
const ChainBox: React.FC<{ label: string; value: string; tax: string; delay: number; accent?: string }> = ({
  label,
  value,
  tax,
  delay,
  accent = COLORS.gold,
}) => {
  const e = useEnter(delay, 24);
  return (
    <div style={{ ...e, textAlign: "center" }}>
      <div
        style={{
          width: 250,
          height: 170,
          border: "1px solid " + COLORS.line,
          borderRadius: 16,
          background: COLORS.panel,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, letterSpacing: 3 }}>{label}</div>
        <div style={{ fontFamily: FONT_NUM, fontSize: 58, color: COLORS.ink, fontWeight: 700 }}>{value}</div>
      </div>
      <div style={{ marginTop: 22, fontFamily: FONT_NUM, fontSize: 40, color: accent, letterSpacing: 1 }}>
        税 {tax}
      </div>
    </div>
  );
};

export const S3Repeat: React.FC = () => {
  const title = useEnter(4, 28);
  const chain = useEnter(20, 24);
  const left = useEnter(60, 24);
  const right = useEnter(76, 24);
  const badge = useEnter(104, 16);

  return (
    <Scene duration={540}>
      <AbsoluteFill style={PAD}>
        <div style={title}>
          <Kicker>02 · 老税制的痛点</Kicker>
        </div>
        <div style={{ marginTop: 36, ...title }}>
          <Title size={80}>一层一层，重复征税</Title>
        </div>

        <div style={{ marginTop: 70, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 40, ...chain }}>
          <ChainBox label="原料商" value="100 元" tax="10" delay={26} />
          <div style={{ paddingTop: 62, fontFamily: FONT_NUM, fontSize: 44, color: COLORS.dim }}>→</div>
          <ChainBox label="加工厂" value="200 元" tax="20" delay={34} />
          <div style={{ paddingTop: 62, fontFamily: FONT_NUM, fontSize: 44, color: COLORS.dim }}>→</div>
          <ChainBox label="零售商" value="300 元" tax="30" delay={42} />
        </div>

        <div style={{ display: "flex", gap: 32, marginTop: 74 }}>
          <Panel style={{ flex: 1, padding: "44px 46px", ...left, borderColor: "rgba(196,71,58,0.5)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.redSoft, letterSpacing: 4 }}>旧税制 · 全额征税（10%）</div>
            <div style={{ marginTop: 18, fontFamily: FONT_NUM, fontSize: 62, color: COLORS.ink }}>
              <NumTicker to={60} start={66} duration={44} /> 元
            </div>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted }}>
              10 + 20 + 30，每道环节都按销售额全额缴税
            </div>
            <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 27, color: COLORS.redSoft, letterSpacing: 2 }}>
              其中 30 元属于重复征收
            </div>
          </Panel>

          <Panel style={{ flex: 1, padding: "44px 46px", ...right, borderColor: "rgba(228,180,92,0.45)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.gold, letterSpacing: 4 }}>增值税 · 只对增值额征税</div>
            <div style={{ marginTop: 18, fontFamily: FONT_NUM, fontSize: 62, color: COLORS.ink }}>
              <NumTicker to={30} start={82} duration={44} /> 元
            </div>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted }}>
              10 + 10 + 10，每个环节只缴自己新增的部分
            </div>
          </Panel>
        </div>


      </AbsoluteFill>
      <Ghost text="−30" size={560} bottom={-150} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 04 1954 法国                                                        */
/* ------------------------------------------------------------------ */
export const S4France: React.FC = () => {
  const t = useEnter(4, 30);
  const year = useEnter(12, 30);
  const name = useEnter(34, 20);
  const body = useEnter(48, 20);
  const right = useEnter(26, 26);
  const stat = useEnter(70, 18);

  return (
    <Scene duration={450}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flex: 1.15, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={t}><Kicker>03 · 起源</Kicker></div>
            <div
              style={{
                marginTop: 30,
                ...year,
                fontFamily: FONT_NUM,
                fontSize: 300,
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: -6,
                color: COLORS.gold,
              }}
            >
              1954
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 34, color: COLORS.muted, letterSpacing: 6, ...year }}>
              巴黎 · Paris
            </div>
            <div style={{ marginTop: 56, ...name }}>
              <Title size={72}>莫里斯 · 洛雷</Title>
              <div style={{ marginTop: 12, fontFamily: FONT_NUM, fontSize: 32, color: COLORS.dim, letterSpacing: 3 }}>
                Maurice Lauré
              </div>
            </div>
            <div style={{ marginTop: 34, width: 720, ...body }}>
              <Body size={34}>
                法国税务官员。为了替代层层重复征税的“周转税”，
                他设计出一种只对增值额征税、并可逐环节抵扣的新税。
              </Body>
            </div>
          </div>

          <div style={{ flex: 0.85, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <Panel glow style={{ width: 690, padding: "52px 48px", ...right }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.gold, letterSpacing: 3 }}>
                Taxe sur la valeur ajoutée
              </div>
              <Divider style={{ margin: "30px 0 34px" }} />
              {[
                "只对每个环节的增值额征税",
                "上一环节缴纳的税可以抵扣",
                "出口适用零税率，避免国际重复征税",
              ].map((s, i) => (
                <div key={s} style={{ display: "flex", gap: 18, marginBottom: 24, alignItems: "flex-start" }}>
                  <span style={{ color: COLORS.gold, fontFamily: FONT_NUM, fontSize: 30, lineHeight: 1.6 }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.ink, lineHeight: 1.6 }}>{s}</span>
                </div>
              ))}
              <Divider style={{ margin: "14px 0 30px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", ...stat }}>
                <div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 56, color: COLORS.goldSoft }}>
                    <NumTicker to={170} start={74} duration={40} />+
                  </div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, marginTop: 4 }}>
                    个国家和地区采用
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 56, color: COLORS.goldSoft }}>70 余年</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, marginTop: 4 }}>
                    现代税制的通用语言
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="1954" size={620} bottom={-170} right={-40} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 05 中国 1979 / 1984                                                 */
/* ------------------------------------------------------------------ */
const TimelineNode: React.FC<{
  year: string;
  delay: number;
  active?: boolean;
}> = ({ year, delay, active }) => {
  const e = useEnter(delay, 18);
  return (
    <div style={{ ...e, textAlign: "center", position: "relative", zIndex: 2 }}>
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          backgroundColor: active ? COLORS.gold : COLORS.dim,
          margin: "0 auto",
          boxShadow: active ? "0 0 26px rgba(228,180,92,0.7)" : "none",
        }}
      />
      <div
        style={{
          marginTop: 22,
          fontFamily: FONT_NUM,
          fontSize: 64,
          fontWeight: 700,
          color: active ? COLORS.gold : COLORS.muted,
          letterSpacing: 2,
        }}
      >
        {year}
      </div>
    </div>
  );
};

export const S5ChinaStart: React.FC = () => {
  const t = useEnter(4, 28);
  const line = useEnter(14, 10);
  const c1979 = useEnter(40, 24);
  const c1984 = useEnter(78, 24);

  return (
    <Scene duration={540}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>04 · 中国探索</Kicker></div>
        <div style={{ marginTop: 34, ...t }}>
          <Title size={82}>先试点，再立制</Title>
        </div>

        <div style={{ position: "relative", marginTop: 80, height: 190 }}>
          <div
            style={{
              position: "absolute",
              left: "8%",
              right: "8%",
              top: 12,
              height: 2,
              background: "linear-gradient(90deg, rgba(228,180,92,0.7), rgba(228,180,92,0.25), rgba(228,180,92,0.7))",
              ...line,
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <TimelineNode year="1979" delay={18} active />
            <TimelineNode year="1984" delay={30} active />
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
          <Panel style={{ flex: 1, padding: "40px 44px", ...c1979 }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold, letterSpacing: 4 }}>
              改革开放第二年 · 试行
            </div>
            <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.ink, lineHeight: 1.5 }}>
              部分城市、少数产品先行试点
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
              {["襄樊", "上海", "柳州", "长沙"].map((c) => (
                <Chip key={c} style={{ fontSize: 24, padding: "8px 20px" }}>{c}</Chip>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
              {["机器机械", "农业机具", "日用机械"].map((c) => (
                <Chip key={c} color={COLORS.muted} style={{ fontSize: 24, padding: "8px 20px", borderColor: "rgba(255,255,255,0.14)", color: COLORS.muted, backgroundColor: "transparent" }}>
                  {c}
                </Chip>
              ))}
            </div>
          </Panel>

          <Panel style={{ flex: 1, padding: "40px 44px", ...c1984, borderColor: "rgba(228,180,92,0.45)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold, letterSpacing: 4 }}>
              制度正式建立
            </div>
            <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, lineHeight: 1.6 }}>
              《中华人民共和国增值税条例（草案）》
            </div>
            <div style={{ display: "flex", gap: 50, marginTop: 30 }}>
              <div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>发布</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 36, color: COLORS.ink, marginTop: 6 }}>1984.09.18</div>
              </div>
              <div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>试行</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 40, color: COLORS.gold, marginTop: 6 }}>1984.10.01</div>
              </div>
            </div>
            <div style={{ marginTop: 24, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, lineHeight: 1.7 }}>
              征收范围扩大到全国 12 类货物
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
      <Ghost text="1984" size={600} bottom={-180} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 06 1994 分税制                                                       */
/* ------------------------------------------------------------------ */
export const S6_1994: React.FC = () => {
  const t = useEnter(4, 28);
  const big = useEnter(10, 28);
  const body = useEnter(40, 22);
  const rate1 = useEnter(52, 24);
  const rate2 = useEnter(64, 24);
  const tag = useEnter(80, 18);
  const bar = useEnter(100, 20);

  return (
    <Scene duration={540}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={t}><Kicker>05 · 1994 分税制改革</Kicker></div>
            <div
              style={{
                ...big,
                marginTop: 24,
                fontFamily: FONT_NUM,
                fontSize: 260,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: -4,
                color: COLORS.gold,
              }}
            >
              1994
            </div>
            <div style={{ marginTop: 10, ...big }}>
              <Title size={68}>增值税成为第一大税种</Title>
            </div>
            <div style={{ marginTop: 30, width: 700, ...body }}>
              <Body size={32}>
                分税制改革后，增值税的征收范围扩大到全部货物和加工、修理修配劳务，
                并确立 17% 的基本税率——这一档税率沿用了二十多年。
              </Body>
            </div>
            <div style={{ marginTop: 46, display: "flex", gap: 20, ...tag }}>
              <div style={{ padding: "14px 26px", border: "1px solid rgba(196,71,58,0.55)", borderRadius: 10, color: COLORS.redSoft, fontFamily: FONT_SANS, fontSize: 28, letterSpacing: 2 }}>
                生产型增值税
              </div>
              <div style={{ padding: "14px 26px", color: COLORS.muted, fontFamily: FONT_SANS, fontSize: 28, letterSpacing: 1 }}>
                购进固定资产的进项税，不能抵扣
              </div>
            </div>
          </div>

          <div style={{ flex: 0.8, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26 }}>
            <Panel style={{ padding: "42px 48px", ...rate1 }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, letterSpacing: 4 }}>基本税率</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 6 }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 118, fontWeight: 700, color: COLORS.gold }}>17%</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted }}>绝大多数货物</span>
              </div>
            </Panel>
            <Panel style={{ padding: "42px 48px", ...rate2 }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, letterSpacing: 4 }}>低税率</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 24, marginTop: 6 }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 118, fontWeight: 700, color: COLORS.goldSoft }}>13%</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted }}>农产品、图书等</span>
              </div>
            </Panel>
            <div style={{ ...bar, marginTop: 10, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.dim, letterSpacing: 2 }}>
              1994 年，增值税约占全国税收收入 45%，此后长期居首
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="1994" size={600} bottom={-180} right={-30} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 07 2004 / 2009 转型                                                 */
/* ------------------------------------------------------------------ */
export const S7Transform: React.FC = () => {
  const t = useEnter(4, 28);
  const left = useEnter(30, 24);
  const right = useEnter(52, 24);
  const arrow = useEnter(72, 16);
  const time = useEnter(96, 18);

  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>06 · 增值税转型</Kicker></div>
        <div style={{ marginTop: 34, ...t }}>
          <Title size={80}>从“生产型”到“消费型”</Title>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 90 }}>
          <Panel style={{ flex: 1, padding: "48px 50px", ...left, borderColor: "rgba(196,71,58,0.45)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.redSoft, letterSpacing: 4 }}>生产型增值税</div>
            <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.ink, lineHeight: 1.6 }}>
              买设备缴的税，不能抵扣
            </div>
            <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, lineHeight: 1.7 }}>
              企业投资成本偏高，设备更新慢
            </div>
          </Panel>

          <div style={{ ...arrow, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 54, color: COLORS.gold }}>→</div>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold, letterSpacing: 4 }}>转型</div>
          </div>

          <Panel style={{ flex: 1, padding: "48px 50px", ...right, borderColor: "rgba(228,180,92,0.5)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.gold, letterSpacing: 4 }}>消费型增值税</div>
            <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 40, color: COLORS.ink, lineHeight: 1.6 }}>
              购进设备的进项税，可以抵扣
            </div>
            <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, lineHeight: 1.7 }}>
              鼓励投资与设备更新，税负更中性
            </div>
          </Panel>
        </div>

        <div style={{ marginTop: 80, display: "flex", alignItems: "center", gap: 26, ...time }}>
          {[
            { year: "2004", text: "东北老工业基地试点" },
            { year: "2007", text: "中部六省扩围" },
            { year: "2009", text: "全国推开" },
          ].map((s, i) => (
            <React.Fragment key={s.year}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 44, color: i === 2 ? COLORS.gold : COLORS.muted }}>{s.year}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>{s.text}</span>
              </div>
              {i < 2 ? <span style={{ color: COLORS.dim, fontFamily: FONT_NUM, fontSize: 30 }}>→</span> : null}
            </React.Fragment>
          ))}
        </div>
      </AbsoluteFill>
      <Ghost text="2009" size={580} bottom={-170} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 08 营改增                                                            */
/* ------------------------------------------------------------------ */
export const S8VATReform: React.FC = () => {
  const t = useEnter(4, 28);
  const steps = useEnter(24, 20);
  const industries = useEnter(96, 20);
  const banner = useEnter(130, 20);
  const frame = useCurrentFrame();

  const nodes = [
    { d: "2012.01.01", t: "上海率先试点" },
    { d: "2013.08", t: "推向全国" },
    { d: "2014", t: "铁路、邮政、电信" },
    { d: "2016.05.01", t: "全面推开" },
  ];

  return (
    <Scene duration={600}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>07 · 营改增</Kicker></div>
        <div style={{ marginTop: 34, ...t }}>
          <Title size={84}>营业税，退出历史舞台</Title>
        </div>

        <div style={{ position: "relative", marginTop: 100, ...steps }}>
          <div style={{ position: "absolute", left: 60, right: 60, top: 13, height: 2, background: "linear-gradient(90deg, rgba(228,180,92,0.2), rgba(228,180,92,0.8))" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {nodes.map((n, i) => {
              const active = frame > 30 + i * 18;
              return (
                <div key={n.d} style={{ width: 360, position: "relative" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: active ? COLORS.gold : COLORS.dim,
                      boxShadow: active ? "0 0 26px rgba(228,180,92,0.65)" : "none",
                      transition: "none",
                    }}
                  />
                  <div style={{ marginTop: 26, fontFamily: FONT_NUM, fontSize: 44, color: active ? COLORS.gold : COLORS.muted }}>
                    {n.d}
                  </div>
                  <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted }}>
                    {n.t}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 96, display: "flex", alignItems: "center", gap: 36, ...industries }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.dim, letterSpacing: 2 }}>
            最后纳入的四大行业
          </div>
          {["建筑", "房地产", "金融", "生活服务"].map((s) => (
            <Chip key={s} style={{ fontSize: 30 }}>{s}</Chip>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            left: 140,
            right: 140,
            bottom: 90,
            padding: "30px 42px",
            border: "1px solid rgba(196,71,58,0.4)",
            borderRadius: 14,
            backgroundColor: "rgba(196,71,58,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...banner,
          }}
        >
          <div style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.ink, letterSpacing: 3 }}>
            营业税
            <span style={{ fontFamily: FONT_NUM, color: COLORS.redSoft, marginLeft: 14 }}>2016.05.01 停征</span>
          </div>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, letterSpacing: 2 }}>
            条例于 2017.11 废止 · 增值税覆盖货物与服务
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="2016" size={580} bottom={-180} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 09 税率三连降                                                        */
/* ------------------------------------------------------------------ */
export const S9Rates: React.FC = () => {
  const t = useEnter(4, 28);
  const r1 = useEnter(26, 22);
  const r2 = useEnter(62, 22);
  const r3 = useEnter(96, 22);

  const Pair: React.FC<{ from: string; to: string }> = ({ from, to }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <span style={{ fontFamily: FONT_NUM, fontSize: 50, color: COLORS.dim, textDecoration: "line-through", textDecorationColor: "rgba(196,71,58,0.65)" }}>{from}</span>
      <span style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold }}>→</span>
      <span style={{ fontFamily: FONT_NUM, fontSize: 62, fontWeight: 700, color: COLORS.goldSoft }}>{to}</span>
    </div>
  );

  return (
    <Scene duration={360}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>08 · 减税降负</Kicker></div>
        <div style={{ marginTop: 34, ...t }}>
          <Title size={84}>税率三连降：17% → 13%</Title>
        </div>

        <div style={{ marginTop: 40, width: 1020, ...r1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "20px 0" }}>
            <span style={{ width: 200, fontFamily: FONT_NUM, fontSize: 30, color: COLORS.muted }}>2017.07.01</span>
            <Pair from="13%" to="11%" />
            <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim, marginLeft: 12 }}>取消一档</span>
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "20px 0", ...r2 }}>
            <span style={{ width: 200, fontFamily: FONT_NUM, fontSize: 30, color: COLORS.muted }}>2018.05.01</span>
            <Pair from="17%" to="16%" />
            <Pair from="11%" to="10%" />
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 26, padding: "20px 0", ...r3 }}>
            <span style={{ width: 200, fontFamily: FONT_NUM, fontSize: 30, color: COLORS.muted }}>2019.04.01</span>
            <Pair from="16%" to="13%" />
            <Pair from="10%" to="9%" />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: 140,
            top: 300,
            width: 560,
            ...r2,
          }}
        >
          <Panel glow style={{ padding: "44px 48px" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, letterSpacing: 4 }}>
              2019 年 4 月 1 日起
            </div>
            <div style={{ marginTop: 20, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.ink }}>
              形成三档税率
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
              {[
                { rate: "13%", label: "货物、加工修理修配" },
                { rate: "9%", label: "交通、建筑、不动产" },
                { rate: "6%", label: "现代服务、金融、生活服务" },
              ].map((x) => (
                <div key={x.rate} style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
                  <span style={{ fontFamily: FONT_NUM, fontSize: 62, fontWeight: 700, color: COLORS.gold, width: 130 }}>{x.rate}</span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>{x.label}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
      <Ghost text="13%" size={620} bottom={-190} right={-40} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 10 增值税法                                                          */
/* ------------------------------------------------------------------ */
export const S10Law: React.FC = () => {
  const t = useEnter(4, 28);
  const doc = useEnter(22, 26);
  const points = useEnter(64, 20);
  const stamp = useEnter(110, 14);

  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>09 · 税收法定</Kicker></div>
        <div style={{ marginTop: 34, ...t }}>
          <Title size={80}>2026：从“条例”到“法律”</Title>
        </div>

        <div style={{ display: "flex", gap: 50, marginTop: 76, alignItems: "stretch" }}>
          <Panel glow style={{ width: 720, padding: 0, overflow: "hidden", ...doc }}>
            <div style={{ background: "rgba(196,71,58,0.75)", padding: "20px 40px", fontFamily: FONT_SANS, fontSize: 26, letterSpacing: 6, color: "#F7E9DF" }}>
              中华人民共和国
            </div>
            <div style={{ padding: "44px 46px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 52, fontWeight: 700, color: COLORS.ink, letterSpacing: 2 }}>
                增值税法
              </div>
              <Divider style={{ margin: "34px 0" }} />
              <div style={{ display: "flex", gap: 60 }}>
                <div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>通过</div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 44, color: COLORS.ink, marginTop: 8 }}>2024.12.25</div>
                </div>
                <div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>施行</div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 44, color: COLORS.gold, marginTop: 8 }}>2026.01.01</div>
                </div>
              </div>
              <div style={{ marginTop: 34, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, lineHeight: 1.7 }}>
                中国第一大税种，由行政法规上升为法律，
                落实“税收法定”原则。
              </div>
            </div>
          </Panel>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 26, ...points }}>
            {[
              { k: "税率", v: "维持 13%、9%、6% 三档" },
              { k: "小规模纳税人", v: "年销售额 500 万元标准入法" },
              { k: "留抵退税", v: "可结转下期抵扣，或申请退还" },
            ].map((x, i) => (
              <div
                key={x.k}
                style={{
                  display: "flex",
                  gap: 26,
                  padding: "28px 34px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  backgroundColor: "rgba(255,255,255,0.02)",
                }}
              >
                <span style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold }}>0{i + 1}</span>
                <div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.dim, letterSpacing: 2 }}>{x.k}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, marginTop: 8 }}>{x.v}</div>
                </div>
              </div>
            ))}
            <div style={{ ...stamp, marginTop: 8, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold, letterSpacing: 3 }}>
              税收法定 · 税制稳定 · 预期明确
            </div>
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="2026" size={600} bottom={-180} right={-30} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 11 原理总结                                                          */
/* ------------------------------------------------------------------ */
const PrincipleCard: React.FC<{
  index: string;
  title: string;
  desc: string;
  delay: number;
}> = ({ index, title, desc, delay }) => {
  const e = useEnter(delay, 24);
  return (
    <Panel style={{ flex: 1, padding: "32px 38px", ...e, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold, letterSpacing: 4 }}>{index}</div>
      <div style={{ fontFamily: FONT_SANS, fontSize: 40, color: COLORS.ink, fontWeight: 700 }}>{title}</div>
      <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, lineHeight: 1.6 }}>{desc}</div>
    </Panel>
  );
};

export const S11Principles: React.FC = () => {
  const t = useEnter(4, 28);
  const foot = useEnter(110, 16);

  return (
    <Scene duration={540}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>10 · 原理</Kicker></div>
        <div style={{ marginTop: 34, ...t }}>
          <Title size={78}>增值税的四条原理</Title>
        </div>

        <div style={{ display: "flex", gap: 26, marginTop: 56 }}>
          <PrincipleCard index="壹" title="链条抵扣" desc="上一环节缴的税，下一环节抵扣；环环相扣，税不重复。" delay={20} />
          <PrincipleCard index="贰" title="税负中性" desc="不因分工方式改变税负，不惩罚专业化，也不奖励“大而全”。" delay={34} />
        </div>
        <div style={{ display: "flex", gap: 26, marginTop: 22 }}>
          <PrincipleCard index="叁" title="价外计税" desc="税额在价格之外单列，价格归价格，税归税，一目了然。" delay={48} />
          <PrincipleCard index="肆" title="税负转嫁" desc="层层传递，最终由消费者承担；企业是“通道”，不是最终负税人。" delay={62} />
        </div>

        <div style={{ marginTop: 30, display: "flex", alignItems: "center", gap: 18, ...foot }}>
          <div style={{ width: 6, height: 6, background: COLORS.gold, transform: "rotate(45deg)" }} />
          <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.dim, letterSpacing: 2 }}>
            一张发票贯穿全链条——这也是“以票控税”和增值税征管体系的基石
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="VAT" size={620} bottom={-180} right={-20} />
    </Scene>
  );
};

/* ------------------------------------------------------------------ */
/* 12 结尾                                                              */
/* ------------------------------------------------------------------ */
export const S12Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const line = useEnter(10, 8);
  const finale = useEnter(96, 24);
  const data = useEnter(120, 16);

  const years = ["1954", "1979", "1984", "1994", "2009", "2016", "2019", "2026"];

  return (
    <Scene duration={300}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "120px 140px" }}>
        <div style={{ position: "relative", width: "100%", marginTop: 40, ...line }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 8, height: 2, background: "linear-gradient(90deg, rgba(228,180,92,0.1), rgba(228,180,92,0.6), rgba(228,180,92,0.1))" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {years.map((y, i) => {
              const s = spring({ frame: frame - 14 - i * 8, fps, config: { damping: 200 }, durationInFrames: 26 });
              return (
                <div key={y} style={{ textAlign: "center", opacity: s }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: i === years.length - 1 ? COLORS.gold : COLORS.muted, margin: "0 auto" }} />
                  <div style={{ marginTop: 20, fontFamily: FONT_NUM, fontSize: 34, color: i === years.length - 1 ? COLORS.gold : COLORS.muted, letterSpacing: 2 }}>{y}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 120, textAlign: "center", maxWidth: 1700, ...finale }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 60, lineHeight: 1.7, color: COLORS.ink, letterSpacing: 2 }}>
            <div>一部增值税史，</div>
            <div style={{ color: COLORS.goldSoft }}>也是中国市场经济体制改革的缩影。</div>
          </div>
        </div>

        <div style={{ marginTop: 70, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.dim, letterSpacing: 3, ...data }}>
          2025 年国内增值税 6.89 万亿元，约占全国税收收入 39% · 科普示意，政策以官方发布为准
        </div>
      </AbsoluteFill>
      <Ghost text="2026" size={560} bottom={-180} right={-20} />
    </Scene>
  );
};
