
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

    async.forever(function (callback) {

        if (err) throw err;
        var start = Number(Date.now());
        console.log(start);
        fs.createReadStream('ecg_data_0.csv')
            .pipe(csv())
            .on('data', (row) => {
                if (row.device_id == 3) {
                    var current_time = Number(Date.now());
                    var start_time = 1553240835494;
                    var t_shift = current_time - start_time;
                    var t = Number(Math.floor(row.timestamp)) + t_shift;
                    var ecg_data = [
                        { "CH": "L1", "value": Number(row.data) },
                        { "CH": "L2", "value": Number(row.data) },
                        { "CH": "L3", "value": Number(row.data) },
                        { "CH": "aVL", "value": Number(row.data) },
                        { "CH": "aVF", "value": Number(row.data) },
                        { "CH": "aVR", "value": Number(row.data) },
                        { "CH": "v1", "value": Number(row.data) },
                        { "CH": "v2", "value": Number(row.data) },
                        { "CH": "v3", "value": Number(row.data) },
                        { "CH": "v4", "value": Number(row.data) },
                        { "CH": "v5", "value": Number(row.data) },
                        { "CH": "v6", "value": Number(row.data) }
                    ];

                    var mongo_obj = {
                        UID: UID,
                        Name: Name,
                        Sensor_mac: sensor_mac,
                        ECG_data: ecg_data,
                        Timestamp: t
                    };


                    db_write.collection("ecg_test_1101").insertOne(mongo_obj);
                }
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                setTimeout(function () {
                    callback();
                }, 0)
            });

    })


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