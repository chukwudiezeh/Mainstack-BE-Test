"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginUserBody = exports.validateCreateUserBody = void 0;
const express_validator_1 = require("express-validator");
const responses_1 = require("../../utils/responses");
exports.validateCreateUserBody = [
    (0, express_validator_1.body)('email').notEmpty().withMessage("Email is required").bail().isString().withMessage("Invalid email provided").bail().isEmail().withMessage("Invalid email provided"),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage("firstname is required").bail().isString().withMessage("Invalid firstname provided"),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage("Lastname is required").bail().isString().withMessage("Invalid lastname provided"),
    (0, express_validator_1.body)('phoneNumber').notEmpty().withMessage("Phone number is required").bail().isString().withMessage("Invalid phone number").bail().isMobilePhone('any').withMessage("Invalid phone number"),
    (0, express_validator_1.body)('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 6 }).withMessage("Invalid password"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, responses_1.errorResponse)(res, 400, "Validation error", errors.array());
        }
        next();
    },
];
exports.validateLoginUserBody = [
    (0, express_validator_1.body)('email').notEmpty().withMessage("Email is required").bail().isString().withMessage("Invalid email provided").bail().isEmail().withMessage("Invalid email provided"),
    (0, express_validator_1.body)('password').notEmpty().withMessage("Password is required").bail().isLength({ min: 6 }).withMessage("Invalid password"),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, responses_1.errorResponse)(res, 400, "Validation error", errors.array());
        }
        next();
    },
];
