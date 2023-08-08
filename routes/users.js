const express = require('express');
const UserController = require('../controllers/UserController');
// const { authentication, isCeo, isHR, } = require('../middleware/authentication');
const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', UserController.getUserWithOrdersAndCourses);
router.put('/update/:id', UserController.updateUser);
router.post('/logout', UserController.logoutUser);

module.exports = router;