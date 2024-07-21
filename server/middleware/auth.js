const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    req.user = decoded;
    next();
  });
};

const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.headers['refresh-token'];

  if (!refreshToken) return res.status(401).json({ error: 'No refresh token provided' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid refresh token' });

    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken, verifyRefreshToken };
