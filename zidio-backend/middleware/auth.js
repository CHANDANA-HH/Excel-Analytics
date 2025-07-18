const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
