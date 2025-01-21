// package imports
const express = require('express');
const supertest = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const dbconnect = require('../../config/dbconnect');
const URI = dbconnect();

// sellio imports (to be tested)
const router = require('../../routers/user');

// config imports
const { reSeedDB, startServer } = require('../test.js');

// set up express & supertest
const app = express();
app.use(express.json());
app.use(router);
const request = supertest(app);
let server;

describe('TESTING user route', () => {
  before(async () => {
    server = startServer(app);
    await reSeedDB();
  });
  after(() => {
    mongoose.connection.close();
    server.close();
  });
  describe('GET /me   => userController.profile', () => {
    it('', async function () {
      const response = await request.get('/me');
      console.log(response.body);
    });
  });
  describe('PUT /user/update   => userController.updateProfile', () => {
    it('', async function () {
    });
  });
  describe('POST /user/item/add   => itemController.addItem', () => {
    it('', async function () {
    });
  });
  describe('PUT /user/item/update/:id   => itemController.updateItem', () => {
    it('', async function () {
    });
  });
  describe('POST /user/item/upload   => itemController.uploadMedia', () => {
    it('', async function () {
    });
  });
  describe('GET /user/items/sold   => itemController.getUserSoldItems', () => {
    it('', async function () {
    });
  });
  describe('GET /user/items/forsell   => itemController.getUserItemsWaitingForSell', () => {
    it('', async function () {
    });
  });
  describe('DELETE /user/item/delete   => itemController.deleteItem', () => {
    it('', async function () {
    });
  });
});
