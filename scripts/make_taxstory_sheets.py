from PIL import Image
import os
covers = r"F:\deepseek\vat-video\out\covers\taxstory"
ids = ["yanye","fangchan","qishui","chechuan","chengzhen","ziyuan","gengdi","huanjing","tudi","chegou","chengjian","chuanbo"]
sheet = Image.new("RGB",(1440,810),(6,10,18))
for i,id in enumerate(ids):
    im = Image.open(os.path.join(covers, id+"-4x3.png")).convert("RGB").resize((360,270),Image.LANCZOS)
    sheet.paste(im,((i%4)*360,(i//4)*270))
sheet.save(os.path.join(covers,"sheet-4x3.png"))
print("sheet-4x3 ok")
