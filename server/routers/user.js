const router = require('express').Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth');
const itemController = require('../controllers/item');


router.get('/me', authMiddleware, userController.profile);
router.put('/user/update', authMiddleware, userController.updateProfile);

router.post('/user/item/add',authMiddleware, itemController.addItem);
router.put('/user/item/update/:id', authMiddleware, itemController.updateItem);
router.post('/user/item/upload', authMiddleware, itemController.uploadMedia);

router.get('/user/items/sold', authMiddleware, itemController.getUserSoldItems);
router.get('/user/items/forsell', authMiddleware, itemController.getUserItemsWaitingForSell); //
router.delete('/user/item/delete', authMiddleware, itemController.deleteItem);

module.exports = router;