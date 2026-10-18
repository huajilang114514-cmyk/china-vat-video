import sqlite3, sys, os
for p in sys.argv[1:]:
    print("==", p, "exists", os.path.exists(p))
    if not os.path.exists(p):
        continue
    try:
        db = sqlite3.connect(p)
        n = db.execute("select count(*) from cookies").fetchone()[0]
        rows = db.execute("select host_key, name, length(encrypted_value) from cookies where host_key like '%chatgpt%' or host_key like '%openai%' or host_key like '%auth0%'").fetchall()
        print("total cookies", n, "chatgpt/openai rows", len(rows))
        for r in rows[:15]:
            print("  ", r)
    except Exception as e:
        print("ERR", e)
