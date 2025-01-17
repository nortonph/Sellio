const mongoose = require('mongoose');
const dbconnect = require('../config/dbconnect');

const dotenv = require('dotenv');

// if NODE_ENV is set to 'test' (defined in package.json when running npm run test)
// ... use testing.env (sets DB_NAME to 'testing' insted of 'sellio')
const envFilename =
  process.env.NODE_ENV === 'test' ? 'testing.env' : 'config.env';
dotenv.config({ path: envFilename });

const DB_PROT = process.env.DB_PROT || 'mongodb';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '';
const DB_NAME = process.env.DB_NAME || 'sellio';
const DB_SRV = process.env.DB_SRV || '';

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
