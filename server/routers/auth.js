const router = require('express').Router();
const userController = require('../controllers/user');


const loginAndRegisterLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 5, 
  message: "Too many requests from this IP, please try again after 15 minutes.",
});


router.post('/register',loginAndRegisterLimiter, userController.register);
router.post('/login',loginAndRegisterLimiter, userController.login);
router.post('/forgetpassword', userController.forgetpassword);

module.exports = router;