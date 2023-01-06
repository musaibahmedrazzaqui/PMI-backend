var express = require("express");
var driver = express.Router();
var database = require("../Database/database");
var cors = require("cors");

driver.use(cors());

driver.post("/register", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const DriverID = req.body.DriverID;
  const DriverUserID = req.body.DriverUserID;
  const CNIC = req.body.CNIC;
  const LicenseNumber = req.body.LicenseNumber;
  var userData = {
    DriverID: req.body.DriverID,
    DriverUserID: req.body.DriverUserID,
    CNIC: req.body.CNIC,
    LicenseNumber: req.body.LicenseNumber,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO driver (DriverUserID, CNIC, LicenseNumber) VALUES (?,?,?)",
        [DriverUserID, CNIC, LicenseNumber],
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

driver.get("/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM driver where DriverUserID = ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            if (rows.length > 0) {
              appData["error"] = 0;
              appData["data"] = rows;
              res.status(200).json(appData);
              console.log("appData" + appData.error);
            } else {
              appData["error"] = 2;
              appData["data"] = "Nodatafound";
              res.status(200).json(appData);
              console.log("in not found" + appData.error);
            }
          } else {
            appData["error"] = -1;
            appData["data"] = "No data found";
            res.status(204).json(appData);
            console.log("error" + appData.error);
            // console.log(res);
          }
        }
      );
      connection.release();
    }
  });
});

module.exports = driver;
