var express = require('express');
var router = express.Router();
var pool=require('./pool')

 router.get('/flightpage', function(req, res, next) {

  res.render('flightinterface', {message: '' });
});

router.get('/flightsubmit',function(req,res){
  // console.log("days",req.query.days)
  var days=(""+req.query.days).replaceAll("'",'"')
  pool.query("insert into flightdetails (flightname, types, totalseats, days, sourcecity, departuretime, destinationcity, arrivaltime, company, logo ) values(?,?,?,?,?,?,?,?,?,?)",
    [req.query.flightname,
      req.query.flighttype,
      req.query.noofseat,
       days,
      req.query.sourcecity,
      req.query.deptime,
      req.query.destinationcity,
      req.query.arrtime,
      req.query.Company,
      req.query.logo
    ],
    function(error,result)
    {
    if(error)
    {
      console.log(error)
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
    res.status(500).json({result:[],message:'server Error'})
  }
  else{
    res.status(200).json({result:result,message:'Success'})

  }
})
 });


module.exports = router;
