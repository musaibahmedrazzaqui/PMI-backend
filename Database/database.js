var mysql = require("mysql");

var connection = mysql.createPool({
  connectionLimit: 100,
  host: "sql6.freemysqlhosting.net",
  user: "sql6591017",
  password: "5kCiR8D8LL",
  database: "sql6591017",
  port: 3306,
});

module.exports.connection = connection;
