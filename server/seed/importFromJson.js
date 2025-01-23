const fs = require('fs');
const { mongoose } = require('../models/db');

const Item = require('../models/Item');
const Category = require('../models/Category');
const User = require('../models/User');

function waitForConnection() {
  // console.log(mongoose.connection);
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState === 1) {
      console.log('DB Connection is ready');
      return resolve();
    }
    mongoose.connection.once('open', () => {
      console.log('DB Connection is open');
      resolve();
    });
    mongoose.connection.once('error', reject);
  });
}

async function importFromJson() {
  try {
    await waitForConnection();

    const data = JSON.parse(fs.readFileSync('seed/mockData.json', 'utf-8'));
    const { items, categories, users } = data;

    const itemsCount = await Item.countDocuments();
    if (itemsCount === 0) {
      await Item.insertMany(items);
      await Category.insertMany(categories);
      await User.insertMany(users);
      console.log('Looks like items db is empty. mockData is imported');
    } else {
      console.log('There are items in the db. No need to import');
    }
  } catch (err) {
    console.error('It failed with:', err);
  } finally {
    await mongoose.disconnect();
  }
}

module.exports = importFromJson();