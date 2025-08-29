// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { User } from '../models/userModels.js';


export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      err.statusCode = 401;
      err.message = 'Not authorized, token failed';
      next(err);
    }
  } else {
    const error = new Error('Not authorized, no token');
    error.statusCode = 401;
    next(error);
  }
};