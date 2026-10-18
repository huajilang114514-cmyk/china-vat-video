import sqlite3
paths = [
    r"C:\Users\lenovo\AppData\Local\Google\Chrome\User Data\Default\Network\Cookies",
    r"C:\Users\lenovo\AppData\Local\Google\Chrome\User Data\Profile 1\Network\Cookies",
    r"C:\Users\lenovo\AppData\Local\Microsoft\Edge\User Data\Default\Network\Cookies",
]
for p in paths:
    try:
        db = sqlite3.connect("file:" + p + "?mode=ro&immutable=1", uri=True)
        rows = db.execute("select host_key, name from cookies where host_key like '%chatgpt.com%' or host_key like '%openai.com%'").fetchall()
        print("==", p, "rows", len(rows))
        for r in rows[:12]:
            print("   ", r)
    except Exception as e:
        print("==", p, "ERR", e)
