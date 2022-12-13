const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  if (req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')) {
    try {
      /* eslint-disable no-unused-vars */
      const [_, token] = req.headers.authorization.split(' ');
      /* eslint-enable no-unused-vars */
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: 'Missing session token.' });
    }
  }
  return res.status(401).json({ message: 'Invalid login.' });
};

module.exports = { authenticate };
