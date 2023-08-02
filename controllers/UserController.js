const bcrypt = require('bcrypt'); 
const { User } = require('../models/index.js');


const UserController = {
  async registerUser(req, res) {
    
    const { name, lastName, email, password, role, company } = req.body;

    try {
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
        company
      });

      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering the user' });
    }
  },
};

module.exports = UserController;
