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

/* 01 */
export const Z1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>企业所得税 · 中国篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          企业所得税在中国，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          只有四十多年
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          1980 — 2026，从两套税制到一套税法
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02 1980 */
export const Z2_1980: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(40, 18);
  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-cit1980.jpg" width={560} caption="1980 年《中华人民共和国中外合资经营企业所得税法》· 9 月 10 日通过，1981 年 1 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1980 · 涉外税制起步</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1980</div>
            <div style={{ marginTop: 8, ...t }}><Title size={46}>第一部企业所得税法</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={25} style={{ lineHeight: 1.9 }}>
                税率 30%，另按税额征 3% 地方税，合计 33%；
                经营期十年以上的，从获利年度起「两免三减半」。
              </Body>
              <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                {["30% + 3% = 33%", "两免三减半"].map((s) => (
                  <Chip key={s} style={{ fontSize: 22, padding: "8px 20px" }}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 03 1981/1983 */
export const Z3_1981: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>1981—1983 · 继续补网</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>外国企业，另一套税率</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 44, ...rows }}>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 44, color: COLORS.gold }}>1981</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>《外国企业所得税法》</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted, lineHeight: 1.7 }}>
              20%—40% 超额累进，另征 10% 地方税。
            </div>
          </Panel>
          <Panel style={{ flex: 1, padding: "28px 30px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 44, color: COLORS.gold }}>1983</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>修改合资法</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted, lineHeight: 1.7 }}>
              延长减免期限，鼓励再投资。
            </div>
          </Panel>
        </div>
        <div style={{ marginTop: 28, ...rows, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>
          合资企业、外国企业、内资企业，各有一套所得税规则。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 04 1984 利改税 */
export const Z4_1984: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>1984 · 国营企业利改税</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>55%，再加调节税</Title></div>
        <div style={{ display: "flex", gap: 26, marginTop: 40, ...rows }}>
          <Panel style={{ flex: 1, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 72, fontWeight: 700, color: COLORS.gold }}>55%</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted }}>国营企业所得税</div>
          </Panel>
          <Panel style={{ flex: 1, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, marginTop: 20 }}>+ 调节税</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>按企业留利水平核定</div>
          </Panel>
        </div>
        <div style={{ marginTop: 26, ...rows, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>
          从「利润上交」到「依法纳税」，但不同所有制仍是不同税制。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 05 1991 合并 */
export const Z5_1991: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(40, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-cit1991.jpg" width={580} caption="1991 年《外商投资企业和外国企业所得税法》· 4 月 9 日通过，7 月 1 日施行" rotate={1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1991 · 两法合并</Kicker></div>
            <div style={{ marginTop: 10, ...t }}><Title size={44}>涉外税制，先统一</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                两部涉外税法合并，税率 30% + 3% 地方税 = 33%，
                继续「两免三减半」，经济特区减按 15%。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06 1994 */
export const Z6_1994: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>1994 · 分税制</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>内资企业，统一到 33%</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...rows }}>
          <Panel style={{ flex: 1, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 72, fontWeight: 700, color: COLORS.gold }}>33%</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted }}>《企业所得税暂行条例》</div>
          </Panel>
          <div style={{ flex: 1.2, paddingTop: 14 }}>
            <Body size={24} style={{ lineHeight: 1.9 }}>
              国营、集体、私营企业统一税率；
              但外资仍适用 1991 年的涉外税法——内外资，还是两套。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 07 2007 */
export const Z7_2007: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(40, 18);
  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 50, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/crop-cit2007.jpg" width={560} caption="2007 年《中华人民共和国企业所得税法》· 主席令第六十三号 · 2008 年 1 月 1 日施行" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>2007—2008 · 内外资统一</Kicker></div>
            <div style={{ marginTop: 8, ...t, fontFamily: FONT_NUM, fontSize: 110, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>2007</div>
            <div style={{ marginTop: 6, ...t }}><Title size={42}>25%，一套税法管内外</Title></div>
            <div style={{ marginTop: 18, ...body }}>
              <Body size={23} style={{ lineHeight: 1.9 }}>
                2007 年 3 月 16 日通过，2008 年 1 月 1 日施行：
                内外资统一 25%；高新技术企业 15%，小型微利企业 20%。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 08 2017 后 */
export const Z8_After: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2017 以后 · 减税降费</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>优惠，越来越多</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...rows }}>
          {[
            { k: "研发加计", v: "75% → 100%", d: "制造业、科技型中小企业等" },
            { k: "小微企业", v: "实际税负 5%", d: "年应纳税所得额 300 万以内" },
            { k: "公益捐赠", v: "结转 3 年", d: "2017 年修订后" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.gold, letterSpacing: 2 }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_NUM, fontSize: 40, color: COLORS.ink, fontWeight: 700 }}>{x.v}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>{x.d}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 09 数据 */
export const Z9Data: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(30, 24);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2025 · 数据</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={50}>第二大税种</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 34, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {[
              { n: "4.13 万亿元", d: "2025 年全国企业所得税" },
              { n: "约 23%", d: "占全国税收收入" },
              { n: "33% → 25%", d: "税率变化（1980s—2008）" },
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

/* 10 结尾 */
export const Z10End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, lineHeight: 1.8 }}>
            从 1980 年的 33%，到 2008 年的 25%——
            企业所得税用四十年，完成了从「内外两套」到「一套税法」的并轨。
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            下一期：把增值税和企业所得税放在一起，看中国税制的整体逻辑
          </div>
          <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料：全国人大、国务院、财政部、国家税务总局公开文件；图片来自中国政府网、财政部法规库、改革数据。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
