import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_FAMILY = "NotoSC";

// 拉丁字符（数字、英文）子集
const LATIN_RANGE =
  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD";

// 中文字体（简中子集），打包进项目，保证本地与 CI 渲染一致
loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/noto-latin-400.woff2"),
  weight: "400",
  unicodeRange: LATIN_RANGE,
});
loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/noto-latin-700.woff2"),
  weight: "700",
  unicodeRange: LATIN_RANGE,
});
loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/noto-400.woff2"),
  weight: "400",
});
loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/noto-700.woff2"),
  weight: "700",
});
