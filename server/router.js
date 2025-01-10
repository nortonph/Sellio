const router = require('express').Router();
const userController = require('./controllers/user');
const itemController = require('./controllers/item');
const categoryController = require('./controllers/category');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('./middlewares/auth');
const adminMiddleware = require('./middlewares/admin');

const loginAndRegisterLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5, 
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

/******* public urls *******/
/***************************/
router.get('/items', itemController.getItems);
router.get('/item/:itemId', itemController.getItem);
router.get('/items', itemController.getFilteredItems);

/******* users *******/
/*********************/
router.post('/register',loginAndRegisterLimiter, userController.register);
router.post('/login',loginAndRegisterLimiter, userController.login);
router.get('/me', authMiddleware, userController.profile);
router.put('/user/update', authMiddleware, userController.updateProfile);
router.post('/forgetpassword', userController.forgetpassword);// send new password to email

//user add item for selling
router.post('/user/item/add',authMiddleware, itemController.addItem);
router.put('/user/item/update', authMiddleware, itemController.updateItem);

router.post('/user/item/upload', authMiddleware, itemController.uploadMedia);

router.get('/user/items/sold', authMiddleware, itemController.getUserSoldItems);
router.get('/user/items/forsell', authMiddleware, itemController.getUserItemsWaitingForSell); //item waiting to be sold
router.delete('/user/item/delete', authMiddleware, itemController.deleteItem);

/******* admin *******/
/*********************/
router.get('/admin/items', adminMiddleware, itemController.getItems);
router.get('/admin/item/:itemId', adminMiddleware, itemController.updateItem);
router.delete('/admin/item/:itemId', adminMiddleware, itemController.deleteItem);
router.post('/admin/category/add',adminMiddleware, categoryController.addCategory);
router.delete('/admin/category/delete',adminMiddleware, categoryController.deleteCategory);
router.get('/admin/user', adminMiddleware, userController.getUsers);
router.post('/admin/user', adminMiddleware, userController.addUser);
router.put('/admin/user', adminMiddleware, userController.updateUser);
router.delete('/admin/user', adminMiddleware, userController.deleteUser);


module.exports = router;
