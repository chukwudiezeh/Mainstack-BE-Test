import { Document, Schema, model } from "mongoose";

export interface Product extends Document {
    name: string;
    description: string;
    price: number;
    user: Schema.Types.ObjectId
}

const ProductSchema = new Schema <Product> ({
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
        type: Schema.Types.ObjectId,
        required: true
    }
});

ProductSchema.set("timestamps", true);

export default model <Product> ("Product", ProductSchema);