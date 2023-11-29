"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const ProductController_1 = __importDefault(require("../controllers/ProductController"));
const product_1 = require("../middlewares/validators/product");
const router = express_1.default.Router();
router.get('/', auth_1.default, ProductController_1.default.allProducts);
router.post('/create', auth_1.default, product_1.validateCreateProductBody, ProductController_1.default.createProduct);
router.get('/:productId', auth_1.default, product_1.validateGetProductQuery, ProductController_1.default.getOneProduct);
router.put('/:productId/update', auth_1.default, product_1.validateUpdateProductBody, ProductController_1.default.updateProduct);
router.delete('/:productId/delete', auth_1.default, product_1.validateGetProductQuery, ProductController_1.default.deleteProduct);
exports.default = router;
