const express = require("express");
const {
  createColor,
  updateColor,
  deleteColor,
  getColor,
  getallColor,
} = require("./color.controller");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-color",  createColor);
router.put("/:id", authMiddleware,  updateColor);
router.delete("/:id", authMiddleware,  deleteColor);
router.get("/:id", getColor);
router.get("/", getallColor);

module.exports = router;
