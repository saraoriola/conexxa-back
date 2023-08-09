const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { authentication, isHR } = require('../middleware/authentication');

router.post('/createReview', ReviewController.createReview);
router.put('/updateReview/:id', ReviewController.updateReview);
router.get('/getReviews/course/:courseId', ReviewController.getReviewsByCourse);
router.delete('/deleteReview/:id', ReviewController.deleteReview);

module.exports = router;
