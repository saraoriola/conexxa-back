const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

router.post('/create', CourseController.createCourse);
router.put('/update/:id', CourseController.updateCourse);
router.delete('/delete/:id', CourseController.deleteCourse);
router.get('/courseId/:id', CourseController.getCourseById);
router.get('/courseName/search', CourseController.searchCourseByName);
router.get('/coursePrice/filter', CourseController.searchCourseByPrice);
router.get('/coursePrice/sort', CourseController.sortCoursesByPrice);
router.get('/coursesWithCategory', CourseController.getAllCoursesWithCategory);

module.exports = router;