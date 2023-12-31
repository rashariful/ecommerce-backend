
const asyncHandler = require("express-async-handler");
const { createBrandService } = require("./brand.service");
const Brand = require("./brand.model");


const createBrand = asyncHandler(async (req, res) => {
  const brandData = req.body
  try {
    const newBrand = await createBrandService(brandData);
    res.status(200).json({
      success: true,
      message: `create brand successfully`,
      data: newBrand
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `can't create brand`,
      data: error
    });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await Brand.findById(id);
    res.json(getaBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBrand = asyncHandler(async (req, res) => {
  try {
    const brandData = await Brand.find();
    res.status(200).json({
      success: true,
      message: `Get all brand successfully`,
      data: brandData
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: `No Found Brand`,
      data: error
    });
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
};
