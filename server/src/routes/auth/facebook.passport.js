// routes/auth/facebook.passport.js
const FacebookStrategy = require("passport-facebook").Strategy;
const {
  passport,
  config,
  findOrCreateUserFromProvider,
} = require("./passport");

const AUTH_OPTIONS = {
  clientID: config.FACEBOOK_APP_ID,
  clientSecret: config.FACEBOOK_APP_SECRET,
  callbackURL: `${config.API_URL}/auth/user/facebook/callback`,
  profileFields: ["id", "displayName", "emails", "photos"],
};

async function verifyCallback(accessToken, refreshToken, profile, done) {
  try {
    const id = profile?.id;
    const name = profile?.displayName || "";
    const email = profile?.emails?.[0]?.value;
    const picture = profile?.photos?.[0]?.value;

    const user = await findOrCreateUserFromProvider({
      provider: "meta",
      providerId: id,
      email,
      name,
      picture,
    });

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}

passport.use(new FacebookStrategy(AUTH_OPTIONS, verifyCallback));

module.exports = { passport };
