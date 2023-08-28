
  // Your controller code here

const asyncHandler = require("express-async-handler");
const Banner = require("./banner.model");
const { createBannerService, getAllBannerService } = require("./banner.service");
const validateMongoDbId = require("../../../utils/validateMongodbId");

  // create banner
  const createBanner = async (req, res) => {

    const bannerData = req.body
  try {
      const newbanner = await createBannerService(bannerData);
      res.status(200).json({
        success: true,
        message: "create banner successfully",
        data: newbanner,
      });
  
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Can't create banner",
      data: error,
    });
  }
};

// get All banner
const getAllBanner = asyncHandler(async (req, res) => {
    try {
      const getAllbanner = await getAllBannerService();

      res.status(200).json({
        success: true,
        message: "Get all banner successfully",
        data: getAllbanner,
      });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No Found banner",
            data: error,
          });
    }
  });

  // Get single banner
  const getSingleBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getSinglebanner = await Banner.findById(id);
      
      res.status(200).json({
        success: true,
        message: "Get single banner successfully",
        data: getSinglebanner,
      });

    } catch (error) {

     res.status(400).json({
            success: false,
            message: "No found single banner",
            data: error,
          });
    }
  });

  // Update banner
  const updateBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedbanner = await Banner.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "Update banner successfully",
        data: updatedbanner,
      });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't update banner",
            data: error,
          });
    }
  });
  

  // Delete banner
  const deleteBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedbanner = await Banner.findByIdAndDelete(id);
      
      res.status(200).json({
        success: true,
        message: "Delete banner successfully",
        data: deletedbanner,
      });
    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Can't Delete banner",
            data: error,
          });
    }
  });
  

  module.exports = {
    createBanner,
    getAllBanner,
    getSingleBanner,
    updateBanner,
    deleteBanner,
  };
  
  
