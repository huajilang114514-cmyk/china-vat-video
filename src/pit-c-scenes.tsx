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

export const P1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>个人所得税 · 中国篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          从 800 到 5000，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          个人所得税四十年
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          1980 — 2026，从分类到综合
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P2_1980: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-pit1980.jpg" width={540} caption="1980 年《中华人民共和国个人所得税法》· 最高人民法院公报" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1980 · 第一部个税法</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1980</div>
            <div style={{ marginTop: 8, ...t }}><Title size={44}>800 元起征，5% 到 45%</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={25} style={{ lineHeight: 1.9 }}>
                起征点 800 元一个月，工资薪金 5%—45% 超额累进。
                当时主要面向外国人和高收入者。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P3_1986: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>1986—1987 · 三税并存</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>个体户、调节税、个税</Title></div>
        <div style={{ display: "flex", gap: 22, marginTop: 40, ...rows }}>
          {[
            { k: "1986", v: "城乡个体工商业户所得税" },
            { k: "1986", v: "个人收入调节税" },
            { k: "1980", v: "个人所得税（主要对外籍）" },
          ].map((x, i) => (
            <Panel key={i} style={{ flex: 1, padding: "26px 28px" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 38, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 23, color: COLORS.ink }}>{x.v}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 24, ...rows, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
          三套税并行，直到 1994 年才合并。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P4_1994: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>1993—1994 · 三税合并</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>一套个税法，管所有人</Title></div>
        <div style={{ display: "flex", gap: 30, marginTop: 40, ...rows }}>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 54, color: COLORS.gold }}>5%—45%</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>工资薪金超额累进</div>
          </Panel>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 54, color: COLORS.gold }}>800 元</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>起征点不变</div>
          </Panel>
          <div style={{ flex: 1.2, paddingTop: 10 }}>
            <Body size={23} style={{ lineHeight: 1.9 }}>
              1999 年对储蓄存款利息征 20%，2008 年暂免。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P5Thresholds: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 16);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>2005—2011 · 起征点上调</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>800 → 1600 → 2000 → 3500</Title></div>
        <div style={{ display: "flex", gap: 20, marginTop: 40, ...rows }}>
          {[
            { y: "2006", v: "1600" },
            { y: "2008", v: "2000" },
            { y: "2011", v: "3500" },
          ].map((x) => (
            <Panel key={x.y} style={{ flex: 1, padding: "26px 28px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 28, color: COLORS.muted }}>{x.y}</div>
              <div style={{ marginTop: 6, fontFamily: FONT_NUM, fontSize: 62, color: COLORS.gold, fontWeight: 700 }}>{x.v}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>元 / 月</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P6_2018: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 50, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-pit2018.jpg" width={520} caption="2018 年《关于修改〈个人所得税法〉的决定》· 主席令第九号 · 2019 年 1 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>2018—2019 · 综合与分类</Kicker></div>
            <div style={{ marginTop: 8, ...t, fontFamily: FONT_NUM, fontSize: 100, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>2018</div>
            <div style={{ marginTop: 6, ...t }}><Title size={40}>5000 元起征，六项扣除</Title></div>
            <div style={{ marginTop: 16, ...body }}>
              <Body size={22} style={{ lineHeight: 1.9 }}>
                2019 年起综合与分类结合：工资薪金、劳务报酬、稿酬、特许权使用费合并为综合所得；
                起征点 5000 元/月，六项专项附加扣除，年度汇算清缴。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P7_After: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2023—2024 · 继续加码</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>专项附加扣除，标准提高</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...cards }}>
          {[
            { k: "婴幼儿照护", v: "扣除标准提高到 2000 元/月" },
            { k: "子女教育", v: "扣除标准提高到 2000 元/月" },
            { k: "赡养老人", v: "扣除标准提高到 3000 元/月" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 24, ...cards, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
          2024 年个人养老金制度全国实施，也可享受税收优惠。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P8Data: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(30, 24);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2025 · 数据</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={50}>第四大税种</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 34, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {[
              { n: "1.62 万亿元", d: "2025 年全国个人所得税" },
              { n: "约 9%", d: "占全国税收收入" },
              { n: "800 → 5000", d: "起征点变化（1980—2019）" },
            ].map((x) => (
              <div key={x.n} style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 54, fontWeight: 700, color: COLORS.goldSoft }}>{x.n}</span>
                <span style={{ marginLeft: 20, fontFamily: FONT_SANS, fontSize: 23, color: COLORS.muted }}>{x.d}</span>
              </div>
            ))}
          </div>
          <div style={{ ...doc }}>
            <Doc src="assets/crop-mof2025.jpg" width={500} caption="财政部《2025 年财政收支情况》" />
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const P9End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, lineHeight: 1.8 }}>
            从 800 到 5000，从分类到综合——
            个人所得税见证了中国收入分配改革的四十多年。
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            个税系列完成：国外篇 + 中国篇
          </div>
          <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料：全国人大、国务院、财政部、国家税务总局公开文件；图片来自中国政府网、最高人民法院公报。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
