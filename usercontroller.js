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


router.post('/test/RPN_device_list/:id', function (req, res) {
    if (req.params.id) {
        console.log("erwer");
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
            db_read = db.db("TestServer");
            var current_time = new Date(Date.now());
            var device_list = [];
            db_read.collection("sensor_relations").find({ Nurse_UID: Number(`${req.params.id}`) }).toArray(function (err, result) {
                console.log(result.length);
                for (var i = 0; i < result.length; i++) {
                    device_list.push({
                        "UID_Device": result[i].UID,
                        "BLE_NAME": result[i].BLE_NAME,
                        "BATT": result[i].BATT,
                        "MRN": result[i].Patient_MRN,
                        "Name": result[i].Patient_Name
                    })
                }
                console.log(device_list);

                var response_json = {
                    "date": current_time,
                    "device_list": device_list
                }

                res.status(200).json(response_json);
            })

        })
    }
});


router.post('/test/RPN_device_pair/:UID_RPN/:BLE_NAME/:MRN', function (req, res) {
    if (req.params.UID_RPN && req.params.BLE_NAME && req.params.MRN) {
        var response_json;
        MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {

            db_read = db.db("TestServer");
            var UID_Device = req.params.BLE_NAME;
            var BLE_NAME ; 
            var BATT ;
            var MRN = req.params.MRN;
            var Name;
            var Nurse_UID = req.params.UID_RPN;
            var Nurse_Name;

            db_read.collection("Sensor").find({device_id : Number(`${req.params.BLE_NAME}`)}).toArray(function(err,result1){
                if(err) throw err;
                BLE_NAME = result1[0].ble_name;
                BATT = result1[0].BATT;

                
            })
            console.log(BATT);
            console.log(BLE_NAME);
            db_read.collection("Patient").find({MRN:Number(`${req.params.MRN}`)}).toArray(function(err,result2){
                if(err) throw err;
                Name = result2[0].Patient_Name;
            })
            db_read.collection("Nurse").find({nurse_id : Number(`${req.params.UID_RPN}`)}).toArray(function(err,result3){
                if(err) throw err;
                Nurse_Name = result3[0].nurse_name;
            })


            var obj_sensor_relations =  {
                "UID": UID_Device,
                "BLE_NAME": BLE_NAME,
                "BATT": BATT,
                "Patient_MRN": MRN,
                "Patient_Name": Name,
                "Nurse_UID": Nurse_UID,
                "Nurse_Name":Nurse_Name
            }
            db_write = db.db("TestServer");
            db_write.collection("sensor_relations").insertOne(obj_sensor_relations);
            

            
            var current_time = new Date(Date.now());
            response_json = {
                "date" : current_time,
                "pair_status" : "OK",
                "device_info":{
                    "UID_Device" : UID_Device,
                    "BLE_NAME" : BLE_NAME,
                    "BATT" : BATT,
                    "MRN" : MRN,
                    "Name":Name
                }
            }
            res.status(200).json(response_json);
            console.log(response_json.device_info.BATT);
        })
        
        

    };
})


router.post('/test/RPN_device_unpair/:BLE_name',function(req,res){
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        
        db_read = db.db("TestServer");
        db_read.collection("sensor_relations").deleteOne({UID : `${req.params.BLE_name}`},function(err,result){
            if(err) throw err;
        })
        var current_time = new Date(Date.now());
        var response_json = {
            "date" : current_time,
            "paor_status" : "OK"
        }
        res.status(200).json(response_json);

    });
})




module.exports = router;