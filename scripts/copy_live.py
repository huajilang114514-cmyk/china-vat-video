import shutil, sqlite3
pairs = [
    (r"C:\Users\lenovo\AppData\Local\Google\Chrome\User Data\Profile 1\Network\Cookies", r"F:\deepseek\vat-video\.tmp\dbcheck2\chrome-Profile1.db"),
    (r"C:\Users\lenovo\AppData\Local\Microsoft\Edge\User Data\Default\Network\Cookies", r"F:\deepseek\vat-video\.tmp\dbcheck2\edge-Default.db"),
]
for src, dst in pairs:
    try:
        shutil.copyfile(src, dst)
        db = sqlite3.connect(dst)
        rows = db.execute("select host_key, name from cookies where host_key like '%chatgpt.com%' or host_key like '%openai.com%'").fetchall()
        print("==", src, "rows", len(rows))
        for r in rows[:12]:
            print("   ", r)
    except Exception as e:
        print("==", src, "ERR", e)
