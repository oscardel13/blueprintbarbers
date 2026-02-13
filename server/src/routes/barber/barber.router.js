const express = require("express");

const multer = require("multer");
// const { checkIfTrainer, checkLoggedIn } = require('../utils/secruity');

const storage = multer.memoryStorage(); // You can customize storage as needed
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Implement file type and size filtering if needed
    cb(null, true); // Allow all files for now
  },
});

const {
  httpGetBarbers,
  httpGetBarber,
  httpPostBarber,
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
BarberRouter.post("/", httpPostBarber);
BarberRouter.get("/me", httpGetMyBarber);
BarberRouter.put(
  "/me",
  upload.fields([
    { name: "form", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  httpUpdateBarber,
);
BarberRouter.delete("/me", httpDeleteBarber);
BarberRouter.get("/me/clients", httpGetMyBarberClients);
BarberRouter.get("/me/top-clients", httpGetMyTopClients);
BarberRouter.get("/me/bookings", httpGetMyBarberBookings);
BarberRouter.get("/:id", httpGetBarber);
BarberRouter.get("/:id/availability", httpGetBarberAvailability);

module.exports = BarberRouter;
