require('dotenv').config({
  path:
    process.env.NODE_ENV === 'test'
      ? '../.env.test.local'
      : '../.env.development.local',
});
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY = process.env.SECRET_KEY || 'default';

const adminMiddleware = async (req, res, next) => {
  // next(); // and comment rest to skip isAdmin check

  const authHeaders = req.headers['authorization'];

  if (!authHeaders) return res.sendStatus(403);

  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({ _id });
    if (!user.isAdmin) return res.sendStatus(401);
    req.user = user;

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = adminMiddleware;
