const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
   
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      apartment: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
  
    },
    paymentMethod: {
      type: String,
      enum: ["credit card", "paypal", "cash on delivery"],
      required: true,
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("TOrder", orderSchema);

module.exports = Order;
