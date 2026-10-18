import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
const frames = process.argv.slice(2).map(Number);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "VatCorporate" });
fs.mkdirSync("out/corp-stills", { recursive: true });
for (const frame of frames) {
  const output = "out/corp-stills/f" + String(frame).padStart(5, "0") + ".png";
  await renderStill({ composition, serveUrl, output, frame, browserExecutable: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", imageFormat: "png" });
  console.log("rendered", output);
}
