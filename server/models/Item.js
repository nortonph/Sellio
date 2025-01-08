const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  city: String,
  country: String,
  images: [String],
  videos: [String],
  datePosted: { type: Date, default: Date.now },
  isAdmin : {type:Boolean, default: false},
  isBanner  : {type:Boolean, default: false},
});

module.exports = mongoose.model("Item", itemSchema);