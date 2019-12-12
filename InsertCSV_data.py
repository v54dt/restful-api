import time
import pymongo
import csv
client = pymongo.MongoClient(host = 'localhost',port=27017)
db = client.TestServer
collection = db.ecg


while True:

    with open('ecg_data_50000.csv',newline = '') as csvfile:
        current_time = time.time_ns()
        print(current_time)
        t_shift = int(current_time/1000000 - 1561443546112)
        print(t_shift)
        
        rows = csv.reader(csvfile)
        ind =0
        for row in rows:
            if ind !=0:
                mongo_obj = {
                        'Device_ID' :'AABBCCDD0011',
                        'BLE_Name': 'ECG-XXXXXXXX',
                        'ECG_data': [
                                {"CH":"L1",'value':row[2]},
                                {"CH":"L2",'value':row[3]},
                                {"CH":"L3",'value':row[4]},
                                {"CH":"V1",'value':row[5]},
                                {"CH":"V2",'value':row[6]},
                                {"CH":"V3",'value':row[7]},
                                {"CH":"V4",'value':row[8]},
                                {"CH":"V5",'value':row[9]},
                                {"CH":"V6",'value':row[10]},
                                {"CH":"aVR",'value':row[11]},
                                {"CH":"aVL",'value':row[12]},
                                {"CH":"aVF",'value':row[13]}
                                ],
                        'Timestamp': int(float(row[1])) + int(t_shift) + 8*60*60
                        }

            
            if ind !=0:
                collection.insert_one(mongo_obj)
            if ind == 0:
                ind = 1
        end_time = time.time_ns() 
        print(end_time)
        print((end_time-current_time)/1000000)
        time.sleep((197332-(end_time-current_time)/1000000)/1000)
'''
        current_time = time.time_ns()
        print(current_time)
        t_shift = int(current_time/1000000 - 1561443546112)
        print(t_shift)
        ind = 0
        end_time = time.time_ns() 
        print(end_time)
        print((end_time-current_time)/1000000)
        time.sleep(1000)
'''        

        
        
'''    
    
        for row in rows:
            if ind !=0:
                mongo_obj = {
                        'UID' :10015,
                        'Name': 'Test',
                        'Sensor_mac': 'B1C73A25',
                        'ECG_data': [
                                {"CH":"L1",'value':row[2]},
                                {"CH":"L2",'value':row[3]},
                                {"CH":"L3",'value':row[4]},
                                {"CH":"V1",'value':row[5]},
                                {"CH":"V2",'value':row[6]},
                                {"CH":"V3",'value':row[7]},
                                {"CH":"V4",'value':row[8]},
                                {"CH":"V5",'value':row[9]},
                                {"CH":"V6",'value':row[10]},
                                {"CH":"aVR",'value':row[11]},
                                {"CH":"aVL",'value':row[12]},
                                {"CH":"aVF",'value':row[13]}
                                ],
                        'Timestamp': int(float(row[1])) + int(t_shift/1000) + 8*60*60
                        }
            
            if ind !=0:
                collection.insert_one(mongo_obj)
            if ind == 0:
                ind = 1
'''    

    
        #time.sleep(197332-(end_time-current_time)/1000000)
        
#client.close()
    
    


