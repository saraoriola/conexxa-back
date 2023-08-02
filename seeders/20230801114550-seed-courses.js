'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Course } = require('../models/index.js');

    const coursesSeedData = [
      {
        name: 'Introduction to Programming',
        description: 'Learn the basics of programming with this introductory course.',
        price: 49.99,
        userId: 1,
        company: 'Connexa',
        category: 'programming',
      },
      {
        name: 'Web Development Fundamentals',
        description: 'Get started with web development in this comprehensive course.',
        price: 79.99,
        userId: 1,
        company: 'Connexa',
        category: 'programming',
      },
      {
        name: 'Digital Marketing 101',
        description: 'Learn the fundamentals of digital marketing and advertising.',
        price: 59.99,
        userId: 2,
        company: 'Connexa',
        category: 'marketing',
      },
    ];

    try {
      await Course.bulkCreate(coursesSeedData);
      console.log('Courses seeded successfully!');
    } catch (error) {
      console.error('Error seeding courses:', error);
    }
  },

  async down(queryInterface, Sequelize) {
  }
};
