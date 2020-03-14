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
  clientID:'937522865024-ctk5jrpv06roe247dcdbkv0mdfsgr039.apps.googleusercontent.com',
  clientSecret: 'tdZO63XF-aRqObM8g00ULSzT',
  callbackURL: "https://chandra-verify.herokuapp.com/auth/google/callback",
  passReqToCallback   : true
},
  function (accessToken, refreshToken, profile, done) {

    return done(err, profile);
  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login',
  , 'https://www.googleapis.com/auth/plus.profile.emails.read','email','profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.json({"":req.user});
  });



module.exports = router;
