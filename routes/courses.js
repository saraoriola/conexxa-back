const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

router.post('/create', CourseController.createCourse);
router.put('/update/:id', CourseController.updateCourse);

module.exports = router;