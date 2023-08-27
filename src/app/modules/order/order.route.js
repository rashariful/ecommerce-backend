// orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("./order.controller");
const { isAdmin, authMiddleware } = require("../../middlewares/authMiddleware");

// POST route to create a new order
router.post("/create-order",orderController.createOrder);
// GET route to get all orders
router.get("/",orderController.getAllOrders);
// GET route to get all orders
router.get("/:id",orderController.getSingleOrder);

// GET route to get orders by user ID
router.get("/getorder/:userId", orderController.getOrdersByUser);

// PUT route to update order status by order ID
router.put("/status/:orderId", orderController.updateOrderStatus);

// GET route to get orders by orderStatus
router.get("/status/:status", orderController.getOrdersByStatus);
module.exports = router;
