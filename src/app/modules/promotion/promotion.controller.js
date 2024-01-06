const validateMongoDbId = require("../../../utils/validateMongodbId");
const asyncHandler = require("express-async-handler");

const { createPromotionSrc } = require("./promotion.service");
const Promotion = require("./promotion.model");

  // create promotion
  const createPromotion = async (req, res) => {

    const promotionData = req.body
  try {
      const newpromotion = await createPromotionSrc(promotionData);
      res.status(200).json({
        success: true,
        message: "create promotion successfully",
        data: newpromotion,
      });
  
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't create promotion",
      data: error,
    });
  }
};

// get All promotion
const getAllPromotion = asyncHandler(async (req, res) => {
    try {
      const getAllpromotion = await Promotion.find({});

      res.status(200).json({
        success: true,
        message: "Get all promotion successfully",
        data: getAllpromotion,
      });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No Found promotion",
            data: error,
          });
    }
  });

  // Get single promotion
  const getSinglePromotion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getSinglepromotion = await Promotion.findById(id);
      
      res.status(200).json({
        success: true,
        message: "Get single promotion successfully",
        data: getSinglepromotion,
      });

    } catch (error) {

     res.status(400).json({
            success: false,
            message: "No found single promotion",
            data: error,
          });
    }
  });

  // Update promotion
  const updatePromotion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedpromotion = await Promotion.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Update promotion successfully",
        data: updatedpromotion,
      });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't update promotion",
            data: error,
          });
    }
  });
  

  // Delete promotion
  const deletePromotion = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedpromotion = await Promotion.findByIdAndDelete(id);
      
      res.status(200).json({
        success: true,
        message: "Delete promotion successfully",
        data: deletedpromotion,
      });
    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Can't Delete promotion",
            data: error,
          });
    }
  });
  

  module.exports = {
    createPromotion,
    getAllPromotion,
    getSinglePromotion,
    updatePromotion,
    deletePromotion,
  };
  
  
