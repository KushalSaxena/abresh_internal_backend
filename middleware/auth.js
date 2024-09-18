const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user; // Attach user data (e.g., username, role) to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken;
