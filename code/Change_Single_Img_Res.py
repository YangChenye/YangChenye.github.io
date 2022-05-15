import os
from PIL import Image

path_l = '../images/small-images/experience/'
path_h = '../images/big-images/experience/'


imageName = 'wilo-3.jpg'

im_h = Image.open(path_h + imageName)
im_l = im_h.resize((900, 1200))
im_l.save(path_l + imageName, quality=85)
