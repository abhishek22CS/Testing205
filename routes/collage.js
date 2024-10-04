var express=require('express')
var router=express.Router()

router.get('/studentinterface',function(req,res){
    
    res.render('studentcollagepage')
})
router.get('/teacherinterface',function(req,res){

    res.render('teachercollagepage')
})

module.exports=router;