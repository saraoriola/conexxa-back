'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Review } = require('../models/index.js');

    const reviewsSeedData = [
      {
        userId: 1,
        courseId: 1,
        comment: 'This course is excellent!', 
        score: 5, 
      },
      {
        userId: 2, 
        courseId: 1, 
        comment: 'Great content and instructors.',
        score: 4,
      },
    ];

    try {
      for (const reviewData of reviewsSeedData) {
        const { userId, courseId, comment, score } = reviewData;
        await Review.create({ userId, courseId, comment, score });

        console.log(`Review for Course ${courseId} seeded successfully!`);
      }
    } catch (error) {
      console.error('Error seeding reviews:', error);
    }
  },

  async down(queryInterface, Sequelize) {
  }
};
