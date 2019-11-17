
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){

    var db_write = db.db("TestServer");

    var mongo_obj1 = {
        nurse_id : 10015,
        nurse_name : "陳小姐"
    }
    db_write.collection("Nurse").insertOne(mongo_obj1);
    var mongo_obj2 = {
        nurse_id : 10015,
        nurse_name : "王小姐"
    }
    db_write.collection("Nurse").insertOne(mongo_obj2);
    var mongo_obj3 = {
        nurse_id : 10015,
        nurse_name : "趙先生"
    }
    db_write.collection("Nurse").insertOne(mongo_obj3);
    var mongo_obj4 = {
        nurse_id : 10015,
        nurse_name : "王曉明"
    }
    db_write.collection("Nurse").insertOne(mongo_obj4);
    var mongo_obj5 = {
        nurse_id : 10015,
        nurse_name : "Sandy"
    }
    db_write.collection("Nurse").insertOne(mongo_obj5);
    var mongo_obj6 = {
        nurse_id : 10015,
        nurse_name : "Tony"
    }
    db_write.collection("Nurse").insertOne(mongo_obj6);


    db.close();

})

