var express = require('express');
var passport = require('passport')
var session=require('session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sucess',(req,res)=>{
  res.render('sucess')
})
router.get('/failure',(req,res)=>{
  res.render('failure')
})
router.get('/auth/github',
  passport.authenticate('github'));

  router.get('/auth/github/callback',passport.authenticate('github', { failureRedirect: '/failure' }),
  (req,res)=>{
    res.redirect('/sucess')
  }
  )

  router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

  router.get('/auth/google/callback',passport.authenticate('google', { failureRedirect: '/failure'}),
  (req,res)=>{
    res.redirect('/sucess')
  }
  )

module.exports = router;
