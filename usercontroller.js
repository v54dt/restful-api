var express = require('express');
var async = require('async');
var router = express.Router();
var config = require('./config');
var bodyParser = require('body-parser')

router.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;
var url = config.db_path;

// grafana simplejson http header
function setCORSHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'accept, content-type');
}

router.all('/', function (req, res) {
    setCORSHeaders(res);
    res.send('HR');
    res.end();
});

router.all('/search', function (req, res) {

    setCORSHeaders(res);
    var target = [];
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, db) {
        var db_read = db.db("TestServer");
        db_read.collection("Patient").find({}).toArray(function (req, result) {

            for (var i = 0; i < result.length; i++) {
                target.push(result[i].Patient_Name);
            }
            res.json(target);
            res.end();
        })
        db.close();
    })


});

router.all('/annotations ', function (req, res) {
    //console.log("anno");
    setCORSHeaders(res);
    var annotations = [];
    res.json(annotations);
    res.end();
});

router.all('/query', function (req, res) {

    //console.log(req.body.targets);

    /*for (i in req.body.targets) {
        console.log("");
      }
    */
    //var targets = JSON.parse(req.body.targets[0]);
    //console.log(targets);
    //console.log(req.body.targets);
    //var tar = req.body.targets;
    //var targ = Object.assign({},tar);
    //console.log(targ[0]);
    //var targt = targ[0];
    //var tttt= Object.assign({},targt);
    //console.log(tttt.target);
    //JSONObject tableInfoObj = new JSONObject();
    //JSON t = req.body.targets;
    //var test = JSON.parse(req.body.targets);
    //console.log(test);
    //console.log(req.body.targets[0]);

    //console.log(test);

    setCORSHeaders(res);
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function (err, db) {

        var db_read = db.db("TestServer");
        //console.log(temp);
        var temp = req.body.range;
        var range = Object.assign({}, temp);
        var from = (new Date(range.from)).getTime();
        var to = (new Date(range.to)).getTime();

        var L1_datapoints = [];
        //console.log(from);
        //console.log(to);
        db_read.collection("ecg").find({ Timestamp: { $gt: Number(`${from}`), $lt: Number(`${to}`) } }).sort({ Timestamp: 1 }).toArray(function (err, result) {

            //console.log(`result length ${result.length}`);


            for (var i = 0; i < result.length; i++) {
                var data_time = result[i].Timestamp;
                var pointData_L1 = [];
                pointData_L1.push(result[i].ECG_data[0].value);
                pointData_L1.push(data_time);
                L1_datapoints.push(pointData_L1);
            }

            var targetData = {
                'target': '10015',
                'datapoints': L1_datapoints
            };
            var targetDataList = [];
            targetDataList.push(targetData);


            //console.log(from);
            //console.log(to);

            //res.json(targetDataList);
            res.json(targetDataList);
            res.end();
        })
    })
    /*
         var maxSize = 1000;
 
        
         if (req && req.body && req.body.range) {
             //console.log(req.body);
             maxSize = req.body.maxDataPoints;
             from = req.body.range.from;
             to = req.body.range.to;
         }
 
         //var from_time = (new Date(from).getTime());
         //var to_time = (new Date(to).getTime());
 
         var maxSize = (to_time - from_time) / 5000;
         //console.log(maxSize);
         var dataList = [];
 
         for (let i = 0; i < maxSize; i++) {
             var pointData = [];
             var hr = Math.round(75 + (Math.random() * 5 - 5));
 
             pointData.push(hr);
             pointData.push(from_time + i * 5000);
 
             dataList.push(pointData);
         }
 */


});
router.get('/test', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        var db_read = db.db("TestServer");

        db_read.collection("Nurse").find({}).toArray(function (err, result) {
            if (err) throw err;

            delete a._id;


            var current_time = Date.now();
            var set_time = new Date(current_time);

            var rpn = [];
            rpn[0] = { "UID_RPN": a[0].nurse_id, "Name": a[0].nurse_name };
            var js = { "date": set_time, "RPN": rpn };
            res.status(200).json(js);
        })
    })
})




router.get('/login_RPN_list', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        var db_read = db.db("TestServer");
        db_read.collection("RPN").find({}).toArray(function (err, result) {
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8

            var rpn = [];
            for (var i = 0; i < result.length; i++) {
                rpn.push({ "RPN_ID": result[i].RPN_ID, "RPN_Name": result[i].RPN_Name })
            }

            var response_json = {
                "Date": current_time,
                "RPN": rpn
            };
            res.status(200).json(response_json);
        })

    })
});


router.post('/RPN_device_list/:ID', function (req, res) {
    if (req.params.ID) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            db_read = db.db("TestServer");
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
            var device_list = [];


            db_read.collection("sensor_relations").find({ RPN_ID: Number(`${req.params.ID}`) }).toArray(function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    device_list.push({
                        "Device_ID": result[i].Device_ID,
                        "BLE_Name": result[i].BLE_Name,
                        "BATT": result[i].BATT,
                        "Status": result[i].Status,
                        "MRN": result[i].Patient_MRN,
                        "Patient_Name": result[i].Patient_Name
                    })
                }
                var response_json = {
                    "Date": current_time,
                    "Device_list": device_list
                }

                res.status(200).json(response_json);
            })

        })
    }
});


router.post('/RPN_device_pair/:Device_ID/:MRN/:RPN_ID', function (req, res) {
    if (req.params.RPN_ID && req.params.Device_ID && req.params.MRN) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

            db_read = db.db("TestServer");
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);  //UTC+8

            db_read.collection("sensor_relations").find({ Device_ID: `${req.params.Device_ID}` }).toArray(function (err1, result) {
                if (result.length >0) {
                    var response_json = {
                        "Date": current_time,
                        "Pair_Status": "Device has already paired!"
                    }
                    res.status(200).json(response_json);
                }
                else {
                    async.parallel([
                        function (finish) {
                            db_read.collection("Sensor").find({ Device_ID: `${req.params.Device_ID}` }).toArray(function (err1, res1) {

                                finish(err1, res1);
                            })
                        },
                        function (finish) {
                            db_read.collection("Patient").find({ MRN: Number(`${req.params.MRN}`) }).toArray(function (err2, res2) {

                                finish(err2, res2);
                            })
                        },
                        function (finish) {
                            db_read.collection("RPN").find({ RPN_ID: Number(`${req.params.RPN_ID}`) }).toArray(function (err3, res3) {

                                finish(err3, res3);
                            })
                        },

                    ], function (errs, results) {

                        if (results[0] != 0 && results[1] != 0 && results[2] != 0) {

                            db_read.collection("Sensor").findOneAndUpdate({ Device_ID: `${req.params.Device_ID}` }, { $set: { Status: 1 } });

                            var obj = {
                                Device_ID: results[0][0].Device_ID,
                                BLE_Name: results[0][0].BLE_Name,
                                BATT: results[0][0].BATT,
                                Status: 1,
                                MRN: results[1][0].MRN,
                                Patient_Name: results[1][0].Patient_Name,
                                Room_ID: results[1][0].Room_ID,
                                Bed_ID: results[1][0].Bed_ID,
                                RPN_ID: results[2][0].RPN_ID,
                                RPN_Name: results[2][0].RPN_Name
                            }
                            db_write = db.db("TestServer");
                            db_write.collection("sensor_relations").insertOne(obj);

                            var response_json = {
                                "Date": current_time,
                                "Pair_Status": "OK",
                                "Device_info": {
                                    "Device_ID": results[0][0].Device_ID,
                                    "BLE_Name": results[0][0].BLE_Name,
                                    "BATT": results[0][0].BATT,
                                    "Status": 1,
                                    "MRN": results[1][0].MRN,
                                    "Patient_Name": results[1][0].Patient_Name,
                                    "Room_ID": results[1][0].Room_ID,
                                    "Bed_ID": results[1][0].Bed_ID
                                }

                            }

                            res.status(200).json(response_json);
                        }

                        else {
                            var pair_status_matrix = [0, 0, 0];
                            if (results[0] == 0)
                                pair_status_matrix[0] = 1;
                            if (results[1] == 0)
                                pair_status_matrix[1] = 1;
                            if (results[2] == 0)
                                pair_status_matrix[2] = 1;

                            var pair_status = pair_status_matrix[0] * 4 + pair_status_matrix[1] * 2 + pair_status_matrix[2] * 1
                            var response_json = {
                                "Date": current_time,
                                "Pair_Status": `Error Code : ${pair_status}`,
                            }
                            res.status(200).json(response_json);
                        }



                    })
                }
            })

        })
    }
})


router.post('/RPN_device_unpair/:Device_ID', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        db_read = db.db("TestServer");
        db_read.collection("sensor_relations").find({ Device_ID: `${req.params.Device_ID}` }).toArray(function (err, result) {

            if (result.length != 0) {
                db_read.collection("sensor_relations").deleteOne({ Device_ID: `${req.params.Device_ID}` }, function (err, result) {


                    var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
                    var response_json = {
                        "Date": current_time,
                        "Pair_Status": "Unpair Successfully"
                    }
                    res.status(200).json(response_json);


                })
                db_read.collection("Sensor").findOneAndUpdate({ Device_ID: `${req.params.Device_ID}` }, { $set: { Status: 2 } });
            }
            else {
                var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
                var response_json = {
                    "Date": current_time,
                    "Pair_Status": "No such Device"
                }
                res.status(200).json(response_json);
            }
        })
    });
})

router.post('/RTECG/:Device_ID', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        var current_time = Date.now();


        var L1_datapoints = [];
        var L2_datapoints = [];
        var L3_datapoints = [];
        var L4_datapoints = [];
        var L5_datapoints = [];
        var L6_datapoints = [];
        var L7_datapoints = [];
        var L8_datapoints = [];
        var L9_datapoints = [];
        var L10_datapoints = [];
        var L11_datapoints = [];
        var L12_datapoints = [];

        var response_json;
        db_read = db.db("TestServer");
        db_read.collection("ecg").find({ Timestamp: { $gt: Number(`${current_time - 10000}`), $lt: Number(`${current_time}`) }, Device_ID: `${req.params.Device_ID}` }).toArray(function (err, result) {
            //console.log(result.length);
            //console.log(current_time);
            for (var i = 0; i < result.length; i++) {

                var data_time = result[i].Timestamp;

                var pointData_L1 = [];
                pointData_L1.push(result[i].ECG_data[0].value);
                pointData_L1.push(data_time);
                L1_datapoints.push(pointData_L1);

                var pointData_L2 = [];
                pointData_L2.push(result[i].ECG_data[1].value);
                pointData_L2.push(data_time);
                L2_datapoints.push(pointData_L2);

                var pointData_L3 = [];
                pointData_L3.push(result[i].ECG_data[2].value);
                pointData_L3.push(data_time);
                L3_datapoints.push(pointData_L3);

                var pointData_L4 = [];
                pointData_L4.push(result[i].ECG_data[3].value);
                pointData_L4.push(data_time);
                L4_datapoints.push(pointData_L4);

                var pointData_L5 = [];
                pointData_L5.push(result[i].ECG_data[4].value);
                pointData_L5.push(data_time);
                L5_datapoints.push(pointData_L5);

                var pointData_L6 = [];
                pointData_L6.push(result[i].ECG_data[5].value);
                pointData_L6.push(data_time);
                L6_datapoints.push(pointData_L6);

                var pointData_L7 = [];
                pointData_L7.push(result[i].ECG_data[6].value);
                pointData_L7.push(data_time);
                L7_datapoints.push(pointData_L7);

                var pointData_L8 = [];
                pointData_L8.push(result[i].ECG_data[7].value);
                pointData_L8.push(data_time);
                L8_datapoints.push(pointData_L8);

                var pointData_L9 = [];
                pointData_L9.push(result[i].ECG_data[8].value);
                pointData_L9.push(data_time);
                L9_datapoints.push(pointData_L9);

                var pointData_L10 = [];
                pointData_L10.push(result[i].ECG_data[9].value);
                pointData_L10.push(data_time);
                L10_datapoints.push(pointData_L10);

                var pointData_L11 = [];
                pointData_L11.push(result[i].ECG_data[10].value);
                pointData_L11.push(data_time);
                L11_datapoints.push(pointData_L1);

                var pointData_L12 = [];
                pointData_L12.push(result[i].ECG_data[11].value);
                pointData_L12.push(data_time);
                L12_datapoints.push(pointData_L1);

            }
            var newDate = new Date(current_time);
            response_json = {
                "date": newDate,
                "L1": L1_datapoints,
                "L2": L2_datapoints,
                "L3": L3_datapoints,
                "L4": L4_datapoints,
                "L5": L5_datapoints,
                "L6": L6_datapoints,
                "L7": L7_datapoints,
                "L8": L8_datapoints,
                "L9": L9_datapoints,
                "L10": L10_datapoints,
                "L11": L11_datapoints,
                "L12": L12_datapoints,

            }
            res.status(200).json(response_json);

        })
    })

})

router.post('/SEECG/:Device_ID/:data_start_ms/:date_end_ms', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {


        var start_time = Number(req.params.data_start_ms);
        var end_time = Number(req.params.date_end_ms);
        var start_time_date = new Date(start_time + 8 * 60 * 60 * 1000);
        var L1_datapoints = [];
        var L2_datapoints = [];
        var L3_datapoints = [];
        var L4_datapoints = [];
        var L5_datapoints = [];
        var L6_datapoints = [];
        var L7_datapoints = [];
        var L8_datapoints = [];
        var L9_datapoints = [];
        var L10_datapoints = [];
        var L11_datapoints = [];
        var L12_datapoints = [];

        var response_json;
        db_read = db.db("TestServer");
        db_read.collection("ecg").find({ Timestamp: { $gt: Number(`${start_time}`), $lt: Number(`${end_time}`) }, Device_ID: `${req.params.Device_ID}` }).toArray(function (err, result) {
            //console.log(result);

            for (var i = 0; i < result.length; i++) {

                var data_time = result[i].Timestamp;

                var pointData_L1 = [];
                pointData_L1.push(result[i].ECG_data[0].value);
                pointData_L1.push(data_time);
                L1_datapoints.push(pointData_L1);

                var pointData_L2 = [];
                pointData_L2.push(result[i].ECG_data[1].value);
                pointData_L2.push(data_time);
                L2_datapoints.push(pointData_L2);

                var pointData_L3 = [];
                pointData_L3.push(result[i].ECG_data[2].value);
                pointData_L3.push(data_time);
                L3_datapoints.push(pointData_L3);

                var pointData_L4 = [];
                pointData_L4.push(result[i].ECG_data[3].value);
                pointData_L4.push(data_time);
                L4_datapoints.push(pointData_L4);

                var pointData_L5 = [];
                pointData_L5.push(result[i].ECG_data[4].value);
                pointData_L5.push(data_time);
                L5_datapoints.push(pointData_L5);

                var pointData_L6 = [];
                pointData_L6.push(result[i].ECG_data[5].value);
                pointData_L6.push(data_time);
                L6_datapoints.push(pointData_L6);

                var pointData_L7 = [];
                pointData_L7.push(result[i].ECG_data[6].value);
                pointData_L7.push(data_time);
                L7_datapoints.push(pointData_L7);

                var pointData_L8 = [];
                pointData_L8.push(result[i].ECG_data[7].value);
                pointData_L8.push(data_time);
                L8_datapoints.push(pointData_L8);

                var pointData_L9 = [];
                pointData_L9.push(result[i].ECG_data[8].value);
                pointData_L9.push(data_time);
                L9_datapoints.push(pointData_L9);

                var pointData_L10 = [];
                pointData_L10.push(result[i].ECG_data[9].value);
                pointData_L10.push(data_time);
                L10_datapoints.push(pointData_L10);

                var pointData_L11 = [];
                pointData_L11.push(result[i].ECG_data[10].value);
                pointData_L11.push(data_time);
                L11_datapoints.push(pointData_L1);

                var pointData_L12 = [];
                pointData_L12.push(result[i].ECG_data[11].value);
                pointData_L12.push(data_time);
                L12_datapoints.push(pointData_L1);
            }

            response_json = {
                "Date": start_time_date,
                "Data_Point_Amount": result.length,
                "L1": L1_datapoints,
                "L2": L2_datapoints,
                "L3": L3_datapoints,
                "L4": L4_datapoints,
                "L5": L5_datapoints,
                "L6": L6_datapoints,
                "L7": L7_datapoints,
                "L8": L8_datapoints,
                "L9": L9_datapoints,
                "L10": L10_datapoints,
                "L11": L11_datapoints,
                "L12": L12_datapoints,
            }
            res.status(200).json(response_json);

        })
    })
})




module.exports = router;