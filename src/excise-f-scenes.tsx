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

/* ================= 国外篇 ================= */

export const E1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>消费税 · 国外篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          盐、酒、烟、碳，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          什么该多收一点税
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          从古罗马盐税，到今天的碳税
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E2Salt: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 16);
  return (
    <Scene duration={440}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>古代 · 盐与酒</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>最古老的税基</Title></div>
        <div style={{ marginTop: 36, ...rows }}>
          {[
            { y: "古罗马", d: "对盐、港口货物征税" },
            { y: "中世纪", d: "盐税、酒税成为国王的重要财源" },
            { y: "法国大革命前", d: "盐税（gabelle）激起民怨" },
            { y: "1930", d: "甘地徒步 240 英里，抗议英国食盐专卖" },
          ].map((x) => (
            <div key={x.y} style={{ display: "flex", gap: 20, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold, width: 170 }}>{x.y}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink }}>{x.d}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E3Excise1643: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(26, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1643 · 英国</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 120, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1643</div>
            <div style={{ marginTop: 8, ...t }}><Title size={46}>为内战开征的 excise</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                英国议会为内战筹钱，对啤酒、烈酒、苹果酒开征消费税。
                税吏上门、贴封条，“excise”一词从此进入财政史。
              </Body>
            </div>
          </div>
          <Panel style={{ width: 380, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.gold, letterSpacing: 2 }}>EXCISE</div>
            <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink, lineHeight: 1.8 }}>
              对特定商品在生产、销售环节征收的间接税
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E4Whiskey: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(36, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/whiskey-small.jpg" width={620} caption="1794 年威士忌叛乱 · 弗雷德里克·凯梅尔迈耶绘 · 公有领域" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1791—1794 · 美国</Kicker></div>
            <div style={{ marginTop: 12, ...t }}><Title size={44}>威士忌叛乱</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                汉密尔顿对威士忌开征消费税，引发 1794 年威士忌叛乱。
                华盛顿率军镇压——这是美国第一次用军队对付抗税。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E5SinTax: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>19—20 世纪 · 罪孽税与庇古税</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>为“危害”定价</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...cards }}>
          {[
            { k: "烟", v: "美国 1862 年开征烟税；今天烟税是控烟核心工具。" },
            { k: "酒", v: "禁酒令前后，酒税起落；1933 年后重新成为税源。" },
            { k: "油", v: "美国 1932 年开征汽油税，用于公路建设。" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 54, color: COLORS.gold, fontWeight: 700 }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E6Modern: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={440}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>今天 · 新税基</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>糖、碳、塑料，都成了消费税</Title></div>
        <div style={{ display: "flex", gap: 20, marginTop: 40, ...cards }}>
          {[
            { k: "英国", v: "软饮料行业税（2018）" },
            { k: "墨西哥", v: "含糖饮料税（2014）" },
            { k: "瑞典", v: "碳税（1991）" },
            { k: "爱尔兰", v: "塑料袋税（2002）" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "26px 24px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 19, color: COLORS.ink, lineHeight: 1.7 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E7EU: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(24, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>规则 · 欧盟与 WHO</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={52}>最低税率，防止套利</Title></div>
        <div style={{ marginTop: 26, ...body }}>
          <Body size={25} style={{ lineHeight: 1.9 }}>
            欧盟对烟、酒、能源设最低税率，防止跨境套利；
            世界卫生组织建议，烟草税应占零售价的 75% 以上。
          </Body>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E8Debate: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>争议</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={48}>该不该多收？</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...cards }}>
          {[
            { k: "累退性", v: "低收入者税负占比更高" },
            { k: "走私与跨境", v: "税率差带来套利空间" },
            { k: "专款专用", v: "公路、健康基金，还是统收统支" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const E9End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(22, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结 · 下一期中国</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, lineHeight: 1.8 }}>
            从盐税到碳税，消费税用几千年回答同一个问题：
            什么该被多收一点税？
          </div>
          <div style={{ marginTop: 24, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            下一期：消费税在中国的故事
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料与图片：Wikipedia、Wikimedia Commons。内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
