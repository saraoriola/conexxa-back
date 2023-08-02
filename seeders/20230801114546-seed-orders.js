'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { Order } = require('../models/index.js');

    const ordersSeedData = [
      {
        userId: 1, 
        courseId: [1, 2], 
        price: 129.98, 
      },
      {
        userId: 2,
        courseId: [3], 
        price: 59.99,
      },
    ];

    try {
      for (const orderData of ordersSeedData) {
        const { userId, courseId, price } = orderData;
        const order = await Order.create({ userId, courseId, price });


        await order.addCourses(courses);

        console.log(`Order with ID ${order.id} seeded successfully!`);
      }
    } catch (error) {
      console.error('Error seeding orders:', error);
    }
  },

  async down(queryInterface, Sequelize) {

  }
};
