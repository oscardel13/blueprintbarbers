const express = require("express");

const {
  httpCancelOrder,
  httpCreateOrder,
  httpGetOrder,
  httpGetOrders,
  httpUpdateOrder,
} = require("./order.controller");
const { checkLoggedIn, requireRole } = require("../auth/middleware");

const OrderAPI = express.Router();

OrderAPI.get("/", checkLoggedIn, httpGetOrders);
OrderAPI.get("/:id", checkLoggedIn, httpGetOrder);
OrderAPI.post("/", checkLoggedIn, httpCreateOrder);
OrderAPI.put("/:id", requireRole("admin"), httpUpdateOrder);
OrderAPI.put("/:id/cancel", checkLoggedIn, httpCancelOrder);

module.exports = OrderAPI;
