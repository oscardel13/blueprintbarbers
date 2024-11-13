const { checkAdmin } = require("../../models/user/user.data");
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  cancelOrder,
} = require("../../models/orders/orders.data");
const { getPagination } = require("../../utils/query");

const httpGetOrders = async (req, res) => {
  const { skip, limit } = getPagination(req.query);
  const user = req.user;
  try {
    const isAdmin = await checkAdmin(user.gid);
    let orders = null;
    if (isAdmin > 0) {
      orders = await getOrders(skip, limit);
    } else {
      orders = await getOrders(skip, limit, user.gid);
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const httpGetOrder = async (req, res) => {
  const user = req.user;
  try {
    const isAdmin = await checkAdmin(user.gid);
    const order = await getOrder(req.params.id);
    if (isAdmin || order.user === user.gid) res.status(200).json(order);
    else res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    res.status(400).json(err);
  }
};

// anyone can use
const httpCreateOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Only admin and owner can edit
const httpUpdateOrder = async (req, res) => {
  updatedLogs = req.body.logs;
  updatedLogs.push({
    message: req.body.log,
    by: req.user.gid,
  });
  const updatedOrder = { ...req.body, logs: updatedLogs };
  try {
    const order = await updateOrder(req.params.id, updatedOrder);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Only admin and owner can edit
const httpCancelOrder = async (req, res) => {
  try {
    const order = await cancelOrder(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  httpGetOrders,
  httpGetOrder,
  httpCreateOrder,
  httpUpdateOrder,
  httpCancelOrder,
};
