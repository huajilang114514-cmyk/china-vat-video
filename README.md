# 中国增值税科普视频（Remotion）

用 React 代码生成的约 2 分 26 秒中文科普视频：中国增值税的起源、发展过程与税收原理。

- 规格：1920×1080 / 30fps / 9 场 / 中文 TTS 旁白 / 文献截图 + 数据可视化
- 视觉：深色财经纪录片风格，金色主色 + 朱红印章；文献以「档案卡片」形式呈现
- 事实核查：`research/vat-facts.md`；脚本：`审核稿-2分30秒版.md`

## 本地渲染

```powershell
npm ci
npx remotion studio src/index.ts               # 预览
npx remotion render src/index.ts VatExplainer out/video.mp4
```

Windows 下自动使用系统 Chrome；其他系统自动下载 Chrome Headless Shell。

## 云端渲染（GitHub Actions）

1. 仓库：https://github.com/huajilang114514-cmyk/china-vat-video （public）
2. Actions → **Render Video** → Run workflow：
   - `scale=1` 渲染 1080p；`scale=0.5` 渲染 540p 草稿
   - `frames` 留空渲染全片，或填 `0-299` 只渲染一段
3. 完成后在 run 页面下载 `vat-video` artifact。

## 文献素材与来源（均为公文/官方页面截图，不含版权风险）

| 文件 | 内容 | 来源 |
|---|---|---|
| crop-1984b.jpg | 《增值税条例（草案）》 | 广东省人民政府公报（1984 年第 12 期） |
| crop-1994.jpg | 国务院令第 134 号《增值税暂行条例》 | 深圳市人民政府公报（1993 年第 12 期） |
| crop-2016.jpg | 财税〔2016〕36 号 营改增通知 | 中国政府网 |
| crop-law2024.jpg | 《增值税法》主席令第四十一号 | 国家税务总局上海市税务局 |
| crop-mof2025.jpg | 财政部《2025 年财政收支情况》 | 财政部预算司 |
| crop-france1954.jpg | 法国国家档案馆：1954 年增值税立法 + 莫里斯·洛雷照片 | FranceArchives |

## 目录

```
src/            场景与组件（scenes.tsx / components.tsx / VatVideo.tsx）
public/audio/   TTS 旁白（9 段）
public/assets/  文献截图素材
scripts/        stills / tts / 基准测试脚本
research/       事实核查底稿
.github/        GitHub Actions 工作流
```
