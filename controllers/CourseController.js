const { Course } = require('../models/index.js');

const CourseController = {
    async createCourse(req, res) {
        const { name, description, price, userId, company, category } = req.body;
    
        try {
          const course = await Course.create({
            name,
            description,
            price,
            userId,
            company,
            category
          });
    
          res.status(201).json({ message: 'Course created successfully', course });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error creating the course' });
        }
      },

}

module.exports = CourseController;