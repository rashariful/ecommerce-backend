const asyncHandler = require("express-async-handler");
const userModel = require("./user.Model");

const createUserSrc =  asyncHandler (async (userData)=>{
const reuslt = await userModel.create(userData)
return reuslt
})
const userUpdateSrc = async (userId, userData)=>{
const reuslt = await userModel.findByIdAndUpdate({_id: userId}, {$set: userData})
return reuslt
}

module.exports = {
  createUserSrc,
  userUpdateSrc
}