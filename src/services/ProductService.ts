
import Product, {Product as ProductDocument} from '../models/Product'
import { Schema } from 'mongoose';
class ProductService {
    public static async findAllProductsByUser (user: Schema.Types.ObjectId): Promise <ProductDocument[] | []> {
        try {
            return await Product.find({user: user});
        } catch (error) {
            throw error;
        }
    }

    public static async createProduct (productData: object): Promise <ProductDocument> {
        try {
            const product = new Product(productData);
            return await product.save();
        } catch (error) {
            throw error;
        }
    }

    public static async findProductById (productId: string|any): Promise <ProductDocument | null> {
        try {
            return await Product.findOne({_id: productId});
        } catch (error) {
            throw error;
        }
    }

    public static async updateProductById (productId: string|any, productDataToUpdate: object): Promise <ProductDocument | null> {
        try {
            return await Product.findByIdAndUpdate(productId, productDataToUpdate, {new: true});
        } catch (error) {
            throw error;
        }
    }

    public static async deleteProductById (productId: string): Promise<any> {
        try {
            return await Product.findOneAndDelete({_id:productId});
        } catch(error) {
            throw error;
        }
    }
}

export default ProductService;