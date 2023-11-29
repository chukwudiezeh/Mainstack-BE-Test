import { matchedData } from "express-validator";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses";
import ProductService from "../services/ProductService";

class ProductContoller {

    public static async allProducts (req: Request, res: Response): Promise <Response> {
        try {
            //returns product created by the authenticated user
             const products = await ProductService.findAllProductsByUser(req.user._id);

             return successResponse(res, 200, "products retrieved successfully", products);
        } catch(error) {
            return errorResponse(res, 500, "Error retrieving products");
        }
    }

    public static async createProduct (req: Request, res: Response): Promise <Response> {
        try {
            const validatedData = matchedData(req);
            validatedData.user = req.user._id;

            const product = await ProductService.createProduct(validatedData);

            return successResponse(res, 201, "Product created successfully", product);

        } catch (error) {
            return errorResponse(res, 500, "Error creating products");
        }
    }

    public static async getOneProduct (req: Request, res: Response): Promise <Response> {
        try {
            const { productId } = matchedData(req);
            const product = await ProductService.findProductById(productId);

            if (!product) {
              return errorResponse(res, 400, "Invalid product");
            }
            
            return successResponse(res, 200, "product retrieved successfully", product);
        } catch (error) {
            return errorResponse(res, 500, "Error retrieving product");
        }
    }

    public static async updateProduct (req: Request, res: Response): Promise <any> {
        try {
            const validatedData = matchedData(req);
         
            const productDataToUpdate: any = {};
            if (validatedData.name) productDataToUpdate.name = validatedData.name;
            if (validatedData.description) productDataToUpdate.description = validatedData.description;
            if (validatedData.price) productDataToUpdate.price = validatedData.price;

            const product = await ProductService.updateProductById(validatedData.productId, productDataToUpdate);

            if (!product) {
                return errorResponse(res, 400, "Invalid product");
            }

            return successResponse(res, 200, "Product updated successfully", product);
        } catch (error) {
            return errorResponse(res, 500, "Error updating product");
        }
    }

    public static async deleteProduct (req: Request, res: Response): Promise <Response> {
        try {
            const { productId } = matchedData(req);
            
            const deletedProductInfo = await ProductService.deleteProductById(productId);
            if (!deletedProductInfo) {
              return errorResponse(res, 400, "Invalid product");
            }

            return successResponse(res, 200, "Product deleted successfully");
          } catch (error) {
            return errorResponse(res, 500, "Error deleting product");
          }
    }
}

export default ProductContoller;