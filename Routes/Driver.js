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
    console.log(appData);
  });
});

driver.post("/createnewridefpass", function (req, res) {
  console.log("PASSRIDEDATA", req.body.passridedata);
  const passridedata = req.body.passridedata;
  const did = req.body.did;
  var appData = {
    error: 1,
    data: "",
  };
  var rideid;
  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO ride (DriverID, numberOfPeople, fareEntered, vehicleID,status) VALUES (?,4,?,?,0)",
        [did, passridedata[0].fare, passridedata[0].vehicleID],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Driver registered successfully!";

            console.log("FIRST", rows.insertId);
            rideid = rows.insertId;
            connection.query(
              "INSERT INTO ridenegotiation (driverFare, userFare, finalFare, rideID, latitude, longitude, userID,location ) VALUES (?,?,?,?,?,?,?,?)",
              [
                passridedata[0].fare,
                passridedata[0].fare,
                passridedata[0].fare,
                rideid,
                passridedata[0].from_lat,
                passridedata[0].from_long,
                passridedata[0].passengeruserid,
                passridedata[0].pickup,
              ],
              function (err, rows, fields) {
                if (!err) {
                  appData.error = 0;
                  appData["data"] = "Ride posted!!";
                  // res.status(201).json(appData);
                  // res.status(201).json(appData);
                  console.log("SECOND", rows.insertId);
                  connection.query(
                    "INSERT INTO rideinfo (RideID, PassengerID, DriverID, StatusID, fareDecided) VALUES (?,?,?,1,?)",
                    [
                      rideid,
                      passridedata[0].passengeruserid,
                      passridedata[0].driveruserid,

                      passridedata[0].fare,
                    ],
                    function (err, rows, fields) {
                      if (!err) {
                        appData.error = 0;
                        appData["data"] = "Ride started!!";
                        // res.status(201).json(appData);
                        // console.log(appData);
                        console.log("THIRD", rows.insertId);
                        connection.query(
                          "INSERT INTO driver_location_to (to_latitude, to_longitude, to_driverUserId, to_status, to_location, to_driverID, RideID) VALUES (?,?,?,0,?,?,?)",
                          [
                            passridedata[0].to_lat,
                            passridedata[0].to_long,
                            passridedata[0].driveruserid,

                            passridedata[0].destination,
                            did,
                            rideid,
                          ],
                          function (err, rows, fields) {
                            if (!err) {
                              appData.error = 0;
                              appData["data"] = "Location Added successfully!";
                              // res.status(201).json(appData);
                              console.log(appData);
                              console.log("FOURTH", rows.insertId);
                              connection.query(
                                "INSERT INTO driver_location (latitude, longitude, driverUserId, status, driverID, location, RideID) VALUES (?,?,?,0,?,?,?)",
                                [
                                  req.body.lat,
                                  req.body.long,
                                  passridedata[0].driveruserid,

                                  did,
                                  req.body.loc,
                                  rideid,
                                ],
                                function (err, rows, fields) {
                                  if (!err) {
                                    appData.error = 0;
                                    appData["data"] =
                                      "Location Added successfully!";
                                    res.status(201).json(appData);
                                    console.log("FIFTH", rows.insertId);
                                    console.log(appData);
                                  } else {
                                    appData["data"] = "Error Occured!";
                                    res.status(400).json(appData);
                                    console.log(err);
                                  }
                                }
                              );
                            } else {
                              appData["data"] = "Error Occured!";
                              res.status(400).json(appData);
                              console.log(err);
                            }
                          }
                        );
                      } else {
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                        console.log(err);
                      }
                    }
                  );
                } else {
                  appData["data"] = "Error Occured!";
                  res.status(400).json(appData);
                  console.log(err);
                }
              }
            );
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
driver.post("/addtoride", function (req, res) {
  console.log("PASSRIDEDATA", req.body.passridedata);
  const passridedata = req.body.passridedata;
  const did = req.body.did;
  const rideid = req.body.rid;
  var appData = {
    error: 1,
    data: "",
  };
  // var rideid;
  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      connection.query(
        "INSERT INTO ridenegotiation (driverFare, userFare, finalFare, rideID, latitude, longitude, userID,location ) VALUES (?,?,?,?,?,?,?,?)",
        [
          passridedata[0].fare,
          passridedata[0].fare,
          passridedata[0].fare,
          rideid,
          passridedata[0].from_lat,
          passridedata[0].from_long,
          passridedata[0].passengeruserid,
          passridedata[0].pickup,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Ride posted!!";
            // res.status(201).json(appData);
            // res.status(201).json(appData);
            console.log("First", rows.insertId);
            connection.query(
              "INSERT INTO rideinfo (RideID, PassengerID, DriverID, StatusID, fareDecided) VALUES (?,?,?,1,?)",
              [
                rideid,
                passridedata[0].passengeruserid,
                passridedata[0].driveruserid,

                passridedata[0].fare,
              ],
              function (err, rows, fields) {
                if (!err) {
                  appData.error = 0;
                  appData["data"] = "Ride started!!";
                  res.status(201).json(appData);
                  // console.log(appData);
                  console.log("SEcond", rows.insertId);
                } else {
                  appData["data"] = "Error Occured!";
                  res.status(400).json(appData);
                  console.log(err);
                }
              }
            );
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

module.exports = driver;
