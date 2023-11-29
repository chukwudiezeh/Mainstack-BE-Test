"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginUserBody = exports.validateCreateUserBody = void 0;
const express_validator_1 = require("express-validator");
const responses_1 = require("../../utils/responses");
const UserService_1 = __importDefault(require("../../services/UserService"));
//custom validator for user email
const validateEmailExists = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService_1.default.findUserByEmail(value);
    if (user != null) {
        throw new Error('User already exists with this email address');
    }
    return true;
});
// custom vvalidator for user phone number
const validatePhoneNumberExists = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService_1.default.findUserByPhoneNumber(value);
    if (user != null) {
        throw new Error('User already exists with this phone number');
    }
    return true;
});
exports.validateCreateUserBody = [
    (0, express_validator_1.body)('email').notEmpty().withMessage("Email is required").bail().isString().withMessage("Invalid email provided").bail().isEmail().withMessage("Invalid email provided").bail().custom(validateEmailExists),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage("firstname is required").bail().isString().withMessage("Invalid firstname provided"),
    (0, express_validator_1.body)('lastName').notEmpty().withMessage("Lastname is required").bail().isString().withMessage("Invalid lastname provided"),
    (0, express_validator_1.body)('phoneNumber').notEmpty().withMessage("Phone number is required").bail().isString().withMessage("Invalid phone number").bail().isMobilePhone('any').withMessage("Invalid phone number").custom(validatePhoneNumberExists),
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
