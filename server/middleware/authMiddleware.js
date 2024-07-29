const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
