const { userPassport, trainerPassport } = require("../../utils/secruity");

const authRouter = require("express").Router();

require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

authRouter.get(
  "/google",
  (req, res, next) => {
    // Store the current URL in the session
    req.session.redirectUrl = req.query.path || "/";

    next();
  },
  userPassport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

authRouter.get(
  "/google/callback",
  userPassport.authenticate("google", {
    failureRedirect: "/auth/failure",
  }),
  (req, res) => {
    // Redirect to the previous URL stored in session, or default to the home page
    const redirectUrl = `${CLIENT_URL}${req.session.redirectUrl}`;
    delete req.session.redirectUrl; // Clear it from session if you want
    res.redirect(redirectUrl);
  }
);

// Need a better system than just send
authRouter.get("/failure", (req, res) => res.send("Failed to log in"));

authRouter.get("/logout", (req, res) => {
  console.log("logging out");
  req.logout();
  res.status(200).send("logged out");
});

module.exports = authRouter;
