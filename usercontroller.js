var express = require('express');
var router = express.Router();
//var mongodb = require('./mongodb');
var config = require('./config');

var MongoClient = require('mongodb').MongoClient;
var url = config.db_path;
router.get('/test', function (req, res, next) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        var db_read = db.db("TestServer");
        /*db_read.collection("Nurse").find({}, function (err, result) {
            res.status(200).json(result);
        })*/
        db_read.collection("Nurse").find({}).toArray(function (err, result) {
            if (err) throw err;
            //var return_arr = [];
            //return_arr.append(123);

            //return_arr.push(` "UID_RPN": ${result[0].nurse_id},"Name": ${result[0].nurse_name}`);
            var a = result;
            delete a._id;
            //console.log(a);


            var current_time = Date.now();
            var set_time = new Date(current_time);
            /*var returnjson = {
                "date": current_time,
                "RPN": dsd
            };*/
            var rpn = [];
            rpn[0] = { "UID_RPN": a[0].nurse_id, "Name": a[0].nurse_name };
            var js = { "date": set_time, "RPN": rpn };
            res.status(200).json(js);
        })
    })
})



router.get('/login_RPN_list', function (req, res, next) {
    res.status(200).json({
        "date": "2019/08/09 18:20:35",
        "RPN":
            [
                {
                    "UID_RPN": 135,
                    "Name": "陳小姐"
                },
                {
                    "UID_RPN": 257,
                    "Name": "王小姐"
                },
                {
                    "UID_RPN": 457,
                    "Name": "趙先生"
                },
                {
                    "UID_RPN": 432,
                    "Name": "王曉明"
                }
            ]
    })
})

router.get('/test/login_RPN_list', function (req, res, next) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

        var db_read = db.db("TestServer");
        db_read.collection("Nurse").find({}).toArray(function (err, result) {
            var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8
            console.log(Date.now());
            console.log(current_time);

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
        res.json({
            "date": "2019/08/09 18:20:35",
            "device_list":
                [
                    {
                        "UID_Device": 18,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 73,
                        "MRN": "12345678",
                        "Name": "柯博文"
                    },
                    {
                        "UID_Device": 34,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 73,
                        "MRN": "1576323",
                        "Name": "王阿明"
                    },
                    {
                        "UID_Device": 6872,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 73,
                        "MRN": "15233678",
                        "Name": "李啊哈"
                    },
                    {
                        "UID_Device": 6729,
                        "BLE_NAME": "ECG-XXXXXXXXXXXX",
                        "BATT": 36,
                        "MRN": "8534",
                        "Name": "賈伯斯"
                    }
                ]
        });
    }
});

router.post('/test/RPN_device_list/:id', function (req, res) {
    if (req.params.id) {

        var nurse_id = Number(req.params.id);
        //console.log(req.params.id);
        var device_list = [];
        var current_time = new Date(Date.now() + 8 * 60 * 60 * 1000);   //UTC+8


        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            var db_read = db.db("TestServer");
            //console.log(nurse_id);
            db_read.collection("administrate").find({ nurse_id: nurse_id }).toArray(function (err, result) {
                var patient_id = result[0].patient_id;
                //console.log(patient_id);
                db_read.collection("Pair").find({ patient_id: patient_id }).toArray(function (err, result_Pair) {
                    var sensor_id = result_Pair[0].sensor_id;
                    //console.log(sensor_id);
                    db_read.collection("Sensor").find({ device_id: sensor_id }).toArray(function (err, result_Sensor) {

                        db_read.collection("Patient").find({ MRN: patient_id }).toArray(function (err, result_Patient) {

                            device_list.push({ "UID_Device": result_Sensor[0].device_id, "BLE_NAME": result_Sensor[0].ble_name, "BATT": result_Sensor[0].BATT, "MRN": result_Pair[0].patient_id, "Name": result_Patient[0].Patient_Name })
                            var response_json = {
                                "date": current_time,
                                "device_list": device_list
                            };
                            res.status(200).json(response_json);
                        })
                    })
                })
            });
        })
    }
});

router.post('/RPN_device_pair/:UID_RPN/:BLE_NAME/:MRN', function (req, res) {
    if (req.params.UID_RPN && req.params.BLE_NAME && req.params.MRN) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "pair_status": "OK/Error",
            "device_info":
            {
                "UID_Device": 19,
                "BLE_NAME": "ECG-XXXXXXXXXXXX",
                "BATT": 73,
                "MRN": "12345678",
                "Name": "柯博文"
            }
        })
    };
})

router.post('/test/RPN_device_pair/:UID_RPN/:BLE_NAME/:MRN', function (req, res) {
    if (req.params.UID_RPN && req.params.BLE_NAME && req.params.MRN) {

        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            db_write = db.db("TestServer");

            var obj_administrate = { nurse_id: req.params.UID_RPN, patient_id: req.params.MRN };
            db_write.collection("administrate").insertOne(obj_administrate);

            var obj_Pair = { patient_id: req.params.MRN, sensor_id: req.params.BLE_NAME };
            db_write.collection("Pair").insertOne(obj_Pair);

        })
        res.status(200).json({"pair_status":"OK"});
    };
})


router.post('/RPN_device_unpair/:BLE_name', function (req, res) {
    if (req.params.BLE_name) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "pair_status": "OK/Error"
        })
    }
})
router.post('/RTECG/:UID_Device', function (req, res) {
    if (req.params.UID_Device) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "data_point_CH1":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ],
            "data_point_CH2":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ]
        });
    }

})
router.post('/SEECG/:UID_Device/:date_start_ms/:date_end_ms', function (req, res) {
    if (req.params.UID_Device && req.params.date_start_ms && req.params.date_end_ms) {
        res.json({
            "date": "2019/08/09 18:20:35",
            "data_point_amount": 500,
            "data_point_CH1":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:21:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:22:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ],
            "data_point_CH2":
                [
                    {
                        "UID_data": 137896,
                        "date_ms": "2019/08/09 18:20:35.1378",
                        "value": 123,
                        "PeakPoint": true
                    },
                    {
                        "UID_data": 137897,
                        "date_ms": "2019/08/09 18:21:35.1378",
                        "value": 124,
                        "PeakPoint": false
                    },
                    {
                        "UID_data": 137898,
                        "date_ms": "2019/08/09 18:22:35.1378",
                        "value": 125,
                        "PeakPoint": true
                    }
                ]
        })
    };

})





module.exports = router;