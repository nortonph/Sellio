const mongoose = require("mongoose");

require("dotenv").config({ path: "../config.env" });

const DB_PROT = process.env.DB_PROT || "mongodb";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "sellio";
const DB_SRV = process.env.DB_SRV || "";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${DB_PROT}://${DB_SRV}${DB_HOST}:${DB_PORT}/${DB_NAME}`
      
        //'mongodb+srv://username:badpw@cluster0-OMITTED.mongodb.net/'
      
    );
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
