const Promotion = require("./promotion.model")

  // Your service code here
  const  createPromotionSrc = async (promotionData)=>{
    const result = await Promotion.create(promotionData)
    return result
  }


  module.exports = {
    createPromotionSrc
}