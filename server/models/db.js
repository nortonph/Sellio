const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'sellio';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database ${DB_NAME} on port ${DB_PORT} connected successfully!`);
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose;
