from PIL import Image
import os
d34 = r"F:\deepseek\vat-video\out\covers\3x4"
d = r"F:\deepseek\vat-video\out\covers"
files = [
 (d34,"02-增值税-国外篇.png"),(d34,"03-增值税-中国篇.png"),(d34,"04-企业所得税-国外篇.png"),(d34,"05-企业所得税-中国篇.png"),
 (d34,"06-个人所得税-国外篇.png"),(d34,"07-个人所得税-中国篇.png"),(d34,"08-印花税.png"),
 (d,"11-合集-税种起源发展与税收原理-竖版3x4.png"),
]
sheet = Image.new("RGB",(1080,720),(6,10,18))
for i,(rootp,f) in enumerate(files):
    im = Image.open(os.path.join(rootp,f)).convert("RGB").resize((270,360),Image.LANCZOS)
    x=(i%4)*270; y=(i//4)*360
    sheet.paste(im,(x,y))
out=os.path.join(d,"00-cover-sheet-3x4.png"); sheet.save(out); print("saved",out,os.path.getsize(out))
