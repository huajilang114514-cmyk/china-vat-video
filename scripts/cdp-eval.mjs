const port = process.env.CDP_PORT || "9333";
const list = await (await fetch("http://127.0.0.1:" + port + "/json/list")).json();
const page = list.find((t) => t.type === "page" && t.url.includes("chatgpt.com"));
if (!page) { console.log("NO PAGE", JSON.stringify(list.map(t => t.url))); process.exit(0); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map();
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Runtime.enable");
const r = await send("Runtime.evaluate", { expression: "document.body.innerText", returnByValue: true });
const text = r.result?.result?.value ?? "";
console.log("URL:", page.url);
console.log("TEXT_START");
console.log(text.slice(0, 1500));
console.log("TEXT_END");
ws.close();
