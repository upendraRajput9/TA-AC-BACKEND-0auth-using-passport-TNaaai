var passport = require('passport');
var User = require('../models/User')
var GitHubStrategy = require('passport-github').Strategy;

passport.use( new GitHubStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret:process.env.CLIENT_SECRET,
    callbackURL:"/auth/github/callback"
},
(accessToken, refreshToken, profile, done)=>{
    var profileData={
        name:profile.displayName,
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
))

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(function(id,done){
    User.findById(id,"name email username",function(err,user){
done(err,user);
    });
});


  