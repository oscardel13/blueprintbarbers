// // routes/auth/x.passport.js
// const TwitterStrategy = require("passport-twitter").Strategy;
// const {
//   passport,
//   config,
//   findOrCreateUserFromProvider,
// } = require("./passport");

// const AUTH_OPTIONS = {
//   consumerKey: config.TWITTER_CONSUMER_KEY,
//   consumerSecret: config.TWITTER_CONSUMER_SECRET,
//   callbackURL: `${config.API_URL}/auth/user/x/callback`,
//   includeEmail: true, // may or may not return email
// };

// async function verifyCallback(token, tokenSecret, profile, done) {
//   try {
//     const id = profile?.id;
//     const username = profile?.username || profile?._json?.screen_name || "";
//     const name = profile?.displayName || username;
//     const email = profile?.emails?.[0]?.value; // often missing
//     const picture = profile?.photos?.[0]?.value;

//     const user = await findOrCreateUserFromProvider({
//       provider: "x",
//       providerId: id,
//       email,
//       name,
//       picture,
//       username,
//     });

//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// }

// passport.use(new TwitterStrategy(AUTH_OPTIONS, verifyCallback));

// module.exports = { passport };
