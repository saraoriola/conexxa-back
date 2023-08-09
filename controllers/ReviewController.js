const { Review, Course, User } = require('../models/index.js');
const { validationResult } = require('express-validator');

const ReviewController = {
  async createReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { courseId, userId, score, comment } = req.body;

    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const review = await Review.create({
        courseId,
        userId,
        score,
        comment,
      });

      res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating the review' });
    }
  },

  async updateReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reviewId = req.params.id;
    const { score, comment } = req.body;

    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      review.score = score;
      review.comment = comment;

      await review.save();

      res.json({ message: 'Review updated successfully', review });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the review' });
    }
  },

  async getReviewsByCourse(req, res) {
    const courseId = req.params.courseId;
  
    try {
      const reviews = await Review.findAll({
        where: { courseId },
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }], // Utiliza el alias 'user' en lugar de 'reviews'
      });
  
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting reviews for the course' });
    }
  },
  
  
  async deleteReview(req, res) {
    const reviewId = req.params.id;

    try {
      const review = await Review.findByPk(reviewId);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      await review.destroy();

      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting the review' });
    }
  },
};

module.exports = ReviewController;
