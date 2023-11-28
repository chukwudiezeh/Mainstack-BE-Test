"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const user_1 = require("../middlewares/validators/user");
const router = express_1.default.Router();
router.post('/register', user_1.validateCreateUserBody, AuthController_1.default.register);
router.post('/login', user_1.validateLoginUserBody, AuthController_1.default.login);
router.get('/logout', auth_1.default, AuthController_1.default.logout);
exports.default = router;
