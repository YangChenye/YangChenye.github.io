import exifread
import os

path_l = '../images/small-images/'
path_h = '../images/big-images/'

imageFolder = 'delaware-water-gap/'

# read files names
files = os.listdir(path_h + imageFolder)

# delete .DS_Store
for item in files:
	if item.startswith('.') and os.path.isfile(os.path.join(path_h, item)):
		files.remove(item)
files.sort()

for file in files:
	# Open image file for reading (binary mode)
	f = open(path_h + imageFolder + file, 'rb')
	# Return Exif tags
	tags = exifread.process_file(f)
	print(' ')
	print('<h4>{}/{}/{}</h4><p>{} {}, {}, {} mm, {} sec, f/{}, ISO {}, ColorSpace: {}, Copyright: &copy; {}</p>'.format(file.split('-')[0][4:6], file.split('-')[0][6:], file.split('-')[0][0:4], tags['Image Make'], tags['Image Model'], tags['EXIF LensModel'], tags['EXIF FocalLength'], tags['EXIF ExposureTime'], tags['EXIF FNumber'].values[0].num / tags['EXIF FNumber'].values[0].den, tags['EXIF ISOSpeedRatings'], 'Display P3' if tags['EXIF ColorSpace'].values[0] == 65535 else tags['EXIF ColorSpace'], tags['Image Copyright']))

	# for tag in tags.keys():
	# 	if tag not in ('JPEGThumbnail', 'TIFFThumbnail', 'Filename', 'EXIF MakerNote'):
	# 		print ('Key: {}, value {}'.format(tag, tags[tag]))
	
