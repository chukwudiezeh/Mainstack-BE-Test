import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { errorResponse } from '../../utils/responses';
import UserService from '../../services/UserService';

//custom validator for user email
const validateEmailExists = async (value: string): Promise <boolean> => {
  const user = await UserService.findUserByEmail(value);
  if (user != null){
    throw new Error('User already exists with this email address');
  }
  return true
}

// custom vvalidator for user phone number
const validatePhoneNumberExists = async (value: string): Promise <boolean> => {
  const user = await UserService.findUserByPhoneNumber(value);
  if (user != null){
    throw new Error('User already exists with this phone number');
  }
  return true
}

//validation chain for creating user
export const validateCreateUserBody = [
  body('email').notEmpty().withMessage("Email is required").bail().isString().withMessage("Invalid email provided").bail().isEmail().withMessage("Invalid email provided").bail().custom(validateEmailExists),
  body('firstName').notEmpty().withMessage("firstname is required").bail().isString().withMessage("Invalid firstname provided"),
  body('lastName').notEmpty().withMessage("Lastname is required").bail().isString().withMessage("Invalid lastname provided"),
  body('phoneNumber').notEmpty().withMessage("Phone number is required").bail().isString().withMessage("Invalid phone number").bail().isMobilePhone('any').withMessage("Invalid phone number").custom(validatePhoneNumberExists),
  body('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 6 }).withMessage("Invalid password"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", errors.array());
    }

    next();
  },
];

//validation chain for updating user
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
