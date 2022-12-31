var mysql = require("mysql");

var connection = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "iloveallah",
  database: "fyp",
  port: 3306,
});

module.exports.connection = connection;
