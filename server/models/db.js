const envFilename =
  process.env.NODE_ENV === 'test'
    ? '.env.test.local'
    : '.env.development.local';
require('dotenv').config({ path: envFilename });

const mongoose = require('mongoose');
const dbconnect = require('../config/dbconnect');


const DB_PROT = process.env.DB_PROT;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_SRV = process.env.DB_SRV;

const connectDB = async () => {
  const URI = dbconnect(DB_PROT, DB_SRV, DB_HOST, DB_PORT, DB_NAME);
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
