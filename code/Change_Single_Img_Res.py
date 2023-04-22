import os
from PIL import Image

path_l = '../images/small-images/game/'
path_h = '../images/big-images/game/'


imageName = 'Untitled-18.jpeg'

im_h = Image.open(path_h + imageName)
im_l = im_h.resize((800, 800))
im_l.save(path_l + imageName, quality=85)
