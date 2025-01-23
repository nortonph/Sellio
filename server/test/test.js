require('dotenv').config({ path: '.env.test.local' });
const fs = require('fs');
const mongoose = require('mongoose');
const dbconnect = require('../config/dbconnect');
const SERVER_PORT = 3002; // different port for test server
// data models
const Item = require('../models/Item');
const Category = require('../models/Category');
const User = require('../models/User');

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

async function reSeedDB() {
  // const mongoose = await connectToDB();
  await clearDB(mongoose);
  // load mock data from json and fill DB
  const data = JSON.parse(fs.readFileSync('seed/mockData.json', 'utf-8'));
  const { items, categories, users } = data;
  await Item.insertMany(items);
  await Category.insertMany(categories);
  await User.insertMany(users);
  console.log('imported mock data from .json');
}

async function clearDB(mongoose) {
  // drop all collections
  const collections = mongoose.connection.collections;
  for (let key in collections) {
    console.log('dropping collection ' + key);
    await collections[key].drop();
  }
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
