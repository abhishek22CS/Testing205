var express = require('express');
var router = express.Router();
var pool=require('./pool')

/* GET home page. */
router.get('/flightpage', function(req, res, next) {

  res.render('flightinterface', { title: 'a' });
});

router.get('/flightsubmit',function(req,res){
  pool.query("insert into flightdetails (flightname, types, totalseats, days, sourcecity, departuretime, destinationcity, arrivaltime, company, logo ) values(?,?,?,?,?,?,?,?,?,?)",
    [req.query.flightname,
      req.query.flighttype,
      req.query.noofseat,
      req.query.days,
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
      // console.log(error)
      res.render("flightinterface",{'message':'Server Error'})
    }
    else{
          res.render('flightinterface',{'message':'Record Submitted Successful'})
    }
  }
  )
})

module.exports = router;
