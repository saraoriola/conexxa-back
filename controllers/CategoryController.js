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

  async updateCategory(req, res) {
    try {
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
};

module.exports = CategoryController;
