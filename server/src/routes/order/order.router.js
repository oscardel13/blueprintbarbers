const express = require("express");

const {
  httpCancelOrder,
  httpCreateOrder,
  httpGetOrder,
  httpGetOrders,
  httpUpdateOrder,
} = require("./order.controller");
const { checkLoggedIn, checkIfAdmin } = require("../auth/auth.user");

const OrderAPI = express.Router();

OrderAPI.get("/", checkLoggedIn, httpGetOrders);
OrderAPI.get("/:id", checkLoggedIn, httpGetOrder);
OrderAPI.post("/", checkLoggedIn, httpCreateOrder);
OrderAPI.put("/:id", checkIfAdmin, httpUpdateOrder);
OrderAPI.put("/:id/cancel", checkLoggedIn, httpCancelOrder);

module.exports = OrderAPI;
