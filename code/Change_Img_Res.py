import os
from PIL import Image

path_l = 'images/small-images/'
path_h = 'images/big-images/'

imageFolder = 'background-images/'

# read files names
files = os.listdir(path_h + imageFolder)

# delete .DS_Store
for item in files:
    if item.startswith('.') and os.path.isfile(os.path.join(path_h, item)):
        files.remove(item)

for file in files:
    im_h = Image.open(path_h + imageFolder + file)
    im_l = im_h.resize((3000, 2000))
    im_l.save(path_l + imageFolder + file, quality=85)