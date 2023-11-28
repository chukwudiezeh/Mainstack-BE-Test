"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvalidTokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true
    },
    invalidatedAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
});
InvalidTokenSchema.set("timestamps", true);
exports.default = (0, mongoose_1.model)("InvalidToken", InvalidTokenSchema);
