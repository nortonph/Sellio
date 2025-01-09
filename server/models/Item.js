const mongoose = require('./db.js');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },//TODO float
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  city: String,
  country: String,
  images: [String],
  videos: [String],
  datePosted: { type: Date, default: Date.now },
  isBanner  : {type:Boolean, default: false},
  isSold : {type:Boolean, default: false},
});

module.exports = mongoose.model("Item", itemSchema);