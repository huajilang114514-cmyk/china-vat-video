from PIL import Image
import os
d = r"F:\deepseek\vat-video\out\covers\4x3"
outdir = r"F:\deepseek\vat-video\out\deliverables\4x3-八张"
os.makedirs(outdir, exist_ok=True)
files = ["03-增值税-中国篇.png","04-企业所得税-国外篇.png","05-企业所得税-中国篇.png","06-个人所得税-国外篇.png","07-个人所得税-中国篇.png","08-印花税.png","09-消费税-国外篇.png","10-消费税-中国篇.png"]
import shutil
for f in files:
    shutil.copyfile(os.path.join(d,f), os.path.join(outdir,f))
sheet = Image.new("RGB",(1440,540),(6,10,18))
for i,f in enumerate(files):
    im = Image.open(os.path.join(d,f)).convert("RGB").resize((360,270),Image.LANCZOS)
    sheet.paste(im,((i%4)*360,(i//4)*270))
out=os.path.join(outdir,"00-overview.png"); sheet.save(out); print("saved",out)
