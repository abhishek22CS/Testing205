var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require("./multer")

 router.get('/flightpage', function(req, res, next) {

  res.render('flightinterface', {message: '' });
});

router.post('/flightsubmit',upload.single("logo"),function(req,res){
  // console.log("days",req.body.days)
  var days=(""+req.body.days).replaceAll("'",'"')
  pool.query("insert into flightdetails (flightname, types, totalseats, days, sourcecity, departuretime, destinationcity, arrivaltime, company, logo ) values(?,?,?,?,?,?,?,?,?,?)",
    [req.body.flightname,
      req.body.flighttype,
      req.body.noofseat,
       days,
      req.body.sourcecity,
      req.body.deptime,
      req.body.destinationcity,
      req.body.arrtime,
      req.body.Company,
      req.file.originalname
    ],
    function(error,result)
    {
    if(error)

    {
       res.render("flightinterface",{'message':'Server Error'})
    }
    else{
          res.render('flightinterface',{'message':'Record Submitted Successful'})
    }
  }
  )
})
// ---------------------------------------------------------------
// cities api 

router.get('/fetchallcities', function(req, res, next) {
pool.query("select * from cities ",function(error,result){
  if(error)
  {
    res.status(500).json({result:[], message:'server Error'})
  }

  else{

    res.status(200).json({result:result, message:'Success'})

  }

})

 });


module.exports = router;
