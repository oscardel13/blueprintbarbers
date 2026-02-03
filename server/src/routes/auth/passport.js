// routes/auth/passport.js
const Passport = require("passport").Passport;
require("dotenv").config();

const {
  getUser,
  findUserByEmail,
  findUserByProvider,
  linkProviderToUser,
  createUserFromProvider,
} = require("../../models/user/user.data");

const passport = new Passport();

const config = {
  API_URL: process.env.API_URL || "",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",

  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
  COOKIE_MAX_AGE: Number(process.env.CLIENT_MAX_AGE || 1000 * 60 * 60 * 24 * 7),

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
};

async function findOrCreateUserFromProvider({
  provider, // 'google' | 'meta'
  providerId,
  email,
  name,
  picture,
  username,
}) {
  if (!providerId) throw new Error(`Missing providerId for ${provider}`);

  const providerPath =
    provider === "google"
      ? "authProviders.google.sub"
      : provider === "x"
        ? "authProviders.x.id"
        : "authProviders.meta.id";

  // 1) Find by provider id
  let user = await findUserByProvider(providerPath, providerId);

  // 2) If not found, try email match and link provider
  if (!user && email) {
    const emailUser = await findUserByEmail(email);
    if (emailUser) {
      const extras = {};
      if (provider === "x" && username)
        extras["authProviders.x.username"] = username;
      if (provider === "meta" && name) extras["authProviders.meta.name"] = name;

      user = await linkProviderToUser(
        emailUser._id,
        providerPath,
        providerId,
        extras,
      );
    }
  }

  // 3) Create new user if still none
  if (!user) {
    user = await createUserFromProvider({
      provider,
      providerId,
      name,
      email,
      picture,
      username,
    });
  }

  return user;
}

// serialize minimal session
passport.serializeUser((user, done) => {
  done(null, { _id: user._id, barberId: user.barberId });
});

// deserialize full user each request
passport.deserializeUser(async (obj, done) => {
  try {
    const user = await getUser(obj._id, {
      select: "name email picture roles barberId authProviders phone",
      lean: true,
    }); // uses user.data.js
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  passport,
  config,
  findOrCreateUserFromProvider,
};
