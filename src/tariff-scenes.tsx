import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "./theme";
import { Body, Chip, Kicker, Panel, Scene, Seal, Title, useEnter } from "./components";

const PAD: React.CSSProperties = { padding: "90px 110px" };

const Photo: React.FC<{ src: string; width: number; caption: string; delay?: number }> = ({ src, width, caption, delay = 0 }) => {
  const e = useEnter(delay, 24);
  return (
    <div style={{ ...e, width }}>
      <div style={{ padding: 10, border: "1px solid rgba(228,180,92,0.4)", borderRadius: 8, background: "rgba(248,243,233,0.06)", boxShadow: "0 26px 70px rgba(0,0,0,0.6)" }}>
        <Img src={staticFile(src)} style={{ width: "100%", display: "block", borderRadius: 3 }} />
      </div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 1.5 }}>{caption}</div>
    </div>
  );
};

const Doc: React.FC<{ src: string; width: number; caption: string; rotate?: number; delay?: number }> = ({ src, width, caption, rotate = 0, delay = 0 }) => {
  const e = useEnter(delay, 24);
  return (
    <div style={{ ...e, width }}>
      <div style={{ padding: 10, border: "1px solid rgba(228,180,92,0.4)", borderRadius: 8, background: "rgba(248,243,233,0.06)", boxShadow: "0 26px 70px rgba(0,0,0,0.6)", transform: "rotate(" + rotate + "deg)" }}>
        <div style={{ background: "#fff", borderRadius: 3, overflow: "hidden" }}>
          <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
        </div>
      </div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 1.5 }}>{caption}</div>
    </div>
  );
};

const Bars: React.FC<{ items: { l: string; v: number }[]; max: number; unit?: string; delay?: number }> = ({ items, max, unit = "%", delay = 20 }) => {
  const e = useEnter(delay, 18);
  return (
    <div style={{ ...e, marginTop: 30 }}>
      {items.map((x) => (
        <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 14 }}>
          <div style={{ width: 240, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted, textAlign: "right" }}>{x.l}</div>
          <div style={{ flex: 1, height: 26, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
            <div style={{ width: (x.v / max) * 100 + "%", height: "100%", background: "linear-gradient(90deg, rgba(228,180,92,0.9), rgba(228,180,92,0.35))", borderRadius: 4 }} />
          </div>
          <div style={{ width: 90, fontFamily: FONT_NUM, fontSize: 24, color: COLORS.goldSoft }}>{x.v}{unit}</div>
        </div>
      ))}
    </div>
  );
};

export const T1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={190}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>关税 · 国门上的税</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          关税，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          大国博弈的工具
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          从南京条约的 5%，到今天的 7.3%
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T2Origin: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 16);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>起源 · 保护主义</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>关税，最早是“国门税”</Title></div>
        <div style={{ marginTop: 36, ...rows }}>
          {[
            { y: "古希腊", d: "港口税（portoria）" },
            { y: "1651", d: "英国《航海条例》，限制他国航运" },
            { y: "1930", d: "美国《斯姆特-霍利关税法》，引发全球报复" },
          ].map((x) => (
            <div key={x.y} style={{ display: "flex", gap: 20, alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold, width: 150 }}>{x.y}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink }}>{x.d}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T3Nanking: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(32, 18);
  return (
    <Scene duration={500}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/nanking-small.jpg" width={720} caption="1842 年《南京条约》签署 · Wikimedia Commons · 公有领域" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1842 · 南京条约</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 110, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>5%</div>
            <div style={{ marginTop: 8, ...t }}><Title size={42}>协定关税，丧失自主</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={23} style={{ lineHeight: 1.9 }}>
                鸦片战争后，《南京条约》规定协定关税，中国进出口税率被压到 5% 左右；
                1858 年《天津条约》又定下“值百抽五”。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T4_1929: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(18, 16);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>1929—1951 · 收回与重建</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>从争取自主，到保护产业</Title></div>
        <div style={{ display: "flex", gap: 20, marginTop: 40, ...rows }}>
          {[
            { y: "1929", d: "国民政府开始争取关税自主" },
            { y: "1951", d: "新中国公布《海关进出口税则》" },
            { y: "1985", d: "《进出口关税条例》发布" },
          ].map((x) => (
            <Panel key={x.y} style={{ flex: 1, padding: "28px 28px" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 46, color: COLORS.gold }}>{x.y}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.ink, lineHeight: 1.7 }}>{x.d}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T5_1985: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 50, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-tariff1985.jpg" width={560} caption="1985 年《中华人民共和国进出口关税条例》· 国务院发布" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1985—2001 · 走向开放</Kicker></div>
            <div style={{ marginTop: 12, ...t }}><Title size={44}>入世，关税大幅下降</Title></div>
            <div style={{ marginTop: 18, ...body }}>
              <Body size={23} style={{ lineHeight: 1.9 }}>
                1985 年条例发布；2001 年加入 WTO，平均关税从 15.3% 降到 9.8%，
                近年进一步降到 7.3%。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T6TradeWar: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={440}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2018—2019 · 贸易摩擦</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={46}>关税，重回大国博弈中心</Title></div>
        <div style={{ display: "flex", gap: 26, marginTop: 40, ...rows }}>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 48, color: COLORS.gold }}>2500 亿</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted, lineHeight: 1.7 }}>美国对约 2500 亿美元中国商品加征关税</div>
          </Panel>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 48, color: COLORS.gold }}>反制</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted, lineHeight: 1.7 }}>中国对美商品加征关税</div>
          </Panel>
        </div>
        <div style={{ marginTop: 24, ...rows, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>
          2025 年，关税再次成为焦点；全球供应链随之重组。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T7Types: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>怎么征</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>从价、从量、复合</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...cards }}>
          {[
            { k: "从价", v: "按货值百分比" },
            { k: "从量", v: "按数量/重量" },
            { k: "复合", v: "从价 + 从量" },
            { k: "税率", v: "最惠国 / 协定 / 普通" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "26px 24px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 19, color: COLORS.ink, lineHeight: 1.7 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T8Data: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2025 · 数据</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={48}>关税与进口环节税</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 36, ...rows }}>
          <div style={{ flex: 1 }}>
            {[
              { n: "2369 亿元", d: "2025 年关税收入" },
              { n: "18263 亿元", d: "进口环节增值税、消费税" },
              { n: "7.3%", d: "平均关税水平" },
            ].map((x) => (
              <div key={x.n} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 700, color: COLORS.goldSoft }}>{x.n}</span>
                <span style={{ marginLeft: 18, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted }}>{x.d}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, paddingTop: 8 }}>
            <Body size={22} style={{ lineHeight: 1.9 }}>
              关税保护国内产业，也会推高进口商品价格；进口环节税则由消费者承担。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T9End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(22, 18);
  return (
    <Scene duration={330}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, lineHeight: 1.8 }}>
            从南京条约的 5%，到今天的 7.3%，
            关税见证了中国从被动到主动的百年。
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料：国务院公报、财政部、海关总署公开文件；图片来自 Wikimedia Commons。内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
