const { Order, Course, User } = require('../models/index.js');

const OrderController = {
  async createOrder(req, res) {
    try {
      const userId = req.user.id;
      const { courseIds } = req.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const courses = await Course.findAll({
        where: { id: courseIds },
      });

      if (courses.length !== courseIds.length) {
        return res.status(400).json({ message: 'Some courses were not found' });
      }

      const totalPrice = courses.reduce((totalPrice, course) => totalPrice + course.price, 0);

      const order = await Order.create({
        price: totalPrice,
        userId: userId,
      });

      await order.addCourses(courses);

      res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating the order' });
    }
  },

  
  async getUserOrders(req, res) {
    try {
      const userId = req.user.id;

      const orders = await Order.findAll({
        where: { userId },
        include: [
          {
            model: Course,
            attributes: ['id', 'name', 'price'],
          },
        ],
      });

      res.status(200).json({ message: 'User orders retrieved successfully', orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting user orders' });
    }
  },
};

module.exports = OrderController;
