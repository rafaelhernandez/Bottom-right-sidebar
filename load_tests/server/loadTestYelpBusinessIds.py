import csv

t = open('tip.csv', 'a+')
b = open('business.csv')

businessIds = []
for line in b:
    b_line = line.split(',')
    businessIds.append(b_line[0].strip('"'))

tid = 0
with open('yelp_tip.csv', 'rb') as csvfile:
    yt = csv.reader(csvfile, delimiter=',', quotechar='"')
    for yt_line in yt:
        for i in range(11):
            tid += 1
            t.write(str(tid) + ',' + yt_line[1] + ',' + businessIds[tid].strip('"') + ',' + yt_line[3] + ',' + yt_line[4] + ',' + str(yt_line[5]) + '\n')        

t.close()
b.close()