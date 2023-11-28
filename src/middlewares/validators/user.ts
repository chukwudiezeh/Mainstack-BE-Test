import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { errorResponse } from '../../utils/responses';

export const validateCreateUserBody = [
  body('email').notEmpty().withMessage("Email is required").bail().isString().withMessage("Invalid email provided").bail().isEmail().withMessage("Invalid email provided"),
  body('firstName').notEmpty().withMessage("firstname is required").bail().isString().withMessage("Invalid firstname provided"),
  body('lastName').notEmpty().withMessage("Lastname is required").bail().isString().withMessage("Invalid lastname provided"),
  body('phoneNumber').notEmpty().withMessage("Phone number is required").bail().isString().withMessage("Invalid phone number").bail().isMobilePhone('any').withMessage("Invalid phone number"),
  body('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 6 }).withMessage("Invalid password"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", errors.array());
    }

    next();
  },
];

export const validateLoginUserBody = [
  body('email').notEmpty().withMessage("Email is required").bail().isString().withMessage("Invalid email provided").bail().isEmail().withMessage("Invalid email provided"),
  body('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 6 }).withMessage("Invalid password"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", errors.array());
    }

    next();
  },
];
