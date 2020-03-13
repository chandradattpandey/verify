const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
  clientID: '198234414841456',
  clientSecret: '057e72542b4534f7b93bc6c3a9d628d8',
  callbackURL: "https://chandra-verify.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email','profileUrl']
},
function(accessToken, refreshToken, profile, cb){

 return cb(null,profile);
}
));


router.get('/', function(req, res, next) {
  res.render('register.html');
});


router.get('/auth/facebook', passport.authenticate('facebook'));




router.get('/auth/facebook/callback',passport.authenticate('facebook', { 
  failureRedirect: '/login' }),(req,res)=>{
    console.log("PPPPPPPPPPPPPPPPPPPPPPPP",req.user)
    res.render('reg.html');
  });


module.exports = router;
