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
import {
  Body,
  Chip,
  Kicker,
  Panel,
  Scene,
  Seal,
  Title,
  useEnter,
} from "./components";

const PAD: React.CSSProperties = { padding: "90px 110px" };

const PhotoCard: React.FC<{ src: string; width: number; caption: string; rotate?: number; delay?: number; sepia?: boolean }> = ({
  src,
  width,
  caption,
  rotate = 0,
  delay = 0,
  sepia = false,
}) => {
  const e = useEnter(delay, 26);
  return (
    <div style={{ ...e, width }}>
      <div style={{ padding: 10, border: "1px solid rgba(228,180,92,0.4)", borderRadius: 8, background: "rgba(248,243,233,0.06)", boxShadow: "0 28px 70px rgba(0,0,0,0.6)", transform: "rotate(" + rotate + "deg)" }}>
        <Img src={staticFile(src)} style={{ width: "100%", display: "block", borderRadius: 3, filter: sepia ? "sepia(0.25) contrast(1.05)" : undefined }} />
      </div>
      <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.dim, lineHeight: 1.5 }}>{caption}</div>
    </div>
  );
};

/* 01 钩子 */
export const V1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(24, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>增值税 · 国外篇</Kicker>
        <div style={{ marginTop: 30, fontFamily: FONT_SANS, fontSize: 100, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          增值税，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 100, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          不是中国发明的
        </div>
        <div style={{ marginTop: 36, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted, letterSpacing: 2 }}>
          从 1918 年西门子的设想，到 1954 年法国的落地，再到全球 160 多个国家
        </div>
        <div style={{ position: "absolute", right: 160, bottom: 120, ...sub }}>
          <Seal char="税" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02 前史：周转税 */
export const V2Turnover: React.FC = () => {
  const t = useEnter(4, 24);
  const chain = useEnter(22, 20);
  const cmp = useEnter(56, 18);
  const box = (label: string, value: string, tax: string) => (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: 210, height: 130, border: "1px solid rgba(228,180,92,0.35)", borderRadius: 12, background: "rgba(255,255,255,0.03)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6 }}>
        <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>{label}</div>
        <div style={{ fontFamily: FONT_NUM, fontSize: 42, color: COLORS.ink, fontWeight: 700 }}>{value}</div>
      </div>
      <div style={{ marginTop: 12, fontFamily: FONT_NUM, fontSize: 30, color: COLORS.gold }}>税 {tax}</div>
    </div>
  );
  return (
    <Scene duration={300}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>前史 · 周转税</Kicker></div>
        <div style={{ marginTop: 18, ...t }}><Title size={56}>在增值税之前，每道环节都全额征税</Title></div>
        <div style={{ display: "flex", gap: 22, marginTop: 40, alignItems: "flex-start", ...chain }}>
          {box("原料商", "100 元", "10")}
          <div style={{ paddingTop: 50, fontFamily: FONT_NUM, fontSize: 32, color: COLORS.dim }}>→</div>
          {box("加工厂", "200 元", "20")}
          <div style={{ paddingTop: 50, fontFamily: FONT_NUM, fontSize: 32, color: COLORS.dim }}>→</div>
          {box("零售商", "300 元", "30")}
        </div>
        <div style={{ display: "flex", gap: 30, marginTop: 40, ...cmp }}>
          <Panel style={{ flex: 1, padding: "26px 30px", borderColor: "rgba(196,71,58,0.5)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.redSoft }}>全额征税 · 合计 60 元</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>其中 30 元是重复征收，环节越多越重</div>
          </Panel>
          <Panel style={{ flex: 1, padding: "26px 30px", borderColor: "rgba(228,180,92,0.45)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold }}>只对增值额征税 · 合计 30 元</div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>这就是增值税要解决的问题</div>
          </Panel>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 03 1918 西门子 */
export const V3Siemens: React.FC = () => {
  const t = useEnter(4, 22);
  const img = useEnter(20, 22);
  const body = useEnter(40, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 70, height: "100%", alignItems: "center" }}>
          <div style={{ ...img }}>
            <PhotoCard src="hist-assets/siemens.jpg" width={460} caption="格奥尔格·冯·西门子（Georg Wilhelm von Siemens）· Wikimedia Commons · 公有领域" sepia />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1918 · 德国</Kicker></div>
            <div style={{ marginTop: 16, ...t, fontFamily: FONT_NUM, fontSize: 150, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1918</div>
            <div style={{ marginTop: 8, ...t }}><Title size={56}>西门子的设想</Title></div>
            <div style={{ marginTop: 24, ...body }}>
              <Body size={28} style={{ lineHeight: 1.9 }}>
                德国工业家格奥尔格·冯·西门子提出：只对每个环节新增的价值征税，
                上一环节已经缴过的税可以抵扣，用来替代层层重复征税的周转税。
              </Body>
              <div style={{ marginTop: 20, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.redSoft }}>
                但德国直到 1968 年，才用增值税取代旧的周转税。
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 04 1954 法国/洛雷 */
export const V4Laure: React.FC = () => {
  const t = useEnter(4, 22);
  const img = useEnter(18, 22);
  const body = useEnter(46, 18);
  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", gap: 60, height: "100%", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 22, ...img }}>
            <PhotoCard src="hist-assets/laure.png" width={300} caption="莫里斯·洛雷（Maurice Lauré）· Wikimedia Commons · CC BY 4.0" />
            <PhotoCard src="assets/crop-france1954.jpg" width={360} caption="法国国家档案馆 · 1954 年增值税立法页" rotate={1.2} delay={10} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={t}><Kicker>1954 · 法国</Kicker></div>
            <div style={{ marginTop: 14, ...t, fontFamily: FONT_NUM, fontSize: 140, fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>1954</div>
            <div style={{ marginTop: 8, ...t }}><Title size={52}>洛雷与 TVA</Title></div>
            <div style={{ marginTop: 22, ...body }}>
              <Body size={26} style={{ lineHeight: 1.9 }}>
                1954 年 4 月 10 日，法国税务官员莫里斯·洛雷在法属象牙海岸率先落地增值税；
                试点成功后，法国 1958 年在本土推行，先覆盖大企业，再逐步扩到所有行业。
              </Body>
              <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.goldSoft }}>
                这就是现代增值税的起点。
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 05 欧洲扩散 1957-1973 */
export const V5Europe: React.FC = () => {
  const t = useEnter(4, 22);
  const img = useEnter(20, 24);
  const rows = useEnter(44, 16);
  const data = [
    { y: "1957", d: "《罗马条约》建立欧洲经济共同体" },
    { y: "1962", d: "纽马克报告：法国增值税是最优方案" },
    { y: "1967", d: "欧共体连发两道增值税指令，成员国跟进" },
    { y: "1973", d: "英国加入欧共体，VAT 取代 Purchase Tax" },
  ];
  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>1957—1973 · 欧洲</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>从法国经验，到欧洲标准</Title></div>
        <div style={{ display: "flex", gap: 54, marginTop: 30 }}>
          <div style={{ ...img }}>
            <PhotoCard src="hist-assets/rome.jpg" width={560} caption="1957 年《罗马条约》签署 · 德国联邦档案馆 · CC BY-SA 3.0 de" sepia />
          </div>
          <div style={{ flex: 1, ...rows }}>
            {data.map((x) => (
              <div key={x.y} style={{ display: "flex", gap: 20, alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 38, color: COLORS.gold, width: 110 }}>{x.y}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink, lineHeight: 1.5 }}>{x.d}</span>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06 全球扩散 */
export const V6Global: React.FC = () => {
  const t = useEnter(4, 22);
  const img = useEnter(18, 24);
  const rows = useEnter(44, 16);
  const data = [
    { y: "1989", c: "日本", d: "消费税，从 3% 起步" },
    { y: "1991", c: "加拿大", d: "GST 推出" },
    { y: "2000", c: "澳大利亚", d: "GST 推出" },
    { y: "2017", c: "印度", d: "全国统一 GST" },
  ];
  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>1989—2017 · 全球</Kicker></div>
        <div style={{ marginTop: 14, ...t }}><Title size={52}>一个税种，走向 160 多个国家</Title></div>
        <div style={{ display: "flex", gap: 50, marginTop: 28, alignItems: "center" }}>
          <div style={{ ...img }}>
            <PhotoCard src="hist-assets/vatmap.png" width={720} caption="全球增值税分布：红色为已开征（含 GST/消费税等增值税型税种），蓝色为未开征 · Wikimedia Commons · CC BY-SA 4.0" />
          </div>
          <div style={{ flex: 1, ...rows }}>
            {data.map((x) => (
              <div key={x.y} style={{ display: "flex", gap: 16, alignItems: "baseline", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold, width: 100 }}>{x.y}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.ink, width: 112 }}>{x.c}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>{x.d}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
              今天：160 多个国家和地区采用增值税
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 07 为什么扩散 */
export const V7Why: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(22, 18);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>为什么能扩散</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={54}>四个原因</Title></div>
        <div style={{ display: "flex", gap: 24, marginTop: 44, ...cards }}>
          {[
            { k: "中性", v: "链条抵扣，不惩罚专业化，市场分工不被税制扭曲。" },
            { k: "财政收入", v: "税基宽、覆盖广，经济越发展，收入越稳定。" },
            { k: "国际趋同", v: "欧盟要求成员国建立增值税，转型国家对接国际规则。" },
            { k: "可操作性", v: "发票抵扣、自我申报，征管链条相对清晰。" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold, letterSpacing: 3 }}>{x.k}</div>
              <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 23, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 28, ...cards, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>
          对政府是「钱袋子」，对市场是「中性税」——这是它流行的底层逻辑。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 08 代价与争议 */
export const V8Costs: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(20, 18);
  return (
    <Scene duration={420}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>代价与争议</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={54}>不是完美的税</Title></div>
        <div style={{ display: "flex", gap: 26, marginTop: 44, ...cards }}>
          {[
            { k: "累退性", v: "低收入者消费占比高，税负占收入比重可能更高；要靠低税率、补贴来缓解。" },
            { k: "骗税与欺诈", v: "出口零税率和退税机制，滋生虚开、骗税，欧洲的「旋转木马」欺诈是典型。" },
            { k: "合规成本", v: "发票、申报、留抵，对中小企业是不小的负担；征管能力决定制度效果。" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "28px 30px", borderColor: "rgba(196,71,58,0.35)" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.redSoft, letterSpacing: 3 }}>{x.k}</div>
              <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 23, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 09 结尾 */
export const V9End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(24, 18);
  return (
    <Scene duration={320}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>小结 · 下一期中国篇</Kicker></div>
        <div style={{ marginTop: 22, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.ink, lineHeight: 1.8 }}>
            从西门子的设想，到洛雷的试验，再到全球 160 多个国家——
            增值税用七十年，改写了现代税制。
          </div>
          <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.goldSoft }}>
            下一期：增值税在中国的故事（1979—2026）
          </div>
          <div style={{ marginTop: 30, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim, lineHeight: 1.7 }}>
            资料与图片：Wikipedia（Value-added tax、Maurice Lauré 等词条）、Wikimedia Commons、
            德国联邦档案馆、法国国家档案馆。图片授权见画面标注；内容仅供参考。
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02b 抵扣机制 */
export const V2bMechanism: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>它怎么运转</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={54}>销项减进项，发票串起整条链</Title></div>
        <div style={{ display: "flex", gap: 26, marginTop: 40, ...rows }}>
          {[
            { k: "卖出", v: "收取销项税 130", d: "按销售额 × 税率" },
            { k: "买进", v: "支付进项税 100", d: "凭发票抵扣" },
            { k: "应缴", v: "130 − 100 = 30", d: "差额交给政府" },
          ].map((x, i) => (
            <Panel key={x.k} style={{ flex: 1, padding: "30px 32px", borderColor: i === 2 ? "rgba(228,180,92,0.55)" : undefined }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold, letterSpacing: 3 }}>{x.k}</div>
              <div style={{ marginTop: 12, fontFamily: FONT_NUM, fontSize: 44, color: COLORS.ink, fontWeight: 700 }}>{x.v}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.muted }}>{x.d}</div>
            </Panel>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 34, alignItems: "center" }}>
          <Body size={26} style={{ flex: 1 }}>
            每个环节只缴自己新增的部分，最终由消费者承担全部税款，企业只是代收代缴的通道。
          </Body>
          <PhotoCard src="hist-assets/receipt.jpg" width={260} caption="意大利超市小票，逐项标注 IVA（增值税）· Wikimedia Commons · CC BY-SA 4.0" delay={30} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06b 美国例外 */
export const V6bUS: React.FC = () => {
  const t = useEnter(4, 22);
  const body = useEnter(24, 18);
  return (
    <Scene duration={330}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>例外 · 美国</Kicker></div>
        <div style={{ marginTop: 18, ...t }}><Title size={64}>美国，没有联邦增值税</Title></div>
        <div style={{ marginTop: 26, ...body }}>
          <Body size={30} style={{ lineHeight: 1.9 }}>
            美国至今没有全国统一的增值税，只有州级销售税。
            历届政府讨论过增值税，但担心累退性、税负透明度和征管成本，始终没有落地。
          </Body>
        </div>
        <div style={{ marginTop: 30, display: "flex", gap: 18 }}>
          {["联邦层面：无 VAT", "州级：销售税 Sales Tax", "讨论：多次提出，未立法"].map((s) => (
            <Chip key={s} style={{ fontSize: 24 }}>{s}</Chip>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06c 税率差异 */
export const V6cRates: React.FC = () => {
  const t = useEnter(4, 22);
  const bars = useEnter(20, 18);
  const data = [
    { c: "匈牙利", r: 27 },
    { c: "欧盟最低标准", r: 15 },
    { c: "日本", r: 10 },
    { c: "澳大利亚", r: 10 },
    { c: "加拿大 GST", r: 5 },
  ];
  return (
    <Scene duration={330}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>税率差异</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={54}>同样是增值税，税率差很多</Title></div>
        <div style={{ marginTop: 36, ...bars }}>
          {data.map((x) => (
            <div key={x.c} style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 16 }}>
              <span style={{ width: 220, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>{x.c}</span>
              <div style={{ flex: 1, height: 26, background: "rgba(255,255,255,0.05)", borderRadius: 6 }}>
                <div style={{ width: (x.r / 27) * 100 + "%", height: "100%", background: "linear-gradient(90deg, rgba(228,180,92,0.5), " + COLORS.gold + ")", borderRadius: 6 }} />
              </div>
              <span style={{ width: 80, textAlign: "right", fontFamily: FONT_NUM, fontSize: 34, color: COLORS.gold }}>{x.r}%</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>
          税率高低，反映财政需求、社会保障和税制结构的选择。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
