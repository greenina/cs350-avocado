import csv
import numpy as np
from sklearn.preprocessing import MinMaxScaler

file_name = 'path2.csv'
with open(file_name, 'rt', encoding='UTF-8') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    
    vibration = []
    pressure = []
    tilt = []
    for row in reader:
        vibration.append(int(row[1]))
        pressure.append(int(row[2]))
        tilt.append(int(row[3]))
    
    vibration = np.array(vibration)
    pressure = np.array(pressure)
    tilt = ( np.array(tilt) ) / 4225

num_batch = 30
num_size = int(tilt.shape[0] / num_batch)

rough = []
rough_vib = []
rough_pres = []
slope = []
curr_height = 0.0
for i in range(num_batch):
    if i != num_batch-1:
        curr_height += np.sum(tilt[i*num_size:(i+1)*num_size])
        rough_vib = np.mean(vibration[i*num_size:(i+1)*num_size])
        rough_pres = np.mean(pressure[i*num_size:(i+1)*num_size])
    else:
        curr_height += np.sum(tilt[i*num_size:])
        rough_vib = np.mean(vibration[i*num_size:])
        rough_pres = np.mean(pressure[i*num_size:])

    if rough_pres < 300 or rough_vib > 100:
        rough.append(2)
    elif rough_vib > 10 and rough_vib <= 100:
        rough.append(1)
    else :
        rough.append(0)
    slope.append(curr_height)
scaler = MinMaxScaler()
slope = scaler.fit_transform(np.array(slope).reshape(-1,1)).reshape(-1) * 100
slope = slope.astype(int).tolist()

print(file_name)
print(rough)
print(slope)