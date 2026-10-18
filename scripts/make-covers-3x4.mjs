import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const OUT = "F:/deepseek/vat-video/out/covers/3x4";
fs.mkdirSync(OUT, { recursive: true });
const FONT_DIR = "F:/deepseek/vat-video/public/fonts";
const css = `
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-400.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-700.woff2") format("woff2"); font-weight: 700; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1080px; height: 1440px; overflow: hidden; background: #060A12; }
body { font-family: "NotoSC", "Microsoft YaHei", sans-serif; color: #F5EFE3; }
.canvas { position: relative; width: 1080px; height: 1440px; overflow: hidden; background: radial-gradient(120% 80% at 10% 0%, #14243E 0%, #0A1424 46%, #060A12 100%); }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 84px 84px; mask-image: radial-gradient(85% 80% at 50% 40%, #000 20%, transparent 100%); }
.vignette { position: absolute; inset: 0; background: radial-gradient(70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%); }
.glow { position: absolute; width: 900px; height: 900px; right: -300px; top: -260px; background: radial-gradient(circle, rgba(228,180,92,0.16) 0%, transparent 65%); }
.topbar { position: absolute; left: 72px; right: 72px; top: 54px; display: flex; justify-content: space-between; align-items: center; font-size: 18px; letter-spacing: 5px; color: #8E97A8; }
.topbar .brand { display: flex; align-items: center; gap: 12px; color: #E4B45C; }
.diamond { width: 9px; height: 9px; background: #E4B45C; transform: rotate(45deg); }
.main { position: absolute; left: 72px; top: 168px; width: 936px; }
.kicker { font-size: 24px; letter-spacing: 7px; color: #E4B45C; }
.title { margin-top: 18px; font-size: 88px; font-weight: 700; line-height: 1.14; letter-spacing: 1px; color: #F7F2E7; }
.title .gold { color: #EBCB8B; }
.sub { margin-top: 22px; font-size: 27px; line-height: 1.7; color: #AAB3C2; letter-spacing: 1px; }
.rule { margin-top: 26px; width: 130px; height: 3px; background: linear-gradient(90deg, #E4B45C, rgba(228,180,92,0.1)); }
.visual { position: absolute; left: 40px; right: 40px; top: 640px; height: 700px; }
.ghost { position: absolute; right: 20px; top: -50px; font-size: 330px; font-weight: 700; line-height: 1; color: rgba(228,180,92,0.065); }
.card { position: absolute; left: 50%; bottom: 50px; transform: translateX(-50%) rotate(-1.2deg); background: #F8F3E9; border-radius: 10px; padding: 13px; box-shadow: 0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(228,180,92,0.32); }
.card img { display: block; width: 100%; border-radius: 4px; }
.card .cap { margin-top: 11px; font-size: 15px; color: #4A4F5A; line-height: 1.5; letter-spacing: 0; }
.meta { position: absolute; left: 72px; bottom: 70px; font-size: 21px; color: #8E97A8; letter-spacing: 2px; }
.meta b { color: #E4B45C; font-weight: 400; }
.seal { position: absolute; right: 76px; bottom: 64px; width: 96px; height: 96px; border: 3px solid rgba(196,71,58,0.85); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #D25A4B; font-size: 56px; font-weight: 700; transform: rotate(-6deg); opacity: 0.9; }
`;

const covers = [
  { file: "02-增值税-国外篇", kicker: "增值税 · 国外篇", title: "增值税的<span class='gold'>前世今生</span>", sub: "1918—2026 · 从西门子到 160 多个国家", meta: "<b>第 1 期</b> · 2 分 52 秒", img: "hist-assets/siemens.jpg", cap: "格奥尔格·冯·西门子 · Wikimedia Commons · 公有领域", ghost: "1954", w: 500 },
  { file: "03-增值税-中国篇", kicker: "增值税 · 中国篇", title: "增值税<span class='gold'>在中国</span>", sub: "1979—2026 · 从试点到立法", meta: "<b>第 2 期</b> · 2 分 12 秒", img: "assets/crop-1984b.jpg", cap: "1984 年《增值税条例（草案）》· 国务院公报", ghost: "1994", w: 680 },
  { file: "04-企业所得税-国外篇", kicker: "企业所得税 · 国外篇", title: "企业所得税的<span class='gold'>起源</span>", sub: "1799—2024 · 从战争税单到 15% 全球最低税", meta: "<b>第 3 期</b> · 2 分 13 秒", img: "hist-assets/pitt.jpg", cap: "小威廉·皮特 · Wikimedia Commons · 公有领域", ghost: "1913", w: 400 },
  { file: "05-企业所得税-中国篇", kicker: "企业所得税 · 中国篇", title: "企业所得税<span class='gold'>在中国</span>", sub: "1980—2026 · 从两套税制到一套税法", meta: "<b>第 4 期</b> · 2 分 12 秒", img: "hist-assets/crop-cit2007.jpg", cap: "2007 年《企业所得税法》· 中国政府网", ghost: "2007", w: 700 },
  { file: "06-个人所得税-国外篇", kicker: "个人所得税 · 国外篇", title: "个人所得税<span class='gold'>两百年</span>", sub: "1799—2026 · 从战争税到大众税", meta: "<b>第 5 期</b> · 1 分 32 秒", img: "hist-assets/amendment16.jpg", cap: "美国第十六修正案 · 美国国家档案馆 · 公有领域", ghost: "1799", w: 350 },
  { file: "07-个人所得税-中国篇", kicker: "个人所得税 · 中国篇", title: "个税<span class='gold'>四十年</span>", sub: "1980—2026 · 从 800 到 5000", meta: "<b>第 6 期</b> · 1 分 35 秒", img: "hist-assets/crop-pit2018.jpg", cap: "2018 年个税法修改决定 · 中国政府网", ghost: "2018", w: 660 },
  { file: "08-印花税", kicker: "印花税 · 单期", title: "一张纸的<span class='gold'>税</span>", sub: "1604—2026 · 印花税全史", meta: "<b>第 7 期</b> · 2 分 14 秒", img: "hist-assets/stamp-roc.jpg", cap: "民国时期印花税票 · Wikimedia Commons · 公有领域", ghost: "1694", w: 440 },
];

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const tmp = "F:/deepseek/vat-video/.tmp/covers34";
fs.mkdirSync(tmp, { recursive: true });

for (let i = 0; i < covers.length; i++) {
  const c = covers[i];
  const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="canvas">
    <div class="grid"></div><div class="glow"></div><div class="vignette"></div>
    <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
    <div class="main">
      <div class="kicker">${c.kicker}</div>
      <div class="title">${c.title}</div>
      <div class="sub">${c.sub}</div>
      <div class="rule"></div>
    </div>
    <div class="visual">
      <div class="ghost">${c.ghost}</div>
      <div class="card" style="width:${c.w}px"><img src="file:///F:/deepseek/vat-video/public/${c.img}" /><div class="cap">${c.cap}</div></div>
    </div>
    <div class="meta">${c.meta}</div>
    <div class="seal">税</div>
  </div></body></html>`;
  const htmlPath = path.join(tmp, c.file + ".html");
  fs.writeFileSync(htmlPath, html);
  const png = path.join(OUT, c.file + ".png");
  execFileSync(chrome, [
    "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
    "--force-device-scale-factor=1", "--window-size=1080,1440",
    "--allow-file-access-from-files", "--virtual-time-budget=4000",
    "--user-data-dir=" + path.join(tmp, "profile-" + i),
    "--screenshot=" + png,
    "file:///" + htmlPath.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("rendered", png);
}
