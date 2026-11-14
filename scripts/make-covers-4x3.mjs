import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = "F:/deepseek/vat-video";
const OUT = ROOT + "/out/covers/4x3";
fs.mkdirSync(OUT, { recursive: true });
const FONT_DIR = ROOT + "/public/fonts";
const tmp = ROOT + "/.tmp/covers43";
fs.mkdirSync(tmp, { recursive: true });
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const episodes = JSON.parse(fs.readFileSync(ROOT + "/covers.config.json", "utf8"));

const css = `
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-400.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-700.woff2") format("woff2"); font-weight: 700; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { width: 1440px; height: 1080px; overflow: hidden; background: #060A12; }
body { font-family: "NotoSC", "Microsoft YaHei", sans-serif; color: #F5EFE3; }
.canvas { position: relative; width: 1440px; height: 1080px; overflow: hidden; background: radial-gradient(120% 80% at 10% 0%, #14243E 0%, #0A1424 46%, #060A12 100%); }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size: 84px 84px; mask-image: radial-gradient(85% 80% at 50% 40%, #000 20%, transparent 100%); }
.vignette { position: absolute; inset: 0; background: radial-gradient(70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%); }
.glow { position: absolute; width: 900px; height: 900px; right: -300px; top: -260px; background: radial-gradient(circle, rgba(228,180,92,0.16) 0%, transparent 65%); }
.topbar { position: absolute; left: 80px; right: 80px; top: 54px; display: flex; justify-content: space-between; align-items: center; font-size: 18px; letter-spacing: 5px; color: #8E97A8; }
.topbar .brand { display: flex; align-items: center; gap: 12px; color: #E4B45C; }
.diamond { width: 9px; height: 9px; background: #E4B45C; transform: rotate(45deg); }
.main { position: absolute; left: 80px; top: 186px; width: 780px; }
.kicker { font-size: 23px; letter-spacing: 7px; color: #E4B45C; }
.title { margin-top: 16px; font-size: 82px; font-weight: 700; line-height: 1.14; letter-spacing: 1px; color: #F7F2E7; }
.title .gold { color: #EBCB8B; }
.sub { margin-top: 20px; font-size: 25px; line-height: 1.7; color: #AAB3C2; letter-spacing: 1px; }
.rule { margin-top: 24px; width: 120px; height: 3px; background: linear-gradient(90deg, #E4B45C, rgba(228,180,92,0.1)); }
.visual { position: absolute; right: 160px; top: 210px; width: 600px; height: 780px; }
.ghost { position: absolute; right: 0; top: -40px; font-size: 300px; font-weight: 700; line-height: 1; color: rgba(228,180,92,0.065); }
.card { position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%) rotate(-1.2deg); background: #F8F3E9; border-radius: 9px; padding: 12px; box-shadow: 0 34px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(228,180,92,0.32); }
.card img { display: block; width: 100%; border-radius: 3px; }
.card .cap { margin-top: 9px; font-size: 14px; color: #4A4F5A; line-height: 1.5; }
.meta { position: absolute; left: 80px; bottom: 62px; font-size: 20px; color: #8E97A8; letter-spacing: 2px; }
.meta b { color: #E4B45C; font-weight: 400; }
.seal { position: absolute; right: 76px; bottom: 54px; width: 92px; height: 92px; border: 3px solid rgba(196,71,58,0.85); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #D25A4B; font-size: 54px; font-weight: 700; transform: rotate(-6deg); opacity: 0.9; }
.series-grid { position: absolute; right: 50px; top: 200px; width: 620px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.tax-card { border: 1px solid rgba(228,180,92,0.35); background: linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015)); border-radius: 10px; padding: 20px 22px; }
.tax-card .n { font-size: 24px; color: #E4B45C; letter-spacing: 1px; }
.tax-card .y { margin-top: 6px; font-size: 36px; font-weight: 700; color: #F7F2E7; }
.tax-card .d { margin-top: 4px; font-size: 14px; color: #8E97A8; }
.cover { position: absolute; width: 380px; border-radius: 8px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.72), 0 0 0 1px rgba(228,180,92,0.28); background: #0A1424; }
.cover img { display: block; width: 100%; }
.c1 { left: 0; top: 200px; transform: rotate(-10deg); }
.c2 { left: 70px; top: 140px; transform: rotate(-3deg); }
.c3 { left: 150px; top: 200px; transform: rotate(4deg); }
.c4 { left: 220px; top: 140px; transform: rotate(10deg); }
.badge { position: absolute; right: 80px; bottom: 50px; padding: 12px 22px; border: 3px solid rgba(196,71,58,0.9); border-radius: 6px; color: #D25A4B; font-size: 34px; font-weight: 700; letter-spacing: 6px; transform: rotate(-6deg); background: rgba(10,16,26,0.5); }
`;

function stripDuration(meta) {
  return meta.replace(/\s*·\s*\d+\s*分\s*\d+\s*秒/g, "");
}

function episodeHtml(c) {
  const w = Math.min(c.w34, 480);
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="canvas"><div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main"><div class="kicker">${c.kicker}</div><div class="title">${c.title}</div><div class="sub">${c.sub}</div><div class="rule"></div></div>
  <div class="visual"><div class="ghost">${c.ghost}</div><div class="card" style="width:${w}px"><img src="file:///${ROOT}/public/${c.img}" /><div class="cap">${c.cap}</div></div></div>
  <div class="meta">${stripDuration(c.meta)}</div><div class="seal">税</div></div></body></html>`;
}

function seriesHtml() {
  const cards = [
    { n: "增值税", y: "1918", d: "西门子 → 160 多个国家" },
    { n: "企业所得税", y: "1799", d: "战争税单 → 15% 全球最低税" },
    { n: "个人所得税", y: "1799", d: "从战争税到大众税" },
    { n: "印花税", y: "1604", d: "一张纸的税" },
  ];
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="canvas"><div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main"><div class="kicker">税种系列 · 合集</div><div class="title">税种<span class="gold">起源与发展</span></div><div class="sub">增值税 · 企业所得税 · 个人所得税 · 印花税</div><div class="rule"></div></div>
  <div class="series-grid">${cards.map((x) => `<div class="tax-card"><div class="n">${x.n}</div><div class="y">${x.y}</div><div class="d">${x.d}</div></div>`).join("")}</div>
  <div class="meta"><b>9 期</b> 已上线 · 持续更新</div><div class="seal">税</div></div></body></html>`;
}

function principlesHtml() {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="canvas"><div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main"><div class="kicker">税收原理 · 通识篇</div><div class="title">税，究竟<span class="gold">怎么收</span></div><div class="sub">税基 · 税率 · 税负 · 征管</div><div class="rule"></div></div>
  <div class="visual"><div class="ghost">原理</div><div class="card" style="width:470px;padding:30px"><div style="font-size:26px;color:#8A5A12;letter-spacing:2px;">税收三要素</div><div style="margin-top:14px;font-size:52px;font-weight:700;color:#1B2230;line-height:1.35;">税基<br/>税率<br/>税负</div><div style="margin-top:12px;font-size:15px;color:#5A6070;">谁来缴 · 对什么缴 · 缴多少</div></div></div>
  <div class="meta">通识 · 原理与案例</div><div class="seal">税</div></div></body></html>`;
}

function collectionHtml() {
  const covers = ["02-增值税-国外篇.png", "04-企业所得税-国外篇.png", "06-个人所得税-国外篇.png", "08-印花税.png"];
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head>
  <body><div class="canvas"><div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · 合集</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main"><div class="kicker">税种起源发展与税收原理</div><div class="title">税种<span class="gold">起源与发展</span></div><div style="margin-top:8px;font-size:48px;font-weight:700;letter-spacing:12px;color:#E4B45C;">税收原理</div><div class="sub">增值税 · 企业所得税 · 个人所得税 · 印花税</div><div class="rule"></div></div>
  <div class="visual" style="right:40px;top:220px;">${covers.map((f, i) => `<div class="cover c${i + 1}"><img src="file:///${ROOT}/out/covers/${f}" /></div>`).join("")}</div>
  <div class="meta">9 期合集 · 2026</div><div class="badge">合集</div></div></body></html>`;
}

function render(html, file, profile) {
  const htmlPath = path.join(tmp, profile + ".html");
  fs.writeFileSync(htmlPath, html);
  const out = path.join(OUT, file);
  execFileSync(chrome, [
    "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
    "--force-device-scale-factor=1", "--window-size=1440,1080",
    "--allow-file-access-from-files", "--virtual-time-budget=4000",
    "--user-data-dir=" + path.join(tmp, "profile-" + profile),
    "--screenshot=" + out,
    "file:///" + htmlPath.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("rendered", out);
}

for (const c of episodes) {
  render(episodeHtml(c), c.file + ".png", "ep-" + c.id);
}
render(seriesHtml(), "01-series-税种起源与发展.png", "series");
render(principlesHtml(), "09-税收原理.png", "principles");
render(collectionHtml(), "10-合集-税种起源发展与税收原理.png", "collection");
