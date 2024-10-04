var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/flightpage', function(req, res, next) {
  res.render('flightinterface', { title: 'a' });
});

module.exports = router;
