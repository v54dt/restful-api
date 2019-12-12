
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017";

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db){

    var db_write = db.db("TestServer");

    var mongo_obj1 = {
        RPN_ID : 10015,
        RPN_Name : "陳小姐"
    }
    db_write.collection("RPN").insertOne(mongo_obj1);
    var mongo_obj2 = {
        RPN_ID : 10030,
        RPN_Name : "王小姐"
    }
    db_write.collection("RPN").insertOne(mongo_obj2);
    var mongo_obj3 = {
        RPN_ID : 10040,
        RPN_Name : "趙先生"
    }
    db_write.collection("RPN").insertOne(mongo_obj3);
    var mongo_obj4 = {
        RPN_ID : 10200,
        RPN_Name : "王曉明"
    }
    db_write.collection("RPN").insertOne(mongo_obj4);
    var mongo_obj5 = {
        RPN_ID : 10123,
        RPN_Name : "Sandy"
    }
    db_write.collection("RPN").insertOne(mongo_obj5);
    var mongo_obj6 = {
        RPN_ID : 10456,
        RPN_Name : "Tony"
    }
    db_write.collection("RPN").insertOne(mongo_obj6);


    db.close();

})

