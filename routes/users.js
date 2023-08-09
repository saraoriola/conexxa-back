const express = require('express');
const UserController = require('../controllers/UserController');
const { authentication, isHR, isCeo } = require('../middleware/authentication');
const router = express.Router();

router.post('/register', authentication, isHR, UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', authentication, UserController.getUserProfile);
router.get('/profileWithOrdersAndCourses', authentication, isHR, UserController.getUserWithOrdersAndCourses);
router.put('/update/:id', authentication, UserController.updateUser);
router.delete('/logout', authentication, UserController.logoutUser);

module.exports = router;