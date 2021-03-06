const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const userSchema = require('../model/schema')
const FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// var TwitterStrategy = require('passport-twitter').Strategy;


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


router.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email','profilepic'] }));




router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/login'
}), (req, res) => {
  console.log("PPPPPPPPPPPPPPPPPPPPPPPP", req.user);
  let user = req.user;
  let name = user._json.email;
  let f_id = user.f_id;
  let profilepic = user._json.picture.url;

  userSchema.find({ $or: [{ 'email': name }, { 'f_id': f_id }] }, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length == 0) {
      let newuser = new userSchema({ 'email': name, 'f_id': f_id, 'profilepic': profilepic })
      newuser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render('index.html', { name, profilepic });
        }
      })
    } else {
      let name = result[0].name;
      let f_id = result[0].f_id;
      let profilepic = result[0].profilepic;
      if (id == undefined || null) {
        result[0].f_id = f_id;
        result[0].save((err) => {
          if(err){}
          else{
            res.render('index.html', { name, profilepic });
          }
          
        })
      }
    }
  })
  // res.json(req.user)
});



// google


passport.use(new GoogleStrategy({
  clientID: '937522865024-ctk5jrpv06roe247dcdbkv0mdfsgr039.apps.googleusercontent.com',
  clientSecret: 'tdZO63XF-aRqObM8g00ULSzT',
  callbackURL: "https://chandra-verify.herokuapp.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {

    return done(null, profile);

  }
));

router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    
    let user = req.user;
    console.log(user);
    let name = user._json.name;
    console.log(name);
    let g_id = user.g_id;
    console.log(id);
    let email = user._json.picture.email;
    console.log(email);
    let profilepic = user._json.profileUrl;
    console.log(profilepic);

    userSchema.find({ $or: [{ 'g_id': g_id }, { 'email': email }] }, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result.length == 0) {
        let data = new userSchema({ 'name': name, 'g_id':g_id, 'email': email, 'profilepic': profilepic })
        data.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.render('index.html', { name, profilepic });
          }
        })
      } else {
        let name = result[0].name;
        console.log(name);
        let g_id = result[0].g_id;
        console.log(id);
        let profilepic = result[0].profilepic;
        console.log(profilepic);
        if (id == undefined || null) {
          result[0].g_id = g_id;
          result[0].save((err) => {
            if (err) {
              console.log(err);
            } else {
              res.render('index.html', { name, profilepic });
            }
          })
        }
      }
    })
    // res.json({ "": req.user });
  });


// twitter


// passport.use(new TwitterStrategy({
//   consumerKey: TWITTER_CONSUMER_KEY,
//   consumerSecret: TWITTER_CONSUMER_SECRET,
//   callbackURL: "https://chandra-verify.herokuapp.com/auth/twitter/callback"
// },
//   function (tokenSecret, profile, done) {
//     return done(null, profile);
//   }
// ));


// router.get('/auth/twitter', passport.authenticate('twitter'));



// router.get('/auth/twitter/callback',
//   passport.authenticate('twitter', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));


module.exports = router;
