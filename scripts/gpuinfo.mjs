import { spawn } from "node:child_process";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9333;
const proc = spawn(
  chrome,
  [
    "--headless=old",
    "--remote-debugging-port=" + port,
    "--no-sandbox",
    "--disable-gpu-sandbox",
    "--use-gl=angle",
    "--user-data-dir=F:\\deepseek\\vat-video\\.tmp\\gpuchk",
    "about:blank",
  ],
  { stdio: "ignore" }
);

await new Promise((r) => setTimeout(r, 3500));

const list = await (await fetch("http://127.0.0.1:" + port + "/json/list")).json();
const target = list.find((t) => t.type === "page");
if (!target) {
  console.log("no page target", JSON.stringify(list));
  proc.kill();
  process.exit(1);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send("Page.enable");
await send("Page.navigate", { url: "chrome://gpu" });
await new Promise((r) => setTimeout(r, 4000));
const r = await send("Runtime.evaluate", {
  expression: "document.body.innerText",
  returnByValue: true,
});
const text = r.result?.result?.value ?? "";
console.log(text.slice(0, 4000));
ws.close();
proc.kill();
