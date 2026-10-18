import React from "react";
import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONT_NUM, FONT_SANS } from "./theme";
import { Body, Chip, Kicker, Panel, Scene, Seal, Title, useEnter } from "./components";

const PAD: React.CSSProperties = { padding: "90px 110px" };

const Photo: React.FC<{ src: string; width: number; caption: string; delay?: number; rotate?: number }> = ({ src, width, caption, delay = 0, rotate = 0 }) => {
  const e = useEnter(delay, 24);
  return (
    <div style={{ ...e, width }}>
      <div style={{ padding: 10, border: "1px solid rgba(228,180,92,0.4)", borderRadius: 8, background: "rgba(248,243,233,0.06)", boxShadow: "0 26px 70px rgba(0,0,0,0.6)", transform: "rotate(" + rotate + "deg)" }}>
        <Img src={staticFile(src)} style={{ width: "100%", display: "block", borderRadius: 3 }} />
      </div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 1.5 }}>{caption}</div>
    </div>
  );
};

/* 01 钩子 */
export const X1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(22, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>企业所得税 · 国外篇</Kicker>
        <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 96, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          企业所得税，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 96, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          比增值税还要老
        </div>
        <div style={{ marginTop: 34, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted }}>
          从 1799 年的战争税单，到 15% 全球最低税
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02 1799 英国 */
export const X2Pitt: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(38, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 70, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/pitt.jpg" width={400} caption="小威廉·皮特（William Pitt the Younger）· Wikimedia Commons · 公有领域" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1799 · 英国</Kicker></div>
            <div style={{ marginTop: 10, ...t, fontFamily: FONT_NUM, fontSize: 130, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1799</div>
            <div style={{ marginTop: 8, ...t }}><Title size={50}>为战争筹钱的所得税</Title></div>
            <div style={{ marginTop: 22, ...body }}>
              <Body size={26} style={{ lineHeight: 1.9 }}>
                英国首相小皮特为对法战争筹钱，开征所得税。
                当时公司不单独缴税，而是按个人所得税的税率纳税。
              </Body>
              <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 23, color: COLORS.goldSoft }}>
                企业所得税的雏形，藏在个人所得税里。
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 03 美国 1909/1913 */
export const X3US: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(38, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/amendment16.jpg" width={360} caption="美国宪法第十六修正案（1913）· 美国国家档案馆 · 公有领域" rotate={-1} />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1909—1913 · 美国</Kicker></div>
            <div style={{ marginTop: 10, ...t }}><Title size={48}>公司，成为独立纳税主体</Title></div>
            <div style={{ marginTop: 22, ...body }}>
              <Body size={25} style={{ lineHeight: 1.9 }}>
                1909 年，美国对公司的净所得征收 1% 的消费税；
                1913 年，第十六修正案通过，联邦所得税有了宪法基础。
              </Body>
              <div style={{ marginTop: 18, display: "flex", gap: 12 }}>
                {["1909 · 1% 公司所得税", "1913 · 第十六修正案"].map((s) => (
                  <Chip key={s} style={{ fontSize: 21, padding: "8px 18px" }}>{s}</Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 04 1965 英国公司税 */
export const X4UK1965: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>1965 · 英国</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={54}>公司，从个人所得税里分出来</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 44, ...rows }}>
          <Panel style={{ flex: 1, padding: "30px 32px" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 50, color: COLORS.muted }}>1965.4.1</div>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>英国开征公司税</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted, lineHeight: 1.7 }}>
              在此之前，公司按个人所得税率纳税，另缴利润税。
            </div>
          </Panel>
          <Panel style={{ flex: 1, padding: "30px 32px", borderColor: "rgba(228,180,92,0.45)" }}>
            <div style={{ fontFamily: FONT_NUM, fontSize: 50, color: COLORS.gold }}>Corporation Tax</div>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>公司作为法律实体单独缴税</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted, lineHeight: 1.7 }}>
              从「穿透到个人」变成「公司自己纳税」。
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 05 双重征税 */
export const X5Double: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(22, 18);
  return (
    <Scene duration={440}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>难题 · 双重征税</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>同一笔利润，被征两次？</Title></div>
        <div style={{ display: "flex", gap: 20, marginTop: 36, alignItems: "center", ...rows }}>
          {["公司利润", "公司税", "分红", "股东个税"].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ padding: "22px 26px", border: "1px solid rgba(228,180,92,0.35)", borderRadius: 12, background: "rgba(255,255,255,0.03)", fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>{s}</div>
              {i < 3 ? <span style={{ fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold }}>→</span> : null}
            </React.Fragment>
          ))}
        </div>
        <div style={{ marginTop: 34, ...rows }}>
          <Body size={24}>
            为了缓解重复征税，各国设计了三种主要制度：
          </Body>
          <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
            {[
              { k: "古典制", v: "公司、股东各缴各的" },
              { k: "归属制", v: "公司税抵股东个税" },
              { k: "免税制", v: "股东分红免税" },
            ].map((x) => (
              <Panel key={x.k} style={{ flex: 1, padding: "20px 24px" }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold }}>{x.k}</div>
                <div style={{ marginTop: 6, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted }}>{x.v}</div>
              </Panel>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06 高税率时代 */
export const X6HighRates: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>20 世纪中后期 · 高税率</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>税率，曾经高得惊人</Title></div>
        <div style={{ display: "flex", gap: 40, marginTop: 44, alignItems: "flex-end", height: 380, ...rows }}>
          {[
            { c: "美国", v: 52, l: "最高 52%" },
            { c: "英国", v: 50, l: "超过 50%" },
          ].map((x) => (
            <div key={x.c} style={{ flex: 1 }}>
              <div style={{ height: x.v * 5, background: "linear-gradient(180deg, rgba(228,180,92,0.9), rgba(228,180,92,0.25))", borderRadius: 8 }} />
              <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.ink }}>{x.c}</div>
              <div style={{ marginTop: 4, fontFamily: FONT_NUM, fontSize: 36, color: COLORS.gold }}>{x.l}</div>
            </div>
          ))}
          <div style={{ flex: 1.2, paddingLeft: 20 }}>
            <Body size={24} style={{ lineHeight: 1.9 }}>
              高税率带来避税、利润转移和资本外流。
              到了 1980 年代，降税成为潮流。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 07 1986/2017 降税 */
export const X7Cuts: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(40, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/reagan1986.jpg" width={620} caption="1986 年 10 月 22 日，里根签署《税制改革法案》· 白宫新闻照片 · 公有领域" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1986—2017 · 降税</Kicker></div>
            <div style={{ marginTop: 14, ...t }}><Title size={46}>46% → 34% → 21%</Title></div>
            <div style={{ marginTop: 20, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                1986 年，美国税改把公司税率从 46% 降到 34%；
                2017 年《减税与就业法案》又降到 21%。全球进入降税竞争。
              </Body>
              <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
                注：图为 1986 年税改签署；2017 年税改为后续事件。
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 08 税收竞争 */
export const X8Competition: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(22, 18);
  return (
    <Scene duration={440}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>2000—2024 · 税收竞争</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={50}>全球公司税率，一路向下</Title></div>
        <div style={{ display: "flex", gap: 50, marginTop: 36, alignItems: "center" }}>
          <div style={{ flex: 1, ...rows }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 30, height: 300 }}>
              {[
                { y: "2000", v: 32, l: "约 32%" },
                { y: "2024", v: 21.5, l: "约 21.5%" },
              ].map((x) => (
                <div key={x.y} style={{ flex: 1 }}>
                  <div style={{ height: x.v * 7, background: "linear-gradient(180deg, rgba(228,180,92,0.85), rgba(228,180,92,0.2))", borderRadius: 8 }} />
                  <div style={{ marginTop: 12, fontFamily: FONT_NUM, fontSize: 28, color: COLORS.muted }}>{x.y}</div>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 32, color: COLORS.gold }}>{x.l}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 20, color: COLORS.dim }}>OECD 平均法定公司税率</div>
          </div>
          <div style={{ flex: 1 }}>
            <Body size={24} style={{ lineHeight: 1.9 }}>
              爱尔兰 12.5%、新加坡 17%，成为跨国公司的落点。
              税率竞争压低企业税负，也侵蚀了各国税基。
            </Body>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 09 全球最低税 */
export const X9PillarTwo: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(38, 18);
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 56, height: "100%", alignItems: "center" }}>
          <Photo src="hist-assets/g20.jpg" width={540} caption="2021 年 G20 罗马峰会 · Wikimedia Commons · CC BY 2.5 ar" />
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>2015—2024 · 全球最低税</Kicker></div>
            <div style={{ marginTop: 12, ...t }}><Title size={44}>15%，给税收竞争设下限</Title></div>
            <div style={{ marginTop: 18, ...body }}>
              <Body size={24} style={{ lineHeight: 1.9 }}>
                2015 年 OECD 推出 BEPS 方案；2021 年，130 多个国家同意
                15% 全球最低企业税（支柱二），2024 年起陆续实施。
              </Body>
              <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
                适用于大型跨国企业集团，具体规则各国立法落地。
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 10 结尾 */
export const X10End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结 · 下一期中国</Kicker></div>
        <div style={{ marginTop: 20, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, lineHeight: 1.8 }}>
            从 1799 年的战争税单，到 15% 的全球最低税——
            企业所得税一直在「效率」与「公平」之间找平衡。
          </div>
          <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            下一期：企业所得税在中国的故事
          </div>
          <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料与图片：Wikipedia（Corporate tax、United Kingdom corporation tax 等词条）、Wikimedia Commons、
            美国国家档案馆、白宫新闻照片。图片授权见画面标注；内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
