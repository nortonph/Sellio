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
const routerPublic = require('../../routers/public');

// config imports
const { reSeedDB, startServer } = require('../test.js');
const mockData = require('../mocks.js');
const User = require('../../models/User.js');

// IDs for test users in database
const adminUserId = '6786a39b11782b4c8f864f2d';
const nonAdminUserId = '6786bc9ea28d4e5a676c6b7e';

// id of mock item added to db
let mockItemId = undefined;

// set up express & supertest
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
const request = supertest(app);
const appPublic = express();
appPublic.use(express.json());
appPublic.use(routerPublic);
const requestPublic = supertest(appPublic);
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
    it.skip('NOT IMPLEMENTED', async function () {
      const user = await User.findOne({ _id: nonAdminUserId });
      const response = await request.get('/me').send({ user: user });
      expect(response.status).to.equal(200);
      // todo: adapt if userController.profile gets implemented
    });
  });

  describe('PUT /user/update   => userController.updateProfile', () => {
    it.skip('NOT IMPLEMENTED (missing method: User.findByIdAndUpdate)', async function () {
      const user = await User.findOne({ _id: nonAdminUserId });
      const response = await request.get('/me').send({ user: user });
      expect(response.status).to.equal(200);
      // todo: adapt if User.findByIdAndUpdate gets implemented
    });
  });

  describe('POST /user/item/add   => itemController.addItem', () => {
    it('posts an item (passed in the request body) to the database', async function () {
      const user = await User.findOne({ _id: nonAdminUserId });
      const { password, ...sanitizedUser } = user.toObject();
      const item = mockData.item;
      // note: setting the user as a header here; this will be injected
      // into req.user by middleware in user router (instead of authMiddleware)
      const response = await request
        .post('/user/item/add')
        .set('testuser', JSON.stringify(sanitizedUser))
        .send(item);
      expect(response.status).to.equal(201);
      mockItemId = response.body.item._id;
    });
    it('... which can be retrieved using the public route /item/:id', async function () {
      const response = await requestPublic.get('/item/' + mockItemId);
      expect(response.status).to.equal(200);
      expect(response.body._id).to.equal(mockItemId);
    });
  });

  describe('PUT /user/item/update/:id   => itemController.updateItem', () => {
    it.skip('NOT IMPLEMENTED (missing method: User.findByIdAndUpdate)', async function () {
      const response = await request
        .put('/user/item/update/' + mockItemId)
        .send({ user: user });
      expect(response.status).to.equal(200);
      // todo: adapt if Item.findByIdAndUpdate gets implemented
    });
  });

  describe('POST /user/item/upload   => itemController.uploadMedia', () => {
    it('', async function () {
      const response = await request
        .post('/user/item/upload')
        .field('testfield', 'testvalue')
        .attach('file', 'test/testimage.png')
        .on('error', (error) => {console.log('oops! ', error)})
        .on('progress', (event) => {console.log(event.loaded + ' / ' + event.total)});
      console.log('------#-----------')
      expect(response.status).to.equal(200);

    });
  });

  describe('GET /user/items/sold   => itemController.getUserSoldItems', () => {
    it('', async function () {});
  });

  describe('GET /user/items/forsell   => itemController.getUserItemsWaitingForSell', () => {
    it('', async function () {});
  });

  describe('DELETE /user/item/delete   => itemController.deleteItem', () => {
    it('', async function () {});
  });
});
