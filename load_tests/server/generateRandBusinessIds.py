import random
import sys

num = int(sys.argv[1])
t = open('businessIds_load_testing.csv', 'w+')

for x in range(num):
  t.write(str(random.randint(1,10000000)) + '\n')

t.close()