import User, {InvalidToken as InvalidTokenDocument} from "../models/InvalidToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import InvalidToken from "../models/InvalidToken";

class AuthService {
    
    public static async comparePassword (plainPassword: string, hashedPassword: string): Promise <boolean> {
        try {
            return await bcrypt.compare(plainPassword, hashedPassword);
        } catch (error) {
            throw error;
        }
    }
    
    public static async findInvalidToken (token: string): Promise <InvalidTokenDocument | null> {
        try {
            return await User.findOne({token});
        } catch (error) {
            throw error;
        }
    }

    public static async createInvalidToken (token: string): Promise <InvalidTokenDocument | null> {
        try {
            const invalidToken = new InvalidToken({token});
            return await invalidToken.save();
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;