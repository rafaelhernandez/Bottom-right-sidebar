import csv

t = open('photo.csv', 'w')

tid = 1
with open('yelp_photo.csv', 'rb') as csvfile:
    yt = csv.reader(csvfile, delimiter=',', quotechar='"')
    for yt_line in yt:
        for i in range(50):
            t.write(str(tid) + ',' + str((tid % 206949) + 1) + ',' + str(tid) + ',"' + yt_line[2] + '","' + yt_line[3] + '"\n')        
            tid += 1

t.close()