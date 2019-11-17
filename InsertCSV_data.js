
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var url = "mongodb://localhost:27017";

const csv = require('csv-parser');
const fs = require('fs');

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;

    var db_write = db.db("TestServer");

    var sensor_mac = "D2C91B20";
    var UID = 10015;
    var Name = "王小明"


    //1553240835494
    //1553240985105.09
    //149611 ms

    async.forever(function (callback) {

        if (err) throw err;
        //var start = Number(Date.now());
        //console.log("Start time");
        //console.log(start);
        fs.createReadStream('ecg_data_50000.csv')
            .pipe(csv())
            .on('data', (row) => {
                //console.log("data");

                var current_time = Number(Date.now());
                var start_time = 1561443546112;
                var t_shift = current_time - start_time;
                var t = Number(Math.floor(row.timestamp)) + t_shift;
                var ecg_data = [
                    { "CH": "L1", "value": Number(row.L1) },
                    { "CH": "L2", "value": Number(row.L2) },
                    { "CH": "L3", "value": Number(row.L3) },
                    { "CH": "aVL", "value": Number(row.aVL) },
                    { "CH": "aVF", "value": Number(row.aVF) },
                    { "CH": "aVR", "value": Number(row.aVR) },
                    { "CH": "v1", "value": Number(row.v1) },
                    { "CH": "v2", "value": Number(row.v2) },
                    { "CH": "v3", "value": Number(row.v3) },
                    { "CH": "v4", "value": Number(row.v4) },
                    { "CH": "v5", "value": Number(row.v5) },
                    { "CH": "v6", "value": Number(row.v6) }
                ];

                var mongo_obj = {
                    UID: UID,
                    Name: Name,
                    Sensor_mac: sensor_mac,
                    ECG_data: ecg_data,
                    Timestamp: t
                };

                db_write.collection("ecg").insertOne(mongo_obj);


            })
            .on('end', () => {
                //console.log('CSV file successfully processed');
                //var end = Date.now();
                //console.log(end);
                setTimeout(function () {
                    callback();
                }, 197332) // usdrId = 1 , data length = 197332 ms , id >= 8897527 , <= 8947526
            });
    }, function (err) {
        //console.log(err);
    });

});

/*
{
    "UID": 10035,
    "Name": "王小明",
    "Sensor_mac":"D2C91B20",
    "ECG_data":[
        {"CH" : "L1", "value" : 0.1546},
        {"CH" : "L2", "value" : 0.0413},
        {"CH" : "L3", "value" : 0.1784},
        {"CH" : "aVL", "value" : 0.3361},
        {"CH" : "aVF", "value" : 0.5361},
        {"CH" : "aVR", "value" : 0.1219},
        {"CH" : "v1", "value" : -0.0354},
        {"CH" : "v2", "value" : -0.1278},
        {"CH" : "v3", "value" : 0.19237},
        {"CH" : "v4", "value" : 0.7123},
        {"CH" : "v5", "value" : -0.0069},
        {"CH" : "v6", "value" : 0.01701}
    ],
    "Timestamp" : 1566202810413
}
*/