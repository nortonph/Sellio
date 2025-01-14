const router = require('express').Router();
const userController = require('./controllers/user');
const authMiddleware = require('./middlewares/auth');
const itemController = require('./controllers/item');

router.get('/me', authMiddleware, userController.profile);
router.put('/user/update', authMiddleware, userController.updateProfile);

//user add item for selling
router.post('/user/item/add',authMiddleware, itemController.addItem);
router.put('/user/item/update', authMiddleware, itemController.updateItem);

router.post('/user/item/upload', authMiddleware, itemController.uploadMedia);

router.get('/user/items/sold', authMiddleware, itemController.getUserSoldItems);
router.get('/user/items/forsell', authMiddleware, itemController.getUserItemsWaitingForSell); //item waiting to be sold
router.delete('/user/item/delete', authMiddleware, itemController.deleteItem);