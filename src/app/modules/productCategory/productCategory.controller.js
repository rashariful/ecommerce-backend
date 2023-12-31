const validateMongoDbId = require("../../../utils/validateMongodbId");
const Category = require("./productCategory.model");
const asyncHandler = require("express-async-handler");


const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json({
      success: true,
      message: `create product Category successfully`,
      data: newCategory
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Can't create product Category`,
      data: error
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getallCategory = asyncHandler(async (req, res) => {
  try {
    const categoryData = await Category.find();
    res.status(200).json({
      success: true,
      message: `Get All Product Category successfully`,
      data: categoryData
    });
  } catch (error) {
    res.status(400).json({
      success: true,
      message: `No Found Product Category`,
      data: error
    });
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getallCategory,
};
