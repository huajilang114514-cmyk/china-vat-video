import fs from "node:fs";
import path from "node:path";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { parseFile } from "music-metadata";

const ROOT = "F:/deepseek/vat-video";
const stories = JSON.parse(fs.readFileSync(path.join(ROOT, "src/taxstory/stories.json"), "utf8"));
const VOICE = process.env.TTS_VOICE || "zh-CN-YunyangNeural";
const dir = path.join(ROOT, "public/tax-audio");
fs.mkdirSync(dir, { recursive: true });
const tts = new MsEdgeTTS({ connectionTimeoutMs: 30000, synthesisTimeoutMs: 90000 });
await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
const manifest = {};
for (const s of stories) {
  for (const b of s.beats) {
    const key = s.id + "-" + b.id;
    const target = path.join(dir, key + ".mp3");
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const { audioFilePath } = await tts.toFile(dir, b.narration, { rate: "+8%" });
        fs.copyFileSync(audioFilePath, target);
        fs.unlinkSync(audioFilePath);
        const meta = await parseFile(target);
        manifest[key] = { audio: "tax-audio/" + key + ".mp3", seconds: meta.format.duration };
        console.log("OK", key, meta.format.duration.toFixed(2));
        break;
      } catch (e) {
        console.log("RETRY", key, attempt, String(e?.message ?? e));
        await new Promise((r) => setTimeout(r, 1200));
      }
    }
  }
}
tts.close();
fs.writeFileSync(path.join(ROOT, "src/taxstory/narration.ts"), "export const TAX_NARRATION: Record<string, { audio: string; seconds: number }> = " + JSON.stringify(manifest, null, 2) + ";\n");
console.log("TOTAL", Object.values(manifest).reduce((a, b) => a + b.seconds, 0).toFixed(1));
