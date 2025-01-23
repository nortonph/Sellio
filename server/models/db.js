const envFilename =
  process.env.NODE_ENV === 'test'
    ? '.env.test.local'
    : '.env.development.local';
require('dotenv').config({ path: envFilename });

const mongoose = require('mongoose');
const dbconnect = require('../config/dbconnect');


const connectDB = async () => {
  const URI = dbconnect();
  try {
    await mongoose.connect(URI);
    console.log(`Database connected successfully on ${URI}`);
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
