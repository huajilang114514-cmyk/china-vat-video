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

export const F1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>个人所得税 · 国外篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          个人所得税，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 94, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          是战争的产物
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          从 1799 年英国，到今天的全球税制
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F2Pitt: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(36, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 70, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/pitt.jpg" width={400} caption="小威廉·皮特 · Wikimedia Commons · 公有领域" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1799 · 英国</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 130, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1799</div>
            <div style={{ marginTop: 8, ...t }}><Title size={48}>为战争筹钱的所得税</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={25} style={{ lineHeight: 1.9 }}>
                小皮特为对法战争开征所得税；战后取消，1842 年皮尔重新引入，从此保留下来。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F3Europe: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 16);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>19 世纪末—20 世纪初</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>从英国，到欧洲大陆</Title></div>
        <div style={{ marginTop: 36, ...rows }}>
          {[
            { y: "1842", d: "英国：皮尔重新引入所得税" },
            { y: "1891", d: "普鲁士：所得税改革，引入累进税率" },
            { y: "1909", d: "英国：人民预算，对高收入加征超级税" },
            { y: "1913", d: "美国：第十六修正案，联邦所得税落地" },
          ].map((x) => (
            <div key={x.y} style={{ display: "flex", gap: 20, alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold, width: 100 }}>{x.y}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink }}>{x.d}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F4US1913: React.FC = () => {
  const t = useEnter(4, 22);
  const doc = useEnter(18, 24);
  const body = useEnter(38, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <div style={{ ...doc }}>
            <Doc src="hist-assets/amendment16.jpg" width={360} caption="美国宪法第十六修正案 · 美国国家档案馆 · 公有领域" rotate={-1} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1913 · 美国</Kicker></div>
            <div style={{ marginTop: 10, ...t }}><Title size={46}>联邦所得税，终于合宪</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={25} style={{ lineHeight: 1.9 }}>
                第十六修正案通过，联邦所得税落地。
                最初税率只有 1% 到 7%，只覆盖少数富人。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F5HighRates: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>20 世纪中叶 · 高税率</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>为了战争，税率冲到天上</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 40, alignItems: "flex-end", ...rows }}>
          {[
            { c: "美国", v: 94, l: "最高 94%" },
            { c: "英国", v: 90, l: "一度 90%+" },
          ].map((x) => (
            <div key={x.c} style={{ flex: 1 }}>
              <div style={{ height: x.v * 3.2, background: "linear-gradient(180deg, rgba(228,180,92,0.9), rgba(228,180,92,0.2))", borderRadius: 8 }} />
              <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>{x.c}</div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold }}>{x.l}</div>
            </div>
          ))}
          <div style={{ flex: 1.2, paddingLeft: 20 }}>
            <Body size={23} style={{ lineHeight: 1.9 }}>
              两次世界大战把所得税从小众税变成大众税，最高边际税率长期在 70% 以上。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F6Withholding: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>1943—1944 · 预扣税</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>税，从工资里直接扣</Title></div>
        <div style={{ display: "flex", gap: 26, marginTop: 40, ...rows }}>
          <Panel style={{ flex: 1, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 46, color: COLORS.gold }}>1943</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>美国：预扣税</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted }}>雇主代扣代缴，所得税覆盖工薪阶层</div>
          </Panel>
          <Panel style={{ flex: 1, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 46, color: COLORS.gold }}>1944</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>英国：PAYE</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted }}>随薪预扣，所得税变成大众税</div>
          </Panel>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F7Cuts: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(38, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/reagan1986.jpg" width={620} caption="1986 年美国税改签署 · 白宫新闻照片 · 公有领域" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1980 年代 · 减税</Kicker></div>
            <div style={{ marginTop: 14, ...t }}><Title size={44}>从 70% 降到 28%</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                美国最高税率从 70% 降到 28%；英国从 83% 降到 40%。
                减税、放松管制，成为 1980 年代的潮流。
              </Body>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F8Variants: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>1990s 以后 · 税制多样</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>单一税率、双轨所得税……</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 40, ...cards }}>
          {[
            { k: "单一税率", v: "爱沙尼亚 1994 年率先推行，多国跟进。" },
            { k: "双轨所得税", v: "北欧：劳动所得累进，资本所得比例税。" },
            { k: "全球最低税", v: "2021 年后，对跨国企业设 15% 下限。" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold }}>{x.k}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

export const F9End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(22, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结 · 下一期中国</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, lineHeight: 1.8 }}>
            从战争税单到大众税，个人所得税用两百年，
            成为现代国家最重要的税种之一。
          </div>
          <div style={{ marginTop: 24, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            下一期：个人所得税在中国的故事
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料与图片：Wikipedia、Wikimedia Commons、美国国家档案馆、白宫新闻照片。内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
