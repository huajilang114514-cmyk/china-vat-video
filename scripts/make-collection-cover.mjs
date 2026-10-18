import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const OUT = "F:/deepseek/vat-video/out/covers";
const FONT_DIR = "F:/deepseek/vat-video/public/fonts";
const css = `
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-400.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-700.woff2") format("woff2"); font-weight: 700; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1920px; height: 1080px; overflow: hidden; background: #060A12; }
body { font-family: "NotoSC", "Microsoft YaHei", sans-serif; color: #F5EFE3; }
.canvas { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: radial-gradient(120% 90% at 10% 0%, #14243E 0%, #0A1424 46%, #060A12 100%); }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 96px 96px; mask-image: radial-gradient(85% 85% at 55% 45%, #000 20%, transparent 100%); }
.vignette { position: absolute; inset: 0; background: radial-gradient(70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%); }
.glow { position: absolute; width: 1100px; height: 1100px; right: -260px; top: -320px; background: radial-gradient(circle, rgba(228,180,92,0.16) 0%, transparent 65%); }
.topbar { position: absolute; left: 110px; right: 110px; top: 62px; display: flex; justify-content: space-between; align-items: center; font-size: 22px; letter-spacing: 6px; color: #8E97A8; }
.topbar .brand { display: flex; align-items: center; gap: 14px; color: #E4B45C; }
.diamond { width: 10px; height: 10px; background: #E4B45C; transform: rotate(45deg); }
.main { position: absolute; left: 110px; top: 232px; width: 980px; }
.kicker { font-size: 26px; letter-spacing: 8px; color: #E4B45C; }
.title { margin-top: 22px; font-size: 112px; font-weight: 700; line-height: 1.08; letter-spacing: 2px; color: #F7F2E7; }
.title .gold { color: #EBCB8B; }
.title2 { margin-top: 10px; font-size: 66px; font-weight: 700; letter-spacing: 18px; color: #E4B45C; }
.sub { margin-top: 26px; font-size: 30px; line-height: 1.7; color: #AAB3C2; letter-spacing: 1px; }
.rule { margin-top: 32px; width: 150px; height: 3px; background: linear-gradient(90deg, #E4B45C, rgba(228,180,92,0.1)); }
.meta { position: absolute; left: 110px; bottom: 86px; display: flex; gap: 30px; align-items: center; font-size: 22px; color: #8E97A8; letter-spacing: 2px; }
.meta b { color: #E4B45C; font-weight: 400; }
.visual { position: absolute; right: 70px; top: 150px; width: 820px; height: 760px; }
.ghost { position: absolute; right: 40px; top: -40px; font-size: 460px; font-weight: 700; line-height: 1; color: rgba(228,180,92,0.06); }
.cover { position: absolute; width: 470px; border-radius: 10px; overflow: hidden; box-shadow: 0 44px 90px rgba(0,0,0,0.72), 0 0 0 1px rgba(228,180,92,0.28); background: #0A1424; }
.cover img { display: block; width: 100%; }
.cover::after { content: ""; position: absolute; inset: 0; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06); border-radius: 10px; }
.c1 { left: 0; top: 150px; transform: rotate(-10deg); }
.c2 { left: 95px; top: 90px; transform: rotate(-4deg); }
.c3 { left: 200px; top: 150px; transform: rotate(4deg); }
.c4 { left: 300px; top: 90px; transform: rotate(10deg); }
.badge { position: absolute; right: 120px; bottom: 74px; padding: 18px 30px; border: 3px solid rgba(196,71,58,0.9); border-radius: 6px; color: #D25A4B; font-size: 46px; font-weight: 700; letter-spacing: 8px; transform: rotate(-6deg); background: rgba(10,16,26,0.5); }
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
    <div class="kicker">税种起源发展与税收原理</div>
    <div class="title">税种<span class="gold">起源与发展</span></div>
    <div class="title2">税收原理</div>
    <div class="sub">增值税 · 企业所得税 · 个人所得税 · 印花税</div>
    <div class="rule"></div>
  </div>
  <div class="visual">
    <div class="ghost">税</div>
    ${covers.map((f, i) => `<div class="cover c${i + 1}"><img src="file:///F:/deepseek/vat-video/out/covers/${f}" /></div>`).join("")}
  </div>
  <div class="meta"><span><b>9 期合集</b></span><span>18 分 47 秒</span><span>2026 · 持续更新</span></div>
  <div class="badge">合集</div>
</div></body></html>`;

fs.mkdirSync("F:/deepseek/vat-video/.tmp/collection", { recursive: true });
const htmlPath = "F:/deepseek/vat-video/.tmp/collection/collection.html";
fs.writeFileSync(htmlPath, html);
const png = path.join(OUT, "10-合集-税种起源发展与税收原理.png");
execFileSync("C:/Program Files/Google/Chrome/Application/chrome.exe", [
  "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
  "--force-device-scale-factor=1", "--window-size=1920,1080",
  "--allow-file-access-from-files", "--virtual-time-budget=5000",
  "--user-data-dir=F:/deepseek/vat-video/.tmp/collection/profile",
  "--screenshot=" + png,
  "file:///" + htmlPath.replace(/\\/g, "/"),
], { stdio: "ignore" });
console.log("rendered", png);
