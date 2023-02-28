var express = require("express");
var rides = express.Router();
var database = require("../Database/database");
var cors = require("cors");

rides.use(cors());
rides.post("/addnew", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const DriverID = req.body.DriverID;
  const numberOfPeople = req.body.numberOfPeople;
  const fareEntered = req.body.fareEntered;
  const vehicleID = req.body.vehicleID;
  var userData = {
    DriverID: req.body.DriverID,
    numberOfPeople: req.body.numberOfPeople,
    fareEntered: req.body.fareEntered,
    vehicleID: req.body.vehicleID,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO ride (DriverID, numberOfPeople, fareEntered, vehicleID) VALUES (?,?,?,?)",
        [DriverID, numberOfPeople, fareEntered, vehicleID],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Ride Added successfully!";
            res.status(201).json(appData);
            console.log(appData);
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

rides.post("/driverlocation", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const driverUserId = req.body.driverUserId;
  const status = 0;
  const location = req.body.location;
  const driverID = req.body.driverID;
  var userData = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    driverUserId: req.body.driverUserId,
    status: 0,
    location: req.body.location,
    driverID: req.body.driverID,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO driver_location (latitude, longitude, driverUserId, status, driverID, location) VALUES (?,?,?,?,?,?)",
        [latitude, longitude, driverUserId, status, driverID, location],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Location Added successfully!";
            res.status(201).json(appData);
            console.log(appData);
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
rides.post("/driverlocationto", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const to_latitude = req.body.to_latitude;
  const to_longitude = req.body.to_longitude;
  const to_driverUserId = req.body.to_driverUserId;
  const to_status = 0;
  const to_location = req.body.to_location;
  const to_driverID = req.body.to_driverID;
  var userData = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    driverUserId: req.body.driverUserId,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO driver_location_to (to_latitude, to_longitude, to_driverUserId, to_status, to_location, to_driverID) VALUES (?,?,?,?,?,?)",
        [
          to_latitude,
          to_longitude,
          to_driverUserId,
          to_status,
          to_location,
          to_driverID,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Location Added successfully!";
            res.status(201).json(appData);
            console.log(appData);
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
rides.get("/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM ride where DriverID = ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            appData["data"] = rows;
            res.status(200).json(appData);
            console.log(err);
          } else {
            appData["error"] = 1;
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
rides.get("/getrides/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, driver.DriverUserID, user.firstName, user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.DriverID=driver_location.driverID join driver_location_to ON ride.DriverID = driver_location_to.to_driverID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID  where driver.DriverUserID != ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            appData["data"] = rows;
            res.status(200).json(appData);
            console.log(rows);
          } else {
            appData["error"] = 1;
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
rides.post("/addnegotiation", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const driverFare = req.body.driverFare;
  const userFare = req.body.userFare;
  const finalFare = req.body.finalFare;
  const rideID = req.body.rideID;
  const userLatitude = req.body.userLatitude;
  const userLongitude = req.body.userLongitude;
  const userID = req.body.userID;
  const location = req.body.location;
  var userData = {
    driverFare: req.body.driverFare,
    userFare: req.body.userFare,
    finalFare: req.body.finalFare,
    userLatitude: req.body.userLatitude,
    userLongitude: req.body.userLongitude,
    lcoation: req.body.location,
  };
  database.connection.getConnection(function (err, connection) {
    console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO ridenegotiation (driverFare, userFare, finalFare, rideID, latitude, longitude, userID,location ) VALUES (?,?,?,?,?,?,?,?)",
        [
          driverFare,
          userFare,
          finalFare,
          rideID,
          userLatitude,
          userLongitude,
          userID,
          location,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Requst Sent successfully!";
            res.status(201).json(appData);
            console.log(appData);
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
rides.get("/riderequests/:driveruserid", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT driver.driverID, driver.DriverUserID, ridenegotiation.driverFare, ridenegotiation.userFare, ride.RideID, ridenegotiation.location,user.userid, user.firstName, user.lastName, ridenegotiation.latitude,ridenegotiation.longitude, driver_location.latitude as dLatitude, driver_location.longitude as drLongitude, driver_location.location as DriverfLocation,driver_location_to.to_longitude,driver_location_to.to_latitude, driver_location_to.to_location FROM driver join ride ON driver.DriverID = ride.DriverID join ridenegotiation on ridenegotiation.rideID = ride.RideID join user on ridenegotiation.userid = user.userID join driver_location ON ride.DriverID=driver_location.driverID join driver_location_to ON ride.DriverID = driver_location_to.to_driverID where driver.DriverUserID = ?",
        [req.params.driveruserid],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            appData["data"] = rows;
            res.status(200).json(appData);
            console.log(err);
          } else {
            appData["error"] = 1;
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
module.exports = rides;
