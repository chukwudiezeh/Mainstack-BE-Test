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
const express_validator_1 = require("express-validator");
const responses_1 = require("../utils/responses");
const UserService_1 = __importDefault(require("../services/UserService"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
class AuthContoller {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get validated data
                const validatedData = (0, express_validator_1.matchedData)(req);
                //insert to Db
                const user = yield UserService_1.default.createUser(validatedData);
                return (0, responses_1.successResponse)(res, 201, "Registration successful", user.removePasswordFromUser());
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Currently experiencing a server error");
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //validated data
                const validatedData = (0, express_validator_1.matchedData)(req);
                //find in Db
                const user = yield UserService_1.default.findUserByEmail(validatedData.email);
                //check if found
                if (user === null) {
                    return (0, responses_1.errorResponse)(res, 401, "Invalid email or password");
                }
                const isPasswordMatch = yield AuthService_1.default.comparePassword(validatedData.password, user.password);
                if (isPasswordMatch === false) {
                    return (0, responses_1.errorResponse)(res, 401, "Invalid email or password");
                }
                const token = user.getSignedJwtToken();
                return (0, responses_1.successResponse)(res, 200, "User authenticated", { user, token });
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Currently experiencing a server error");
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get token
                const authorization = req.headers.authorization;
                const token = authorization.split(" ")[1];
                //check if token has already being invalidated before.
                const existingInvalidToken = yield AuthService_1.default.findInvalidToken(token);
                if (existingInvalidToken) {
                    return (0, responses_1.errorResponse)(res, 500, "Invalid token");
                }
                const InvalidToken = yield AuthService_1.default.createInvalidToken(token);
                return (0, responses_1.successResponse)(res, 200, "Logout successfully");
            }
            catch (error) {
                console.error("Error:", error);
                return (0, responses_1.errorResponse)(res, 500, "Error invalidating token");
            }
            //return response
        });
    }
}
exports.default = AuthContoller;
