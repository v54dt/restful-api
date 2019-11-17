
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){

    var db_write = db.db("TestServer");

    var mongo_obj1={
        MRN : 12345678,
        Patient_Name: "柯博文"
    }

    db_write.collection("Patient").insertOne(mongo_obj1);


    var mongo_obj2={
        MRN : 1576323,
        Patient_Name: "王阿明"
    }

    db_write.collection("Patient").insertOne(mongo_obj2);
    
    var mongo_obj3={
        MRN : 15233678,
        Patient_Name: "李阿哈"
    }

    db_write.collection("Patient").insertOne(mongo_obj3);
    
    var mongo_obj4={
        MRN : 8534,
        Patient_Name: "賈伯斯"
    }

    db_write.collection("Patient").insertOne(mongo_obj4);


    db.close();
})