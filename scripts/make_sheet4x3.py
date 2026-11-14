from PIL import Image
import os
d = r"F:\deepseek\vat-video\out\covers\4x3"
files = [
 "01-series-税种起源与发展.png","02-增值税-国外篇.png","03-增值税-中国篇.png","04-企业所得税-国外篇.png",
 "05-企业所得税-中国篇.png","06-个人所得税-国外篇.png","07-个人所得税-中国篇.png","08-印花税.png",
 "09-消费税-国外篇.png","10-消费税-中国篇.png","11-关税.png","09-税收原理.png",
 "10-合集-税种起源发展与税收原理.png",
]
sheet = Image.new("RGB",(1440,1080),(6,10,18))
for i,f in enumerate(files):
    im = Image.open(os.path.join(d,f)).convert("RGB").resize((360,270),Image.LANCZOS)
    x=(i%4)*360; y=(i//4)*270
    sheet.paste(im,(x,y))
out=os.path.join(d,"00-sheet-4x3.png"); sheet.save(out); print("saved",out,os.path.getsize(out))
