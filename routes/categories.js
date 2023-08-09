const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { authentication, isHR } = require('../middleware/authentication');

router.post('/createCategory', CategoryController.createCategory);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.get('/getCategoryById/:id', CategoryController.getCategoryById);
router.get('/searchCategoryByName/search', CategoryController.searchCategoryByName);
router.delete('/deleteCategory/:id', CategoryController.deleteCategory);

module.exports = router;