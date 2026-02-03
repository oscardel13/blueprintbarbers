const express = require("express");

const {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
  httpGetMyBarber,
  httpGetBarberAvailability,
  httpGetMyBarberClients,
  httpGetMyBarberBookings,
  httpGetMyTopClients,
} = require("./barber.controller");

const BarberRouter = express.Router();

BarberRouter.get("/", httpGetBarbers);
BarberRouter.get("/me", httpGetMyBarber);
BarberRouter.put("/me", httpUpdateBarber);
BarberRouter.delete("/me", httpDeleteBarber);
BarberRouter.get("/me/clients", httpGetMyBarberClients);
BarberRouter.get("/me/top-clients", httpGetMyTopClients);
BarberRouter.get("/me/bookings", httpGetMyBarberBookings);
BarberRouter.get("/:id", httpGetBarber);
BarberRouter.get("/:id/availability", httpGetBarberAvailability);

module.exports = BarberRouter;
