var mysql = require('mysql');
var fs = require('fs');
var con = mysql.createConnection({
  host: "173.194.106.188",
  user: "root",
  password: "root"
});

con.connect(function (err) {
  if (err) throw err;
  //console.log("Connected!");

  con.query("SELECT * FROM ecg.ecgdata12 limit 10 Offset 10", function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    // offset 10000000  = > 1566875030 (2019-08-27)

    var output_list = [];

    for (var i = 0; i < result.length; i++) {
      var tmp = {
        id: result[i].id,
        timestamp: result[i].timestamp,
        L1: result[i].L1,
        L2: result[i].L2,
        L3: result[i].L3,
        v1: result[i].v1,
        v2: result[i].v2,
        v3: result[i].v3,
        aVR: result[i].aVR,
        aVL: result[i].aVL,
        aVF: result[i].aVF,
        userId: result[i].userId


      }
      //console.log(result[i].L1);
      output_list.push(tmp);
    }

    fs.appendFile('test.txt', output_list, function (err, res) {
      if (err) throw err;
      console.log(output_list);
    })

    //if (err) throw err;
  });
  con.end();

});


/*function handleError (err) {
if (err) {
  // 自動重連
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    connect();
  } else {
    console.error(err.stack || err);
  }
}
}
*/