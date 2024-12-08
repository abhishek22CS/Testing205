
var express = require('express');
var router = express.Router();
var pool=require('./pool')
// var upload=require("./multer")


router.get("/iamyourqt", function (req, res, next) {
    res.render("loginpage", { message: "" });
  });









// router.post("/chkadminlogin", function (req, res, next) {
//     pool.query("select *  from login where (email=? or mobile=?) and password=?",
//       [req.body.email_mobile,
//          req.body.email_mobile,
//           req.body.pwd],
//       function (error, result) {
//         if (error) {
//            res.render("loginpage", { message: "Server Error..." });
//         } 
//         else {
//           res.render("dashboard", {message: "Invalid email address/mobilno/password...",  });
          
//         }
//       }
//     );
//   });
  module.exports = router;
