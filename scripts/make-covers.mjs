import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const OUT = "F:/deepseek/vat-video/out/covers";
fs.mkdirSync(OUT, { recursive: true });

const FONT_DIR = "F:/deepseek/vat-video/public/fonts";
const baseCss = `
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-400.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-700.woff2") format("woff2"); font-weight: 700; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: #060A12; }
body { font-family: "NotoSC", "Microsoft YaHei", sans-serif; color: #F5EFE3; }
.canvas { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: radial-gradient(120% 90% at 12% 0%, #12213A 0%, #0A1424 45%, #060A12 100%); }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 96px 96px; mask-image: radial-gradient(80% 80% at 55% 45%, #000 20%, transparent 100%); }
.vignette { position: absolute; inset: 0; background: radial-gradient(70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%); }
.glow { position: absolute; width: 900px; height: 900px; right: -180px; top: -220px; background: radial-gradient(circle, rgba(228,180,92,0.14) 0%, transparent 65%); }
.topbar { position: absolute; left: 110px; right: 110px; top: 62px; display: flex; justify-content: space-between; align-items: center; font-size: 22px; letter-spacing: 6px; color: #8E97A8; }
.topbar .brand { display: flex; align-items: center; gap: 14px; color: #E4B45C; }
.diamond { width: 10px; height: 10px; background: #E4B45C; transform: rotate(45deg); }
.main { position: absolute; left: 110px; top: 250px; width: 1040px; }
.kicker { font-size: 26px; letter-spacing: 8px; color: #E4B45C; }
.title { margin-top: 24px; font-size: 118px; font-weight: 700; line-height: 1.1; letter-spacing: 2px; color: #F7F2E7; }
.title .gold { color: #EBCB8B; }
.sub { margin-top: 28px; font-size: 34px; line-height: 1.6; color: #AAB3C2; }
.rule { margin-top: 34px; width: 140px; height: 3px; background: linear-gradient(90deg, #E4B45C, rgba(228,180,92,0.1)); }
.meta { position: absolute; left: 110px; bottom: 84px; display: flex; gap: 36px; align-items: center; font-size: 22px; color: #8E97A8; letter-spacing: 2px; }
.meta b { color: #E4B45C; font-weight: 400; }
.visual { position: absolute; right: 100px; top: 150px; width: 760px; height: 800px; }
.ghost { position: absolute; right: -10px; top: -60px; font-size: 420px; font-weight: 700; line-height: 1; color: rgba(228,180,92,0.075); letter-spacing: -10px; }
.card { position: absolute; background: #F8F3E9; border-radius: 8px; padding: 12px; box-shadow: 0 40px 90px rgba(0,0,0,0.6), 0 0 0 1px rgba(228,180,92,0.35); }
.card img { display: block; width: 100%; border-radius: 3px; }
.card .cap { margin-top: 10px; font-size: 15px; color: #4A4F5A; line-height: 1.5; letter-spacing: 0; }
.c1 { right: 90px; top: 140px; width: 420px; transform: rotate(-4deg); }
.c2 { right: 250px; top: 90px; width: 300px; transform: rotate(5deg); opacity: 0.92; }
.seal { position: absolute; right: 110px; bottom: 80px; width: 108px; height: 108px; border: 3px solid rgba(196,71,58,0.85); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #D25A4B; font-size: 62px; font-weight: 700; transform: rotate(-6deg); opacity: 0.9; }
.series-grid { position: absolute; right: 110px; top: 210px; width: 760px; display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.tax-card { border: 1px solid rgba(228,180,92,0.35); background: linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015)); border-radius: 12px; padding: 26px 28px; }
.tax-card .n { font-size: 30px; color: #E4B45C; letter-spacing: 2px; }
.tax-card .y { margin-top: 8px; font-size: 44px; font-weight: 700; color: #F7F2E7; }
.tax-card .d { margin-top: 6px; font-size: 17px; color: #8E97A8; }
.big-mark { position: absolute; right: 60px; bottom: -40px; font-size: 300px; font-weight: 700; color: rgba(228,180,92,0.05); line-height: 1; }
`;

const covers = [
  {
    file: "01-series-税种起源与发展",
    kicker: "税种系列 · 起源 / 发展 / 原理",
    title: "税种<span class='gold'>起源与发展</span>",
    sub: "增值税 · 企业所得税 · 个人所得税 · 印花税",
    meta: "<b>7 期</b> 已上线 · 持续更新",
    series: true,
    cards: [
      { n: "增值税", y: "1918", d: "西门子 → 160 多个国家" },
      { n: "企业所得税", y: "1799", d: "战争税单 → 15% 全球最低税" },
      { n: "个人所得税", y: "1799", d: "从战争税到大众税" },
      { n: "印花税", y: "1604", d: "一张纸的税" },
    ],
  },
  {
    file: "02-增值税-国外篇",
    kicker: "增值税 · 国外篇",
    title: "增值税的<span class='gold'>前世今生</span>",
    sub: "1918—2026 · 从西门子到 160 多个国家",
    meta: "<b>第 1 期</b> · 2 分 52 秒",
    img: "hist-assets/siemens.jpg",
    cap: "格奥尔格·冯·西门子 · Wikimedia Commons · 公有领域",
    ghost: "1954",
  },
  {
    file: "03-增值税-中国篇",
    kicker: "增值税 · 中国篇",
    title: "增值税<span class='gold'>在中国</span>",
    sub: "1979—2026 · 从试点到立法",
    meta: "<b>第 2 期</b> · 2 分 12 秒",
    img: "assets/crop-1984b.jpg",
    cap: "1984 年《增值税条例（草案）》· 国务院公报",
    ghost: "1994",
  },
  {
    file: "04-企业所得税-国外篇",
    kicker: "企业所得税 · 国外篇",
    title: "企业所得税的<span class='gold'>起源</span>",
    sub: "1799—2024 · 从战争税单到 15% 全球最低税",
    meta: "<b>第 3 期</b> · 2 分 13 秒",
    img: "hist-assets/pitt.jpg",
    cap: "小威廉·皮特 · Wikimedia Commons · 公有领域",
    ghost: "1913",
  },
  {
    file: "05-企业所得税-中国篇",
    kicker: "企业所得税 · 中国篇",
    title: "企业所得税<span class='gold'>在中国</span>",
    sub: "1980—2026 · 从两套税制到一套税法",
    meta: "<b>第 4 期</b> · 2 分 12 秒",
    img: "hist-assets/crop-cit2007.jpg",
    cap: "2007 年《企业所得税法》· 中国政府网",
    ghost: "2007",
  },
  {
    file: "06-个人所得税-国外篇",
    kicker: "个人所得税 · 国外篇",
    title: "个人所得税<span class='gold'>两百年</span>",
    sub: "1799—2026 · 从战争税到大众税",
    meta: "<b>第 5 期</b> · 1 分 32 秒",
    img: "hist-assets/amendment16.jpg",
    cap: "美国第十六修正案 · 美国国家档案馆 · 公有领域",
    ghost: "1799",
  },
  {
    file: "07-个人所得税-中国篇",
    kicker: "个人所得税 · 中国篇",
    title: "个税<span class='gold'>四十年</span>",
    sub: "1980—2026 · 从 800 到 5000",
    meta: "<b>第 6 期</b> · 1 分 35 秒",
    img: "hist-assets/crop-pit2018.jpg",
    cap: "2018 年个税法修改决定 · 中国政府网",
    ghost: "2018",
  },
  {
    file: "08-印花税",
    kicker: "印花税 · 单期",
    title: "一张纸的<span class='gold'>税</span>",
    sub: "1604—2026 · 印花税全史",
    meta: "<b>第 7 期</b> · 2 分 14 秒",
    img: "hist-assets/stamp-roc.jpg",
    cap: "民国时期印花税票 · Wikimedia Commons · 公有领域",
    ghost: "1694",
  },
  {
    file: "09-税收原理",
    kicker: "税收原理 · 通识篇",
    title: "税，究竟<span class='gold'>怎么收</span>",
    sub: "税基 · 税率 · 税负 · 征管",
    meta: "<b>通识</b> · 原理与案例",
    principles: true,
  },
];

function html(c, idx) {
  const visual = c.series
    ? `<div class="series-grid">${c.cards.map((x) => `<div class="tax-card"><div class="n">${x.n}</div><div class="y">${x.y}</div><div class="d">${x.d}</div></div>`).join("")}</div>`
    : c.principles
      ? `<div class="visual"><div class="ghost">原理</div>
          <div class="card c1" style="transform:rotate(-4deg);padding:34px;">
            <div style="font-family:NotoSC;font-size:30px;color:#8A5A12;letter-spacing:2px;">税收三要素</div>
            <div style="margin-top:18px;font-size:64px;font-weight:700;color:#1B2230;line-height:1.35;">税基<br/>税率<br/>税负</div>
            <div style="margin-top:16px;font-size:17px;color:#5A6070;">谁来缴 · 对什么缴 · 缴多少</div>
          </div>
        </div>`
      : `<div class="visual"><div class="ghost">${c.ghost}</div>
          <div class="card c1"><img src="file:///F:/deepseek/vat-video/public/${c.img}" /><div class="cap">${c.cap}</div></div>
        </div>`;
  return `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>${baseCss}</style></head>
  <body><div class="canvas">
    <div class="grid"></div><div class="glow"></div><div class="vignette"></div>
    <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
    <div class="main">
      <div class="kicker">${c.kicker}</div>
      <div class="title">${c.title}</div>
      <div class="sub">${c.sub}</div>
      <div class="rule"></div>
    </div>
    ${visual}
    <div class="meta">${c.meta}</div>
    <div class="seal">税</div>
  </div></body></html>`;
}

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const tmp = "F:/deepseek/vat-video/.tmp/covers";
fs.mkdirSync(tmp, { recursive: true });
for (let i = 0; i < covers.length; i++) {
  const c = covers[i];
  const htmlPath = path.join(tmp, c.file + ".html");
  fs.writeFileSync(htmlPath, html(c, i));
  const png = path.join(OUT, c.file + ".png");
  execFileSync(chrome, [
    "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
    "--force-device-scale-factor=1", "--window-size=1920,1080",
    "--allow-file-access-from-files", "--virtual-time-budget=4000",
    "--user-data-dir=" + path.join(tmp, "profile-" + i),
    "--screenshot=" + png,
    "file:///" + htmlPath.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("rendered", png);
}
