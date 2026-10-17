import path from "node:path";
import { execFileSync } from "node:child_process";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const KEY = "HKCU\\Software\\Microsoft\\DirectX\\UserGpuPreferences";
const NAME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const setPref = (on) => {
  try {
    if (on) {
      execFileSync("reg", ["add", KEY, "/v", NAME, "/t", "REG_SZ", "/d", "GpuPreference=2;", "/f"], { stdio: "ignore" });
    } else {
      execFileSync("reg", ["delete", KEY, "/v", NAME, "/f"], { stdio: "ignore" });
    }
  } catch (e) {}
};

const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "VatExplainer" });

const run = async (label, on) => {
  setPref(on);
  const t0 = Date.now();
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    outputLocation: "out/bench3-" + label + ".mp4",
    frameRange: [0, 59],
    scale: 1,
    concurrency: 4,
    browserExecutable: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    chromiumOptions: { gl: "angle" },
    imageFormat: "jpeg",
    logLevel: "error",
  });
  const secs = (Date.now() - t0) / 1000;
  console.log("RUN " + label + " " + secs.toFixed(1) + "s");
  return secs;
};

const a = await run("igpu-1", false);
const b = await run("dgpu-1", true);
const c = await run("igpu-2", false);
const d = await run("dgpu-2", true);
setPref(false);
console.log("SUMMARY 1080p igpu(avg)=" + ((a + c) / 2).toFixed(1) + "s dgpu(avg)=" + ((b + d) / 2).toFixed(1) + "s");
