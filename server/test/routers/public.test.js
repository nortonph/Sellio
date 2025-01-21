// package imports
const express = require('express');
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const dbconnect = require('../../config/dbconnect');
const URI = dbconnect();

// sellio imports (to be tested)
const router = require('../../routers/public');

// config imports
const { reSeedDB, startServer } = require('../test.js');

// set up express & supertest
const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);
const server = startServer(app);

describe('GET /', () => {
  before(async () => {
    await reSeedDB();
  });
  after(() => {
    mongoose.connection.close();
    server.close();
  });
  it('returns all 22 items', async () => {
    const response = await request.get('/');
    expect(response.status).to.equal(200);
    expect(response.body.items.length).to.equal(22);
  });
});
