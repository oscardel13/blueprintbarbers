const express = require("express");

const ProductRouter = require("./product/product.router");
const UserRouter = require("./user/user.router");
const AuthRouter = require("./auth/auth.router");
const OrderRouter = require("./order/order.router");
const PaymentRouter = require("./payment/payment.router");
const BarberRouter = require("./barber/barber.router");
const BookingRouter = require("./booking/booking.router");
const api = express.Router();

api.use("/users", express.json(), UserRouter);
api.use("/auth", express.json(), AuthRouter);
api.use("/products", express.json(), ProductRouter);
api.use("/payment", PaymentRouter);
api.use("/orders", express.json(), OrderRouter);
api.use("/barbers", express.json(), BarberRouter);
api.use("/bookings", express.json(), BookingRouter);

module.exports = api;
