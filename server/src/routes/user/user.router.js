const express = require("express");
const { checkLoggedIn, checkIfAdmin } = require("../auth/auth.user");

const {
  httpDeleteUser,
  httpGetUser,
  httpGetUsers,
  httpUpdateUser,
  httpCheckIfAdmin,
  httpGetMyUser,
} = require("./user.controller");

const UserAPI = express.Router();

UserAPI.get("/", checkIfAdmin, httpGetUsers);
UserAPI.get("/checkAdmin", checkIfAdmin, httpCheckIfAdmin);
UserAPI.get("/me", checkLoggedIn, httpGetMyUser);
UserAPI.get("/:id", checkLoggedIn, httpGetUser);
UserAPI.put("/:id", checkLoggedIn, httpUpdateUser);
UserAPI.delete("/:id", httpDeleteUser);

module.exports = UserAPI;
