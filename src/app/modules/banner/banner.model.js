
const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
     default: false
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Banner", bannerSchema);


