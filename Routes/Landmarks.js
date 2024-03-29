var express = require("express");
var landmarks = express.Router();
var database = require("../Database/database");
var cors = require("cors");
const Pusher = require("pusher");

landmarks.use(cors());

function distance(lat1, lon1, lat2, lon2, name) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
  asdsds = 12742 * Math.asin(Math.sqrt(a));
  console.log("Distance: ", asdsds);
  console.log("Name: ", name);
  return asdsds; // 2 * R; R = 6371 km
}
landmarks.get("/:lat/:long", function (req, res) {
  var appData = {};
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "SELECT Name, Latitude, Longitude FROM nearestlandmark",
        [req.params.lat],
        function (err, rows, fields) {
          if (!err) {
            var calcdistance = [];
            // var shortest = 0;
            appData["error"] = 0;

            for (let i = 0; i < rows.length; i++) {
              calcdistance.push(
                distance(
                  req.params.lat,
                  req.params.long,
                  rows[i].Latitude,
                  rows[i].Longitude,
                  rows[i].Name
                )
              );
              //   shortest = calcdistance;
            }
            const min = calcdistance.indexOf(Math.min(...calcdistance));
            appData["latitude"] = rows[min].Latitude;
            appData["longitude"] = rows[min].Longitude;
            appData["placename"] = rows[min].Name;
            appData["distance"] = Math.min(...calcdistance);
            res.status(200).json(appData);
            // console.log(appData.data);
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
landmarks.get("/", function (req, res) {
  console.log(req.query);
  var appData = {};
  var isGranted = 0;
  // var emailID = req.body.emailID;
  database.connection.getConnection(function (err, connection) {
    if (err) {
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
    } else {
      connection.query(
        "Select * from businessUsers where api_key=?",
        [req.query.access_token],
        function (err, rows, fields) {
          if (!err) {
            console.log(rows.length);
            if (rows.length > 0) {
              console.log("insiide > 0");
              connection.query(
                "SELECT Name, Latitude, Longitude FROM nearestlandmark",
                [req.query.lat],
                function (err, rows, fields) {
                  if (!err) {
                    var calcdistance = [];
                    // var shortest = 0;
                    appData["error"] = 0;

                    for (let i = 0; i < rows.length; i++) {
                      const distanceCalculated = distance(
                        req.query.lat,
                        req.query.long,
                        rows[i].Latitude,
                        rows[i].Longitude,
                        rows[i].Name
                      );
                      if (distanceCalculated < 5) {
                        // const createJson=`{}`
                        rows[i]["distance"] = distanceCalculated;
                        calcdistance.push(rows[i]);
                      }
                      //   shortest = calcdistance;
                    }
                    const sortedArray = calcdistance.sort((a, b) => {
                      return a.distance - b.distance;
                    });
                    appData["details"] = sortedArray;
                    // appData["longitude"] = rows[min].Longitude;
                    // appData["placename"] = rows[min].Name;
                    // appData["distance"] = Math.min(...calcdistance);
                    res.status(200).json(appData);
                    // console.log(appData.data);
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
            } else {
              console.log("Are you inside");
              appData["error"] = 1;
              appData["data"] =
                "You're not authorised. Please enter valid API_KEY";
              res.status(200).json(appData);
            }
          } else {
            appData["error"] = 1;
            appData["data"] = "No data found";
            res.status(204).json(appData);
            console.log(err);
          }
        }
      );
    }
  });
});
landmarks.post("/notification", (req, res) => {
  const idx = req.body.idx;
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
        "UPDATE ridereqpassenger SET status=1 WHERE idridereqpassenger=?",
        [idx],
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
landmarks.post("/notificationtwo", (req, res) => {
  const idx = req.body.idx;
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
        "UPDATE ridereqpassenger SET status=-1 WHERE idridereqpassenger=?",
        [idx],
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
module.exports = landmarks;
