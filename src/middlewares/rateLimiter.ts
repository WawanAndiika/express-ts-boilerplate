import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import logger from '../config/logger';

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests, please try again later.',
    data: null,
  },
  handler: (req: Request, res: Response, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

export default rateLimiter;