var Passport = require("passport").Passport;
const { Strategy } = require("passport-google-oauth20");

// update to createBarber, checkBarber
const { createBarber } = require("../../models/barber/barber.data");
// const { createUser } = require("../../models/user/user.data");
require("dotenv").config();

const API_URL = process.env.API_URL || "";

const config = {
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  CLIENT_MAX_AGE: process.env.CLIENT_MAX_AGE,
};

// ------------------------------------------------------------------------------

const AUTH_OPTIONS = {
  callbackURL: `${API_URL}/auth/barber/google/callback`,
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  // This is where you can save the client to the database
  const barberObj = {
    name: profile._json.name,
    email: profile._json.email,
    gid: profile._json.sub,
    picture: profile._json.picture,
  };
  if (profile._json.email_verified) {
    createBarber(barberObj);
  }
  done(null, profile);
}
const barberPassport = new Passport();

barberPassport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
barberPassport.serializeUser((user, done) => {
  const barberObj = {
    gid: user.id,
    email: user._json.email,
  };
  done(null, barberObj);
});

//read the session from cookie
barberPassport.deserializeUser((obj, done) => {
  done(null, obj);
});

async function checkIfBarber(req, res, next) {
  const user = req.isAuthenticated() && req.user;
  if (!user) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}

module.exports = {
  barberPassport,
  checkIfBarber,
  config,
};
