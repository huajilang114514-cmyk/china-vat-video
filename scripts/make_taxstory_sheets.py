from PIL import Image
import os
covers = r"F:\deepseek\vat-video\out\covers\taxstory"
ids = ["yanye","fangchan","qishui","chechuan","chengzhen","ziyuan","gengdi","huanjing","tudi","chegou","chengjian","chuanbo"]
s43 = Image.new("RGB",(1440,810),(6,10,18))
for i,id in enumerate(ids):
    im = Image.open(os.path.join(covers, id+"-4x3.png")).convert("RGB").resize((360,270),Image.LANCZOS)
    s43.paste(im,((i%4)*360,(i//4)*270))
s43.save(os.path.join(covers,"sheet-4x3.png"))
s34 = Image.new("RGB",(1080,1080),(6,10,18))
for i,id in enumerate(ids):
    im = Image.open(os.path.join(covers, id+"-3x4.png")).convert("RGB").resize((270,360),Image.LANCZOS)
    s34.paste(im,((i%4)*270,(i//4)*360))
s34.save(os.path.join(covers,"sheet-3x4.png"))
print("sheets ok")
