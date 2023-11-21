var passport = require('passport')

const { Strategy } = require('passport-google-oauth20');

const { createClient } = require('../models/client/client.data')

require('dotenv').config();

const API_URL = process.env.API_URL || ""

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  CLIENT_MAX_AGE: process.env.CLIENT_MAX_AGE
};

// ------------------------------------------------------------------------------

const AUTH_OPTIONS = {
  callbackURL: `${API_URL}/auth/google/callback`,
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  // This is where you can save the client to the database
  const clientObj = {
    name: profile._json.name,
    email: profile._json.email,
    gid: profile._json.sub,
    picture: profile._json.picture
  }
  if (profile._json.email_verified) {
    createClient(clientObj);
  }
  done(null, profile);
}
const clientPassport = passport

clientPassport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
clientPassport.serializeUser((user, done)=>{
    console.log(user)
    const userObj = {
        gid : user.id,
        email: user._json.email
    }
    console.log("userObj:", userObj)
    done(null,userObj)
})

//read the session from cookie
clientPassport.deserializeUser((obj,done)=>{
    done(null, obj)
})


function checkLoggedIn(req,res,next){
    const isLoggedIn = req.isAuthenticated() && req.user;
    if (!isLoggedIn) {
        return res.status(401).json({
            error: 'You must log in!'
        })
    }
    next();
}

module.exports = {
    clientPassport,
    checkLoggedIn,
    config
}