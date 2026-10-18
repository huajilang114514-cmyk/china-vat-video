const port = process.env.CDP_PORT || "9334";
const list = await (await fetch("http://127.0.0.1:" + port + "/json/list")).json();
const ws = new WebSocket(list[0].webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
ws.send(JSON.stringify({ id: 1, method: "Browser.close" }));
await new Promise((r) => setTimeout(r, 1500));
console.log("closed", port);
