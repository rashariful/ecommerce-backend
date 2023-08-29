const Order = require("./order.model");
const { generateOrderID } = require("./order.utils");


const createOrderService = async (orderData) =>{
    // const order = await Order.findById({orderId: order})
    // console.log(order)

    const id = await generateOrderID(orderData)
    // console.log(id)

    orderData.orderId = id
    const result = await Order.create(orderData)
    // console.log(result)
    return result
}

const getSingleOrderSrc = async (orderId)=>{
    const result = await Order.findById(orderId).populate("userId").populate("products.product")
    // .populate("user");
    // .populate("products.product")
    return result
}

module.exports = {
    createOrderService,
    getSingleOrderSrc,
}