require('dotenv').config({ path: '.env.test.local' });
const mongoose = require('mongoose');
const dbconnect = require('../config/dbconnect');
const importFromJson = require('../seed/importFromJson'); // seed DB
const SERVER_PORT = process.env.SERVER_PORT || 3001;

async function connectToDB() {
  // connect to mongoDB
  const URI = dbconnect();
  console.log(`trying to connect to DB on  ${URI}`)
  try {
    await mongoose.connect(URI);
    console.log(`Database connected successfully on ${URI}`);
  } catch (err) {
    console.error(`Database connection failed: ${err.message}`);
    process.exit(1);
  }

  return mongoose;
}

async function reSeedDB(mongoose) {
  // drop all collections
  console.log(mongoose.connection.collections)
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    console.log('dropping collection ' + key);
    await collections[key].drop();
  }

  // seed DB
  importFromJson();
}

function startServer(app) {
  const server = app.listen(SERVER_PORT, (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`Server is listening on port ${SERVER_PORT}!`);
    }
  });
  return server;
}


module.exports = { connectToDB, reSeedDB, startServer };
