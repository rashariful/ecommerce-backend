const Order = require("./order.model");


const findLastOrderId = async () => {
  const lastOrder = await Order.findOne({}, { orderId: 1, _id: 0 }).sort({
    createdAt: -1,
  });

  // console.log(lastOrder)

  return lastOrder?.orderId ? lastOrder.orderId.substring(6, 10) : '00';
  // return lastOrder?.orderId ? lastOrder.orderId.substring(4) : undefined;
};

const generateOrderID = async () => {
  const currentId = (await findLastOrderId()) || '00000';
  
  const prefix = 'IPN';
  const lastTwoDigitsOfYear = new Date().getFullYear().toString().slice(-2);
  // const timestamp = new Date(); // Use timestamp as the dynamic portion
  console.log(lastTwoDigitsOfYear)

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  const orderID = `${prefix}${lastTwoDigitsOfYear}${incrementedId}`;
  console.log(orderID)
  return orderID;
};








// const findLastOrderId = async ()=> {
//     const lastOrder = await Order.findOne({},{ id: 1, _id: 0 })
//     console.log(lastOrder)
//       .sort({
//         createdAt: -1,
//       })
//       .lean();
//       // console.log(lastOrder)
  
//     return lastOrder?.orderId ? lastOrder.orderId.substring(4) : undefined;
//   };

//   const generateOrderID = async ()=> {
//     const currentId = (await findLastOrderId()) || (0).toString().padStart(5, '0'); //00000
//     const prefix = "EVL";
//     const timestamp = Date().substring(10,15); // Use timestamp as the dynamic portion
//     // const randomString = (0).toString().padStart(5, '0');
//     // const randomString = Math.random().toString(36).substring(6);
//     // console.log(timestamp) // Generate a random string
//     let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

//     const orderID = `${prefix}${timestamp}${incrementedId}`;
//     // let incrementedId = orderID + 1;
//     return orderID;
//   }
  // const generateOrderID =()=> {
  //   const prefix = "ASHIK";
  //   const timestamp = Date().substring(10,15); // Use timestamp as the dynamic portion
  //   const randomString = (0).toString().padStart(5, '0');
  //   // const randomString = Math.random().toString(36).substring(6);
  //   // console.log(timestamp) // Generate a random string
  //   const orderID = `${prefix}${timestamp}${randomString}`;
  //   let incrementedId = orderID + 1;
  //   return incrementedId;
  // }
  
  // const customOrderID = generateOrderID();
  // const customOrderLAS = findLastOrderId();
  // console.log(customOrderLAS,customOrderID);
  
  
 const generateStudentId = async (academicSemester)=> {
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
    //increment by 1
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    //20 25
    incrementedId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`;
  
    return incrementedId;
  };
  
  module.exports = {
    generateOrderID
  }