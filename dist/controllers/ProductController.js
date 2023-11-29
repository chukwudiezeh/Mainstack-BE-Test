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
const ProductService_1 = __importDefault(require("../services/ProductService"));
class ProductContoller {
    static allProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductService_1.default.findAllProductsByUser(req.user._id);
                return (0, responses_1.successResponse)(res, 200, "products retrieved successfully", products);
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Error retrieving products");
            }
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = (0, express_validator_1.matchedData)(req);
                validatedData.user = req.user._id;
                const product = yield ProductService_1.default.createProduct(validatedData);
                return (0, responses_1.successResponse)(res, 201, "Product created successfully", product);
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Error creating products");
            }
        });
    }
    static getOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = (0, express_validator_1.matchedData)(req);
                const product = yield ProductService_1.default.findProductById(productId);
                if (!product) {
                    return (0, responses_1.errorResponse)(res, 400, "Invalid product");
                }
                return (0, responses_1.successResponse)(res, 200, "product retrieved successfully", product);
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Error retrieving product");
            }
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validatedData = (0, express_validator_1.matchedData)(req);
                const productDataToUpdate = {};
                if (validatedData.name)
                    productDataToUpdate.name = validatedData.name;
                if (validatedData.description)
                    productDataToUpdate.description = validatedData.description;
                if (validatedData.price)
                    productDataToUpdate.price = validatedData.price;
                const product = yield ProductService_1.default.updateProductById(validatedData.productId, productDataToUpdate);
                if (!product) {
                    return (0, responses_1.errorResponse)(res, 400, "Invalid product");
                }
                return (0, responses_1.successResponse)(res, 200, "Product updated successfully", product);
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Error updating product");
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = (0, express_validator_1.matchedData)(req);
                const deletedProductInfo = yield ProductService_1.default.deleteProductById(productId);
                if (!deletedProductInfo) {
                    return (0, responses_1.errorResponse)(res, 400, "Invalid product");
                }
                return (0, responses_1.successResponse)(res, 200, "Product deleted successfully");
            }
            catch (error) {
                return (0, responses_1.errorResponse)(res, 500, "Error deleting product");
            }
        });
    }
}
exports.default = ProductContoller;
