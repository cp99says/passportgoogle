const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const user=require('../models/user-model');
require('dotenv/config')

passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser((id,done)=>{
    done(null,user.id);
})


passport.use(new GoogleStrategy({    
    callbackURL:'/auth/google/redirect',
    clientID: process.env.id,
    clientSecret: process.env.secret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport callback function fired:');
    console.log(profile.id,profile.email,profile.displayName);
    user.findOne({googleId: profile.id,name:profile.displayName       
    }).then((currentuser)=>{
        if(currentuser)
        {
            console.log('user is:-'+currentuser)
            done(null,currentuser)
        }
        else
        {
            new user({
                googleId: profile.id,
                username: profile.displayName,
                email1:profile.email
            }).save().then((newUser) => {
                console.log('new user created: ', newUser);
                done(null,newUser)  
            });
        }
    })
    
})   
);