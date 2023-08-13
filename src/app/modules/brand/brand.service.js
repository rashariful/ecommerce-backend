const asyncHandler = require("express-async-handler");
const Brand = require("./brand.model");


const createBrandService = asyncHandler (async (brandData)=>{
    const result = await Brand.create(brandData)
    return result
})
const updateBrandService = asyncHandler (async (BrandId, BrandData)=>{
    const result = await Brand.findByIdAndUpdate({_id: BrandId},{$set: BrandData})
    return result

})
const deleteBrandService = asyncHandler (async (deleteId)=>{
    const result = await Brand.findByIdAndDelete({_id: deleteId})
    return result

})

module.exports = {
   createBrandService,
   updateBrandService,
   deleteBrandService,
   
}