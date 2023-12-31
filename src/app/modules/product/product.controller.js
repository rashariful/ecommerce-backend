
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { createProductService, updateProductService, deleteProductService } = require("./product.service");
const validateMongoDbId = require("../../../utils/validateMongodbId");
const Product = require("./product.model");
const User = require("../user/user.Model")


const createProduct = async (req, res) => {
  try {
    const productData = req.body
    console.log(productData)
    const product = await createProductService(productData)

    res.status(200).json({
      success: true,
      message: `create product successfully`,
      data: product
    });

  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      message: "can't create product",
      data: error
    });
  }
};


const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "search"]; // Add "search" to excludeFields

    excludeFields.forEach((el) => delete queryObj[el]);
    
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    
    let query = Product.find(JSON.parse(queryStr));
  // Search Query
  const searchQuery = req.query.search;

  if (searchQuery) {
    const searchFields = [
      "title",
      "brand",
      "category",
      // Add other fields you want to search here
    ];

    const searchFilters = searchFields.map((field) => ({
      [field]: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
    }));

    query = query.or(searchFilters);
  }
   
   

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page  || 1;
    const limit = req.query.limit || 6;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exist");
    }
    const product = await query;
    const total = await Product.countDocuments();

    const pageCount = Math.ceil(total/limit)

    res.status(200).json({
      success: true,
      message: "Get all Products",
      data: product,
      page: page,
      limit: limit,
      skip: skip,
      pageCount: pageCount
    });
  } catch (error) {
    throw new Error(error);
  }
});



// const getAllProduct = asyncHandler(async (req, res) => {
//   try {
//     // Filtering
//     const queryObj = { ...req.query };
//     const excludeFields = ["page", "sort", "limit", "fields"];

//     excludeFields.forEach((el) => delete queryObj[el]);
    
//     let queryStr = JSON.stringify(queryObj);

//     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//     let query = Product.find(JSON.parse(queryStr));

//     // Sorting

//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort("-createdAt");
//     }

//     // limiting the fields

//     if (req.query.fields) {
//       const fields = req.query.fields.split(",").join(" ");
//       query = query.select(fields);
//     } else {
//       query = query.select("-__v");
//     }

//     // pagination

//     const page = req.query.page;
//     const limit = req.query.limit;
//     const skip = (page - 1) * limit;
//     query = query.skip(skip).limit(limit);
//     if (req.query.page) {
//       const productCount = await Product.countDocuments();
//       if (skip >= productCount) throw new Error("This Page does not exists");
//     }
//     const product = await query;

//     res.status(200).json({
//       success: true,
//       message: "Get all Products",
//       data: product,
//       page: page,
//       limit: limit,
//       skip: skip
//     });

//   } catch (error) {
//     throw new Error(error);
//   }
// });

// server.js
// const getProductBySearch = asyncHandler ("/api/search", async (req, res) => {
//   try {
//     const query = req.query.query;
//     // Fetch products from your database based on the query
//     const searchResults = await Product.find({ title: { $regex: query, $options: "i" } });
//     res.json(searchResults);
//   } catch (error) {
//     console.error("Error fetching search results:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// const updateProduct = asyncHandler(async (req, res) => {
//   const {id} = req.params
//   try { 
//     const updateProduct = updateProductService(id, req.body)

//     res.status(200).json({
//       success: true,
//       message: `update Product successfully`,
//       data: updateProduct
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: `can't update`,
//       data: error
//     });
//   }
// });

const deleteProduct = asyncHandler(async (req, res) => {
  const {id} = req.params;

  try {
    const deleteProduct = deleteProductService(id);
    res.status(200).json({
      success: true,
      message: 'successfully deleted',
      data: deleteProduct
    });
  } catch (error) {
    // throw new Error(error);
    res.status(200).json({
      success: false,
      message: 'cant deleted',
      data: error
    });
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  // const { _id } = req.user;
  const { userId, prodId } = req.body;
  try {
    const user = await User.findById(userId);
    console.log(user)
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  // getProductBySearch,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
