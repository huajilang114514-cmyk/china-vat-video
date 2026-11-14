import fs from "node:fs";
import path from "node:path";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { parseFile } from "music-metadata";
const ROOT = "F:/deepseek/vat-video";
const stories = JSON.parse(fs.readFileSync(ROOT + "/src/taxstory/stories.json", "utf8"));
const target = stories.find((s) => s.id === process.argv[2]);
const rate = process.argv[3] || "+35%";
const dir = path.join(ROOT, "public/tax-audio");
const tts = new MsEdgeTTS({ connectionTimeoutMs: 30000, synthesisTimeoutMs: 90000 });
await tts.setMetadata("zh-CN-YunyangNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
const out = {};
for (const b of target.beats) {
  const key = target.id + "-" + b.id;
  for (let i = 0; i < 3; i++) {
    try {
      const { audioFilePath } = await tts.toFile(dir, b.narration, { rate });
      const dst = path.join(dir, key + ".mp3");
      fs.copyFileSync(audioFilePath, dst);
      fs.unlinkSync(audioFilePath);
      const meta = await parseFile(dst);
      out[key] = { audio: "tax-audio/" + key + ".mp3", seconds: meta.format.duration };
      console.log(key, meta.format.duration.toFixed(2));
      break;
    } catch (e) { console.log("retry", key, String(e?.message ?? e).slice(0, 60)); }
  }
}
tts.close();
const mp = path.join(ROOT, "src/taxstory/narration.ts");
const text = fs.readFileSync(mp, "utf8");
const jsonStart = text.indexOf("= {") + 2;
const manifest = JSON.parse(text.slice(jsonStart, text.lastIndexOf("}") + 1));
Object.assign(manifest, out);
fs.writeFileSync(mp, "export const TAX_NARRATION: Record<string, { audio: string; seconds: number }> = " + JSON.stringify(manifest, null, 2) + ";\n");
console.log("updated manifest");
