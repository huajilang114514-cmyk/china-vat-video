import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "./theme";
import { Body, Chip, Kicker, Panel, Scene, Seal, Title, useEnter } from "./components";

const PAD: React.CSSProperties = { padding: "90px 110px" };

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

export const T1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>印花税 · 一张纸的税</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 96, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          一张纸，一个章，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 96, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          就是印花税
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          从 1604 年威尼斯，到 2026 年的电子凭证
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
  const img = useEnter(18, 24);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 54, height: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>起源 · 欧洲</Kicker></div>
            <div style={{ marginTop: 12, ...t }}><Title size={46}>最早是「文件的税」</Title></div>
            <div style={{ marginTop: 24, ...rows }}>
              {[
                { y: "1604", d: "威尼斯最早出现" },
                { y: "1610s", d: "西班牙、荷兰跟进" },
                { y: "1694", d: "英国开征印花税" },
                { y: "1765", d: "英国对北美殖民地开征，成为独立战争导火索之一" },
              ].map((x) => (
                <div key={x.y} style={{ display: "flex", gap: 18, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <span style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold, width: 90 }}>{x.y}</span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.ink, lineHeight: 1.5 }}>{x.d}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...img }}>
            <Photo src="hist-assets/stamp-roc.jpg" width={420} caption="国民政府印花税票（一分）· Wikimedia Commons · 公有领域" rotate={1} />
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T3ChinaEarly: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>中国 · 三起三落</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>1912 年就有，1958 年消失</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...rows }}>
          {[
            { y: "1912", d: "民国时期开征印花税" },
            { y: "1950", d: "新中国《印花税暂行条例》" },
            { y: "1958", d: "并入工商统一税，印花税消失" },
          ].map((x) => (
            <Panel key={x.y} style={{ flex: 1, padding: "26px 28px" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 42, color: COLORS.gold }}>{x.y}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.ink, lineHeight: 1.6 }}>{x.d}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T4_1988: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-stamp1988.jpg" width={540} caption="1988 年《中华人民共和国印花税暂行条例》· 国务院令第 11 号 · 10 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1988 · 恢复征收</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1988</div>
            <div style={{ marginTop: 8, ...t }}><Title size={42}>13 个税目，自行贴花</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                10 月 1 日恢复征收：13 个税目，比例税率加每件 5 元定额，
                由书立人自行计算、购买并粘贴印花税票。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T5Securities: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(18, 16);
  const data = [
    { y: "1990", v: "6‰", d: "深圳开征" },
    { y: "1997", v: "5‰", d: "上调" },
    { y: "2005", v: "1‰", d: "下调" },
    { y: "2007", v: "3‰", d: "5·30 上调，沪指跌 6.5%" },
    { y: "2008.4", v: "1‰", d: "下调" },
    { y: "2008.9", v: "单边 1‰", d: "只对卖方征收" },
  ];
  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>证券交易印花税 · 1990—2008</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>一条税率曲线，牵动市场</Title></div>
        <div style={{ display: "flex", gap: 14, marginTop: 40, ...rows }}>
          {data.map((x) => (
            <Panel key={x.y} style={{ flex: 1, padding: "20px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 24, color: COLORS.muted }}>{x.y}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_NUM, fontSize: 36, color: COLORS.gold, fontWeight: 700 }}>{x.v}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 16, color: COLORS.dim, lineHeight: 1.4 }}>{x.d}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 28, ...rows, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
          2008 年 9 月 19 日起，证券交易印花税改为单边征收。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T6Unilateral: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>2008.9.19 · 单边征收</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={60}>只对卖方，按 1‰ 征收</Title></div>
        <div style={{ marginTop: 24, ...body }}>
          <Body size={26} style={{ lineHeight: 1.9 }}>
            在此之前是买卖双方双向征收；改为单边后，
            交易成本下降，市场情绪明显回暖。
          </Body>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T7_2021: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 50, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-stamp2021.jpg" width={540} caption="2021 年《中华人民共和国印花税法》· 主席令第八十九号 · 2022 年 7 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>2021—2022 · 从条例到法律</Kicker></div>
            <div style={{ marginTop: 8, ...t, fontFamily: FONT_NUM, fontSize: 100, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>2021</div>
            <div style={{ marginTop: 6, ...t }}><Title size={40}>13 个税目，税率法定</Title></div>
            <div style={{ marginTop: 16, ...body }}>
              <Body size={22} style={{ lineHeight: 1.9 }}>
                2021 年 6 月 10 日通过，2022 年 7 月 1 日施行：
                13 个税目，税率从万分之零点五到千分之一，定额每件 5 元；
                电子合同、电子凭证同样要缴。
              </Body>
            </div>
          </div>
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
        <div style={t}><Kicker>2023—2025 · 减半与数据</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>证券印花税减半，印花税收入创新高</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...rows }}>
          {[
            { k: "2023.8.28", v: "0.5‰", d: "证券交易印花税减半" },
            { k: "2025 印花税", v: "4270 亿", d: "同比增长 24.1%" },
            { k: "其中证券交易", v: "2035 亿", d: "同比增长 57.8%" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>{x.k}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_NUM, fontSize: 44, color: COLORS.gold, fontWeight: 700 }}>{x.v}</div>
              <div style={{ marginTop: 6, fontFamily: FONT_SANS, fontSize: 19, color: COLORS.dim }}>{x.d}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T9Principles: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>怎么看印花税</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>小税种，大讨论</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...cards }}>
          {[
            { k: "凭证税、行为税", v: "对合同、产权转移书据、营业账簿、证券交易征税。" },
            { k: "轻税、广征", v: "税率低、覆盖广、征管成本低，是地方税。" },
            { k: "争议", v: "证券印花税该不该降、该不该取消，长期有讨论。" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const T10End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(22, 18);
  return (
    <Scene duration={300}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, lineHeight: 1.8 }}>
            从一张税票到电子申报，
            印花税见证了中国经济活动的每一种凭证。
          </div>
          <div style={{ marginTop: 24, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.goldSoft }}>
            下一期：消费税，或者你指定的税种
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料：国务院公报、中国政府网、全国人大公开文件；图片来自 Wikimedia Commons。内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
