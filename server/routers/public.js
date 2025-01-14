
const router = require('express').Router();
const itemController = require('./controllers/item');
const categoryController = require('./controllers/category');

router.get('/items', itemController.getItems);
router.get('/item/:itemId', itemController.getItem);
router.get('/items', itemController.getFilteredItems);
router.get('/admin/categories', categoryController.getCategories);
