import { execFileSync } from "node:child_process";
import fs from "node:fs";
const ROOT = "F:/deepseek/vat-video";
const plans = [
  ["chechuan", "classic car"],
  ["chengzhen", "construction site city"],
  ["ziyuan", "coal mine"],
  ["gengdi", "farmland field"],
  ["huanjing", "factory chimney smoke"],
  ["tudi", "apartment buildings China"],
  ["chegou", "car showroom"],
  ["chengjian", "city skyline China"],
  ["chuanbo", "container ship"],
];
const curl = (args) => execFileSync("curl", args, { encoding: "utf8", maxBuffer: 10 * 1024 * 1024 });
for (const [id, q] of plans) {
  try {
    const search = JSON.parse(curl(["-s", "-m", "30", "--get", "https://commons.wikimedia.org/w/api.php", "--data-urlencode", "action=query", "--data-urlencode", "list=search", "--data-urlencode", "srnamespace=6", "--data-urlencode", "srlimit=6", "--data-urlencode", "format=json", "--data-urlencode", "srsearch=" + q]));
    const titles = (search.query?.search || []).map((x) => x.title).filter((t) => /\.(jpg|jpeg|png)$/i.test(t));
    if (!titles.length) { console.log("NO", id); continue; }
    const title = titles[0];
    const info = JSON.parse(curl(["-s", "-m", "30", "--get", "https://commons.wikimedia.org/w/api.php", "--data-urlencode", "action=query", "--data-urlencode", "prop=imageinfo", "--data-urlencode", "iiprop=url|extmetadata", "--data-urlencode", "format=json", "--data-urlencode", "titles=" + title]));
    const page = Object.values(info.query.pages)[0];
    const ii = page.imageinfo?.[0];
    if (!ii) { console.log("NOINFO", id); continue; }
    const lic = ii.extmetadata?.LicenseShortName?.value || "";
    const url = ii.url.split("?")[0];
    const out = ROOT + "/public/tax-assets/" + id + ".jpg";
    curl(["-sL", "-m", "120", url, "-o", out]);
    console.log("OK", id, title, lic, Math.round(fs.statSync(out).size / 1024) + "KB");
  } catch (e) {
    console.log("ERR", id, String(e.message).slice(0, 100));
  }
}
