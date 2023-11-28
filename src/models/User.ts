import {Document, Schema, model} from "mongoose";
import jwt from "jsonwebtoken";

export interface User extends Document {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
    getSignedJwtToken: () => string
    removePasswordField: () => object

}

const UserSchema = new Schema <User> ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // select: false
    }
});

UserSchema.set("timestamps", true);

// Exclude the password field from the result returned after creation
UserSchema.methods.removePasswordField = function (): object {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;

};
UserSchema.methods.getSignedJwtToken = function (): string{
    return jwt.sign({ _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET as string, {
      expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string),
    });
  };

export default model <User> ("User", UserSchema);
