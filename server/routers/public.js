
const router = require('express').Router();
const itemController = require('../controllers/item');
const categoryController = require('../controllers/category');
const userController = require('../controllers/user');

router.get('/', itemController.getItems);
router.get('/banners', itemController.getBannerItems);
router.get('/newest', itemController.getNewestItem);
router.get('/item/:id', itemController.getItem);
router.get('/items/:userId', itemController.userItems);
router.get('/search', itemController.getFilteredItems);
router.get('/categories', categoryController.getCategories);
router.get('/user/:id', userController.seller);

module.exports = router;