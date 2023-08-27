const express = require("express");

const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  getAdminByEmailController,
} = require("./user.controller");
const { authMiddleware, isAdmin } = require("../../middlewares/authMiddleware");


const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.get("/admin/:email", getAdminByEmailController);
router.get("/logout", logout);

router.get("/all-users", getallUser);
router.delete("/:id", deleteaUser);

router.patch("/edit-user",  updatedUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);


router.post("/cart/create-cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);

router.get("/refresh", handleRefreshToken);
router.get("/wishlist", authMiddleware, getWishlist);

router.get("/cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);

module.exports =  router;

