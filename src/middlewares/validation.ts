import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

type CustomValidationError = {
  type: string;
  value: any;
  msg: string;
  path: string;
  location: string;
};

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => {
        const customError = err as CustomValidationError;
        return {
          field: customError.path, 
          message: customError.msg,
        };
      }),
    });
    return;
  }
  next();
};