import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const OUT = "F:/deepseek/vat-video/out/covers";
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
.main { position: absolute; left: 72px; top: 176px; width: 936px; }
.title { margin-top: 16px; font-size: 94px; font-weight: 700; line-height: 1.12; letter-spacing: 1px; color: #F7F2E7; }
.title .gold { color: #EBCB8B; }
.title2 { margin-top: 12px; font-size: 58px; font-weight: 700; letter-spacing: 14px; color: #E4B45C; }
.sub { margin-top: 24px; font-size: 26px; line-height: 1.7; color: #AAB3C2; letter-spacing: 1px; max-width: 900px; }
.rule { margin-top: 26px; width: 130px; height: 3px; background: linear-gradient(90deg, #E4B45C, rgba(228,180,92,0.1)); }
.visual { position: absolute; left: 30px; right: 30px; top: 620px; height: 760px; }
.ghost { position: absolute; right: 30px; top: -40px; font-size: 340px; font-weight: 700; line-height: 1; color: rgba(228,180,92,0.06); }
.cover { position: absolute; width: 448px; border-radius: 9px; overflow: hidden; box-shadow: 0 34px 70px rgba(0,0,0,0.72), 0 0 0 1px rgba(228,180,92,0.28); background: #0A1424; }
.cover img { display: block; width: 100%; }
.c1 { left: 20px; top: 60px; transform: rotate(-2deg); }
.c2 { left: 520px; top: 90px; transform: rotate(2deg); }
.c3 { left: 40px; top: 360px; transform: rotate(2deg); }
.c4 { left: 540px; top: 390px; transform: rotate(-1.5deg); }
.badge { position: absolute; right: 84px; bottom: 66px; padding: 14px 26px; border: 3px solid rgba(196,71,58,0.9); border-radius: 6px; color: #D25A4B; font-size: 38px; font-weight: 700; letter-spacing: 6px; transform: rotate(-6deg); background: rgba(10,16,26,0.5); }
`;

const covers = [
  "02-增值税-国外篇.png",
  "04-企业所得税-国外篇.png",
  "06-个人所得税-国外篇.png",
  "08-印花税.png",
];

const html = `<!doctype html><html lang="zh"><head><meta charset="utf-8"><style>${css}</style></head>
<body><div class="canvas">
  <div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · 合集</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main">
    <div class="title">税种<span class="gold">起源与发展</span></div>
    <div class="title2">税收原理</div>
    <div class="sub">增值税 · 企业所得税<br/>个人所得税 · 印花税</div>
    <div class="rule"></div>
  </div>
  <div class="visual">
    <div class="ghost">税</div>
    ${covers.map((f, i) => `<div class="cover c${i + 1}"><img src="file:///F:/deepseek/vat-video/out/covers/${f}" /></div>`).join("")}
  </div>
  <div class="badge">合集</div>
</div></body></html>`;

fs.mkdirSync("F:/deepseek/vat-video/.tmp/collection34", { recursive: true });
const htmlPath = "F:/deepseek/vat-video/.tmp/collection34/collection34.html";
fs.writeFileSync(htmlPath, html);
const png = path.join(OUT, "11-合集-税种起源发展与税收原理-竖版3x4.png");
execFileSync("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
  "--force-device-scale-factor=1", "--window-size=1080,1440",
  "--allow-file-access-from-files", "--virtual-time-budget=5000",
  "--user-data-dir=F:/deepseek/vat-video/.tmp/collection34/profile",
  "--screenshot=" + png,
  "file:///" + htmlPath.replace(/\\/g, "/"),
], { stdio: "ignore" });
console.log("rendered", png);
