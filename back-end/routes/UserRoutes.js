const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/test', UserController.TestControllerFunction);

module.exports = router;