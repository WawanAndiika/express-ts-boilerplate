import { NextFunction, Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';

/**
 * Clean for XSS.
 * @param {string | object} data - The value to sanitize
 * @return {string | object} The sanitized value
 */
export const clean = <T>(data: T | string = ''): T => {
  let isObject = false;
  if (typeof data === 'object') {
    data = JSON.stringify(data);
    isObject = true;
  }

  data = sanitizeHtml(data as string).trim();
  if (isObject) data = JSON.parse(data);

  return data as T;
};

const middleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Sanitize req.body
    if (req.body && typeof req.body === 'object') {
      Object.keys(req.body).forEach((key) => {
        req.body[key] = clean(req.body[key]);
      });
    }

    // Sanitize req.query
    if (req.query && typeof req.query === 'object') {
      Object.keys(req.query).forEach((key) => {
        (req.query as any)[key] = clean(req.query[key]);
      });
    }

    // Sanitize req.params
    if (req.params && typeof req.params === 'object') {
      Object.keys(req.params).forEach((key) => {
        req.params[key] = clean(req.params[key]);
      });
    }

    next();
  };
};

export default middleware;