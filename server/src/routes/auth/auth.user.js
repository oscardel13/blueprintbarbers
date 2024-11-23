var Passport = require("passport").Passport;

const { Strategy } = require("passport-google-oauth20");

const { createUser, checkAdmin } = require("../../models/user/user.data");
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
  callbackURL: `${API_URL}/auth/user/google/callback`,
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  // This is where you can save the client to the database
  try {
    const userObj = {
      name: profile._json.name,
      email: profile._json.email,
      gid: profile._json.sub, // Keep Google ID for reference if needed
      picture: profile._json.picture,
    };

    if (profile._json.email_verified) {
      const user = await createUser(userObj); // Get MongoDB _id
      done(null, { _id: user._id, email: userObj.email, gid: userObj.gid }); // Pass _id to session
    } else {
      done(null, false, { message: "Email not verified" });
    }
  } catch (error) {
    done(error, null);
  }
}
const userPassport = new Passport();

userPassport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
userPassport.serializeUser((user, done) => {
  const userObj = {
    gid: user.id,
    _id: user._id,
    email: user.email,
  };
  done(null, userObj);
});

//read the session from cookie
userPassport.deserializeUser((obj, done) => {
  done(null, obj);
});

function checkLoggedIn(req, res, next) {
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  next();
}

async function checkIfAdmin(req, res, next) {
  const user = req.isAuthenticated() && req.user;
  if (!user) {
    return res.status(401).json({
      error: "You must log in!",
    });
  }
  const isAdmin = await checkAdmin(user._id);
  if (!isAdmin) {
    return res.status(403).json({
      error: "You must be admin!",
    });
  }
  next();
}

module.exports = {
  userPassport,
  checkLoggedIn,
  config,
  checkIfAdmin,
};
