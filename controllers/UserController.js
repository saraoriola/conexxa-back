const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { User, Token, Order, Course } = require('../models/index.js');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development'];

const UserController = {
  async registerUser(req, res) {
    const { name, lastName, email, password, role, company } = req.body;
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      if (!name || !lastName || !email || !password || !role || !company) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    
      if (!email.includes('@') || email.split('@').length !== 2) {
        return res.status(400).json({ message: 'Email must contain an "@" symbol' });
      }
    
      const allowedRoles = ['hr', 'tm', 'ceo', 'executive'];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
  
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        role,
        company,
      });
    
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering the user' });
    }
  },
  
  async loginUser(req, res) {
    const { email, password } = req.body;
  
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Incorrect email or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
  
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ userId: user.id, token });
  
      res.json({ message: 'Login successful', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging in' });
    }
  },
  
  async getUserProfile(req, res) {
    const userId = req.user.id;

    try {
      const user = await User.findByPk(userId, {
        attributes: ['name', 'lastName', 'email', 'role'],
      });

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting user profile' });
    }
  },

  async getUserWithOrdersAndCourses(req, res) {
    const userId = req.user.id;

    try {
      const user = await User.findByPk(userId, {
        attributes: ['name', 'lastName', 'email', 'role'],
        include: [
          {
            model: Order,
            attributes: ['id', 'price'],
            include: [
              {
                model: Course,
                attributes: ['id', 'name', 'price'],
              },
            ],
          },
        ],
      });

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting user profile' });
    }
  },

  async updateUser(req, res) {
    const userId = req.params.id;
    const { name, lastName, email, password, role, company } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      user.name = name;
      user.lastName = lastName;
      user.email = email;
      user.password = hashedPassword;
      user.role = role;
      user.company = company;

      await user.save();

      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating the user' });
    }
  },

  async logoutUser(req, res) {
    const userId = req.user.id;

    try {
      await Token.destroy({ where: { userId: userId } });
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error logging out' });
    }
  },
};

module.exports = UserController;

