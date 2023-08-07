const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/createcCategory', CategoryController.createCategory);


module.exports = router;
