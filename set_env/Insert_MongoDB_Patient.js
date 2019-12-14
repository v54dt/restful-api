
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){

    var db_write = db.db("TestServer");

    var mongo_obj1={
        MRN : 12345678,
        Patient_Name: "柯博文",
        Room_ID: "702",
        Bed_ID: "702-1"
    }

    db_write.collection("Patient").insertOne(mongo_obj1);


    var mongo_obj2={
        MRN : 1576323,
        Patient_Name: "王阿明",
        Room_ID: "503",
        Bed_ID: "503-3"
    }

    db_write.collection("Patient").insertOne(mongo_obj2);
    
    var mongo_obj3={
        MRN : 15233678,
        Patient_Name: "李阿哈",
        Room_ID: "815",
        Bed_ID: "815-2"
    }

    db_write.collection("Patient").insertOne(mongo_obj3);
    
    var mongo_obj4={
        MRN : 8534,
        Patient_Name: "賈伯斯",
        Room_ID: "331",
        Bed_ID: "331-4"
    }

    db_write.collection("Patient").insertOne(mongo_obj4);


    db.close();
})