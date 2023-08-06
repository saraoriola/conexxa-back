const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

router.post('/create', CourseController.createCourse);
router.put('/update/:id', CourseController.updateCourse);
router.get('/courseId/:id', CourseController.getCourseById);
router.get('/courseName/search', CourseController.searchCourseByName);
router.get('/coursePrice/filter', CourseController.searchCourseByPrice);
router.get('/coursePrice/sort', CourseController.sortCoursesByPrice);


//router.delete('/courses/:id', CourseController.deleteCourse);
//router.get('/courses', CourseController.getAllCoursesWithCategory);

module.exports = router;