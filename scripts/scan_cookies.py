import sqlite3, glob, os
files = glob.glob(r"F:\deepseek\vat-video\.tmp\dbcheck\*.db")
print("files", len(files))
for f in files:
    try:
        db = sqlite3.connect(f)
        n = db.execute("select count(*) from cookies").fetchone()[0]
        rows = db.execute("select host_key, name from cookies where host_key like '%chatgpt.com%' or host_key like '%openai.com%'").fetchall()
        print(os.path.basename(f), "total", n, "openai", len(rows))
        for r in rows[:10]:
            print("   ", r)
    except Exception as e:
        print(f, "ERR", e)
