const mongoose = require('./db.js');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  profilePicUrl: { type: String},
  contactInfo: { type: String, required: true, },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("User", userSchema);