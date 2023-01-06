var express = require("express");
var vehicle = express.Router();
var database = require("../Database/database");
var cors = require("cors");

vehicle.use(cors());

vehicle.post("/register", function (req, res) {
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

vehicle.get("/:id", function (req, res) {
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

vehicle.get("/getvehicles/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM vehicle join driver on driver.DriverID = vehicle.DriverID where driver.DriverUserID = ?",
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
module.exports = vehicle;
