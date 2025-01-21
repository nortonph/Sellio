const router = require('express').Router();
const userController = require('../controllers/user');
const itemController = require('../controllers/item');
// conditionally load auth middleware (none when testing)
// todo: remove before production!
const authMiddleware =
  process.env.NODE_ENV === 'test'
  ? (req, res, next) => { next() }
  : require('../middlewares/auth');

router.get('/me', authMiddleware, userController.profile);
router.put('/user/update', authMiddleware, userController.updateProfile);

router.post('/user/item/add',authMiddleware, itemController.addItem);
router.put('/user/item/update/:id', authMiddleware, itemController.updateItem);
router.post('/user/item/upload', authMiddleware, itemController.uploadMedia);

router.get('/user/items/sold', authMiddleware, itemController.getUserSoldItems);
router.get('/user/items/forsell', authMiddleware, itemController.getUserItemsWaitingForSell); //
router.delete('/user/item/delete', authMiddleware, itemController.deleteItem);

module.exports = router;