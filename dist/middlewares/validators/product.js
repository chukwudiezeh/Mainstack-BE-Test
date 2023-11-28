"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGetProductQuery = exports.validateUpdateProductBody = exports.validateCreateProductBody = void 0;
const express_validator_1 = require("express-validator");
const responses_1 = require("../../utils/responses");
exports.validateCreateProductBody = [
    (0, express_validator_1.body)('name').notEmpty().withMessage("Name is required").bail().isString().withMessage("Invalid product name provided"),
    (0, express_validator_1.body)('description').notEmpty().withMessage("Description is required").bail().isString().withMessage("Invalid description provided"),
    (0, express_validator_1.body)('price').notEmpty().withMessage("Price is required").bail().isNumeric().withMessage("Price must be a valid number"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, responses_1.errorResponse)(res, 400, "Validation error", errors.array());
        }
        next();
    },
];
exports.validateUpdateProductBody = [
    (0, express_validator_1.param)('productId').escape().notEmpty().withMessage("Produuct id is required").bail().isMongoId().withMessage('Invalid product id'),
    (0, express_validator_1.body)('name').optional().isString().withMessage("Invalid product name provided"),
    (0, express_validator_1.body)('description').optional().isString().withMessage("Invalid description provided"),
    (0, express_validator_1.body)('price').optional().isNumeric().withMessage("Price must be a valid number"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, responses_1.errorResponse)(res, 400, "Validation error", errors.array());
        }
        next();
    },
];
exports.validateGetProductQuery = [
    (0, express_validator_1.param)('productId').escape().notEmpty().withMessage("Produuct id is required").bail().isMongoId().withMessage('Invalid product id'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, responses_1.errorResponse)(res, 400, "Validation error", errors.array());
        }
        next();
    },
];
