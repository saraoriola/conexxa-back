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

      async updateCourse(req, res) {
        const courseId = req.params.id;
        const { name, description, price, company, category } = req.body;
    
        try {
          const course = await Course.findByPk(courseId);
          if (!course) {
            return res.status(404).json({ message: 'Course not found' });
          }
    
          course.name = name;
          course.description = description;
          course.price = price;
          course.company = company;
          course.category = category;
    
          await course.save();
    
          res.json({ message: 'Course updated successfully', course });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error updating the course' });
        }
      },
      
      async getCourseById(req, res) {
        const courseId = req.params.id;
    
        try {
          const course = await Course.findByPk(courseId);
          if (!course) {
            return res.status(404).json({ message: 'Course not found' });
          }
    
          res.json(course);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Error getting the course' });
        }
      },


}

module.exports = CourseController;