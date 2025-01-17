// This file imports a demo filebase. Server needs to be started before

const { execSync } = require('child_process');
const mongoose = require("mongoose");

async function checkAndSeedDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/sellio");

    const itemsCount = await mongoose.connection.db
      .collection("items")
      .countDocuments();

    if (itemsCount === 0) {
      console.log('Looks like items db is empty. Do mongorestore');
      execSync(`mongorestore ./seed/sellio`, { stdio: 'inherit' });
      console.log('Demo files imported');
    } else {
      console.log('There are items in the db. No need to import');
    }
  } catch (err) {
    console.error('MongoseRestore failed with:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

checkAndSeedDatabase();