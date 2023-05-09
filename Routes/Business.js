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
  const VehicleNumber = req.body.VehicleNumber;
  const EngineNumber = 0;
  const RegistrationProvince = req.body.RegistrationProvince;
  const OwnerName = req.body.OwnerName;
  const Manufacturer = req.body.Manufacturer;
  const Model = req.body.Model;
  const Year = req.body.Year;
  const EngineCC = req.body.EngineCC;
  const DriverID = req.body.DriverID;
  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO vehicle (VehicleNumber, EngineNumber, RegistrationProvince, OwnerName,Manufacturer,Model,Year,EngineCC, DriverID) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          VehicleNumber,
          EngineNumber,
          RegistrationProvince,
          OwnerName,
          Manufacturer,
          Model,
          Year,
          EngineCC,
          DriverID,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Driver registered successfully!";
            res.status(201).json(appData);
          } else {
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

business.get("/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM vehicle where DriverID = ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            appData["data"] = rows;
            res.status(200).json(appData);
            console.log(rows);
          } else {
            appData["data"] = "No data found";
            res.status(204).json(appData);
            console.log(err);
            // console.log(res);
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
        "SELECT * FROM businessUsers WHERE emailID = ?",
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
              res.status(204).json(appData);
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
