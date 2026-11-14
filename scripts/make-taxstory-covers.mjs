import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = "F:/deepseek/vat-video";
const stories = JSON.parse(fs.readFileSync(ROOT + "/src/taxstory/stories.json", "utf8"));
const OUT = ROOT + "/out/covers/taxstory";
fs.mkdirSync(OUT, { recursive: true });
const FONT = ROOT + "/public/fonts";
const tmp = ROOT + "/.tmp/covers-taxstory";
fs.mkdirSync(tmp, { recursive: true });
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const base = `
@font-face { font-family:"NotoSC"; src:url("file:///${FONT}/noto-400.woff2") format("woff2"); font-weight:400; }
@font-face { font-family:"NotoSC"; src:url("file:///${FONT}/noto-700.woff2") format("woff2"); font-weight:700; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"NotoSC","Microsoft YaHei",sans-serif;color:#F5EFE3;background:#050A12}
.canvas{position:relative;overflow:hidden;background:radial-gradient(120% 90% at 8% 0%,#14243E 0%,#0A1424 46%,#050A12 100%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:86px 86px;mask-image:radial-gradient(80% 80% at 50% 45%,#000 20%,transparent 100%)}
.hero{position:absolute;overflow:hidden}
.hero img{width:100%;height:100%;object-fit:cover;filter:saturate(.85) contrast(1.08)}
.kicker{display:flex;align-items:center;gap:12px;color:#E4B45C;font-size:22px;letter-spacing:6px}
.diamond{width:9px;height:9px;background:#E4B45C;transform:rotate(45deg)}
.title{font-weight:700;color:#F7F2E7;letter-spacing:2px;line-height:1.12}
.gold{color:#EBCB8B}
.sub{color:#AAB3C2;line-height:1.7}
.chips{display:flex;gap:12px;flex-wrap:wrap}
.chip{border:1px solid rgba(228,180,92,.45);background:rgba(228,180,92,.08);border-radius:999px;padding:9px 18px;color:#EBCB8B;font-size:20px;letter-spacing:1px}
.brand{position:absolute;color:#8E97A8;font-size:17px;letter-spacing:4px}
.seal{position:absolute;border:3px solid rgba(196,71,58,.9);border-radius:6px;display:flex;align-items:center;justify-content:center;color:#D25A4B;font-weight:700;transform:rotate(-7deg);background:rgba(10,16,26,.4)}
`;

function html43(s) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .canvas{width:1440px;height:1080px}
  .hero{right:0;top:0;width:820px;height:1080px;clip-path:inset(0 0 0 8%)}
  .shade{position:absolute;inset:0;background:linear-gradient(90deg,#050A12 0%,rgba(5,10,18,.92) 30%,rgba(5,10,18,.35) 66%,rgba(5,10,18,.55) 100%)}
  .main{position:absolute;left:80px;top:180px;width:700px}
  .title{font-size:92px;margin-top:20px}
  .sub{font-size:26px;margin-top:22px}
  .chips{margin-top:30px}
  .line{margin-top:26px;width:120px;height:3px;background:linear-gradient(90deg,#E4B45C,transparent)}
  .brand{left:80px;bottom:54px}
  .seal{right:60px;bottom:60px;width:104px;height:104px;font-size:56px}
  </style></head><body><div class="canvas">
  <div class="grid"></div>
  ${s.image ? `<div class="hero"><img src="file:///${ROOT}/public/${s.image}" /></div><div class="shade"></div>` : ""}
  <div class="main">
    <div class="kicker"><span class="diamond"></span>${s.tax} · ${s.en}</div>
    <div class="title">${s.title.replace(s.tax, '<span class="gold">' + s.tax + "</span>")}</div>
    <div class="sub">${s.subtitle}</div>
    <div class="line"></div>
    <div class="chips">${(s.chips || []).map((c) => `<div class="chip">${c}</div>`).join("")}</div>
  </div>
  <div class="brand">税种系列 · 起源 / 发展 / 原理</div>
  <div class="seal">税</div>
  </div></body></html>`;
}

function html34(s) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
  .canvas{width:1080px;height:1440px}
  .hero{left:0;top:0;width:1080px;height:720px}
  .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,10,18,.15) 0%,rgba(5,10,18,.4) 45%,#050A12 92%)}
  .main{position:absolute;left:70px;top:760px;width:940px}
  .title{font-size:88px;margin-top:18px}
  .sub{font-size:27px;margin-top:20px}
  .chips{margin-top:26px}
  .line{margin-top:24px;width:120px;height:3px;background:linear-gradient(90deg,#E4B45C,transparent)}
  .brand{left:70px;bottom:54px}
  .seal{right:54px;top:44px;width:96px;height:96px;font-size:52px}
  </style></head><body><div class="canvas">
  <div class="grid"></div>
  ${s.image ? `<div class="hero"><img src="file:///${ROOT}/public/${s.image}" /></div><div class="shade"></div>` : ""}
  <div class="main">
    <div class="kicker"><span class="diamond"></span>${s.tax} · ${s.en}</div>
    <div class="title">${s.title.replace(s.tax, '<span class="gold">' + s.tax + "</span>")}</div>
    <div class="sub">${s.subtitle}</div>
    <div class="line"></div>
    <div class="chips">${(s.chips || []).map((c) => `<div class="chip">${c}</div>`).join("")}</div>
  </div>
  <div class="brand">税种系列 · 起源 / 发展 / 原理</div>
  <div class="seal">税</div>
  </div></body></html>`;
}

function render(html, out, w, h, profile) {
  const f = path.join(tmp, profile + ".html");
  fs.writeFileSync(f, html);
  execFileSync(chrome, ["--headless=new","--no-sandbox","--hide-scrollbars","--disable-gpu","--force-device-scale-factor=1","--window-size="+w+","+h,"--allow-file-access-from-files","--virtual-time-budget=3500","--user-data-dir="+path.join(tmp,"p-"+profile),"--screenshot="+out,"file:///"+f.replace(/\\/g,"/")], {stdio:"ignore"});
  console.log("cover", out);
}

for (const s of stories) {
  render(html43(s), path.join(OUT, s.id + "-4x3.png"), 1440, 1080, s.id + "43");
  render(html34(s), path.join(OUT, s.id + "-3x4.png"), 1080, 1440, s.id + "34");
}
