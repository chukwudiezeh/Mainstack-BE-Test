"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // select: false
    }
});
UserSchema.set("timestamps", true);
// Exclude the password field from the result returned after creation
UserSchema.methods.removePasswordField = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};
UserSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN),
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
