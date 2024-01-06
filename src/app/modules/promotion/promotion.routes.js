
// Define your routes here
const express = require("express");
const { createPromotion, getAllPromotion, getSinglePromotion, updatePromotion, deletePromotion } = require("./promotion.controller");
const router = express.Router();

router.post("/create-promotion", createPromotion);
router.get("/", getAllPromotion);
router.get("/:id", getSinglePromotion);
router.put("/:id", updatePromotion);
router.delete("/:id", deletePromotion);

module.exports = router;

