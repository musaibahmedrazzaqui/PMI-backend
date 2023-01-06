var express = require("express");
var landmarks = express.Router();
var database = require("../Database/database");
var cors = require("cors");

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
            appData["place name"] = rows[min].Name;
            appData["distance in kilometers"] = Math.min(...calcdistance);
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
module.exports = landmarks;
