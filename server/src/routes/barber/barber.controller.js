const moment = require("moment");

const {
  getBarbers,
  getBarber,
  getBarberById,
  updateBarber,
  deleteBarber,
} = require("../../models/barber/barber.data");
const {
  getBarberAvailability,
} = require("../../services/barber/barber.service");
const { getPagination } = require("../../utils/query");

async function httpGetBarbers(req, res) {
  const { skip, limit } = getPagination(req.query);
  try {
    const barbers = await getBarbers(skip, limit);
    res.status(200).json(barbers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function httpGetBarber(req, res) {
  const barberID = req.params.id;
  try {
    let barber = await getBarberById(barberID);
    res.status(200).json(barber);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// needs a lot of work to update images of all kinds. profilePicure, gallery, or service images
async function httpUpdateBarber(req, res) {
  const { session, body, files } = req;
  if (session.passport.user.gid !== body.gid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    // const barber = await updateBarber(req.body); TURNED OFF UNTIL DONE
    res.status(200).json(barber);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function httpDeleteBarber(req, res) {
  const { session, body, files } = req;
  if (session.passport.user.gid !== body.gid) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const barber = await deleteBarber(session.passport.user.gid);
    res.status(200).json(barber);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function httpGetMyBarber(req, res) {
  try {
    // prefer user _id if available
    let barber = null;
    if (req.user?._id) {
      barber = await getBarber({ user: req.user._id });
    }

    // fallback to gid (for older docs / transition)
    if (!barber && req.user?.gid) {
      barber = await getBarber({ gid: req.user.gid });
    }

    if (!barber) return res.status(404).json({ isBarber: false });

    return res.status(200).json({ isBarber: true, barber });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function httpGetBarberAvailability(req, res) {
  const barberId = req.params.id;
  try {
    const barberAvailability = await getBarberAvailability(barberId);

    res.status(200).json(barberAvailability);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

async function httpGetMyBarberClients(req, res) {
  // to be implemented
}

async function httpGetMyBarberBookings(req, res) {
  // to be implemented
}

module.exports = {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
  httpGetBarberAvailability,
  httpGetMyBarber,
  httpGetMyBarberClients,
  httpGetMyBarberBookings,
};
