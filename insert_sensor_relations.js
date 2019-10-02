var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/Test0727';

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if(err) throw err;
    db_write = db.db("TestServer");

    var obj = {
        UID: 34,
        BLE_NAME: "ECG-XXXXXXXXXXXX",
        BATT: 73,
        Patient_MRN: "1576323",
        Patient_Name: "王阿明",
        Nurse_UID: 135,
        Nurse_Name: "陳小姐"
    }

    db_write.collection("sensor_relations").insertOne(obj);


    db.close();

})