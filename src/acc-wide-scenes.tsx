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
  NumTicker,
  Panel,
  Scene,
  Seal,
  Title,
  useEnter,
} from "./components";

const PAD: React.CSSProperties = { padding: "90px 110px" };

const Frame: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ border: "1px solid rgba(228,180,92,0.4)", borderRadius: 10, background: "rgba(248,243,233,0.05)", padding: 10, boxShadow: "0 30px 80px rgba(0,0,0,0.55)", ...style }}>{children}</div>
);

/* 01 片头 */
export const W1Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(26, 18);
  return (
    <Scene duration={180}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <Kicker>新列报准则 · 逐项拆解</Kicker>
        <div style={{ marginTop: 36, fontFamily: FONT_SANS, fontSize: 110, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          新利润表，
        </div>
        <div style={{ fontFamily: FONT_SANS, fontSize: 110, fontWeight: 700, color: COLORS.goldSoft, letterSpacing: 4, opacity: t }}>
          新增了哪些项目？
        </div>
        <div style={{ marginTop: 46, ...sub, fontFamily: FONT_SANS, fontSize: 32, color: COLORS.muted, letterSpacing: 2 }}>
          财政部 财办会〔2025〕51号 附件2 · 一般企业利润表（修订征求意见稿）
        </div>
        <div style={{ position: "absolute", right: 150, bottom: 120, ...sub }}>
          <Seal char="表" size={120} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02 原表展示 */
export const W2Original: React.FC = () => {
  const t = useEnter(4, 24);
  const img = useEnter(20, 26);
  const notes = useEnter(44, 18);
  return (
    <Scene duration={330}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>先看原表 · 附件2</Kicker></div>
        <div style={{ marginTop: 18, ...t }}>
          <Title size={54}>一般企业利润表（修订征求意见稿）</Title>
        </div>
        <div style={{ display: "flex", gap: 46, marginTop: 26, alignItems: "flex-start" }}>
          <div style={{ ...img }}>
            <Frame style={{ padding: 8, width: 570 }}>
              <Img src={staticFile("acc-assets/statement-table.jpg")} style={{ width: "100%", maxHeight: 770, objectFit: "contain", display: "block", borderRadius: 3 }} />
            </Frame>
            <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 19, color: COLORS.dim }}>
              财政部 财办会〔2025〕51号 附件2 · 第2页
            </div>
          </div>
          <div style={{ flex: 1, paddingTop: 10, ...notes }}>
            {[
              { k: "五类", v: "经营 / 投资 / 筹资 / 所得税费用 / 终止经营" },
              { k: "三个新小计", v: "经营利润、经营及投资利润、持续经营利润总额" },
              { k: "拆分", v: "财务费用拆为利息收入、利息费用、其他筹资类费用" },
              { k: "取消", v: "营业外收入 / 营业外支出不再单列" },
            ].map((x) => (
              <div key={x.k} style={{ display: "flex", gap: 22, padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ width: 150, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold, flexShrink: 0 }}>{x.k}</span>
                <span style={{ fontFamily: FONT_SANS, fontSize: 27, color: COLORS.ink, lineHeight: 1.5 }}>{x.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 22, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
              注：正式准则（财会〔2026〕11号）已发布，配套正式格式待财政部另行发布。
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 通用：类别逐项拆解 */
type WItem = { name: string; def: string; impact: string; tag?: string };

const CategoryScene: React.FC<{
  kicker: string;
  title: string;
  items: WItem[];
  perItem?: number;
  accent?: string;
}> = ({ kicker, title, items, perItem = 120, accent = COLORS.gold }) => {
  const frame = useCurrentFrame();
  const lead = 46;
  const idx = Math.min(items.length - 1, Math.max(0, Math.floor((frame - lead) / perItem)));
  const active = items[idx];
  const e = useEnter(4, 22);
  return (
    <Scene duration={400}>
      <AbsoluteFill style={PAD}>
        <div style={e}><Kicker>{kicker}</Kicker></div>
        <div style={{ marginTop: 14, ...e }}>
          <Title size={50}>{title}</Title>
        </div>
        <div style={{ display: "flex", gap: 40, marginTop: 24, height: 700 }}>
          <div style={{ width: 780, display: "flex", flexDirection: "column", gap: 9 }}>
            {items.map((it, i) => {
              const on = i === idx;
              const appear = spring({ frame: frame - (lead + i * perItem), fps: 30, config: { damping: 200 }, durationInFrames: 18 });
              return (
                <div
                  key={it.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 18px",
                    border: "1px solid " + (on ? accent : "rgba(255,255,255,0.08)"),
                    borderRadius: 10,
                    background: on ? "rgba(228,180,92,0.10)" : "rgba(255,255,255,0.015)",
                    opacity: appear,
                    transform: "translateX(" + (1 - appear) * -18 + "px)",
                  }}
                >
                  <span style={{ fontFamily: FONT_NUM, fontSize: 20, color: on ? accent : COLORS.dim, width: 34 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontFamily: FONT_SANS, fontSize: 29, color: on ? COLORS.ink : COLORS.muted, fontWeight: on ? 700 : 400 }}>
                    {it.name}
                  </span>
                  {it.tag ? (
                    <span style={{ marginLeft: "auto", padding: "3px 10px", border: "1px solid " + (on ? accent : "rgba(255,255,255,0.15)"), borderRadius: 999, fontFamily: FONT_SANS, fontSize: 16, color: on ? accent : COLORS.dim }}>
                      {it.tag}
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1 }}>
            <Panel style={{ height: "100%", padding: "34px 40px", borderColor: "rgba(228,180,92,0.4)" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: accent, letterSpacing: 5 }}>项目 {String(idx + 1).padStart(2, "0")}</div>
              <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 46, fontWeight: 700, color: COLORS.ink }}>{active.name}</div>
              <div style={{ marginTop: 28, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.gold, letterSpacing: 3 }}>是什么</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, lineHeight: 1.7 }}>{active.def}</div>
              <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.redSoft, letterSpacing: 3 }}>影响</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink, lineHeight: 1.7 }}>{active.impact}</div>
            </Panel>
          </div>
        </div>
        <div style={{ position: "absolute", left: 110, bottom: 40, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.dim }}>
          依据：财办会〔2025〕51号 附件2《一般企业利润表的列报格式和列报方法（修订征求意见稿）》
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

const OP_ITEMS: WItem[] = [
  { name: "其他经营类收益", tag: "新增", def: "经营类别中除收入、成本、费用、减值、资产处置收益之外的收益，承接原营业外收支中与经营相关、偶发或杂项的损益。", impact: "原来一律塞进「营业外」的项目，要逐笔判断业务性质后再归类，不能再做「垃圾桶」。", },
  { name: "经营类信用减值损失", tag: "拆分", def: "应收款项、合同资产等经营资产计提的信用减值损失。", impact: "与投资类信用减值损失分开列示，减值明细要能按资产类别拆分。", },
  { name: "经营类资产减值损失", tag: "拆分", def: "存货、固定资产等经营资产计提的资产减值损失。", impact: "企业需按经营/投资类别拆分减值计提与转回。", },
  { name: "经营利润", tag: "新增小计", def: "经营类别全部损益的合计，用来衡量企业主营业务的「造血能力」。", impact: "替代旧「营业利润」成为核心经营指标，投资者分析和内部考核口径都要跟着调整。", },
];

const INV_ITEMS: WItem[] = [
  { name: "利息收入", tag: "拆分", def: "从「财务费用」中拆出，反映现金及现金等价物等特定资产产生的利息收入，一般归入投资类别；以投资为主业的企业可归经营。", impact: "财务费用不再是一个净额概念，利息收入、利息费用要分别分析。", },
  { name: "投资类公允价值变动收益", tag: "拆分", def: "联营合营、现金等价物等特定资产产生的公允价值变动损益。", impact: "公允价值变动收益要按资产类别拆成经营类、投资类。", },
  { name: "投资类出租收入", tag: "新增", def: "投资性房地产等特定资产出租产生的收入。", impact: "原来计入「其他业务收入」的出租收入，要重分类到投资类别。", },
  { name: "投资类出租成本", tag: "新增", def: "上述出租资产对应的成本。", impact: "其他业务成本要按资产类别拆分，出租业务的毛利更清晰。", },
  { name: "投资类信用减值损失", tag: "新增", def: "特定资产（如应收融资租赁款等）计提的信用减值损失。", impact: "与经营类减值分开，便于判断投资资产质量。", },
  { name: "投资类资产减值损失", tag: "新增", def: "特定资产计提的资产减值损失。", impact: "减值信息更细分，投资类资产的风险更透明。", },
  { name: "其他投资类收益", tag: "新增", def: "投资类别中除上述项目外的其他收益，起兜底列示作用。", impact: "企业需要建立投资类损益的归集规则，避免随意归类。", },
  { name: "经营及投资利润", tag: "新增小计", def: "经营类别与投资类别合计，即「筹资和所得税前利润」。", impact: "新增核心分析指标，接近 EBIT，但口径要按准则定义理解。", },
];

const FIN_ITEMS: WItem[] = [
  { name: "利息费用", tag: "拆分", def: "从「财务费用」拆出，纯筹资交易负债产生的利息费用。", impact: "利息保障倍数等指标口径要调整，融资成本更直观。", },
  { name: "其他筹资类费用", tag: "新增", def: "筹资类别中除利息费用外的其他费用，如相关手续费等。", impact: "需要识别并归集筹资相关交易费用。", },
  { name: "持续经营利润总额", tag: "新增小计", def: "经营、投资、筹资三类合计（所得税前），替代原「利润总额」的持续经营部分。", impact: "旧「利润总额」拆成持续经营+终止经营，做同比分析要重述。", },
];

export const W3Operation: React.FC<{ perItem?: number }> = ({ perItem }) => (
  <CategoryScene kicker="01 经营类别 · 逐项" title="主业相关，四个新增/拆分项目" items={OP_ITEMS} perItem={perItem} />
);
export const W4Investment: React.FC<{ perItem?: number }> = ({ perItem }) => (
  <CategoryScene kicker="02 投资类别 · 逐项" title="投资相关，新增最多的一组项目" items={INV_ITEMS} perItem={perItem} />
);
export const W5Financing: React.FC<{ perItem?: number }> = ({ perItem }) => (
  <CategoryScene kicker="03 筹资类别 · 逐项" title="融资相关，三个新增项目" items={FIN_ITEMS} perItem={perItem} />
);

/* 06 结构变化 */
export const W6Structure: React.FC = () => {
  const t = useEnter(4, 22);
  const rows = useEnter(20, 18);
  const data = [
    { o: "营业利润", n: "经营利润 + 经营及投资利润", tag: "重构" },
    { o: "利润总额", n: "持续经营利润总额 + 终止经营净利润", tag: "改列示" },
    { o: "营业外收入 / 支出", n: "取消单列，归入经营类别", tag: "删除" },
    { o: "财务费用", n: "利息收入 / 利息费用 / 其他筹资类费用", tag: "拆分" },
    { o: "净利润", n: "净利润（金额不变）", tag: "不变" },
  ];
  return (
    <Scene duration={340}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>结构变化 · 一张表看完</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={54}>旧项目，都去哪了？</Title></div>
        <div style={{ marginTop: 34, ...rows }}>
          {data.map((r) => (
            <div key={r.o} style={{ display: "flex", alignItems: "center", gap: 20, padding: "14px 20px", marginBottom: 10, border: "1px solid rgba(228,180,92,0.22)", borderRadius: 10, background: "rgba(255,255,255,0.02)" }}>
              <span style={{ width: 320, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.dim, textDecoration: "line-through", textDecorationColor: "rgba(196,71,58,0.6)" }}>{r.o}</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 22, color: COLORS.gold }}>→</span>
              <span style={{ flex: 1, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink }}>{r.n}</span>
              <span style={{ padding: "4px 12px", border: "1px solid rgba(196,71,58,0.5)", borderRadius: 999, fontFamily: FONT_SANS, fontSize: 18, color: COLORS.redSoft }}>{r.tag}</span>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 07 影响 */
export const W7Impact: React.FC = () => {
  const t = useEnter(4, 22);
  const cards = useEnter(22, 18);
  return (
    <Scene duration={330}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>影响 · 财务人要做什么</Kicker></div>
        <div style={{ marginTop: 16, ...t }}><Title size={54}>三个直接影响</Title></div>
        <div style={{ display: "flex", gap: 26, marginTop: 46, ...cards }}>
          {[
            { k: "分析口径", v: "经营利润、经营及投资利润、持续经营利润总额成为新的分析指标；旧「营业利润/利润总额」不可直接沿用。" },
            { k: "系统与科目", v: "损益类科目要按经营/投资/筹资打标签，辅助核算、合并抵销、报表取数都要改。" },
            { k: "时间表", v: "境外上市 2027、其他境内上市 2029、非上市 2030；可提前执行。" },
          ].map((x) => (
            <Panel key={x.k} style={{ flex: 1, padding: "30px 32px" }}>
              <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.gold, letterSpacing: 3 }}>{x.k}</div>
              <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.ink, lineHeight: 1.8 }}>{x.v}</div>
            </Panel>
          ))}
        </div>
        <div style={{ marginTop: 34, ...cards, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>
          一句话：净利润不变，但「怎么摆、怎么读、怎么算」都变了。
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 08 结尾 */
export const W8End: React.FC = () => {
  const t = useEnter(4, 20);
  const body = useEnter(24, 18);
  return (
    <Scene duration={300}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>资料来源与说明</Kicker></div>
        <div style={{ marginTop: 24, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, lineHeight: 1.9 }}>
            财政部《企业会计准则第30号——财务报表列报》（财会〔2026〕11号）；
            《一般企业利润表的列报格式和列报方法（修订征求意见稿）》（财办会〔2025〕51号 附件2）；
            《会计科目和主要账务处理（修订征求意见稿）》（财办会〔2026〕35号）。
          </div>
          <div style={{ marginTop: 24, padding: "18px 24px", border: "1px solid rgba(196,71,58,0.45)", borderRadius: 12, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.redSoft, lineHeight: 1.7 }}>
            以上为征求意见稿口径，具体执行以财政部正式文件为准。内容仅供参考，不构成投资建议。
          </div>
        </div>
        <div style={{ position: "absolute", right: 150, bottom: 100, ...body }}>
          <Seal char="准" size={110} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
