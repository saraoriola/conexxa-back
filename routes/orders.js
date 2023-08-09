const express = require('express');
const OrderController = require('../controllers/OrderController');
const { authentication, isHR } = require('../middleware/authentication');
const router = express.Router();

router.post('/create', authentication, OrderController.createOrder);
router.get('/orders', authentication, OrderController.getUserOrders);

module.exports = router;
