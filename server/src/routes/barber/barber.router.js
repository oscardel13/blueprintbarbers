const express = require("express");
const { checkIfBarber } = require("../auth/auth.barber");

const {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
  httpGetMyBarber,
  httpGetBarberAvailability,
  httpGetMyBarberClients,
  httpGetMyBarberBookings,
} = require("./barber.controller");

const BarberRouter = express.Router();

BarberRouter.get("/", httpGetBarbers);
BarberRouter.get("/me", checkIfBarber, httpGetMyBarber);
BarberRouter.get("/me/clients", checkIfBarber, httpGetMyBarberClients);
BarberRouter.get("/me/bookings", checkIfBarber, httpGetMyBarberBookings);
BarberRouter.get("/:id", httpGetBarber);
BarberRouter.put("/:id", checkIfBarber, httpUpdateBarber);
BarberRouter.delete("/:id", checkIfBarber, httpDeleteBarber);
BarberRouter.get("/:id/availability", httpGetBarberAvailability);

module.exports = BarberRouter;
