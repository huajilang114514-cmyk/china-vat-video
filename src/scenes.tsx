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
  Ghost,
  Kicker,
  NumTicker,
  Panel,
  Scene,
  Seal,
  Title,
  useEnter,
} from "./components";

const PAD: React.CSSProperties = { padding: "120px 140px" };

/* 文献卡片：真实截图 + 出处 */
const DocCard: React.FC<{
  src: string;
  caption: string;
  width: number;
  rotate?: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ src, caption, width, rotate = 0, delay = 0, style }) => {
  const e = useEnter(delay, 30);
  return (
    <div style={{ ...e, ...style }}>
      <div
        style={{
          width,
          border: "1px solid rgba(228,180,92,0.4)",
          boxShadow: "0 34px 90px rgba(0,0,0,0.6)",
          transform: "rotate(" + rotate + "deg)",
          overflow: "hidden",
          borderRadius: 4,
          background: "#fff",
        }}
      >
        <Img src={staticFile(src)} style={{ width: "100%", display: "block" }} />
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: FONT_SANS,
          fontSize: 22,
          color: COLORS.dim,
          letterSpacing: 1,
          maxWidth: width,
          lineHeight: 1.5,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

/* 01 片头 */
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 12, fps, config: { damping: 200 }, durationInFrames: 34 });
  const sub = useEnter(34, 18);
  const data = useEnter(52, 18);

  return (
    <Scene duration={300}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", height: "100%", alignItems: "center", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <Kicker>CHINA VAT · 1979 — 2026</Kicker>
            <div
              style={{
                marginTop: 34,
                fontFamily: FONT_SANS,
                fontSize: 170,
                fontWeight: 700,
                letterSpacing: 12,
                lineHeight: 1,
                background: "linear-gradient(180deg, #FBEFD6 8%, #E4B45C 62%, #B9823A 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                opacity: t,
                transform: "translateY(" + (1 - t) * 40 + "px) scale(" + (0.94 + t * 0.06) + ")",
              }}
            >
              增值税
            </div>
            <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 46, color: COLORS.ink, letterSpacing: 5, opacity: sub.opacity, transform: sub.transform }}>
              中国第一大税种的前世今生
            </div>
            <div style={{ marginTop: 50, display: "flex", alignItems: "baseline", gap: 18, opacity: data.opacity, transform: data.transform }}>
              <span style={{ fontFamily: FONT_NUM, fontSize: 96, fontWeight: 700, color: COLORS.goldSoft }}>
                <NumTicker to={6.89} start={55} duration={45} decimals={2} />
              </span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 34, color: COLORS.muted }}>万亿元</span>
              <span style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.dim, marginLeft: 20 }}>
                2025 年国内增值税 · 约占全国税收 39%
              </span>
            </div>
          </div>
          <DocCard
            src="assets/crop-mof2025.jpg"
            caption="财政部《2025 年财政收支情况》：国内增值税 68,947 亿元"
            width={520}
            rotate={-2}
            delay={40}
          />
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 150, bottom: 90 }}>
        <Seal size={110} />
      </div>
      <Ghost text="VAT" size={620} bottom={-180} />
    </Scene>
  );
};

/* 02 什么是增值税 */
export const S2What: React.FC = () => {
  const t1 = useEnter(4, 28);
  const t2 = useEnter(14, 28);
  const chips = useEnter(34, 18);
  const f1 = useEnter(22, 24);
  const f2 = useEnter(34, 24);
  const f3 = useEnter(48, 24);
  const ex = useEnter(78, 18);

  return (
    <Scene duration={480}>
      <AbsoluteFill style={PAD}>
        <div style={t1}><Kicker>01 · 税收原理</Kicker></div>
        <div style={{ marginTop: 40, width: 820, ...t2 }}>
          <Title size={72}>增值税，对“增值额”征税</Title>
        </div>
        <div style={{ marginTop: 34, width: 800, ...chips }}>
          <Body size={34} style={{ lineHeight: 1.9 }}>
            商品和服务每流转一道，只对新增的那部分价值计税；
            上一环节已缴的税，可以抵掉。
          </Body>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 38, ...chips }}>
          <Chip style={{ fontSize: 26 }}>增值额</Chip>
          <Chip style={{ fontSize: 26 }}>抵扣链</Chip>
          <Chip style={{ fontSize: 26 }}>价外税</Chip>
        </div>

        <Panel glow style={{ position: "absolute", right: 140, top: 260, width: 760, padding: "56px 58px 50px" }}>
          <div style={{ ...f1, fontFamily: FONT_SANS, fontSize: 32, letterSpacing: 6, color: COLORS.muted }}>
            一般计税方法
          </div>
          <div style={{ ...f2, marginTop: 22, fontFamily: FONT_SANS, fontSize: 54, color: COLORS.ink, letterSpacing: 2 }}>
            应纳税额
          </div>
          <div style={{ ...f2, marginTop: 8, fontFamily: FONT_NUM, fontSize: 50, color: COLORS.gold, whiteSpace: "nowrap" }}>
            = 销项税额 − 进项税额
          </div>
          <Divider style={{ margin: "32px 0" }} />
          <div style={{ ...f3, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted, lineHeight: 1.7 }}>
            卖出商品时收取的税，减去购进原料时已经支付的税。
            税在价外单列，最终由消费者承担。
          </div>
          <div
            style={{
              ...ex,
              marginTop: 32,
              fontFamily: FONT_SANS,
              fontSize: 26,
              color: COLORS.goldSoft,
              padding: "16px 24px",
              border: "1px solid " + COLORS.line,
              borderRadius: 10,
              backgroundColor: "rgba(228,180,92,0.06)",
            }}
          >
            销项 130 − 进项 100 = 应缴 30（万元）
          </div>
        </Panel>
      </AbsoluteFill>
      <Ghost text="VAT" size={640} bottom={-190} />
    </Scene>
  );
};

/* 03 重复征税 */
const ChainBox: React.FC<{ label: string; value: string; tax: string; delay: number }> = ({
  label,
  value,
  tax,
  delay,
}) => {
  const e = useEnter(delay, 24);
  return (
    <div style={{ ...e, textAlign: "center" }}>
      <div
        style={{
          width: 230,
          height: 150,
          border: "1px solid " + COLORS.line,
          borderRadius: 14,
          background: COLORS.panel,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <div style={{ fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted, letterSpacing: 3 }}>{label}</div>
        <div style={{ fontFamily: FONT_NUM, fontSize: 52, color: COLORS.ink, fontWeight: 700 }}>{value}</div>
      </div>
      <div style={{ marginTop: 18, fontFamily: FONT_NUM, fontSize: 36, color: COLORS.gold }}>税 {tax}</div>
    </div>
  );
};

export const S3Repeat: React.FC = () => {
  const title = useEnter(4, 26);
  const chain = useEnter(18, 22);
  const left = useEnter(52, 22);
  const right = useEnter(66, 22);

  return (
    <Scene duration={470}>
      <AbsoluteFill style={PAD}>
        <div style={title}><Kicker>02 · 老税制的痛点</Kicker></div>
        <div style={{ marginTop: 30, ...title }}>
          <Title size={72}>一层一层，重复征税</Title>
        </div>

        <div style={{ marginTop: 56, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 34, ...chain }}>
          <ChainBox label="原料商" value="100 元" tax="10" delay={22} />
          <div style={{ paddingTop: 56, fontFamily: FONT_NUM, fontSize: 38, color: COLORS.dim }}>→</div>
          <ChainBox label="加工厂" value="200 元" tax="20" delay={30} />
          <div style={{ paddingTop: 56, fontFamily: FONT_NUM, fontSize: 38, color: COLORS.dim }}>→</div>
          <ChainBox label="零售商" value="300 元" tax="30" delay={38} />
        </div>

        <div style={{ display: "flex", gap: 30, marginTop: 60 }}>
          <Panel style={{ flex: 1, padding: "38px 42px", ...left, borderColor: "rgba(196,71,58,0.5)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.redSoft, letterSpacing: 3 }}>旧税制 · 全额征税（10%）</div>
            <div style={{ marginTop: 14, fontFamily: FONT_NUM, fontSize: 56, color: COLORS.ink }}>
              <NumTicker to={60} start={58} duration={40} /> 元
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>
              10 + 20 + 30 · 其中 30 元是重复征收
            </div>
          </Panel>
          <Panel style={{ flex: 1, padding: "38px 42px", ...right, borderColor: "rgba(228,180,92,0.45)" }}>
            <div style={{ fontFamily: FONT_SANS, fontSize: 28, color: COLORS.gold, letterSpacing: 3 }}>增值税 · 只对增值额征税</div>
            <div style={{ marginTop: 14, fontFamily: FONT_NUM, fontSize: 56, color: COLORS.ink }}>
              <NumTicker to={30} start={72} duration={40} /> 元
            </div>
            <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.muted }}>
              10 + 10 + 10 · 等于最终售价 × 税率
            </div>
          </Panel>
        </div>
      </AbsoluteFill>
      <Ghost text="30" size={560} bottom={-170} />
    </Scene>
  );
};

/* 04 1954 法国 */
export const S4France: React.FC = () => {
  const t = useEnter(4, 28);
  const year = useEnter(10, 28);
  const name = useEnter(30, 18);
  const body = useEnter(44, 18);

  return (
    <Scene duration={460}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", height: "100%", alignItems: "center", gap: 70 }}>
          <div style={{ flex: 1.05 }}>
            <div style={t}><Kicker>03 · 起源</Kicker></div>
            <div style={{ marginTop: 24, ...year, fontFamily: FONT_NUM, fontSize: 250, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4, color: COLORS.gold }}>
              1954
            </div>
            <div style={{ marginTop: 4, fontFamily: FONT_SANS, fontSize: 30, color: COLORS.muted, letterSpacing: 6 }}>
              巴黎 · Paris
            </div>
            <div style={{ marginTop: 40, ...name }}>
              <Title size={62}>莫里斯 · 洛雷</Title>
              <div style={{ marginTop: 10, fontFamily: FONT_NUM, fontSize: 28, color: COLORS.dim, letterSpacing: 3 }}>
                Maurice Lauré
              </div>
            </div>
            <div style={{ marginTop: 28, width: 700, ...body }}>
              <Body size={32}>
                法国税务官员。他设计的增值税，只对每个环节的增值额征税、
                并允许逐环节抵扣，用来取代重复征税严重的旧税制。
              </Body>
            </div>
          </div>

          <div style={{ flex: 0.95, display: "flex", justifyContent: "flex-end" }}>
            <DocCard
              src="assets/crop-france1954.jpg"
              caption="法国国家档案馆 FranceArchives · 1954 年 4 月 10 日增值税立法"
              width={600}
              rotate={1.5}
              delay={26}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="1954" size={600} bottom={-180} right={-30} />
    </Scene>
  );
};

/* 05 中国 1979 / 1984 */
export const S5ChinaStart: React.FC = () => {
  const t = useEnter(4, 26);
  const node = useEnter(18, 18);
  const chips = useEnter(44, 18);
  const card = useEnter(28, 24);

  return (
    <Scene duration={510}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", height: "100%", gap: 70, alignItems: "center" }}>
          <div style={{ flex: 1.1 }}>
            <div style={t}><Kicker>04 · 中国探索</Kicker></div>
            <div style={{ marginTop: 26, ...t }}>
              <Title size={72}>先试点，再立制</Title>
            </div>

            <div style={{ marginTop: 50, display: "flex", alignItems: "center", gap: 30, ...node }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: COLORS.gold, boxShadow: "0 0 22px rgba(228,180,92,0.7)" }} />
                <div style={{ fontFamily: FONT_NUM, fontSize: 56, color: COLORS.gold }}>1979</div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>襄樊 · 机械行业试办</div>
              </div>
              <div style={{ flex: 1, height: 2, background: "linear-gradient(90deg, rgba(228,180,92,0.6), rgba(228,180,92,0.25))", marginBottom: 30 }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: COLORS.gold, boxShadow: "0 0 22px rgba(228,180,92,0.7)" }} />
                <div style={{ fontFamily: FONT_NUM, fontSize: 56, color: COLORS.gold }}>1984</div>
                <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted }}>条例草案 · 制度建立</div>
              </div>
            </div>

            <div style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 12, width: 720, ...chips }}>
              {["襄樊", "上海", "柳州", "长沙"].map((c) => (
                <Chip key={c} style={{ fontSize: 22, padding: "8px 20px" }}>{c}</Chip>
              ))}
              <Chip color={COLORS.muted} style={{ fontSize: 22, padding: "8px 20px", borderColor: "rgba(255,255,255,0.14)", color: COLORS.muted, backgroundColor: "transparent" }}>
                机器机械 / 农业机具
              </Chip>
            </div>
            <div style={{ marginTop: 26, width: 700, ...chips }}>
              <Body size={28}>
                1984 年 9 月，国务院发布《增值税条例（草案）》，10 月 1 日起试行，
                征收范围扩大到全国 12 类货物。
              </Body>
            </div>
          </div>

          <div style={{ flex: 0.9, display: "flex", justifyContent: "flex-end", ...card }}>
            <DocCard
              src="assets/crop-1984b.jpg"
              caption="1984 年《中华人民共和国增值税条例（草案）》· 国务院公报"
              width={540}
              rotate={-1.5}
              delay={24}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="1984" size={580} bottom={-170} />
    </Scene>
  );
};

/* 06 1994 */
export const S6_1994: React.FC = () => {
  const t = useEnter(4, 26);
  const big = useEnter(10, 26);
  const rates = useEnter(40, 20);
  const body = useEnter(34, 20);

  return (
    <Scene duration={540}>
      <AbsoluteFill style={PAD}>
        <div style={{ display: "flex", height: "100%", gap: 60, alignItems: "center" }}>
          <div style={{ flex: 1.05 }}>
            <div style={t}><Kicker>05 · 1994 分税制改革</Kicker></div>
            <div style={{ ...big, marginTop: 18, fontFamily: FONT_NUM, fontSize: 210, fontWeight: 700, lineHeight: 1, letterSpacing: -4, color: COLORS.gold }}>
              1994
            </div>
            <div style={{ marginTop: 4, ...big }}>
              <Title size={60}>增值税成为第一大税种</Title>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 34, ...rates }}>
              <Panel style={{ padding: "22px 30px" }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted, letterSpacing: 3 }}>基本税率</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 70, color: COLORS.gold, fontWeight: 700 }}>17%</div>
              </Panel>
              <Panel style={{ padding: "22px 30px" }}>
                <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted, letterSpacing: 3 }}>低税率</div>
                <div style={{ fontFamily: FONT_NUM, fontSize: 70, color: COLORS.goldSoft, fontWeight: 700 }}>13%</div>
              </Panel>
              <div style={{ paddingTop: 50, fontFamily: FONT_SANS, fontSize: 26, color: COLORS.redSoft, letterSpacing: 2 }}>
                生产型 · 设备进项不能抵扣
              </div>
            </div>
            <div style={{ marginTop: 28, width: 700, ...body }}>
              <Body size={28}>
                增值税扩至全部货物和加工修理修配劳务，当年约占全国税收 45%。
                直到 2009 年，才完成向消费型的转型。
              </Body>
            </div>
          </div>

          <div style={{ flex: 0.95, display: "flex", justifyContent: "flex-end" }}>
            <DocCard
              src="assets/crop-1994.jpg"
              caption="国务院令第 134 号《中华人民共和国增值税暂行条例》（1993）"
              width={560}
              rotate={1.5}
              delay={22}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="1994" size={580} bottom={-180} right={-20} />
    </Scene>
  );
};

/* 07 2009 转型 + 营改增 */
export const S7Reform: React.FC = () => {
  const t = useEnter(4, 26);
  const steps = useEnter(22, 18);
  const card = useEnter(60, 22);

  return (
    <Scene duration={520}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>06 · 转型与营改增</Kicker></div>
        <div style={{ marginTop: 26, ...t }}>
          <Title size={68}>生产型 → 消费型，营业税谢幕</Title>
        </div>

        <div style={{ display: "flex", gap: 26, marginTop: 56, ...steps }}>
          {[
            { y: "2004", t: "东北试点转型" },
            { y: "2009", t: "全国 · 消费型" },
            { y: "2012", t: "上海营改增" },
            { y: "2016", t: "全面推开 · 营业税停征" },
          ].map((s, i) => (
            <div key={s.y} style={{ flex: 1, borderTop: "2px solid " + (i === 3 ? COLORS.gold : "rgba(228,180,92,0.35)"), paddingTop: 20 }}>
              <div style={{ fontFamily: FONT_NUM, fontSize: 44, color: i === 3 ? COLORS.gold : COLORS.muted }}>{s.y}</div>
              <div style={{ marginTop: 8, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.muted, lineHeight: 1.5 }}>{s.t}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 50, marginTop: 54, alignItems: "center" }}>
          <div style={{ flex: 1.1 }}>
            <Body size={28} style={{ lineHeight: 1.9 }}>
              2004 年东北试点、2009 年推向全国，增值税从生产型转为消费型，
              购进设备的进项税可以抵扣。
              <br />
              2012 年上海率先营改增，2016 年 5 月 1 日全面推开，
              建筑、房地产、金融、生活服务全部纳入——营业税就此停征。
            </Body>
            <div style={{ marginTop: 26, fontFamily: FONT_SANS, fontSize: 24, color: COLORS.dim }}>
              2016.05.01 营业税停止征收 · 2017.11 条例正式废止
            </div>
          </div>

          <div style={{ flex: 0.9, display: "flex", justifyContent: "flex-end", ...card }}>
            <DocCard
              src="assets/crop-2016.jpg"
              caption="财税〔2016〕36 号：全面推开营业税改征增值税试点的通知"
              width={500}
              rotate={-1.5}
              delay={24}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="2016" size={560} bottom={-180} />
    </Scene>
  );
};

/* 08 降率 + 立法 */
export const S8Law: React.FC = () => {
  const t = useEnter(4, 26);
  const rates = useEnter(26, 20);
  const card = useEnter(48, 22);

  return (
    <Scene duration={500}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>07 · 减税与税收法定</Kicker></div>
        <div style={{ marginTop: 26, ...t }}>
          <Title size={68}>17% → 13%，三档税率定型</Title>
        </div>

        <div style={{ display: "flex", gap: 40, marginTop: 50, alignItems: "center" }}>
          <div style={{ flex: 1.05 }}>
            <div style={{ ...rates, display: "flex", alignItems: "baseline", gap: 22 }}>
              <span style={{ fontFamily: FONT_NUM, fontSize: 96, color: COLORS.dim, textDecoration: "line-through", textDecorationColor: "rgba(196,71,58,0.7)" }}>17%</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 44, color: COLORS.gold }}>→</span>
              <span style={{ fontFamily: FONT_NUM, fontSize: 130, fontWeight: 700, color: COLORS.goldSoft }}>13%</span>
            </div>
            <div style={{ marginTop: 30, display: "flex", gap: 16, ...rates }}>
              {[
                { r: "13%", t: "货物等" },
                { r: "9%", t: "交通建筑等" },
                { r: "6%", t: "服务金融等" },
              ].map((x) => (
                <div key={x.r} style={{ border: "1px solid rgba(228,180,92,0.4)", borderRadius: 12, padding: "14px 24px", textAlign: "center" }}>
                  <div style={{ fontFamily: FONT_NUM, fontSize: 44, fontWeight: 700, color: COLORS.gold }}>{x.r}</div>
                  <div style={{ fontFamily: FONT_SANS, fontSize: 20, color: COLORS.muted, marginTop: 2 }}>{x.t}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30, width: 720 }}>
              <Body size={27} style={{ lineHeight: 1.9 }}>
                2017 取消 13% 档，2018、2019 两次下调。
                2024 年 12 月 25 日增值税法通过，2026 年 1 月 1 日施行——
                税率不变，税收法定落地。
              </Body>
            </div>
          </div>

          <div style={{ flex: 0.95, display: "flex", justifyContent: "flex-end", ...card }}>
            <DocCard
              src="assets/crop-law2024.jpg"
              caption="《中华人民共和国增值税法》· 主席令第四十一号 · 2026 年 1 月 1 日施行"
              width={580}
              rotate={1.5}
              delay={22}
            />
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="2026" size={560} bottom={-180} right={-20} />
    </Scene>
  );
};

/* 09 原理 + 结尾 */
const Principle: React.FC<{ index: string; title: string; desc: string; delay: number }> = ({
  index,
  title,
  desc,
  delay,
}) => {
  const e = useEnter(delay, 20);
  return (
    <Panel style={{ flex: 1, padding: "24px 28px", ...e }}>
      <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.gold, letterSpacing: 3 }}>{index}</div>
      <div style={{ fontFamily: FONT_SANS, fontSize: 32, color: COLORS.ink, fontWeight: 700, marginTop: 4 }}>{title}</div>
      <div style={{ fontFamily: FONT_SANS, fontSize: 22, color: COLORS.muted, lineHeight: 1.6, marginTop: 6 }}>{desc}</div>
    </Panel>
  );
};

export const S9Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = useEnter(4, 26);
  const cards = useEnter(18, 20);
  const finale = useEnter(80, 22);
  const years = ["1954", "1979", "1984", "1994", "2009", "2016", "2019", "2026"];

  return (
    <Scene duration={470}>
      <AbsoluteFill style={PAD}>
        <div style={t}><Kicker>08 · 原理</Kicker></div>
        <div style={{ marginTop: 22, ...t }}>
          <Title size={60}>增值税的四条原理</Title>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 40, ...cards }}>
          <Principle index="壹" title="链条抵扣" desc="上一环的税，下一环抵扣，环环相扣。" delay={20} />
          <Principle index="贰" title="税负中性" desc="不因分工方式改变税负，不惩罚专业化。" delay={28} />
          <Principle index="叁" title="价外计税" desc="税额单列，价格归价格，税归税。" delay={36} />
          <Principle index="肆" title="税负转嫁" desc="层层传递，最终由消费者承担。" delay={44} />
        </div>

        <div style={{ position: "relative", marginTop: 50 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 2, background: "linear-gradient(90deg, rgba(228,180,92,0.1), rgba(228,180,92,0.55), rgba(228,180,92,0.1))" }} />
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
            {years.map((y, i) => {
              const s = spring({ frame: frame - 30 - i * 6, fps, config: { damping: 200 }, durationInFrames: 24 });
              return (
                <div key={y} style={{ textAlign: "center", opacity: s }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: i === years.length - 1 ? COLORS.gold : COLORS.dim, margin: "0 auto" }} />
                  <div style={{ marginTop: 12, fontFamily: FONT_NUM, fontSize: 26, color: i === years.length - 1 ? COLORS.gold : COLORS.muted }}>{y}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ marginTop: 46, textAlign: "center", maxWidth: 1600, ...finale }}>
          <div style={{ fontFamily: FONT_SANS, fontSize: 40, lineHeight: 1.6, color: COLORS.ink, letterSpacing: 1 }}>
            一部增值税史，也是中国市场经济体制改革的缩影。
          </div>
          <div style={{ marginTop: 18, fontFamily: FONT_SANS, fontSize: 22, color: COLORS.dim, letterSpacing: 2 }}>
            数据来源：财政部《2025 年财政收支情况》· 文献截图来自中国政府网、国家税务总局、全国人大网、法国国家档案馆
          </div>
        </div>
      </AbsoluteFill>
      <Ghost text="2026" size={540} bottom={-180} right={-20} />
    </Scene>
  );
};
