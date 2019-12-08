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

            for (var i = 0; i < result.length; i++){
                target.push(result[i].Patient_Name);
            }
            res.json(target);
            res.end();
        })
        db.close();
    })


});

router.all('/annotations ', function (req, res) {
    console.log("anno");
    setCORSHeaders(res);
    var annotations = [];
    res.json(annotations);
    res.end();
});

router.all('/query', function (req, res) {

    console.log(req.body.targets);
    
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

            console.log(`result length ${result.length}`);


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
        db_read.collection("Nurse").find({}).toArray(function (err, result) {
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
            //console.log(Date.now());
            //console.log(current_time);

            var rpn = [];
            for (var i = 0; i < result.length; i++) {
                rpn.push({ "UID_RPN": result[i].nurse_id, "Name": result[i].nurse_name })
            }

            var response_json = {
                "date": current_time,
                "RPN": rpn
            };
            res.status(200).json(response_json);
        })

    })
});


router.post('/RPN_device_list/:id', function (req, res) {
    if (req.params.id) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            db_read = db.db("TestServer");
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
            var device_list = [];


            db_read.collection("sensor_relations").find({ Nurse_UID: Number(`${req.params.id}`) }).toArray(function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    device_list.push({
                        "UID_Device": result[i].UID,
                        "BLE_NAME": result[i].BLE_NAME,
                        "BATT": result[i].BATT,
                        "MRN": result[i].Patient_MRN,
                        "Name": result[i].Patient_Name
                    })
                }
                var response_json = {
                    "date": current_time,
                    "device_list": device_list
                }

                res.status(200).json(response_json);
            })

        })
    }
});


router.post('/RPN_device_pair/:UID_RPN/:Device_ID/:MRN', function (req, res) {
    if (req.params.UID_RPN && req.params.Device_ID && req.params.MRN) {
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

            db_read = db.db("TestServer");

            async.parallel([
                function (finish) {
                    db_read.collection("Sensor").find({ device_id: Number(`${req.params.Device_ID}`) }).toArray(function (err1, res1) {
                        finish(err1, res1);
                    })
                },
                function (finish) {
                    db_read.collection("Patient").find({ MRN: Number(`${req.params.MRN}`) }).toArray(function (err2, res2) {
                        finish(err2, res2);
                    })
                },
                function (finish) {
                    db_read.collection("Nurse").find({ nurse_id: Number(`${req.params.UID_RPN}`) }).toArray(function (err3, res3) {
                        finish(err3, res3);
                    })
                }
            ], function (errs, results) {
                if (errs) throw errs;

                var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8

                var obj = {
                    UID: results[0][0].device_id,
                    BLE_NAME: results[0][0].ble_name,
                    BATT: results[0][0].BATT,
                    Patient_MRN: results[1][0].MRN,
                    Patient_Name: results[1][0].Patient_Name,
                    Nurse_UID: results[2][0].nurse_id,
                    Nurse_Name: results[2][0].nurse_name
                }
                db_write = db.db("TestServer");
                db_write.collection("sensor_relations").insertOne(obj);

                var response_json = {
                    "date": current_time,
                    "pair_status": "OK",
                    "device_info": {
                        "UID_Device": results[0][0].device_id,
                        "BLE_NAME": results[0][0].ble_name,
                        "BATT": results[0][0].BATT,
                        "MRN": results[1][0].MRN,
                        "Name": results[1][0].Patient_Name
                    }
                }

                res.status(200).json(response_json);
            })
        })
    }
})


router.post('/RPN_device_unpair/:Device_ID', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        db_read = db.db("TestServer");
        db_read.collection("sensor_relations").deleteOne({ UID: Number(`${req.params.Device_ID}`) }, function (err, result) {
            if (err) throw err;
            //console.log(result);
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
            var response_json = {
                "date": current_time,
                "pair_status": "OK"
            }
            res.status(200).json(response_json);
        })
    });
})

router.post('/RTECG/:UID_Device', function (req, res) {
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
        db_read.collection("ecg").find({ Timestamp: { $gt: Number(`${current_time - 1000}`), $lt: Number(`${current_time}`) }, UID: Number(`${req.params.UID_Device}`) }).toArray(function (err, result) {
            console.log(result.length);
            console.log(current_time);
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

router.post('/SEECG/:UID_Device/:data_start_ms/:date_end_ms', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {


        var start_time = Number(req.params.data_start_ms);
        var end_time = Number(req.params.date_end_ms);
        var start_time_date = new Date(start_time  + 8 * 60 * 60 * 1000 );
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
        db_read.collection("ecg").find({ Timestamp: { $gt: Number(`${start_time}`), $lt: Number(`${end_time}`) }, UID: Number(`${req.params.UID_Device}`) }).toArray(function (err, result) {
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
                "date": start_time_date,
                "data_point_amount": result.length,
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