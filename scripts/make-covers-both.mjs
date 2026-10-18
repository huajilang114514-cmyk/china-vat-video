import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = "F:/deepseek/vat-video";
const OUT169 = ROOT + "/out/covers";
const OUT34 = ROOT + "/out/covers/3x4";
const FONT_DIR = ROOT + "/public/fonts";
const items = JSON.parse(fs.readFileSync(ROOT + "/covers.config.json", "utf8"));
fs.mkdirSync(OUT169, { recursive: true });
fs.mkdirSync(OUT34, { recursive: true });
const tmp = ROOT + "/.tmp/covers-both";
fs.mkdirSync(tmp, { recursive: true });
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const fonts = `
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-400.woff2") format("woff2"); font-weight: 400; }
@font-face { font-family: "NotoSC"; src: url("file:///${FONT_DIR}/noto-700.woff2") format("woff2"); font-weight: 700; }
`;
const common = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: "NotoSC", "Microsoft YaHei", sans-serif; color: #F5EFE3; }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); mask-image: radial-gradient(85% 80% at 50% 40%, #000 20%, transparent 100%); }
.vignette { position: absolute; inset: 0; background: radial-gradient(70% 60% at 50% 45%, transparent 40%, rgba(0,0,0,0.55) 100%); }
.glow { position: absolute; background: radial-gradient(circle, rgba(228,180,92,0.16) 0%, transparent 65%); }
.topbar { position: absolute; display: flex; justify-content: space-between; align-items: center; letter-spacing: 5px; color: #8E97A8; }
.topbar .brand { display: flex; align-items: center; gap: 12px; color: #E4B45C; }
.diamond { background: #E4B45C; transform: rotate(45deg); }
.kicker { color: #E4B45C; }
.title { font-weight: 700; color: #F7F2E7; }
.title .gold { color: #EBCB8B; }
.sub { color: #AAB3C2; }
.rule { background: linear-gradient(90deg, #E4B45C, rgba(228,180,92,0.1)); }
.ghost { position: absolute; font-weight: 700; line-height: 1; color: rgba(228,180,92,0.07); }
.card { position: absolute; background: #F8F3E9; border-radius: 8px; padding: 12px; box-shadow: 0 40px 90px rgba(0,0,0,0.65), 0 0 0 1px rgba(228,180,92,0.32); }
.card img { display: block; width: 100%; border-radius: 3px; }
.card .cap { margin-top: 10px; font-size: 15px; color: #4A4F5A; line-height: 1.5; }
.meta { position: absolute; color: #8E97A8; letter-spacing: 2px; }
.meta b { color: #E4B45C; font-weight: 400; }
.seal { position: absolute; border: 3px solid rgba(196,71,58,0.85); border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #D25A4B; font-weight: 700; transform: rotate(-6deg); opacity: 0.9; }
`;

function html169(c) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}${common}
  html,body{width:1920px;height:1080px;overflow:hidden;background:#060A12;}
  .canvas{position:relative;width:1920px;height:1080px;overflow:hidden;background:radial-gradient(120% 90% at 10% 0%,#14243E 0%,#0A1424 46%,#060A12 100%);}
  .grid{background-size:96px 96px;}
  .glow{width:1100px;height:1100px;right:-260px;top:-320px;}
  .topbar{left:110px;right:110px;top:62px;font-size:22px;}
  .diamond{width:10px;height:10px;}
  .main{position:absolute;left:110px;top:250px;width:1040px;}
  .kicker{font-size:26px;letter-spacing:8px;}
  .title{margin-top:24px;font-size:118px;line-height:1.1;letter-spacing:2px;}
  .sub{margin-top:28px;font-size:34px;line-height:1.6;}
  .rule{margin-top:34px;width:140px;height:3px;}
  .visual{position:absolute;right:100px;top:150px;width:760px;height:800px;}
  .ghost{right:0;top:-60px;font-size:420px;letter-spacing:-10px;}
  .card{width:${c.w169}px;right:60px;top:140px;transform:rotate(-4deg);}
  .meta{left:110px;bottom:84px;font-size:22px;}
  .seal{right:110px;bottom:80px;width:108px;height:108px;font-size:62px;}
  </style></head><body><div class="canvas">
  <div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main"><div class="kicker">${c.kicker}</div><div class="title">${c.title}</div><div class="sub">${c.sub}</div><div class="rule"></div></div>
  <div class="visual"><div class="ghost">${c.ghost}</div><div class="card"><img src="file:///${ROOT}/public/${c.img}" /><div class="cap">${c.cap}</div></div></div>
  <div class="meta">${c.meta}</div><div class="seal">税</div>
  </div></body></html>`;
}

function html34(c) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}${common}
  html,body{width:1080px;height:1440px;overflow:hidden;background:#060A12;}
  .canvas{position:relative;width:1080px;height:1440px;overflow:hidden;background:radial-gradient(120% 80% at 10% 0%,#14243E 0%,#0A1424 46%,#060A12 100%);}
  .grid{background-size:84px 84px;}
  .glow{width:900px;height:900px;right:-300px;top:-260px;}
  .topbar{left:72px;right:72px;top:54px;font-size:18px;}
  .diamond{width:9px;height:9px;}
  .main{position:absolute;left:72px;top:168px;width:936px;}
  .kicker{font-size:24px;letter-spacing:7px;}
  .title{margin-top:18px;font-size:88px;line-height:1.14;letter-spacing:1px;}
  .sub{margin-top:22px;font-size:27px;line-height:1.7;}
  .rule{margin-top:26px;width:130px;height:3px;}
  .visual{position:absolute;left:40px;right:40px;top:640px;height:700px;}
  .ghost{right:20px;top:-50px;font-size:330px;}
  .card{width:${c.w34}px;left:50%;bottom:50px;transform:translateX(-50%) rotate(-1.2deg);}
  .meta{left:72px;bottom:70px;font-size:21px;}
  .seal{right:76px;bottom:64px;width:96px;height:96px;font-size:56px;}
  </style></head><body><div class="canvas">
  <div class="grid"></div><div class="glow"></div><div class="vignette"></div>
  <div class="topbar"><div class="brand"><span class="diamond"></span><span>税种系列 · TAX HISTORY</span></div><div>起源 / 发展 / 原理</div></div>
  <div class="main"><div class="kicker">${c.kicker}</div><div class="title">${c.title}</div><div class="sub">${c.sub}</div><div class="rule"></div></div>
  <div class="visual"><div class="ghost">${c.ghost}</div><div class="card"><img src="file:///${ROOT}/public/${c.img}" /><div class="cap">${c.cap}</div></div></div>
  <div class="meta">${c.meta}</div><div class="seal">税</div>
  </div></body></html>`;
}

function render(html, out, w, h, profile) {
  const htmlPath = path.join(tmp, profile + ".html");
  fs.writeFileSync(htmlPath, html);
  execFileSync(chrome, [
    "--headless=new", "--no-sandbox", "--hide-scrollbars", "--disable-gpu",
    "--force-device-scale-factor=1", "--window-size=" + w + "," + h,
    "--allow-file-access-from-files", "--virtual-time-budget=4000",
    "--user-data-dir=" + path.join(tmp, "profile-" + profile),
    "--screenshot=" + out,
    "file:///" + htmlPath.replace(/\\/g, "/"),
  ], { stdio: "ignore" });
  console.log("rendered", out);
}

for (const c of items) {
  render(html169(c), path.join(OUT169, c.file + ".png"), 1920, 1080, c.id + "-169");
  render(html34(c), path.join(OUT34, c.file + ".png"), 1080, 1440, c.id + "-34");
}
