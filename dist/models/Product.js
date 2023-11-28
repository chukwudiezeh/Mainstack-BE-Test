"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
ProductSchema.set("timestamps", true);
exports.default = (0, mongoose_1.model)("Product", ProductSchema);
