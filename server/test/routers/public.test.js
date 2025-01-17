// package imports
const express = require('express');
const supertest = require('supertest');

// config imports
const dbconnect = require('../config/dbconnect');

// sellio imports (to be tested)
const router = require('../../routers/public');
const itemController = require('../controllers/item');
const categoryController = require('../controllers/category');
const userController = require('../controllers/user');

describe('Route tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);

  const request = supertest(app);

  beforeAll(async () => {
    // const URI = dbconnect(DB_PROT, DB_SRV, DB_HOST, DB_PORT, DB_NAME);
  })
});

