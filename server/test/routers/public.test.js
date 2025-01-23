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
let server;

describe('TESTING public route', () => {
  before(async () => {
    server = startServer(app);
    await reSeedDB();
  });
  after(() => {
    // mongoose.connection.close();
    server.close();
  });
  describe('GET /   => itemController.getItems', () => {
    it('gets a page of x items (x out of all 22 items)', async function () {
      const response = await request.get('/');
      expect(response.status).to.equal(200);
      if (response.body.itemsPerPage < response.body.totalItems) {
        expect(response.body.items.length).to.equal(response.body.itemsPerPage);
      } else {
        expect(response.body.items.length).to.equal(response.body.totalItems);
      }
      expect(response.body.totalItems).to.equal(22);
    });
  });
  describe('GET /banners   => itemController.getBannerItems', () => {
    it('gets a list of 5 items with "isBanner":true', async function () {
      const response = await request.get('/banners');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(5);
      for (item of response.body) {
        expect(item.isBanner).to.be.true;
      }
    });
  });
  describe('GET /newest   => itemController.getNewestItem)', () => {
    it('gets a list of the 6 first items in the table', async function () {
      const response = await request.get('/newest');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(6);
      //todo: are not necessarily the newest items => implement
    });
  });
  describe('GET /item/:id   => itemController.getItem', () => {
    it('gets a specific item by id', async function () {
      const response1 = await request.get('/item/6786a3f511782b4c8f864f32');
      expect(response1.status).to.equal(200);
      expect(response1.body._id).to.equal('6786a3f511782b4c8f864f32');
      expect(response1.body).to.have.property('title')
      expect(response1.body).to.have.property('description')
      expect(response1.body).to.have.property('price')
      expect(response1.body).to.have.property('userId')
      const response2 = await request.get('/item/6786c69da28d4e5a676c6b96');
      expect(response2.status).to.equal(200);
      expect(response2.body._id).to.equal('6786c69da28d4e5a676c6b96');
      const response3 = await request.get('/item/notavalidid');
      expect(response3.status).to.equal(500);
    });
  });
  describe('GET /items/:userId   => itemController.userItems', () => {
    it('gets a list of all items belonging to a specific user', async function () {
      const response1 = await request.get('/items/6786a39b11782b4c8f864f2d');
      expect(response1.status).to.equal(200);
      expect(response1.body.length).to.equal(6);
      for (item of response1.body) {
        expect(item.userId).to.equal('6786a39b11782b4c8f864f2d');
      }
      const response2 = await request.get('/items/6786bd85a28d4e5a676c6b80');
      expect(response2.status).to.equal(200);
      expect(response2.body.length).to.equal(3);
      for (item of response2.body) {
        expect(item.userId).to.equal('6786bd85a28d4e5a676c6b80');
      }
      const response3 = await request.get('/items/notavalidid');
      expect(response3.status).to.equal(500);
    });
  });
  describe('GET /search   => itemController.getFilteredItems', () => {
    it('gets a page of items whose titles contain the query', async function () {
      const response1 = await request.get('/search?q=wood');
      expect(response1.status).to.equal(200);
      expect(response1.body.items.length).to.equal(3);
      for (item of response1.body.items) {
        expect(item.title).to.have.string('wood');
      }
      const response2 = await request.get('/search?q=bike');
      expect(response2.status).to.equal(200);
      expect(response2.body.items.length).to.equal(1);
      for (item of response2.body.items) {
        expect(item.title).to.have.string('bike');
      }
      const response3 = await request.get('/search?q=nowaythisisinatitle');
      expect(response3.status).to.equal(200);
      expect(response3.body.items.length).to.equal(0);
    });
  });
  describe('GET /categories   => categoryController.getCategories', () => {
    it('gets a list of category objects with attribute name', async function () {
      const response = await request.get('/categories');
      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(9);
      for (category of response.body) {
        expect(category.name).to.be.a('string');
      }
    });
  });
  describe('GET /user/:id   => userController.seller', () => {
    it('gets a user by id (without password)', async function () {
      const response = await request.get('/user/6786a39b11782b4c8f864f2d');
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('contactInfo');
      expect(response.body).to.not.have.property('password');
    });
  });
});
