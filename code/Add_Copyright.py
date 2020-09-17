import os
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

def copyright_apply(input_image_path,
                   output_image_path,
                   text):
    photo = Image.open(input_image_path)
    
    #Store image width and height
    w, h = photo.size
    

    # make the image editable
    drawing = ImageDraw.Draw(photo)
    font = ImageFont.truetype("Times New Roman.ttf", 68)
    
    #get text width and height
    text = "   © " + text + "   "
    text_w, text_h = drawing.textsize(text, font)
    
    pos = w - text_w, (h - text_h) - 50
    
    c_text = Image.new('RGB', (text_w, (text_h)), color = '#000000')
    drawing = ImageDraw.Draw(c_text)
    
    drawing.text((0,0), text, fill="#ffffff", font=font)
    c_text.putalpha(100)
   
    photo.paste(c_text, pos, c_text)
    photo.save(output_image_path)




path_h = 'images/big-images/'
path_c = 'images/copyright-images/'

imageFolder = 'alstede-farm/'

# read files names
files = os.listdir(path_h + imageFolder)

# delete .DS_Store
for item in files:
    if item.startswith('.') and os.path.isfile(os.path.join(path_h, item)):
        files.remove(item)

for file in files:
    input_img = path_h + imageFolder + file
    output_img = path_c + imageFolder + file
    text = "Chenye Yang"
    copyright_apply(input_img, output_img, text)