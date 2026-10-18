import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "./theme";
import { Body, Chip, Kicker, Panel, Scene, Seal, Title, useEnter } from "./components";

const PAD: React.CSSProperties = { padding: "90px 110px" };

const Doc: React.FC<{ src: string; width: number; caption: string; rotate?: number; delay?: number }> = ({
  src,
  width,
  caption,
  rotate = 0,
  delay = 0,
}) => {
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

/* 01 钩子 */
export const C1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>增值税 · 中国篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 96, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          上一期讲全球，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 96, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          这一期回到中国
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          1979 — 2026，从试点到立法
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02 1979 试点 */
export const C2Pilot: React.FC = () => {
  const t = useEnter(4, 22);
  const img = useEnter(18, 24);
  const body = useEnter(42, 18);
  return (
    <Scene duration={430}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <div style={{ ...img }}>
            <Photo src="hist-assets/coupons.jpg" width={430} caption="1980 年代广东票证（实物照片）· Wikimedia Commons · CC BY-SA 4.0" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1979 · 试点</Kicker></div>
            <div style={{ marginTop: 12, ...t, fontFamily: FONT_NUM, fontSize: 130, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1979</div>
            <div style={{ marginTop: 8, ...t }}><Title size={50}>从襄樊的机械行业开始</Title></div>
            <div style={{ marginTop: 22, ...body }}>
              <Body size={26} style={{ lineHeight: 1.9 }}>
                改革开放第二年，中国在湖北襄樊的机械行业试办增值税，
                随后扩到上海、柳州、长沙等城市，产品限于机器机械、农业机具和部分日用机械。
              </Body>
              <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["襄樊", "上海", "柳州", "长沙"].map((c) => (
                  <Chip key={c} style={{ fontSize: 22, padding: "8px 20px" }}>{c}</Chip>
                ))}
                <Chip color={COLORS.muted} style={{ fontSize: 22, padding: "8px 20px", borderColor: "rgba(255,255,255,0.15)", color: COLORS.muted, backgroundColor: "transparent" }}>机器机械 / 农机具</Chip>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 03 1984 建章 */
export const C3_1984: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(40, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="assets/crop-1984b.jpg" width={600} caption="1984 年《增值税条例（草案）》· 国务院公报（广东省政府公报转载）" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1984 · 建章</Kicker></div>
            <div style={{ marginTop: 12, ...t, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1984</div>
            <div style={{ marginTop: 8, ...t }}><Title size={50}>增值税制度正式建立</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={26} style={{ lineHeight: 1.9 }}>
                国务院发布《增值税条例（草案）》，1984 年 10 月 1 日起试行，
                征收范围扩大到全国 12 类货物。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 04 1994 分税制 */
export const C4_1994: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(40, 18);
  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1994 · 分税制改革</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 130, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1994</div>
            <div style={{ marginTop: 6, ...t }}><Title size={48}>增值税成为第一大税种</Title></div>
            <div style={{ display: "flex", gap: 18, marginTop: 24 }}>
              <Panel style={{ padding: "16px 26px" }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>基本税率</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 56, color: COLORS.gold, fontWeight: 700 }}>17%</div>
              </Panel>
              <Panel style={{ padding: "16px 26px" }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>低税率</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 56, color: COLORS.goldSoft, fontWeight: 700 }}>13%</div>
              </Panel>
              <div style={{ paddingTop: 30, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.redSoft }}>生产型 · 设备进项不能抵扣</div>
            </div>
            <div style={{ marginTop: 22, ...body }}>
              <Body size={25} style={{ lineHeight: 1.9 }}>
                增值税覆盖全部货物和加工修理修配劳务，当年占全国税收约 45%。
                直到 2009 年，才完成向消费型的转型。
              </Body>
            </div>
          </div>
          <div style={{ ...doc }}>
            <Doc src="assets/crop-1994.jpg" width={560} caption="国务院令第 134 号《增值税暂行条例》（1993）" rotate={1} />
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 05 2009 转型 */
export const C5_2009: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2004—2009 · 转型</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>从生产型，到消费型</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 46, ...rows }}>
          {[
            { y: "2004", d: "东北老工业基地试点", c: COLORS.muted },
            { y: "2007", d: "中部六省扩围", c: COLORS.goldSoft },
            { y: "2009", d: "全国推开 · 消费型", c: COLORS.gold },
          ].map((x) => (
            <Panel key={x.y} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 54, color: x.c, fontWeight: 700 }}>{x.y}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink }}>{x.d}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 34, ...rows, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted }}>
          购进设备的进项税可以抵扣，企业投资的门槛降了下来。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06 营改增 */
export const C6_2016: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const rows = useEnter(38, 16);
  return (
    <Scene duration={560}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2012—2016 · 营改增</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>营业税，退出历史舞台</Title></div>
        <div style={{ display: "flex", gap: 50, marginTop: 26 }}>
          <div style={{ flex: 1, ...rows }}>
            {[
              { y: "2012.1.1", d: "上海率先试点" },
              { y: "2013.8", d: "推向全国" },
              { y: "2014", d: "铁路、邮政、电信" },
              { y: "2016.5.1", d: "全面推开，营业税停征" },
            ].map((x) => (
              <div key={x.y} style={{ display: "flex", gap: 18, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 32, color: COLORS.gold, width: 150 }}>{x.y}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 23, color: COLORS.ink }}>{x.d}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["建筑", "房地产", "金融", "生活服务"].map((s) => (
                <Chip key={s} style={{ fontSize: 20, padding: "7px 18px" }}>{s}</Chip>
              ))}
            </div>
          </div>
          <div style={{ ...doc }}>
            <Doc src="assets/crop-2016.jpg" width={540} caption="财税〔2016〕36 号：全面推开营改增试点的通知" rotate={-0.8} />
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 07 降率 */
export const C7Rates: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2017—2019 · 降率</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>17% 降到 13%，三档税率定型</Title></div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginTop: 34 }}>
          <span style={{ fontFamily: FONT_NUM, fontSize: 96, color: COLORS.dim, textDecoration: "line-through", textDecorationColor: "rgba(196,71,58,0.7)" }}>17%</span>
          <span style={{ fontFamily: FONT_NUM, fontSize: 40, color: COLORS.gold }}>→</span>
          <span style={{ fontFamily: FONT_NUM, fontSize: 130, fontWeight: 700, color: COLORS.goldSoft }}>13%</span>
          <span style={{ marginLeft: 24, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>2017 取消 13% 档 · 2018 17→16 · 2019 16→13</span>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 34, ...rows }}>
          {[
            { r: "13%", t: "货物等" },
            { r: "9%", t: "交通建筑等" },
            { r: "6%", t: "服务金融等" },
          ].map((x) => (
            <div key={x.r} style={{ border: "1px solid rgba(228,180,92,0.4)", borderRadius: 12, padding: "12px 26px", textAlign: "center" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 700, color: COLORS.gold }}>{x.r}</div>
              <div style={{ fontFamily: FONT_SANS, fontSize: 19, color: COLORS.muted }}>{x.t}</div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 08 2024 立法 */
export const C8_2024: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(40, 18);
  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 50, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="assets/crop-law2024.jpg" width={560} caption="《中华人民共和国增值税法》· 主席令第四十一号 · 2026 年 1 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>2024—2026 · 立法</Kicker></div>
            <div style={{ marginTop: 8, ...t, fontFamily: FONT_NUM, fontSize: 110, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>2024</div>
            <div style={{ marginTop: 6, ...t }}><Title size={44}>从条例，到法律</Title></div>
            <div style={{ marginTop: 18, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                2024 年 12 月 25 日通过，2026 年 1 月 1 日施行。税率不变，但税收法定、
                小规模纳税人 500 万元标准、留抵退税、电子发票都写进了法律。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 09 数据 */
export const C9Data: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(30, 24);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2025 · 数据</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={50}>中国第一大税种</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 34, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {[
              { n: "6.89 万亿元", d: "2025 年国内增值税" },
              { n: "约 39%", d: "占全国税收收入" },
              { n: "6000 万+", d: "增值税纳税人" },
            ].map((x) => (
              <div key={x.n} style={{ padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 58, fontWeight: 700, color: COLORS.goldSoft }}>{x.n}</span>
                <span style={{ marginLeft: 20, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted }}>{x.d}</span>
              </div>
            ))}
          </div>
          <div style={{ ...doc }}>
            <Doc src="assets/crop-mof2025.jpg" width={520} caption="财政部《2025 年财政收支情况》" />
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 10 结尾 */
export const C10End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结 · 下一期企业所得税</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, lineHeight: 1.8 }}>
            从 1979 年的试点，到 2026 年的增值税法——
            四十多年，增值税长成了中国第一大税种，也见证了中国市场经济改革。
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            下一期：企业所得税的前世今生
          </div>
          <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料与文件：财政部、国家税务总局、全国人大网、中国政府网公开文件；
            照片来自 Wikimedia Commons（票证 CC BY-SA 4.0、人民大会堂 CC0）。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};