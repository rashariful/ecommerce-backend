const express = require("express");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
} = require("./product.controller");


const router = express.Router();

router.post("/create-product", createProduct);
router.patch("/:id",  updateProduct);

router.put("/wishlist",  addToWishlist);
router.put("/rating",  rating);

router.get("/:id", getaProduct);
router.delete("/:id",  deleteProduct);

router.get("/", getAllProduct);

module.exports = router;
