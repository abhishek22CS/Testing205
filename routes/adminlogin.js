
var express = require('express');
var router = express.Router();
var pool=require('./pool')
// var upload=require("./multer")
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
date = new Date()


router.get("/iamyourqt", function (req, res, next) {
    res.render("loginpage", { message: "" });
  });
//////////////////////////////////logoutstart

router.get("/logout", function (req, res, next) {
  localStorage.clear()
  res.render("loginpage", { message: "" });
});
////////////////////////////logoutend
  router.post("/chkadminlogin", function (req, res, next) {
    pool.query("select *  from login where (email=? or mobile=?) and password=?",
      [req.body.email_mobile, req.body.email_mobile, req.body.pwd],
      function (error, result) {
        if (error) {
           res.render("loginpage", { message: "Server Error..." });
        } 
        else {
          if (result.length == 1) 

            {
              localStorage.setItem("ADMIN", JSON.stringify(result[0]))

              res.render("dashboard", { data: result[0] });
          } 

          else {
            res.render("loginpage", { message: "Invalid email address/mobilno/password...",
            });
          }
        }
      }
    );
  });







 
  module.exports = router;
