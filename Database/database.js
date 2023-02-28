var mysql = require("mysql");

// var connection = mysql.createPool({
//   connectionLimit: 100,
//   host: "sql6.freemysqlhosting.net",
//   user: "sql6591017",
//   password: "5kCiR8D8LL",
//   database: "sql6591017",
//   port: 3306,
// });
var connection = mysql.createPool({
  connectionLimit: 100,
  host: "poolmein.cuy5i8v0pf3c.ap-northeast-1.rds.amazonaws.com",
  user: "admin",
  password: "dasrttsds",
  database: "fyp",
  port: 3306,
});
// var connection = mysql.createPool({
//   connectionLimit: 100,
//   host: "localhost",
//   user: "root",
//   password: "iloveallah",
//   database: "fyp",
//   port: 3306,
// });
module.exports.connection = connection;
