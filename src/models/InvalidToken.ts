import {Document, Schema, model} from "mongoose";
import jwt from "jsonwebtoken";

export interface InvalidToken extends Document {
    token: string,
    invalidatedAt: Date,
}

const InvalidTokenSchema = new Schema <InvalidToken> ({
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


export default model <InvalidToken> ("InvalidToken", InvalidTokenSchema);
