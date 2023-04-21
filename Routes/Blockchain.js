const express = require("express");
var blockchain = express.Router();
var database = require("../Database/database");
var cors = require("cors");

blockchain.use(cors());
console.log("SSSSSSSSS");
const multichain = require("multichain-node")({
  port: 7208, // replace with the actual port of your blockchain
  host: "35.78.125.132", // replace with the actual IP address or domain name of your blockchain
  user: "multichainrpc", // replace with the actual username of your blockchain
  pass: "q1s1e7AtZCrsmJL22rSK3dv9f6wHEfVokS1e6dXDTXx", // replace with the actual password of your blockchain
});

// Connect to the blockchain when the server starts
multichain.getAddresses((err, res) => {
  console.log("RES", res);
  // console.log("ERR", err);
});

// //     /register create a new address, take email and userid as params, add to database along with generated address
// //      /sendreferral iske andar .issueFrom() phir .subscribe chalega. Dynamically add new asset withnaming convention ReferralCode<from-id>T<to-id>. Add referral code,fromemail,toemail in a new table database
// //      /validatereferral with params of from and to ids and referral code. listAsset with Referralcode assetname. GetTx id and getrawtransactions to obtain from and to. Validate req.body.code with code stored in blockchain.
// //

blockchain.get("/addaddress/:uid", function (req, res) {
  var today = new Date();
  var isEmailVerified = 1;
  var appData = {
    error: 1,
    data: "",
  };
  //   const userID = 2;
  //  const emailID = req.body.email;
  const userID = req.params.userID;
  // let newAddress;

  database.connection.getConnection(function (err, connection) {
    //     // console.log(userData);
    if (err) {
      //       //   console.log("API HIT");
      appData["error"] = 1;
      appData["data"] = "Internal Server Error";
      res.status(500).json(appData);
      console.log(err);
    } else {
      console.log("API HIT");
      multichain.getNewAddress((err, address) => {
        if (err) {
          console.log(err);
        } else {
          //  console.log("newaddress", address);
          //  let newAddress = address;
          console.log("EMAILID", req.params.email);
          console.log("USERID", req.params.uid);
          connection.query(
            "UPDATE user SET address=? WHERE userID=?",
            [address, req.params.uid],
            function (err, rows, fields) {
              if (!err) {
                appData.error = 0;
                console.log(rows);
                appData["data"] = "Address registered successfully!";
                res.status(201).json(appData);
              } else {
                appData.error = 1;
                appData["data"] = "Verify your email first!";
                res.status(400).json(appData);
                console.log(err);
              }
            }
          );
          // console.log(newAddress);
        }
      });

      connection.release();
    }
  });
});

// multichain.issueFrom(
//   {
//     // address: "12ebWCiVmCcKRLBDrpPkhXdimL2fhbtxhvPYcw", // replace with the address you want to issue the asset to
//     asset: "Referdekhlebhai",
//     from: "1NKXhhk9TqVRdrDWnAJcFqVDfiJJSmiBgi73v6",
//     to: "12ebWCiVmCcKRLBDrpPkhXdimL2fhbtxhvPYcw",
//     qty: 1,
//     details: { code: "def321" },
//   },
//   (err, res) => {
//     if ((err.code = -705)) {
//       console.error("Already created");
//       // res.status(500).send(err);
//     } else {
//       console.log("RESPONSE", res);
//       console.log("Referral code created successfully");
//     }
//   }
// );
// // multichain.listAssets({ verbose: true }, (err, res) => {
// //   if (err) {
// //     console.log("Error:", err);
// //   } else {
// //     console.log("List of assets:", res);
// //   }
// // });
// const assetName = "Referdekhlebhai";
// const code = "def321";
// multichain.subscribe({ stream: assetName }, (err, res) => {
//   if (err) {
//     console.log("Error subscribing to asset:", err);
//   } else {
//     console.log("Subscribed to asset:", res);
//   }
// });
// multichain.listAssets((err, res) => {
//   const substr = "bhai";
//   if (err) {
//     console.log("Error:", err);
//   } else {
//     // console.log("LIST ASSETS", res);
//   }
//   for (let i = 0; i < res.length; i++) {
//     let str = res[i].name.toString();
//     if (str.includes(substr)) {
//       console.log(str);
//     }
//   }
// });
// // call listassettransactions with the txid and asset name
// // multichain.listAssetTransactions(
// //   {
// //     txid: "4bd02c34cfe26866412a4c1d8a2edd617183c402a93d0250daaf6a626695190f",
// //     asset: assetName,
// //   },
// //   (err, result) => {
// //     if (err) {
// //       console.log(err);
// //       return;
// //     }

// //     // assuming there is only one output for the asset, get the address it was sent to
// //     // const output = result[0].vout[0];
// //     // const toAddress = output.scriptPubKey.addresses[0];
// //     console.log("Asset ws sent to", result);
// //     console.log(`Asset was sent to address ${result[0]}`);
// //   }
// // );

// const txid = "3356dfe1934247c06eeda05b0afa979d076e6b1049021dd0a25014d3c70dc11a";
// const vout = 0;
// multichain.getRawTransaction({ txid: txid, vout: vout }, (err, data) => {
//   if (err) {
//     console.error("ERRRRRRRR", err);
//   } else {
//     console.log(data);
//     multichain.decodeRawTransaction({ hexstring: data }, (err, decoded) => {
//       if (err) {
//         console.log("ERRindecode", err);
//       } else {
//         console.log("code", decoded.issue.details.code);
//         console.log(
//           "DECODED to address",
//           decoded.vout[0].scriptPubKey.addresses[0]
//         );
//         console.log(
//           "DECODED from address",
//           decoded.vout[2].scriptPubKey.addresses[0]
//         );
//       }
//     });
//   }
// });
module.exports = blockchain;
