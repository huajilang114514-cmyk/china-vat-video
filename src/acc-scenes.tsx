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
  Divider,
  Kicker,
  NumTicker,
  Panel,
  Scene,
  Seal,
  Title,
  useEnter,
} from "./components";

const PAD: React.CSSProperties = { padding: "150px 80px 100px" };
const W = 1080;

const DocCard: React.FC<{ src: string; caption: string; width: number; rotate?: number; delay?: number }> = ({
  src,
  caption,
  width,
  rotate = 0,
  delay = 0,
}) => {
  const e = useEnter(delay, 26);
  return (
    <div style={{ ...e, width }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 26, height: 2, backgroundColor: COLORS.gold }} />
        <span style={{ fontFamily: FONT_SANS, fontSize: 20, letterSpacing: 5, color: COLORS.gold }}>官方文件</span>
      </div>
      <div style={{ padding: 10, border: "1px solid rgba(228,180,92,0.45)", borderRadius: 10, background: "rgba(248,243,233,0.06)", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", transform: "rotate(" + rotate + "deg)" }}>
        <div style={{ background: "#fff", borderRadius: 3, overflow: "hidden" }}>
          <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
        </div>
      </div>
      <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 20, lineHeight: 1.5, color: COLORS.dim }}>{caption}</div>
    </div>
  );
};

/* 01 钩子 */
export const A1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 200 }, durationInFrames: 26 });
  const sub = useEnter(34, 20);
  return (
    <Scene duration={150}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <Kicker>会计人必看 · 2026 新准则</Kicker>
        <div style={{ marginTop: 60, fontFamily: FONT_SANS, fontSize: 120, fontWeight: 700, color: COLORS.ink, letterSpacing: 4, opacity: t, transform: "translateY(" + (1 - t) * 40 + "px)" }}>
          营业外收支
        </div>
        <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 150, fontWeight: 700, color: COLORS.redSoft, letterSpacing: 6, opacity: t }}>
          要没了？
        </div>
        <div style={{ marginTop: 80, ...sub, fontFamily: FONT_SANS, fontSize: 44, color: COLORS.goldSoft, letterSpacing: 3 }}>
          别慌——不是取消科目
        </div>
        <div style={{ marginTop: 26, ...sub, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted, lineHeight: 1.6 }}>
          是利润表不再单列
          <br />
          财政部 财会〔2026〕11号
        </div>
        <div style={{ position: "absolute", right: 90, top: 260, ...sub }}>
          <Seal char="谣" size={110} rotate={8} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 02 文件与时间 */
export const A2Docs: React.FC = () => {
  const t = useEnter(4, 26);
  const rows = useEnter(28, 20);
  const card = useEnter(70, 24);
  return (
    <Scene duration={440}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>先看文件 · 再看时间</Kicker></div>
        <div style={{ marginTop: 30, ...t }}>
          <Title size={66}>一份准则，三档时间</Title>
        </div>
        <div style={{ marginTop: 44, ...rows }}>
          {[
            { y: "2027", d: "境外上市 / A+H", c: COLORS.gold },
            { y: "2029", d: "其他境内上市企业", c: COLORS.goldSoft },
            { y: "2030", d: "执行企业会计准则的非上市企业", c: COLORS.muted },
          ].map((x) => (
            <div key={x.y} style={{ display: "flex", alignItems: "center", gap: 26, padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <span style={{ fontFamily: FONT_NUM, fontSize: 58, fontWeight: 700, color: x.c, width: 170 }}>{x.y}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.ink }}>{x.d}</span>
            </div>
          ))}
          <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>
            允许符合条件的企业提前执行
          </div>
        </div>
        <div style={{ marginTop: 38, ...card }}>
          <DocCard src="acc-assets/crop-acc11.jpg" caption="《企业会计准则第30号——财务报表列报》财会〔2026〕11号" width={900} rotate={-0.4} delay={24} />
        </div>
        <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim }}>
          配套利润表格式将随后与资产负债表、现金流量表等格式一并发布
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 03 五分类 */
export const A3Five: React.FC = () => {
  const t = useEnter(4, 26);
  const cats = useEnter(24, 18);
  const subs = useEnter(90, 18);
  return (
    <Scene duration={430}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>变化一 · 利润表结构</Kicker></div>
        <div style={{ marginTop: 28, ...t }}>
          <Title size={62}>当期损益，强制五分类</Title>
        </div>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14, ...cats }}>
          {[
            { i: "01", n: "经营", d: "默认类别，主业损益都在这" },
            { i: "02", n: "投资", d: "联营合营、现金等价物等" },
            { i: "03", n: "筹资", d: "纯筹资负债、利息费用等" },
            { i: "04", n: "所得税费用", d: "单独一类" },
            { i: "05", n: "终止经营", d: "单独一类" },
          ].map((x) => (
            <div key={x.i} style={{ display: "flex", alignItems: "baseline", gap: 20, padding: "14px 24px", border: "1px solid rgba(228,180,92,0.25)", borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
              <span style={{ fontFamily: FONT_NUM, fontSize: 26, color: COLORS.gold }}>{x.i}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 40, fontWeight: 700, color: COLORS.ink, width: 210 }}>{x.n}</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted }}>{x.d}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 34, ...subs }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim, marginBottom: 14 }}>新增三个合计项</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {["经营利润", "经营及投资利润", "持续经营利润"].map((s) => (
              <Chip key={s} style={{ fontSize: 26, padding: "12px 26px" }}>{s}</Chip>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 44 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim, letterSpacing: 3 }}>新旧对比</div>
          <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 25, color: COLORS.muted, lineHeight: 1.9 }}>
            旧：营业利润 ± 营业外收支 = 利润总额
            <br />
            新：经营利润 → 经营及投资利润 → 持续经营利润 → 利润总额
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 04 新旧利润表对比 */
export const A4Compare: React.FC = () => {
  const t = useEnter(4, 24);
  const rows = useEnter(18, 16);
  const data = [
    { old: "营业收入 / 营业成本", neu: "经营收入 / 经营成本", tag: "更名" },
    { old: "财务费用", neu: "拆为 利息收入、利息费用", tag: "拆分" },
    { old: "其他收益 / 公允价值变动收益", neu: "按类别拆分（经营类 / 投资类）", tag: "重分类" },
    { old: "营业外收入 / 营业外支出", neu: "不再单列，归入经营类别", tag: "取消单列" },
    { old: "营业利润", neu: "经营利润 / 经营及投资利润 / 持续经营利润", tag: "重构" },
    { old: "利润总额", neu: "持续经营利润总额 + 终止经营净利润", tag: "改列示" },
  ];
  return (
    <Scene duration={430}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>对比 · 现行 vs 征求意见稿</Kicker></div>
        <div style={{ marginTop: 22, ...t }}>
          <Title size={54}>利润表，改了这些项目</Title>
        </div>
        <div style={{ marginTop: 30, ...rows }}>
          {data.map((r) => (
            <div
              key={r.old}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                marginBottom: 9,
                border: "1px solid rgba(228,180,92,0.22)",
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div style={{ width: 300, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim, textDecoration: "line-through", textDecorationColor: "rgba(196,71,58,0.65)", lineHeight: 1.35 }}>{r.old}</div>
              <div style={{ fontFamily: FONT_NUM, fontSize: 20, color: COLORS.gold }}>→</div>
              <div style={{ flex: 1, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.ink, lineHeight: 1.35 }}>{r.neu}</div>
              <div style={{ padding: "3px 10px", border: "1px solid rgba(196,71,58,0.5)", borderRadius: 999, fontFamily: FONT_SANS, fontSize: 17, color: COLORS.redSoft, whiteSpace: "nowrap" }}>{r.tag}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 19, color: COLORS.dim, lineHeight: 1.5 }}>
          一般企业利润表 · 财办会〔2025〕51号 附件 2（修订征求意见稿）
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 05 营业外收支真相 */
export const A5Truth: React.FC = () => {
  const t = useEnter(4, 26);
  const left = useEnter(28, 20);
  const right = useEnter(46, 20);
  const bottom = useEnter(86, 18);
  return (
    <Scene duration={450}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>变化二 · 营业外收支</Kicker></div>
        <div style={{ marginTop: 28, ...t }}>
          <Title size={60}>科目还在，只是不再单列</Title>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 48, ...left }}>
          <Panel style={{ flex: 1, padding: "34px 28px", borderColor: "rgba(228,180,92,0.5)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.gold, letterSpacing: 3 }}>会计科目</div>
            <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 46, color: COLORS.ink, fontWeight: 700 }}>仍然保留</div>
            <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, lineHeight: 1.6 }}>做账、记账逻辑不变</div>
          </Panel>
          <Panel style={{ flex: 1, padding: "34px 28px", borderColor: "rgba(196,71,58,0.5)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.redSoft, letterSpacing: 3 }}>利润表</div>
            <div style={{ marginTop: 14, fontFamily: FONT_SANS, fontSize: 46, color: COLORS.ink, fontWeight: 700 }}>不再单列</div>
            <div style={{ marginTop: 12, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, lineHeight: 1.6 }}>按业务实质归入 经营 / 投资 / 筹资</div>
          </Panel>
        </div>
        <div style={{ marginTop: 40, ...right, padding: "26px 30px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.muted, lineHeight: 1.7 }}>
            旧逻辑：营业利润 ± 营业外收支 = 利润总额
            <br />
            新逻辑：不区分"营业 / 非营业"，只按业务性质分五类
          </div>
        </div>
        <div style={{ marginTop: 34 }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.gold, letterSpacing: 4 }}>举例</div>
          <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, lineHeight: 1.9 }}>
            罚款、捐赠、资产报废 → 经营类别
            <br />
            对联营企业投资收益 → 投资类别 · 利息费用 → 筹资类别
          </div>
        </div>
        <div style={{ marginTop: 26, ...bottom, textAlign: "center" }}>
          <span style={{ fontFamily: FONT_SANS, fontSize: 40, color: COLORS.goldSoft, letterSpacing: 2 }}>净利润，一分不变</span>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 05 管理层业绩指标 */
export const A6MPM: React.FC = () => {
  const t = useEnter(4, 26);
  const chips = useEnter(26, 18);
  const body = useEnter(50, 20);
  return (
    <Scene duration={340}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>变化三 · 披露</Kicker></div>
        <div style={{ marginTop: 28, ...t }}>
          <Title size={62}>自创业绩指标，要见光了</Title>
        </div>
        <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 14, ...chips }}>
          {["核心利润", "调整后 EBITDA", "扣非净利润", "经调整净利润"].map((s) => (
            <Chip key={s} style={{ fontSize: 28, padding: "14px 26px" }}>{s}</Chip>
          ))}
        </div>
        <div style={{ marginTop: 40, ...body }}>
          <Body size={30} style={{ lineHeight: 1.8 }}>
            在财报外公开使用、但并非准则要求的损益类合计项目，
            要在附注中作为"管理层业绩指标"单独披露：
            说清定义、计算方式，并与准则指标调节。
          </Body>
        </div>
        <div style={{ marginTop: 36, padding: "24px 28px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.gold, letterSpacing: 3 }}>示例</div>
          <div style={{ marginTop: 10, fontFamily: FONT_SANS, fontSize: 27, color: COLORS.ink, lineHeight: 1.6 }}>
            调整后 EBITDA = 净利润 + 所得税 + 利息 + 折旧摊销
          </div>
          <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 21, color: COLORS.dim }}>
            附注要说明口径，并与准则指标调节
          </div>
        </div>
        <div style={{ marginTop: 26, ...body }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>目的：压缩选择性披露空间</div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 06 没变什么 + 科目 */
export const A7Unchanged: React.FC = () => {
  const t = useEnter(4, 26);
  const items = useEnter(24, 18);
  const card = useEnter(70, 22);
  return (
    <Scene duration={360}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>别被带节奏 · 这些没变</Kicker></div>
        <div style={{ marginTop: 28, ...t }}>
          <Title size={62}>确认计量没变，报表组成没变</Title>
        </div>
        <div style={{ marginTop: 40, ...items }}>
          {["会计确认与计量要求不变", "四表一注的报表组成不变", "资产负债表、现金流量表改动很小", "净利润金额不变"].map((s) => (
            <div key={s} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ color: COLORS.gold, fontFamily: FONT_SANS, fontSize: 34 }}>✓</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 30, color: COLORS.ink }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, ...items, display: "flex", alignItems: "baseline", gap: 18 }}>
          <span style={{ fontFamily: FONT_NUM, fontSize: 72, fontWeight: 700, color: COLORS.goldSoft }}>194</span>
          <span style={{ fontFamily: FONT_SANS, fontSize: 27, color: COLORS.muted }}>个一级科目（征求意见稿）</span>
        </div>
        <div style={{ marginTop: 16, ...card }}>
          <DocCard src="acc-assets/crop-acc35.jpg" caption="财办会〔2026〕35号：会计科目修订征求意见稿（2026-10-30 截止）" width={840} rotate={0.4} delay={16} />
        </div>
      </AbsoluteFill>
    </Scene>
  );
};

/* 07 结尾 */
export const A8End: React.FC = () => {
  const t = useEnter(4, 24);
  const sum = useEnter(26, 22);
  const note = useEnter(60, 18);
  return (
    <Scene duration={380}>
      <AbsoluteFill style={{ ...PAD, justifyContent: "center" }}>
        <div style={t}><Kicker>一句话总结</Kicker></div>
        <div style={{ marginTop: 34, ...sum }}>
          <Title size={64} style={{ lineHeight: 1.5 }}>
            不是取消营业外收支，
            <br />
            是利润表换了分类逻辑
          </Title>
        </div>
        <div style={{ marginTop: 50, ...note }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, lineHeight: 1.9 }}>
            资料来源：财政部《企业会计准则第30号——财务报表列报》（财会〔2026〕11号）、
            《会计科目和主要账务处理（修订征求意见稿）》（财办会〔2026〕35号）、
            财办会〔2025〕51号征求意见函及答记者问。
          </div>
          <div style={{ marginTop: 26, padding: "20px 24px", border: "1px solid rgba(196,71,58,0.45)", borderRadius: 12, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.redSoft, lineHeight: 1.7 }}>
            内容为专业知识分享，仅供参考，不构成投资建议；
            具体执行以财政部正式文件为准。
          </div>
          <div style={{ marginTop: 40, textAlign: "center", fontFamily: FONT_SANS, fontSize: 34, color: COLORS.gold, letterSpacing: 2 }}>
            关注我，看懂准则变化
          </div>
        </div>
      </AbsoluteFill>
    </Scene>
  );
};
