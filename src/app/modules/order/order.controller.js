// orderController.js
const validateMongoDbId = require("../../../utils/validateMongodbId");
const Order = require("./order.model");
// const { getSingleOrderSrc } = require("./order.service");
const asyncHandler = require("express-async-handler");
const { generateOrderID } = require("./order.utils");
const { createOrderService, getSingleOrderSrc } = require("./order.service");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body;
    // console.log(orderData)
    const order = await createOrderService(orderData);
    // console.log(order)

    res.status(200).json({
      success: true,
      message: `create Order successfully`,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "can't create order",
      data: error,
    });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.product");
    console.log(orders);

    res.status(200).json({
      success: true,
      message: "get all orders",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ error: "Could not get orders" });
    console.log(error.message);
  }
};

// const createOrder = async (req, res) => {
//   const orderData = req.body
//   try {
// //     const {
// //       user,
// //       orders,
// //       orderStatus,
// //       totalAmount,
// //       shippingAddress,
// //       paymentMethod,
// //       paymentResult,} = req.body;
// // // const id = generateOrderID()
// // // Order.id = id
// //     const newOrder = new Order({
// //       // _id,
// //       user,
// //       orders,
// //       orderStatus,
// //       totalAmount,
// //       shippingAddress,
// //       paymentMethod,
// //       paymentResult,
// //     });
//     // console.log(newOrder)
//     const savedOrder = await ;

//     res.status(200).json({
//       success: true,
//       message: "Order success",
//       data: savedOrder,
//     });

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Can't create Order",
//       data: error,
//     });
//   }
// };

// Get orders by user ID
// const getSingleOrder = async (req, res) => {

//   try {
//     const  {id}  = req.params;
//     const orderData = await getSingleOrderSrc(id)
//     ;
//     res.status(201).json({
//       success: true,
//       message: "Get single order success",
//       data: orderData,
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

const getSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  console.log(id);
  try {
    const orderData = await getSingleOrderSrc(id);
    // .populate("userId")
    // .populate("products.product");
    res.status(201).json({
      success: true,
      message: "Get single order success",
      data: orderData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "No Found single order",
      data: error,
    });
  }
});

// Get orders by user ID
const getOrdersByUser = async (req, res) => {
  const { userId } = req.query;
  console.log(userId);

  try {
    const orders = await Order.find({ userId });
    res.status(201).json({
      success: true,
      message: "order success",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ error: "Could not get orders" });
  }
};

// Get orders by orderStatus
const getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ orderStatus: status })
      .populate("userId")
      .populate("products.product");
    res.status(200).json(orders);
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

module.exports = {
  createOrder,
  getOrdersByUser,
  getSingleOrder,
  updateOrderStatus,
  getOrdersByStatus,
  getAllOrders,
};
