// const jwt = require("jsonwebtoken");

// function authMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token " });
//   }

//   const token = authHeader.split(" ")[1];
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });

//     req.user_id = decoded.id; 
//     next();
//   });
// }

// module.exports = authMiddleware;

// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.JWT_SECRET; // Use environment variable for security

// // Middleware function
// const authMiddleware = async (req, res, next) => {
//   try {
//     // Extract token from Authorization header
//     const authHeader = req.headers['authorization'];
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ error: 'No token provided or invalid token format' });
//     }

//     const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

//     // Verify token
//     const decoded = jwt.verify(token, SECRET_KEY);
//     if (!decoded || !decoded.userId) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }

//     // Attach user info to request object
//     req.user = { _id: decoded.id }; // Adjust based on your JWT payload structure
//     next(); // Proceed to the next middleware/route handler
//   } catch (error) {
//     console.error('Authentication error:', error.message);
//     return res.status(401).json({ error: 'Authentication failed' });
//   }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Read token from cookie
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authMiddleware;