const express = require("express");
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getallBrand,
} = require("./brand.controller");
// const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-brand", createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);
router.get("/:id", getBrand);
router.get("/", getallBrand);

module.exports = router;
