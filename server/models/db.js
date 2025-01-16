const mongoose = require('mongoose');
const DB_PROT = process.env.DB_NAME || 'mongodb';
const DB_HOST = process.env.DB_NAME || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'sellio';

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_PROT}://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      
      
    });
    console.log(`Database ${DB_NAME} on port ${DB_PORT} connected successfully!`);
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
