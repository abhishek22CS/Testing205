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


 // --------------------------------------------------------------------------------
// flightdetails api

router.get('/displayallflights', function(req, res, next) {
  // pool.query("select * from flightdetails ",function(error,result){
     pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.sourcecity) as source,(select C.cityname from cities C where C.cityid=F.destinationcity) as destination from flightdetails F",function(error,result){

    if(error)
    {
      res.render('displayallflights',{'data':[],'message':'Server Error'})
     }
  
    else{
  
        res.render('displayallflights',{'data':result,'message':'Success'})
    }
  
  })
  
  
  
  
  
   });
   ///serach by id section
   router.get('/searchbyid', function(req, res, next) {
        pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.sourcecity) as source,(select C.cityname from cities C where C.cityid=F.destinationcity) as destination from flightdetails F where flightid=?",
          [req.query.fid],
          
          function(error,result){
  
      if(error)
      {
        res.render('searchbyid',{'data':[],'message':'Server Error'})
       }
    
      else{
    
          res.render('searchbyid',{'data':result[0],'message':'Success'})
      }
    
    })
    
    
    
    
    
     });

    //  Update Api
  
     router.post('/flight_edit_delete',function(req,res){
      if(req.body.btn=="Edit")
      {

      // console.log("days",req.body.days)
      var days=(""+req.body.days).replaceAll("'",'"')

      pool.query("update  flightdetails set flightname=?, types=?, totalseats=?, days=?, sourcecity=?, departuretime=?, destinationcity=?, arrivaltime=?, company=? where flightid=?",
        [req.body.flightname,
          req.body.flighttype,
          req.body.noofseat,
           days,
          req.body.sourcecity,
          req.body.deptime,
          req.body.destinationcity,
          req.body.arrtime,
          req.body.Company,
          req.body.flightid
        ],
        function(error,result)
        {
        if(error)
    
        {
           res.redirect('/flightenquiry/displayallflights')
        }
        else{
          res.redirect('/flightenquiry/displayallflights')
        }
      }
      )

    }
    else
    {
      
    
      pool.query("delete from flightdetails where flightid=?",
        [req.body.flightid],
      
        function(error,result)
        {
        if(error)
    
        {
           res.redirect('/flightenquiry/displayallflights')
        }
        else{
          res.redirect('/flightenquiry/displayallflights')
        }
      }
      )
    }

    })

module.exports = router;
