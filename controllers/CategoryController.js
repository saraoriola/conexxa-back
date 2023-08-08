const { validationResult } = require('express-validator');
const { Category } = require('../models');
const { Op } = require('sequelize');

const CategoryController = {
  async createCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, description } = req.body;
      const category = await Category.create({ name, description });
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating the category' });
    }
  },

  async updateCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const categoryId = req.params.id;
      const { name, description } = req.body;

      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      category.name = name;
      category.description = description;
      await category.save();

      res.json({ message: 'Category updated successfully', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the category' });
    }
  },

  async getCategoryById(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting the category' });
    }
  },

  async searchCategoryByName(req, res) {
    try {
      const { name } = req.query;
      const categories = await Category.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
      });

      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching categories' });
    }
  },

  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;

      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      await category.destroy();

      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting the category' });
    }
  },
};

module.exports = CategoryController;