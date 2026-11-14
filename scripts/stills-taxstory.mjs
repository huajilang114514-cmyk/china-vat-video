import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const [comp, ...frames] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: comp });
fs.mkdirSync("out/taxstory-stills", { recursive: true });
for (const f of frames.map(Number)) {
  const output = "out/taxstory-stills/" + comp + "-" + String(f).padStart(5, "0") + ".png";
  await renderStill({ composition, serveUrl, output, frame: f, browserExecutable: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", imageFormat: "png" });
  console.log("rendered", output);
}
