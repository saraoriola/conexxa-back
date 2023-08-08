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
      return res.status(401).send({ message: "Usuario no encontrado" });
    }
    
    const tokenFound = await Token.findOne({
      where: {
        UserId: user.id,
        token: token,
      },
    });
    
    if (!tokenFound) {
      return res.status(401).send({ message: "No estás autorizado" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Ha habido un problema con el token" });
  }
};

const isCeo = async (req, res, next) => {
  const ceos = ['ceo', 'executive'];
  if (!ceos.includes(req.user.role)) {
    return res.status(403).send({
      message: 'No tienes permisos'
    });
  }
  next();
};

const isEmployees = async (req, res, next) => {
  const employeess = ['employees', 'professional'];
  if (!employeess.includes(req.user.role)) {
    return res.status(403).send({
      message: 'No tienes permisos'
    });
  }
  next();
};

const isHR = async (req, res, next) => {
  const hrs = ['hr', 'tm'];
  if (!hrs.includes(req.user.role)) {
    return res.status(403).send({
      message: 'No tienes permisos'
    });
  }
  next();
};

module.exports = { authentication, isCeo, isEmployees, isHR };
