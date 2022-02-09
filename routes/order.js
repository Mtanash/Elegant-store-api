const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);

orderRouter.get("/:id", getOrder);

orderRouter.post("/", authMiddleware, createOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
