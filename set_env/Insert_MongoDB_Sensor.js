
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){

    var db_write = db.db("TestServer");

    var mongo_obj1={
        device_id : 18,
        ble_name: "ECG-XXXXXXXX",
        BATT : 73
    }

    db_write.collection("Patient").insertOne(mongo_obj1);
    
    var mongo_obj2={
        device_id : 19,
        ble_name: "ECG-test1",
        BATT : 73
    }




    db_write.collection("Patient").insertOne(mongo_obj2);
    
    var mongo_obj3={
        device_id : 20,
        ble_name: "ECG-test2",
        BATT : 73
    }

    db_write.collection("Patient").insertOne(mongo_obj3);

    db.close();

})
