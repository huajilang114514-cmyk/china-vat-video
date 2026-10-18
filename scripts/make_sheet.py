from PIL import Image
import os
d = r"F:\deepseek\vat-video\out\covers"
files = [
 "01-series-税种起源与发展.png","02-增值税-国外篇.png","03-增值税-中国篇.png",
 "04-企业所得税-国外篇.png","05-企业所得税-中国篇.png","06-个人所得税-国外篇.png",
 "07-个人所得税-中国篇.png","08-印花税.png","09-税收原理.png",
]
sheet = Image.new("RGB", (1920, 1080), (6, 10, 18))
for i, f in enumerate(files):
    im = Image.open(os.path.join(d, f)).convert("RGB").resize((640, 360), Image.LANCZOS)
    x = (i % 3) * 640
    y = (i // 3) * 360
    sheet.paste(im, (x, y))
out = os.path.join(d, "00-cover-sheet.png")
sheet.save(out)
print("saved", out, os.path.getsize(out))
