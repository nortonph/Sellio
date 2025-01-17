// exportData.js
const fs = require('fs');
// const { connectDB, mongoose } = require('./models/db');
const mongoose = require("mongoose");

async function exportData() {
  try {
    // await connectDB();

    await mongoose.connect("mongodb://localhost:27017/sellio");

    const db = mongoose.connection.db;
    const items = await db.collection('items').find().toArray();
    const categories = await db.collection('categories').find().toArray();
    const users = await db.collection('users').find().toArray();

    const data = { items, categories, users };

    fs.writeFileSync('mockData.json', JSON.stringify(data, null, 2));
    console.log('Daten wurden in mockData.json exportiert.');
  } catch (err) {
    console.error('Fehler beim Exportieren:', err);
  } finally {
    await mongoose.disconnect();
  }
}

exportData();
