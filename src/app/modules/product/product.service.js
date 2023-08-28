
const Product = require("./product.model");


const createProductService = async (productData) =>{
    const result = await Product.create(productData)
    console.log(result)
    return result
}
const updateProductService = async (productId, productData)=>{
    const result = await Product.findByIdAndUpdate({_id: productId},{$set: productData})
    return result

}
const deleteProductService = async (deleteId)=>{
    const result = await Product.findByIdAndDelete({_id: deleteId})
    return result

}

module.exports = {
   createProductService,
   updateProductService,
   deleteProductService,
   
}