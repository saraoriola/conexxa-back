const { User, Token, Sequelize } = require("../models");
const { Op } = Sequelize;
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, jwt_secret);
    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    const tokenFound = await Token.findOne({
      where: {
        userId: user.id,
        token: token,
      },
    });

    if (!tokenFound) {
      return res.status(401).send({ message: "You are not authorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error, message: "There was a problem with the token" });
  }
};

const isCeo = async (req, res, next) => {
  const ceos = ['ceo', 'executive'];
  if (!ceos.includes(req.user.role)) {
    return res.status(403).send({
      message: 'You do not have permission'
    });
  }
  next();
};

const isEmployees = async (req, res, next) => {
  const employeess = ['employees', 'professional'];
  if (!employeess.includes(req.user.role)) {
    return res.status(403).send({
      message: 'You do not have permission'
    });
  }
  next();
};

const isHR = async (req, res, next) => {
  const hrs = ['hr', 'tm'];
  if (!hrs.includes(req.user.role)) {
    return res.status(403).send({
      message: 'You do not have permission'
    });
  }
  next();
};

module.exports = { authentication, isCeo, isEmployees, isHR };
