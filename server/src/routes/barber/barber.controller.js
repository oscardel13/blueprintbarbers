const moment = require("moment");

const {
  getBarbers,
  getBarber,
  getBarberById,
  updateBarber,
  deleteBarber,
  getBarberClients,
} = require("../../models/barber/barber.data");
const {
  getBarberAvailability,
} = require("../../services/barber/barber.service");

const {
  getTopClientsForBarber,
} = require("../../models/booking/booking.analytics");

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
  try {
    const barberId = req.user?.barberId; // easiest if you store this on user
    if (!barberId)
      return res.status(404).json({ error: "No barber profile found" });

    const clients = await getBarberClients(barberId);
    return res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function httpGetMyBarberBookings(req, res) {
  try {
    const barberId = req.user?.barberId;
    if (!barberId)
      return res.status(404).json({ error: "No barber profile found" });

    const {
      clientId,
      status,
      start,
      end,
      skip = "0",
      limit = "50",
      sortDir = "1",
    } = req.query;

    const query = { barber: barberId };

    // Optional: filter by one client
    if (clientId) {
      if (!mongoose.Types.ObjectId.isValid(clientId)) {
        return res.status(400).json({ error: "Invalid clientId" });
      }
      query.customer = new mongoose.Types.ObjectId(clientId);
    }

    // Optional: filter by status
    if (status) {
      query.status = status; // you can validate against enum if you want
    }

    // Optional: date range filter (by startTime)
    const startDate = parseDateOrUndefined(start);
    const endDate = parseDateOrUndefined(end);

    if (startDate || endDate) {
      query.startTime = {};
      if (startDate) query.startTime.$gte = startDate;
      if (endDate) query.startTime.$lt = endDate; // < end is usually best
    }

    const bookings = await getBookings(
      query,
      Math.max(parseInt(skip, 10), 0),
      Math.min(Math.max(parseInt(limit, 10), 0), 200),
      parseInt(sortDir, 10) === -1 ? -1 : 1,
    );

    return res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

async function httpGetMyTopClients(req, res) {
  try {
    const barberId = req.user?.barberId;
    if (!barberId)
      return res.status(404).json({ error: "No barber profile found" });

    const { limit, start, end } = req.query;

    const clients = await getTopClientsForBarber({
      barberId,
      limit,
      start,
      end,
      statuses: ["confirmed", "finished"], // decide your rule
    });
    console.log("Top clients:", clients);

    return res.status(200).json(clients);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { httpGetMyTopClients };

module.exports = {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
  httpGetBarberAvailability,
  httpGetMyBarber,
  httpGetMyBarberClients,
  httpGetMyBarberBookings,
  httpGetMyTopClients,
};
