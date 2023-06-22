const passport = require('passport');
const { Strategy } = require("passport-google-oauth20");

const guest = require('../models/users.models');

require('dotenv').config(); 

const PORT = 3000;

const config = {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}

const AUTH_OPTIONS = {
    callbackURL:'/v1/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET,
    
}

function verifyCallback(accessToken, refreshToken, profile, done){
    done(null, profile)
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
passport.serializeUser((user, done)=>{
    const userObj = {
        id : user.id,
        email: user._json.email
    }
    done(null,userObj)
})

//read the session from cookie
passport.deserializeUser((obj,done)=>{
    done(null, obj)
})

function checkLoggedIn(req,res,next){
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn && !guest.mode) {
        return res.status(401).json({
            error: 'You must log in!'
        })
    }
    next();
}



module.exports = {
    passport,
    checkLoggedIn,
    config
}