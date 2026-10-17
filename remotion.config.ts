import fs from "node:fs";
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// 并发数交给 Remotion 自动决定（GitHub 私有仓库 runner 只有 2 核，写死 4 会报错）

// Windows 本地：优先使用已安装的 Chrome，避免重复下载
// Linux / CI：不设置，让 Remotion 使用自动下载的 Chrome Headless Shell
const winChrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
if (process.platform === "win32" && fs.existsSync(winChrome)) {
  Config.setBrowserExecutable(winChrome);
}
