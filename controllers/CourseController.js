const { Course, Category } = require('../models/index.js');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

const CourseController = {
  async createCourse(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, userId, company, categoryId } = req.body;

    try {
      const course = await Course.create({
        name,
        description,
        price,
        userId,
        company,
        categoryId,
      });

      res.status(201).json({ message: 'Course created successfully', course });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating the course' });
    }
  },

  async updateCourse(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const courseId = req.params.id;
    const { name, description, price, company } = req.body;

    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      course.name = name;
      course.description = description;
      course.price = price;
      course.company = company;

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

  async searchCourseByName(req, res) {
    const { name } = req.query;

    try {
      const courses = await Course.findAll({
        where: { name },
      });

      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching courses' });
    }
  },

  async searchCourseByPrice(req, res) {
    const { minPrice, maxPrice } = req.query;

    try {
      const courses = await Course.findAll({
        where: {
          price: {
            [Op.between]: [minPrice, maxPrice],
          },
        },
      });

      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching courses' });
    }
  },

  async sortCoursesByPrice(req, res) {
    try {
      const courses = await Course.findAll({
        order: [['price', 'DESC']],
      });

      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sorting courses' });
    }
  },

  async getAllCoursesWithCategory(req, res) {
    try {
      const courses = await Course.findAll({
        include: [
          {
            model: Category,
            attributes: ['id', 'name'],
          },
        ],
      });

      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting courses with categories' });
    }
  },

  async deleteCourse(req, res) {
    const courseId = req.params.id;

    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      await course.destroy();

      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting the course' });
    }
  },
};

module.exports = CourseController;