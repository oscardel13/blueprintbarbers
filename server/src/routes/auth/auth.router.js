// routes/auth/auth.router.js
const authRouter = require("express").Router();
require("dotenv").config();

const { passport, config } = require("./passport");
const { checkLoggedIn } = require("./middleware");

// Register strategies (these files attach strategies to the shared passport instance)
require("./google.passport");
require("./facebook.passport");
// require("./x.passport");

const CLIENT_URL = config.CLIENT_URL;

// Helper to store redirect path
function stashRedirect(req, res, next) {
  req.session.redirectUrl = req.query.path || "/";
  next();
}

// ---------- GOOGLE LOGIN ----------
authRouter.get(
  "/user/google",
  stashRedirect,
  passport.authenticate("google", { scope: ["email", "profile"] }),
);

authRouter.get(
  "/user/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const redirectUrl = `${CLIENT_URL}${req.session.redirectUrl || "/"}`;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  },
);

// ---------- FACEBOOK LOGIN ----------
authRouter.get(
  "/user/facebook",
  stashRedirect,
  passport.authenticate("facebook", { scope: ["email", "public_profile"] }),
);

authRouter.get(
  "/user/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const redirectUrl = `${CLIENT_URL}${req.session.redirectUrl || "/"}`;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  },
);

// ---------- X LOGIN ----------
authRouter.get("/user/x", stashRedirect, passport.authenticate("twitter"));

authRouter.get(
  "/user/x/callback",
  passport.authenticate("twitter", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const redirectUrl = `${CLIENT_URL}${req.session.redirectUrl || "/"}`;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  },
);

// ---------- CONNECT FACEBOOK (link to existing logged-in user) ----------
authRouter.get(
  "/user/facebook/connect",
  checkLoggedIn,
  stashRedirect,
  passport.authorize("facebook", { scope: ["email"] }),
);

authRouter.get(
  "/user/facebook/connect/callback",
  checkLoggedIn,
  passport.authorize("facebook", { failureRedirect: "/auth/failure" }),
  async (req, res) => {
    // With authorize(), provider profile ends up in req.account
    // Passport will still call our verify callback and return a "user" object,
    // but since we used findOrCreateUserFromProvider it may create a new account.
    // We'll fix this properly when we implement "linking" logic in createUser/update.
    // For now: just redirect.
    const redirectUrl = `${CLIENT_URL}${req.session.redirectUrl || "/"}`;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  },
);

// ---------- CONNECT X ----------
authRouter.get(
  "/user/x/connect",
  checkLoggedIn,
  stashRedirect,
  passport.authorize("twitter"),
);

authRouter.get(
  "/user/x/connect/callback",
  checkLoggedIn,
  passport.authorize("twitter", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const redirectUrl = `${CLIENT_URL}${req.session.redirectUrl || "/"}`;
    delete req.session.redirectUrl;
    res.redirect(redirectUrl);
  },
);

// Failure + logout
authRouter.get("/failure", (req, res) =>
  res.status(401).send("Failed to log in"),
);

authRouter.get("/logout", (req, res) => {
  req.logout(() => {});
  res.status(200).send("logged out");
});

module.exports = authRouter;
