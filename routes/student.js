var express=require('express')
var router=express.Router()

router.get('/studentinterface',function(req,res){
    
    res.render('studentpage')
})
router.get('/teacherinterface',function(req,res){

    res.render('teacherpage')
})

module.exports=router