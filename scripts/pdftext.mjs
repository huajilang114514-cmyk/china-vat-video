import fs from "node:fs";
import { PDFParse } from "pdf-parse";

for (const f of process.argv.slice(2)) {
  const buf = fs.readFileSync(f);
  const parser = new PDFParse({ data: buf });
  const result = await parser.getText();
  await parser.destroy?.();
  console.log("### " + f + " len=" + result.text.length);
  console.log(result.text.slice(0, 2200).replace(/\n{3,}/g, "\n\n"));
  console.log("\n========================================\n");
}
