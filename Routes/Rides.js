var express = require("express");
var rides = express.Router();
var database = require("../Database/database");
var cors = require("cors");

rides.use(cors());

rides.post("/passengercreateride", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const userID = req.body.userID;

  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const location = req.body.location;
  const to_latitude = req.body.to_latitude;
  const to_longitude = req.body.to_longitude;
  const to_location = req.body.to_location;
  // const status = 0;

  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO passengerrides (userID, latitude, longitude, location,to_latitude,to_longitude,to_location,createdAt) VALUES (?,?,?,?,?,?,?,NOW())",
        [
          userID,
          latitude,
          longitude,
          location,
          to_latitude,
          to_longitude,
          to_location,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            console.log(rows.insertId);
            appData["data"] = rows.insertId;
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
rides.get("/getpassengerrides/:id", function (req, res) {
  var appData = {};
  console.log("im hurt daddy");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM passengerrides join user on passengerrides.userID=user.userID  where passengerrides.userID!=?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            appData["data"] = rows;
            console.log(rows);
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
rides.post("/driverequestride", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const userID = req.body.userID;

  const pickup = req.body.pickuplocation;
  const destination = req.body.destination;
  const from_lat = req.body.from_lat;
  const from_long = req.body.from_long;
  const to_lat = req.body.to_lat;
  const to_long = req.body.to_long;
  const driveruserid = req.body.driveruserid;
  const passengeruserid = req.body.passengeruserid;
  const fare = req.body.fare;
  const idpassengerrides = req.body.idpassengerrides;
  const vehicleID = req.body.vehicleID;
  const status = 0;
  const time = req.body.time;
  database.connection.getConnection(function (err, connection) {
    // console.log(userData);
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO ridereqpassenger (pickup, destination, from_lat, from_long,to_lat,to_long,driveruserid,passengeruserid,fare,vehicleID,idpassengerrides,status,time,createdAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())",
        [
          pickup,
          destination,
          from_lat,
          from_long,
          to_lat,
          to_long,
          driveruserid,
          passengeruserid,
          fare,
          vehicleID,
          idpassengerrides,
          status,
          time,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            console.log(rows.insertId);
            appData["data"] = rows.insertId;
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
rides.get("/ridereqpassenger/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM ridereqpassenger join driver on ridereqpassenger.driveruserid=driver.DriverUserID join vehicle on vehicle.vehicleID=ridereqpassenger.vehicleID join user on ridereqpassenger.driveruserid=user.userID where ridereqpassenger.passengeruserID=? and ridereqpassenger.status=0",
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
  const status = 0;
  const datetime = req.body.datetime;
  const isActive = 0;
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
        "INSERT INTO ride (DriverID, numberOfPeople, fareEntered, vehicleID,status,datetime,isActive) VALUES (?,?,?,?,?,?,?)",
        [
          DriverID,
          numberOfPeople,
          fareEntered,
          vehicleID,
          status,
          datetime,
          isActive,
        ],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            console.log(rows.insertId);
            appData["data"] = rows.insertId;
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
  const RideID = req.body.RideID;
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
        "INSERT INTO driver_location (latitude, longitude, driverUserId, status, driverID, location, RideID) VALUES (?,?,?,?,?,?,?)",
        [latitude, longitude, driverUserId, status, driverID, location, RideID],
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
  const RideID = req.body.RideID;
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
        "INSERT INTO driver_location_to (to_latitude, to_longitude, to_driverUserId, to_status, to_location, to_driverID, RideID) VALUES (?,?,?,?,?,?,?)",
        [
          to_latitude,
          to_longitude,
          to_driverUserId,
          to_status,
          to_location,
          to_driverID,
          RideID,
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
rides.post("/accept", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  // const userID = 2;
  const RideID = req.body.RideID;
  const PassengerID = req.body.PassengerID;
  const DriverID = req.body.DriverID;
  const status = 1;
  const fareDecided = req.body.fareDecided;
  // const to_driverID = req.body.to_driverID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(appData);
    } else {
      connection.query(
        "INSERT INTO rideinfo (RideID, PassengerID, DriverID, StatusID, fareDecided) VALUES (?,?,?,?,?)",
        [RideID, PassengerID, DriverID, status, fareDecided],
        function (err, rows, fields) {
          if (!err) {
            appData.error = 0;
            appData["data"] = "Ride started!!";
            connection.query(
              "Update ride set numberOfPeople=numberOfPeople - 1 where RideID =?",
              [RideID],
              function (err, rows, fields) {
                if (!err) {
                  res.status(201).json(appData);
                  console.log(appData);
                } else {
                  appData["error"] = 1;
                  appData["data"] = "Unsucessful";
                  res.status(201).json(appData);
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
rides.get("/getName/:id", function (req, res) {
  var appData = {};
  console.log("sdaaaaaaaaa");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      console.log("sdaaaaaaaaa");
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM user where userID = ?",
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
            console.log(res);
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
        "SELECT * FROM ride join driver on ride.DriverID = driver.DriverID where ride.status=0 and driver.DriverUserID = ?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            console.log("DriverAcceptedRides", rows);
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
rides.get("/referral-entered/:email", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  console.log("ooper");
  var appData = {
    error: 1,
    data: "",
  };
  console.log("neeche");
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
        "UPDATE user SET isReferralEntered=1 WHERE emailID=?",
        [req.params.email],
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
rides.get("/verify-email/:email", function (req, res) {
  //   var today = new Date();
  //   var isEmailVerified = 1;
  console.log("ooper");
  var appData = {
    error: 1,
    data: "",
  };
  console.log("neeche");
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
        "UPDATE user SET isEmailVerified=1 WHERE emailID=?",
        [req.params.email],
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
rides.get("/checkforrequest/:id/:rideid", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * from ridenegotiation  where userID = ? and rideID =?",
        [req.params.id, req.params.rideid],
        function (err, rows, fields) {
          if (!err) {
            if (rows.length > 0) {
              appData["error"] = 2;
              appData["data"] = "Already sent request for this ride";
              res.status(200).json(appData);
            } else {
              appData["error"] = 0;
              appData["data"] = "Allowed!";
              res.status(200).json(appData);
            }
            // console.log(rows);
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
  console.log("ID", req.params.id);
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, ride.datetime, driver.DriverUserID, user.gender,user.firstName, user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.latitude as DriverLat,driver_location.longitude as DriverLong,driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID  where driver.DriverUserID != ? and ride.status=0 AND ride.numberOfPeople>1 AND ride.datetime > CONVERT_TZ(NOW(), 'UTC', 'Asia/Karachi')",
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
rides.get("/checkifleft/:id", function (req, res) {
  console.log("Sd");
  var appData = {};
  // console.log("checkifleft");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM rideinfo where StatusID=1 AND PassengerID=?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            if (rows.length > 0) {
              appData["error"] = 0;
              appData["data"] = "Driver has left";
              res.status(200).json(appData);
              console.log(appData);
            } else {
              appData["error"] = 1;
              appData["data"] = "No data found";
              res.status(200).json(appData);
              console.log(appData);
            }
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
rides.get("/checkpassengerifhasactive/:id", function (req, res) {
  console.log("Sd");
  var appData = {};
  // console.log("checkifleft");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM rideinfo join ride on rideinfo.RideID=ride.RideID where ride.isActive=1 and rideinfo.StatusID=1 and PassengerID=?",
        [req.params.id],
        function (err, rows, fields) {
          if (!err) {
            console.log(rows);
            if (rows.length > 0) {
              appData["error"] = 1;
              appData[
                "data"
              ] = `You already have an active ride! Go to Ride History screen to view status of active rides!`;
              res.status(200).json(appData);
              console.log(appData);
            } else {
              appData["error"] = 0;
              appData["data"] = "Grant access";
              res.status(200).json(appData);
              console.log(appData);
            }
          } else {
            appData["error"] = -1;
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
rides.get("/getuniqueallwithcolumns/:id", function (req, res) {
  var appData = {};
  console.log("API HIT");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * FROM ridereqpassenger join user on ridereqpassenger.passengeruserid=user.userID WHERE  ridereqpassenger.driveruserid=? and ridereqpassenger.passengeruserid IN ( SELECT DISTINCT passengeruserid FROM ridereqpassenger)",
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
rides.get("/deleteridereq/:id", function (req, res) {
  var appData = {};
  console.log("iddDd", req.params.id);
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "Delete from ridereqpassenger where idridereqpassenger=?",
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
            appData["data"] = "Request Sent successfully!";
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
        "SELECT driver.driverID, driver.DriverUserID, ridenegotiation.driverFare, ridenegotiation.userID, ridenegotiation.userFare, ride.RideID, ridenegotiation.location,user.userid, user.firstName, user.lastName, ridenegotiation.latitude,ridenegotiation.longitude, driver_location.latitude as dLatitude, driver_location.longitude as drLongitude, driver_location.location as DriverfLocation,driver_location_to.to_longitude,driver_location_to.to_latitude, driver_location_to.to_location FROM driver join ride ON driver.DriverID = ride.DriverID join ridenegotiation on ridenegotiation.rideID = ride.RideID join user on ridenegotiation.userid = user.userID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID  where driver.DriverUserID = ? AND ride.datetime > CONVERT_TZ(NOW(), 'UTC', 'Asia/Karachi') AND ride.isActive!=1",
        [req.params.driveruserid],
        function (err, rows, fields) {
          if (!err) {
            console.log(rows);
            appData["error"] = 0;
            appData["data"] = rows;
            // console.log(rows[0].RideID);
            // console.log(rows[0].userID);
            var filteredRows = [];
            var count = 0;
            for (let i = 0; i < rows.length; i++) {
              connection.query(
                "Select * from rideinfo where RideID = ? and StatusID =1 and PassengerID =?",
                [rows[i].RideID, rows[i].userID],
                function (err, rowstwo, fields) {
                  if (!err) {
                    if (rowstwo.length === 0) {
                      filteredRows.push(rows[i]);
                    }
                  }
                  count++;
                  if (count === rows.length) {
                    console.log("APPDATAAAAAAAAAAAAAAAA", appData);
                    appData["data"] = filteredRows;
                    res.status(200).json(appData);
                  }
                }
              );
            }
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

rides.get("/driveracceptedrides/:driveruserid/:rideid", function (req, res) {
  var appData = {};
  console.log("req", req.params);
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT rideinfo.StatusID,rideinfo.RideID,rideinfo.DriverID,rideinfo.PassengerID, ride.numberOfPeople, ride.fareEntered, rideinfo.fareDecided,user.phone as Phone,user.firstName as PassengerFName,user.lastName as PassengerLName,ridenegotiation.location as PassengerLocation,ridenegotiation.latitude as PassengerLat,ridenegotiation.longitude as PassengerLong,driver_location_to.to_location as DestLocation,driver_location_to.to_latitude as DestLat,driver_location_to.to_longitude as DestLong FROM rideinfo join ride on rideinfo.RideID =ride.RideID join ridenegotiation on ride.RideID=ridenegotiation.RideID join driver_location_to on ride.RideID=driver_location_to.RideID join user on rideinfo.PassengerID =user.userID where  rideinfo.RideID=? and rideinfo.DriverID=?",
        [req.params.rideid, req.params.driveruserid],

        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;

            // console.log(rows[0].RideID);
            // console.log(rows[0].userID);

            console.log("rowssss", rows);

            appData["data"] = rows;
            res.status(200).json(appData);
          }

          // console.log(err);
          else {
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
rides.get("/updatestatus/:puid/:rid", function (req, res) {
  // console.log("ooper");
  var appData = {
    error: 1,
    data: "",
  };
  console.log("neeche");
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
        "UPDATE rideinfo SET StatusID=2 WHERE PassengerID=? and RideID=?",
        [req.params.puid, req.params.rid],
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
rides.get("/updatestatusdest/:puid/:rid", function (req, res) {
  // console.log("ooper");
  var appData = {
    error: 1,
    data: "",
  };
  console.log("neeche");
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
        "UPDATE rideinfo SET StatusID=3 WHERE PassengerID=? and RideID=?",
        [req.params.puid, req.params.rid],
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
rides.get("/updatestatusride/:rid", function (req, res) {
  // console.log("ooper");
  var appData = {
    error: 1,
    data: "",
  };
  console.log("neeche");
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
        "UPDATE ride SET status=1,isActive=0 WHERE RideID=?",
        [req.params.rid],
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
rides.get("/forably/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT rideinfo.RideID, rideinfo.PassengerID,rideinfo.DriverID,rideinfo.fareDecided,user.firstName, user.lastName,user.phone,ridenegotiation.latitude as PassLat,ridenegotiation.longitude as PassLong,driver_location_to.to_latitude as DestLat,driver_location_to.to_longitude as DestLong,driver_location_to.to_location as DestLocation FROM rideinfo join user on user.userID=rideinfo.DriverID join ride on rideinfo.RideID=ride.RideID join driver_location_to on rideinfo.RideID=driver_location_to.rideID join ridenegotiation on rideinfo.RideID=ridenegotiation.rideID where rideinfo.StatusID=1 and rideinfo.PassengerID=? and ride.status!=1 and ride.isActive=1",
        [req.params.id],
        function (err, rows, fields) {
          if (rows.length > 0) {
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

rides.get("/getridesformodal/:id", function (req, res) {
  var appData = {};
  console.log("getridesformodal");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, ride.datetime, driver.DriverUserID, user.firstName, user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID where driver.DriverUserID = ? and ride.status=0 and ride.isActive=0 AND ride.datetime > CONVERT_TZ(NOW(), 'UTC', 'Asia/Karachi')",
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
rides.get("/getdriverscompletedrides/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, driver.DriverUserID, user.firstName, user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID where driver.DriverUserID = ? and ride.status=1",
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
rides.get("/getdriversactiverides/:id", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, driver.DriverUserID, user.firstName, user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID where driver.DriverUserID = ? and ride.isACtive=1",
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
rides.get("/handleActiveRide/:rideid/:userid", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT * from ride join driver on driver.DriverID=ride.DriverID where ride.isActive=1 and ride.status=0 and driver.DriverUserID=?",
        [req.params.userid],
        function (err, rows, fields) {
          if (!err) {
            appData["error"] = 0;
            console.log("ROWS", rows);
            if (rows.length > 0) {
              appData["error"] = 2;
              appData["data"] = "You already have one active ride!";
              res.status(200).json(appData);
            } else {
              connection.query(
                "UPDATE ride SET isActive=1 WHERE RideID=?",
                [req.params.rideid],
                function (err, rows, fields) {
                  if (!err) {
                    appData["data"] = `Sucessfully updated row: ${rows}`;
                    res.status(200).json(appData);
                  } else {
                    appData["error"] = -1;
                    appData["data"] = "Error in updating";
                    res.status(204).json(appData);
                  }
                }
              );
            }

            console.log(rows);
            console.log(appData);
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

rides.get("/getpassengerscheduledrides/:id", function (req, res) {
  var appData = {};
  // console.log("getridesformodal");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, ride.datetime, driver.DriverUserID, user.firstName, user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.location, driver_location_to.to_status, driver_location_to.to_location, ridenegotiation.location as PassLocation FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join ridenegotiation on ride.RideID =ridenegotiation.rideID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID and ridenegotiation.userID=? and ride.status=0 and ride.isActive=0 AND ride.datetime > CONVERT_TZ(NOW(), 'UTC', 'Asia/Karachi') and ride.RideID NOT IN(Select RideID from rideinfo where PassengerID=?)",
        [req.params.id, req.params.id],
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
rides.get("/getpassengeracceptedrides/:id", function (req, res) {
  var appData = {};
  // console.log("getridesformodal");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, driver.DriverUserID, user.firstName, ridenegotiation.location as PassLocation,user.lastName, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, ride.datetime,driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID join ridenegotiation on ridenegotiation.rideID =ride.RideID join rideinfo on rideinfo.RideID=ride.RideID where rideinfo.PassengerID = ? and and ride.status=0 ride.isActive=0 and ride.datetime > CONVERT_TZ(NOW(), 'UTC', 'Asia/Karachi')",
        [req.params.id, req.params.id],
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
rides.get("/getpassengeractiverides/:id", function (req, res) {
  var appData = {};
  // console.log("getridesformodal");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT ride.RideID, rideinfo.PassengerID,driver.DriverUserID, user.firstName, user.lastName, rideinfo.fareDecided, ride.DriverID, ride.numberOfPeople, ride.fareEntered, ride.vehicleID, vehicle.Manufacturer, vehicle.Model, vehicle.Year, driver_location.status, driver_location.location, driver_location_to.to_status, driver_location_to.to_location FROM ride join vehicle ON ride.vehicleID = vehicle.vehicleID join driver_location ON ride.RideID=driver_location.RideID join driver_location_to ON ride.RideID = driver_location_to.RideID join driver ON ride.DriverID = driver.DriverID join user ON driver.DriverUserID = user.userID join rideinfo on rideinfo.RideID=ride.RideID where rideinfo.PassengerID=? and ride.isActive=1",
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

rides.get("/getpassengercompletedrides/:id", function (req, res) {
  var appData = {};
  // console.log("getridesformodal");
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "Select ride.RideID, ride.vehicleID,ride.status, rideinfo.idRideInfo,ride.datetime, rideinfo.DriverID,user.firstName, user.lastName, user.phone,rideinfo.StatusID,ride.isActive,rideinfo.fareDecided,vehicle.Manufacturer,vehicle.Model,vehicle.Year,driver_location.latitude,driver_location.longitude,driver_location.location,driver_location_to.to_latitude,driver_location_to.to_longitude,driver_location_to.to_location,ridenegotiation.latitude as PassLat, ridenegotiation.longitude as PassLong, ridenegotiation.location as PassLocation,ridenegotiation.ridenegotiationId from ride join rideinfo on rideinfo.RideID=ride.RideID join vehicle on ride.vehicleID=vehicle.vehicleID join driver_location on ride.RideID =driver_location.RideID join ridenegotiation on ridenegotiation.rideID=ride.RideID join driver_location_to on ride.RideID =driver_location_to.RideID join user on user.userID=rideinfo.DriverID where rideinfo.PassengerID=? and ride.status=1 order by rideinfo.StatusID desc",
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
rides.post("/addtoafterride", function (req, res) {
  var appData = {};
  // console.log("getridesformodal");
  // var emailID = req.body.emailID;
  const flag = req.body.flag;
  const comments = req.body.comment;
  const to_id = req.body.to_id;
  const from_id = req.body.from_id;
  const rideID = req.body.rideID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "Select * from afterRide where to_id=? and from_id=? and rideID=?",
        [to_id, from_id, rideID],
        function (err, rows, fields) {
          if (!err) {
            if (rows.length > 0) {
              appData["error"] = -1;
              appData["data"] = "Already existed";
              res.status(200).json(appData);
              // console.log(rows);
            } else {
              connection.query(
                "Insert into afterRide (to_id,from_id,flag,comments,rideID) VALUES (?,?,?,?,?)",
                [to_id, from_id, flag, comments, rideID],
                function (err, rows, fields) {
                  if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.status(200).json(appData);
                    console.log(rows);
                  } else {
                    console.log(err);
                    // console.log(res);
                  }
                }
              );
            }
          } else {
            appData["error"] = 1;
            appData["data"] = "No data found";
            res.status(204).json(appData);
            console.log(err);
          }
        }
      );

      connection.release();
    }
  });
});
module.exports = rides;
