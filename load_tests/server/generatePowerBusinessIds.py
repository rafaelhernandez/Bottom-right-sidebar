import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

def truncated_power_law(a, m):
    x = np.arange(1, m+1, dtype='float')
    pmf = 1/x**a
    pmf /= pmf.sum()
    return stats.rv_discrete(values=(range(1, m+1), pmf))

a, m = 1.16, 1000
d = truncated_power_law(a=a, m=m)

N = 5*(10**4)
sample = d.rvs(size=N)

t = open('businessIds_load_testing.csv', 'w+')

for n in sample:
  t.write(str(n * 200) + '\n')
# plt.hist(sample, bins=np.arange(m)+0.5)
# plt.show()

t.close()