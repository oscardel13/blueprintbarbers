// routes/auth/google.passport.js
const { Strategy } = require("passport-google-oauth20");
const {
  passport,
  config,
  findOrCreateUserFromProvider,
} = require("./passport");

const AUTH_OPTIONS = {
  callbackURL: `${config.API_URL}/auth/user/google/callback`,
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  try {
    const sub = profile?._json?.sub;
    const email = profile?._json?.email;
    const emailVerified = profile?._json?.email_verified;

    if (!emailVerified)
      return done(null, false, { message: "Email not verified" });

    const user = await findOrCreateUserFromProvider({
      provider: "google",
      providerId: sub,
      email,
      name: profile?._json?.name,
      picture: profile?._json?.picture,
    });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

module.exports = { passport };
