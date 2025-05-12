import { body } from 'express-validator';

export const createBookValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isString()
    .withMessage('Author must be a string'),
  body('publishedYear')
    .notEmpty()
    .withMessage('Published year is required')
    .isInt({ min: 0 })
    .withMessage('Published year must be a positive integer'),
  body('genres')
    .notEmpty()
    .withMessage('Genres are required')
    .isArray()
    .withMessage('Genres must be a string'),
  body('stock')
    .notEmpty()
    .withMessage('Stock is required')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
];

export const updateBookValidation = [
  body('title')
    .isString()
    .withMessage('Title must be a string'),
  body('author')
    .isString()
    .withMessage('Author must be a string'),
  body('publishedYear')
    .isInt({ min: 0 })
    .withMessage('Published year must be a positive integer'),
  body('genres')
    .isArray()
    .withMessage('Genres must be an array'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive integer'),
];