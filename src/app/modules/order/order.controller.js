// orderController.js
const Order = require("./order.model");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      user,
      products,
      orderStatus,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentResult,
    } = req.body;

    const newOrder = new Order({
      user,
      products,
      orderStatus,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentResult,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
        success: true,
        message: "order success",
        data: savedOrder
    });

  } catch (error) {
    res.status(500).json({ error: "Could not create order" });
    console.log(error.path, error.value)
  }
};

// Get orders by user ID
const getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId });
    res.status(201).json({
        success: true,
        message: "order success",
        data: orders
    });

  } catch (error) {
    res.status(500).json({ error: "Could not get orders" });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const { newStatus } = req.body;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus: newStatus },
        { new: true } // Return the updated order
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Could not update order status" });
    }
  };
  

  // Get orders by orderStatus
const getOrdersByStatus = async (req, res) => {
    const { status } = req.params;
  
    try {
      const orders = await Order.find({ orderStatus: status });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: "Could not get orders" });
    }
  };

  // Get all orders
const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate("user")
      .populate("products.product")
      res.status(200).json({
        success: true,
        message: 'get all orders',
        data: orders
      });
    } catch (error) {
      res.status(500).json({ error: "Could not get orders" });
    }
  };

module.exports = {
    createOrder,
    getOrdersByUser,
    updateOrderStatus,
    getOrdersByStatus,
    getAllOrders,
}