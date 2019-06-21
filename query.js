// Test query to verify creation of Aurora database
// Modify lines below to specify your database
//------------------------------------------------------------
var endpoint = "david-glue-demo.cluster-cjdczzjn0hmj.us-east-2.rds.amazonaws.com";
var username = "admin";            // Admin username
var password = "devfactory";       // Admin password
var dbname   = "gluedemo";         // Database name
var table    = "term_116_csv";     // Table name
//------------------------------------------------------------

var mysql   = require('mysql');
var sprintf = require('sprintf-js').sprintf;
var connection = mysql.createConnection({
  host     : endpoint,
  user     : username,
  password : password,
  database : dbname
});

connection.connect();

connection.query('SELECT * from ' + table, function (error, results, fields) {
  if (error) throw error;
  console.log("Fetched " + results.length + " rows; first 10 are:");
  //console.log(JSON.stringify(results[0], null, 2));
  var fmt = "%-25s %-12s %s";
  console.log(sprintf(fmt, "Name", "Party", "Twitter"));
  console.log(sprintf(fmt, "====", "=====", "======="));
  for ( var i = 0; i < 10; i++ ) {
    var r = results[i];
    console.log(sprintf(fmt, r.name, r.group, r.twitter));
  }
});

connection.end();
