var express = require('express');
var express = require('express');
var router = express.Router();
var Post=require('../model/Post')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/add',function(req, res, next) {
  res.render('post/post-add');
});

router.post('/add', function(req, res, next) {
  // console.log(req.body.name);
  // console.log(req.body.email);
  // console.log(req.body.pwd);
  // res.end('Add Successful!!');
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;

  post.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/post/list');
  })
});

router.get('/list', function(req, res) {
  Post.find(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
      res.render('post/post-list',{post: rtn});
  })

});

router.get('/postdetail/:id', function(req, res) {
  Post.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    res.render('post/post-detail',{post:rtn})
  })
});
``
router.get('/postupdate/:id', function(req, res) {
  Post.findById(req.params.id,function(err,rtn){
    if(err) throw err;
    res.render('post/post-update',{post:rtn})
  })
});

router.post('/update', function(req,res){
  var updateDate ={
    title:req.body.title,
    content: req.body.content,
    author: req.body.author
  }
  Post.findByIdAndUpdate(req.body.id,{$set: updateDate}, function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/post/list')
  })
})

router.get('/postdel/:id',function (req,res){
Post.findByIdAndRemove(req.params.id,function(err,rtn){
  if(err) throw err;
  res.redirect('/post/list')
})
})


module.exports = router;
