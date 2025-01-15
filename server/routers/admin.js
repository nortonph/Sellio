const router = require('express').Router();
const userController = require('../controllers/user');
const itemController = require('../controllers/item');
const categoryController = require('../controllers/category');
const adminMiddleware = require('../middlewares/admin');

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