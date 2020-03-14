const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


// facebook

passport.use(new FacebookStrategy({
  clientID: '198234414841456',
  clientSecret: '057e72542b4534f7b93bc6c3a9d628d8',
  callbackURL: "https://chandra-verify.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email', 'profileUrl']
},
  function (accessToken, refreshToken, profile, cb) {

    return cb(null, profile);
  }
));


router.get('/', function (req, res, next) {
  res.render('reg.html');
});


router.get('/auth/facebook', passport.authenticate('facebook'));




router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login'
}), (req, res) => {
  console.log("PPPPPPPPPPPPPPPPPPPPPPPP", req.user);
  res.json(req.user)
});



// google


passport.use(new GoogleStrategy({
  clientID:' 937522865024-8hhe6d25vfv3c830v36a6se293mrif86.apps.googleusercontent.com',
  clientSecret: 'cI9FiFrWb0uurwC0Rm17CKBE',
  callbackURL: "https://chandra-verify.herokuapp.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {

    return done(err, user);
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.json({"":req.user});
  });



module.exports = router;
