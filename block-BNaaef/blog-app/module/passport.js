var passport = require('passport');
var User = require('../models/user')
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GitHubStrategy({
    clientID : process.env.GIT_CLIENT_ID,
    clientSecret:process.env.GIT_CLIENT_SECRET,
    callbackURL:"/auth/github/callback"
},
(accessToken, refreshToken, profile, done)=>{
    var profileData={
        fullname:profile.displayName,
        email:profile._json.email,
    }
    User.findOne({email:profile._json.email},(err,user)=>{
        if(err) return done(err);
        if(!user){
            User.create(profileData,(err,addedUser)=>{
                if(err) return done(err);
                return done(null,addedUser)
            })
        }
        done(null,user)
    })
  }
));

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/auth/google/callback"
},
(accessToken, refreshToken, profile, done)=>{
    console.log(profile)
    var profileData={
        fullname:profile.displayName,
        username:profile.username,
        email:profile._json.email,
        photo:profile._json.avatar_url
    }
    User.findOne({email:profile._json.email},(err,user)=>{
        if(err) return done(err);
        if(!user){
            User.create(profileData,(err,addedUser)=>{
                if(err) return done(err);
                return done(null,addedUser)
            })
        }
        done(null,user)
    })
  }
));

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,"name email username",function(err,user){
done(err,user);
    });
});


  