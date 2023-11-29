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
const InvalidToken_1 = __importDefault(require("../models/InvalidToken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const InvalidToken_2 = __importDefault(require("../models/InvalidToken"));
class AuthService {
    static comparePassword(plainPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcrypt_1.default.compare(plainPassword, hashedPassword);
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findInvalidToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield InvalidToken_1.default.findOne({ token });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createInvalidToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invalidToken = new InvalidToken_2.default({ token });
                return yield invalidToken.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AuthService;
