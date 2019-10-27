var express = require('express');
var router = express.Router();
var User=require('../model/User')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add', function(req, res, next) {
  res.render('user/user-add');
});

router.post('/add', function(req, res, next) {

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.pwd;

  user.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list');
  })
});

router.get('/list', function(req, res) {
  User.find(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
      res.render('user/userlist',{user: rtn});
  })

});

router.get('/userdetail/:id', function(req, res) {
  User.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    res.render('user/user-detail',{user:rtn})
  })
});

router.get('/userupdate/:id', function(req, res) {
  User.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    res.render('user/user-update',{user:rtn})
  })
});

router.post('/update', function(req,res){
  var updateDate ={
    name:req.body.name,
    email: req.body.email,
    password: req.body.pwd
  }
  User.findByIdAndUpdate(req.body.id,{$set: updateDate}, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/list')
  })
})

router.get('/userdel/:id',function (req,res){
User.findByIdAndRemove(req.params.id,function(err,rtn){
  if(err) throw err;
  res.redirect('/users/list')
})
})


module.exports = router;
