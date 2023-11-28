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
const responses_1 = require("../utils/responses");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthService_1 = __importDefault(require("../services/AuthService"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let authorization = req.headers.authorization;
    if (!authorization)
        return (0, responses_1.errorResponse)(res, 401, "Unauthorized! Token not provided");
    const token = authorization.split(" ")[1];
    try {
        const invalidToken = yield AuthService_1.default.findInvalidToken(token);
        if (invalidToken != null)
            return (0, responses_1.errorResponse)(res, 401, "Unauthorized! Invalid token");
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedData) => {
            if (err && err.name === 'TokenExpiredError')
                return (0, responses_1.errorResponse)(res, 401, "Unauthorized! Token expired");
            req.user = decodedData;
            return next();
        });
    }
    catch (error) {
        throw error;
    }
});
exports.default = authenticate;
