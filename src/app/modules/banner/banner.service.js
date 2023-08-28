const asyncHandler = require("express-async-handler");
const Banner = require("./banner.model");


const createBannerService = async (BannerData)=>{
    const result = await Banner.create(BannerData)
    return result
}
const getAllBannerService = async ()=>{
    const result = await Banner.find()
    return result
}
const updateBannerService = asyncHandler (async (BannerId, BannerData)=>{
    const result = await Banner.findByIdAndUpdate({_id: BannerId},{$set: BannerData})
    return result

})
const deleteBannerService = asyncHandler (async (deleteId)=>{
    const result = await Banner.findByIdAndDelete({_id: deleteId})
    return result

})

module.exports = {
   createBannerService,
   getAllBannerService,
   updateBannerService,
   deleteBannerService,
   
}