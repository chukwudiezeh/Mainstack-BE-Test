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
const User_1 = __importDefault(require("../models/User"));
// import jwt from "jsonwebtoken";
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userData = yield this.hashPassword(userData);
                const user = new User_1.default(userData);
                return yield user.save();
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    static hashPassword(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                userData.password = yield bcrypt_1.default.hash(userData.password, 12);
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ email: email });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findUserById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield User_1.default.findOne({ _id });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserService;
