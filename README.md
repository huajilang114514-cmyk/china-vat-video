# 中国增值税科普视频（Remotion）

用 React 代码生成的 3 分 21 秒中文科普视频：中国增值税的起源、发展过程与税收原理。

- 规格：1920×1080 / 30fps / 12 场 / 含中文 TTS 旁白
- 视觉：深色财经纪录片风格，金色主色 + 朱红印章
- 事实核查：见 `research/vat-facts.md`，分镜脚本见 `审核稿-分镜脚本.md`

## 本地渲染

```powershell
npm ci
npx remotion studio src/index.ts               # 预览
npx remotion render src/index.ts VatExplainer out/video.mp4
```

Windows 下会自动使用系统 Chrome；其他系统会自动下载 Chrome Headless Shell。

## 云端渲染（GitHub Actions）

1. 把仓库推到 GitHub（public 仓库 Actions 分钟数不限）。
2. 打开 Actions → **Render Video** → Run workflow：
   - `scale=1` 渲染 1080p；`scale=0.5` 渲染 540p 草稿
   - `frames` 可留空（全片），或填 `0-299` 只渲染一段测试
3. 跑完后在 run 页面底部下载 `vat-video` artifact。

预计耗时：1080p 全片约 20–35 分钟（4 核 Linux runner）。

## 目录

```
src/            场景与组件（scenes.tsx / components.tsx / VatVideo.tsx）
public/audio/   TTS 旁白
scripts/        stills / tts / 基准测试脚本
research/       事实核查底稿
.github/        GitHub Actions 工作流
```

## 依赖说明

- Node.js 18+
- Chromium（本机 Chrome 或 Remotion 自动下载的 Headless Shell）
- ffmpeg 已随 @remotion/compositor 打包，无需单独安装
- TTS 旁白已生成好（`public/audio/*.mp3`），重新生成需运行 `node scripts/tts.mjs`（依赖 Edge TTS 网络）
