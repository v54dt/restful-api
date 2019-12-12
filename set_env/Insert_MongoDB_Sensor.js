
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){

    var db_write = db.db("TestServer");

    var mongo_obj1={
        Device_ID : "AABBCCDD0011",
        BLE_Name: "ECG-XXXXXXXX",
        BATT : 73,
        Status : 2
    }

    db_write.collection("Sensor").insertOne(mongo_obj1);
    
    var mongo_obj2={
        Device_ID : "AABBCCDD0022",
        BLE_Name: "ECG-test1",
        BATT : 73,
        Status : 2
    }




    db_write.collection("Sensor").insertOne(mongo_obj2);
    
    var mongo_obj3={
        Device_ID : "AABBCCDD00233",
        BLE_Name: "ECG-test2",
        BATT : 73,
        Status : 2
    }

    db_write.collection("Sensor").insertOne(mongo_obj3);

    db.close();

})
