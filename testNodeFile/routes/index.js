var express = require('express');
var router = express.Router();
var User=require('../model/User')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sithu' });
});

  router.get('/nameurl', function(req, res, next) {
    res.render('name', { name: 'Si Thu' , age: '22' });
  });
module.exports = router;
