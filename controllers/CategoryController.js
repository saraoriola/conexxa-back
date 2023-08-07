const { Category } = require('../models');

const CategoryController = {
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;
      const category = await Category.create({ name, description });
      res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating the category' });
    }
  },
};

module.exports = CategoryController;
