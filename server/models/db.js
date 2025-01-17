const mongoose = require("mongoose");
const dbconnect = require("../config/dbconnect");

require("dotenv").config({ path: "config.env" });

const DB_PROT = process.env.DB_PROT || "mongodb";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "";
const DB_NAME = process.env.DB_NAME || "sellio";
const DB_SRV = process.env.DB_SRV || "";

const connectDB = async () => {
  const URI = dbconnect(DB_PROT, DB_SRV, DB_HOST, DB_PORT, DB_NAME);
  try {
    await mongoose.connect(URI);
    console.log(
      `Database ${DB_NAME} on port ${DB_PORT} connected successfully!`
    );
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
