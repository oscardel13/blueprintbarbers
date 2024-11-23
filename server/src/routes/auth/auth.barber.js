var Passport = require("passport").Passport;
const { Strategy } = require("passport-google-oauth20");

// update to createBarber, checkBarber
const { createBarber } = require("../../models/barber/barber.data");
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

async function verifyCallback(accessToken, refreshToken, profile, done) {
  // This is where you can save the client to the database
  try {
    const barberObj = {
      name: profile._json.name,
      email: profile._json.email,
      gid: profile._json.sub,
      picture: profile._json.picture,
    };
    if (profile._json.email_verified) {
      const barber = await createBarber(barberObj); // Get MongoDB _id
      done(null, {
        _id: barber._id,
        email: barberObj.email,
        gid: barberObj.gid,
      }); // Pass _id to session
    } else {
      done(null, false, { message: "Email not verified" });
    }
  } catch (error) {
    done(error, null);
  }
  done(null, profile);
}
const barberPassport = new Passport();

barberPassport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
barberPassport.serializeUser((barber, done) => {
  const barberObj = {
    gid: barber.id,
    _id: barber._id,
    email: barber.email,
  };
  done(null, barberObj);
});

//read the session from cookie
barberPassport.deserializeUser((obj, done) => {
  done(null, obj);
});

async function checkIfBarber(req, res, next) {
  const barber = req.isAuthenticated() && req.user;
  if (!barber) {
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
