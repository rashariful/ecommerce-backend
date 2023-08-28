
// Define your routes here
const express = require("express");
const { createBanner, getAllBanner, getSingleBanner, updateBanner, deleteBanner } = require("./banner.controller");
const router = express.Router();

router.post("/create-banner", createBanner);
router.get("/", getAllBanner);
router.get("/:id", getSingleBanner);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

module.exports = router;

