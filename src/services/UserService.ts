import User, {User as UserDocument} from "../models/User";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserService {

    public static async createUser (userData: object): Promise<UserDocument> {
        try {
            userData = await this.hashPassword(userData);
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private static async hashPassword (userData: any): Promise <object> {
        try {
            userData.password = await bcrypt.hash(userData.password, 12);
            return userData
        } catch (error) {
            throw error;
        }
    }

    public static async findUserByEmail (email: string): Promise <UserDocument | null> {
        try {
            return await User.findOne({email: email});
        } catch (error) {
            throw error;
        }
    }

    public static async findUserByPhoneNumber (phoneNumber: string): Promise <UserDocument | null> {
        try {
            return await User.findOne({phoneNumber: phoneNumber});
        } catch (error) {
            throw error;
        }
    }

    public static async findUserById (_id: string): Promise <UserDocument | null> {
        try {
            return await User.findOne({_id});
        } catch (error) {
            throw error;
        }
    }

    // public static async comparePassword (plainPassword: string, hashedPassword: string): Promise <boolean> {
    //     try {
    //         return await bcrypt.compare(plainPassword, hashedPassword);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}

export default UserService;