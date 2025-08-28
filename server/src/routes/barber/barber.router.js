const express = require("express");
const { checkIfBarber } = require("../auth/auth.barber");

const {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
  httpCheckBarber,
  httpGetBarberAvailability
} = require("./barber.controller");

const BarberRouter = express.Router();

BarberRouter.get("/", httpGetBarbers);
BarberRouter.get("/check-barber", checkIfBarber, httpCheckBarber);
BarberRouter.get("/:id", httpGetBarber);
BarberRouter.put("/:id", checkIfBarber, httpUpdateBarber);
BarberRouter.delete("/:id", checkIfBarber, httpDeleteBarber);
BarberRouter.get("/:id/availability", httpGetBarberAvailability)

module.exports = BarberRouter;
