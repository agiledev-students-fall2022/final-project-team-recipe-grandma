const express = require('express');
const UserController = require('../controllers/UserController');
// const MyRecipeController = require('../controllers/MyRecipeController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/test', UserController.TestControllerFunction);
router.post('/register', UserController.RegisterUser);
router.post('/login', UserController.LoginUser);
router.get('/profile', authenticate, UserController.GetProfile);
router.post('/delete', authenticate, UserController.DeleteUser);

module.exports = router;
