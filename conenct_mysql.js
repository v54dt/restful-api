var mysql = require('mysql');

var con = mysql.createConnection({
    host: "",
    user: "root",
    password: "root"
});

con.connect(function (err) {
    if (err) throw err;
    //console.log("Connected!");
    
    con.query("SELECT * FROM ecg.ecgdata12 limit 10 Offset 10000000", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        // offset 10000000  = > 1566875030 (2019-08-27)
     
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