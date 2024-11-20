const {
  getBarbers,
  getBarber,
  updateBarber,
  deleteBarber,
} = require("../../models/barber/barber.data");
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
  console.log(barberID);
  try {
    const barber = await getBarber(barberID);
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

module.exports = {
  httpGetBarbers,
  httpGetBarber,
  httpUpdateBarber,
  httpDeleteBarber,
};
