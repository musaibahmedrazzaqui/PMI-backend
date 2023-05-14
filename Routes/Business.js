var express = require("express");
var business = express.Router();
var database = require("../Database/database");
var cors = require("cors");

business.use(cors());

business.post("/register", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const Name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO businessUsers (Name,email,password) VALUES (?,?,?)",
        [Name, email, password],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "User registered successfully!";
            res.status(201).json(appData);
          } else {
            appData["error"] = 2;
            appData["data"] = "Error Occured!";
            res.status(400).json(appData);
            console.log(err);
          }
        }
      );
      connection.release();
    }
  });
});
business.get("/addapi/:id/:apikey", function (req, res) {
  var appData = {
    error: 1,
    data: "",
  };
  console.log("neeche", req.params.apikey);

  // const userID = 2;
  // const email = req.body.email;

  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      console.log("in error");
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      console.log("HERE");
      connection.query(
        "UPDATE businessUsers SET api_key=? where email=?",
        [req.params.id, req.params.apikey],
        function (err, rows, fields) {
          if (!err) {
            console.log("in first");
            appData.error = 0;
            appData["data"] = "Row updated!";
            res.status(201).json(appData);
            console.log(appData);
          } else {
            console.log("in second");
            appData["data"] = "Error Occured!";
            res.status(400).json(appData);
            console.log(err);
          }
        }
      );
      connection.release();
    }
  });
});

business.post("/login", function (req, res) {
  var appData = {};
  var emailID = req.body.emailID;
  var password = req.body.password;
  console.log("AOI HIT LOGIN");
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "SELECT * FROM businessUsers WHERE email = ?",
        [emailID],
        function (err, rows, fields) {
          if (err) {
            appData.error = 1;
            appData["data"] = "Error Occused";
            res.status(400).json(appData);
            console.log(rows);
            console.log(err);
          } else {
            if (rows.length > 0) {
              if (rows[0].password == password) {
                // let token = jwt.sign(rows[0], SECRET_KEY, {
                //   expiresIn: 1440,
                // });
                appData.error = 0;
                appData["data"] = rows;
                res.header("Access-Control-Allow-Origin");
                res.status(200).json(appData);
                console.log(rows);
              } else {
                appData.error = 3;
                appData["data"] = "Password do not match";

                res.status(200).json(appData);
                console.log("rows in else block", rows);
              }
            } else {
              appData.error = 2;
              appData["data"] = "Email does not exists!";
              res.status(200).json(appData);
              console.log(rows);
            }
            console.log(appData);
          }
        }
      );
      connection.release();
    }
  });
});
module.exports = business;
