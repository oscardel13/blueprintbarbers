const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const api = require("./routes/api");

const cookieSession = require("cookie-session");
const { passport, config } = require("./routes/auth/passport");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(
  cors({
    origin: [
      "http://192.168.86.44:3000",
      "https://192.168.86.44:3000",
      "http://localhost:3000",
      "https://blueprintbarbers.co",
      "https://beta.blueprintbarbers.co",
    ],
    credentials: true,
  }),
);

app.use(
  cookieSession({
    name: "session",
    maxAge: config.COOKIE_MAX_AGE,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
    sameSite: false,
    // secure: true // enable in HTTPS
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("combined"));

app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

app.get("/", (req, res) => {
  res.send("Hello from BluePrint Barbers!");
});

app.use("/", api);

module.exports = app;
