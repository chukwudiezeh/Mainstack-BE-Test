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
const Product_1 = __importDefault(require("../models/Product"));
class ProductService {
    static findAllProductsByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_1.default.find({ user: user });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = new Product_1.default(productData);
                return yield product.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    static findProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_1.default.findOne({ _id: productId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static updateProductById(productId, productDataToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_1.default.findByIdAndUpdate(productId, productDataToUpdate, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Product_1.default.findOneAndDelete({ _id: productId });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = ProductService;
