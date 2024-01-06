const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  start_date: {
    type: String,
    required: true,
    unique: true,
    Date
  },
  end_date: {
    type: String,
    required: true,
    unique: true,
    Date
  },
  // start_date: Date,
  
  products: [
    { 
      type: mongoose.Schema.Types.ObjectId,
       ref: 'Product' 
      }
    ],
  // Add other fields as needed
},
{ timestamps: true }
);

module.exports = mongoose.model('Promotion', promotionSchema);
