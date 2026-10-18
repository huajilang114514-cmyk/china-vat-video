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

export const C1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>消费税 · 中国篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          寓禁于征，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          多收一道税
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          1994—2026，从 11 个税目到烟酒油车
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C2_1994: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={500}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-ct1994.jpg" width={560} caption="1993 年《中华人民共和国消费税暂行条例》· 国务院令第 135 号 · 1994 年 1 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1994 · 开征</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1994</div>
            <div style={{ marginTop: 8, ...t }}><Title size={44}>11 个税目，寓禁于征</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                1993 年 12 月 13 日发布，1994 年 1 月 1 日施行。
                对少数特殊消费品，在增值税之外再加一道消费税。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C3Items: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(18, 16);
  const items = ["烟", "酒及酒精", "化妆品", "护肤护发品", "贵重首饰", "鞭炮焰火", "汽油", "柴油", "汽车轮胎", "摩托车", "小汽车"];
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>1994 · 税目</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>11 类消费品</Title></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 40, ...rows, maxWidth: 1600 }}>
          {items.map((x) => (
            <Chip key={x} style={{ fontSize: 26, padding: "12px 28px" }}>{x}</Chip>
          ))}
        </div>
        <div style={{ marginTop: 30, ...rows, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
          多数在生产环节征收，从价、从量或复合计税。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C4_2006: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2006 · 税目调整</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>成品油、游艇、高档手表</Title></div>
        <div style={{ display: "flex", gap: 20, marginTop: 40, ...cards }}>
          {["成品油", "高尔夫球具", "高档手表", "游艇", "一次性筷子", "实木地板"].map((x) => (
            <Panel key={x} style={{ flex: 1, padding: "26px 18px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink }}>{x}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 26, ...cards, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
          同时取消护肤护发品税目。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C5_2008: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>2008—2009 · 成品油税费改革</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>取消六费，提高油税</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...rows }}>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold }}>取消</div>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.ink, lineHeight: 1.8 }}>
              公路养路费等六项收费
            </div>
          </Panel>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold }}>提高</div>
            <div style={{ marginTop: 10, fontFamily: FONT_NUM, fontSize: 34, color: COLORS.ink }}>汽油 1.0 元/升</div>
            <div style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.ink }}>柴油 0.8 元/升</div>
          </Panel>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C6_2015: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 16);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2014—2015 · 连续上调</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>汽油 1.52 元/升，柴油 1.2 元/升</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...rows }}>
          {[
            { y: "2014.11", d: "汽油 1.12、柴油 0.94" },
            { y: "2014.12", d: "汽油 1.40、柴油 1.10" },
            { y: "2015.01", d: "汽油 1.52、柴油 1.20" },
          ].map((x) => (
            <Panel key={x.y} style={{ flex: 1, padding: "24px 26px" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold }}>{x.y}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.ink }}>{x.d}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 26, ...rows, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
          2015 年 2 月，电池、涂料纳入消费税，税率 4%。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C7_2016: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>2016 · 化妆品</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={52}>普通化妆品不再征，高档 15%</Title></div>
        <div style={{ marginTop: 24, ...body }}>
          <Body size={25} style={{ lineHeight: 1.9 }}>
            取消普通美容、修饰类化妆品消费税；高档化妆品税率 15%。
            税目从“化妆品”改为“高档化妆品”。
          </Body>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C8_2022: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(36, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-ct2022.jpg" width={560} caption="2022 年《关于对电子烟征收消费税的公告》· 财政部 海关总署 税务总局公告 2022 年第 33 号" rotate={1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>2022 · 电子烟</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 100, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>2022</div>
            <div style={{ marginTop: 8, ...t }}><Title size={40}>生产 36%，批发 11%</Title></div>
            <div style={{ marginTop: 18, ...body }}>
              <Body size={23} style={{ lineHeight: 1.9 }}>
                2022 年 11 月 1 日起，电子烟纳入消费税：
                生产（进口）环节 36%，批发环节 11%。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C9_Data: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2025 · 数据与改革</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>第三大税种，改革在路上</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 36, ...rows }}>
          <div style={{ flex: 1 }}>
            {[
              { n: "16857 亿元", d: "2025 年国内消费税" },
              { n: "约 9.6%", d: "占全国税收收入" },
            ].map((x) => (
              <div key={x.n} style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 54, fontWeight: 700, color: COLORS.goldSoft }}>{x.n}</span>
                <span style={{ marginLeft: 20, fontFamily: FONT_SANS, fontSize: 23, color: COLORS.muted }}>{x.d}</span>
              </div>
            ))}
          </div>
          <div style={{ flex: 1.2, paddingTop: 6 }}>
            <Body size={23} style={{ lineHeight: 1.9 }}>
              2019 年财政部就《消费税法》征求意见；改革方向是征收环节后移、稳步下划地方。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const C10End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(22, 18);
  return (
    <Scene duration={300}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, lineHeight: 1.8 }}>
            从 11 个税目到烟酒油车，消费税一直在“筹资”与“调节”之间找平衡。
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料：国务院公报、财政部、国家税务总局公开文件；图片来自 Wikimedia Commons。内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
