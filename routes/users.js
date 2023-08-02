const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication, isCeo, isHR, } = require('../middleware/authentication');
const router = express.Router();


router.post('/register', authentication, isHR, UserController.registerUser);
router.post('/login', UserController.loginUser)

module.exports = router;
