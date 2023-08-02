const bcrypt = require('bcrypt'); 
const { User, Token} = require('../models/index.js');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/config.json')['development']

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

  async loginUser(req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ message: 'Incorrect username or password' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Incorrect username or password' });
      }
  
      const token = jwt.sign({ id: user.id }, jwt_secret);
      Token.create({ UserId: user.id, token }); 
  
      res.json({ message: 'Login successful', user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error logging in' });
    }
  },
  

};

module.exports = UserController;
