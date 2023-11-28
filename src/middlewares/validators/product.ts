import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { errorResponse } from '../../utils/responses';

export const validateCreateProductBody = [
  body('name').notEmpty().withMessage("Name is required").bail().isString().withMessage("Invalid product name provided"),
  body('description').notEmpty().withMessage("Description is required").bail().isString().withMessage("Invalid description provided"),
  body('price').notEmpty().withMessage("Price is required").bail().isNumeric().withMessage("Price must be a valid number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", errors.array());
    }

    next();
  },
];

export const validateUpdateProductBody = [
  param('productId').escape().notEmpty().withMessage("Produuct id is required").bail().isMongoId().withMessage('Invalid product id'),
  body('name').optional().isString().withMessage("Invalid product name provided"),
  body('description').optional().isString().withMessage("Invalid description provided"),
  body('price').optional().isNumeric().withMessage("Price must be a valid number"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", errors.array());
    }

    next();
  },
];

export const validateGetProductQuery = [
  param('productId').escape().notEmpty().withMessage("Produuct id is required").bail().isMongoId().withMessage('Invalid product id'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errorResponse(res, 400, "Validation error", errors.array());
    }

    next();
  },
];
