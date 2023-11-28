import express, { Router } from 'express';
import authenticate from '../middlewares/auth';
import ProductController from '../controllers/ProductController';
import { validateCreateProductBody, validateGetProductQuery, validateUpdateProductBody } from '../middlewares/validators/product';

const router: Router = express.Router();

router.get('/', authenticate, ProductController.allProducts);
router.post('/create', authenticate, validateCreateProductBody, ProductController.createProduct);
router.get('/:productId', authenticate, validateGetProductQuery,ProductController.getOneProduct);
router.put('/:productId/update', authenticate, validateUpdateProductBody, ProductController.updateProduct);
router.delete('/:productId/delete', authenticate, validateGetProductQuery, ProductController.deleteProduct);


export default router;