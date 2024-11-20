const express = require("express");
const { checkIfBarber } = require("../auth/auth.barber");

const {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
} = require("./barber.controller");

const BarberRouter = express.Router();

BarberRouter.get("/", httpGetBarbers);
BarberRouter.get("/:id", httpGetBarber);
BarberRouter.put("/:id", checkIfBarber, httpUpdateBarber);
BarberRouter.delete("/:id", checkIfBarber, httpDeleteBarber);

module.exports = BarberRouter;
