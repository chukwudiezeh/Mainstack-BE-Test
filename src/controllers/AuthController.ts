import { matchedData } from "express-validator";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/responses";
import UserService from "../services/UserService";
import AuthService from "../services/AuthService";

class AuthContoller {
  public static async register(req: Request, res: Response): Promise<Response> {
    try {
      //get validated data
      const validatedData: object = matchedData(req);

      //insert to Db
      const user = await UserService.createUser(validatedData);
      
      return successResponse(res, 201, "Registration successful", user.removePasswordField());
    } catch (error) {
      return errorResponse(res, 500, "Currently experiencing a server error");
    }
  }

  public static async login(req: Request, res: Response): Promise<Response> {
    try {
      //validated data
      const validatedData = matchedData(req);
      //find in Db
      const user = await UserService.findUserByEmail(validatedData.email);
      //check if found
      if (user === null) {
        return errorResponse(res, 401, "Invalid email or password");
      }

      const isPasswordMatch = await AuthService.comparePassword(
        validatedData.password,
        user.password
      );

      if (isPasswordMatch === false) {
        return errorResponse(res, 401, "Invalid email or password");
      }

      const token = user.getSignedJwtToken();

      return successResponse(res, 200, "User authenticated", { user, token });
    } catch (error) {
      return errorResponse(res, 500, "Currently experiencing a server error");
    }
  }

    public static async logout(req: Request, res: Response): Promise<Response> {
        try {
            //get token
            const authorization: string = req.headers.authorization as string;
            const token: string = authorization.split(" ")[1];

            //check if token has already being invalidated before.
            const existingInvalidToken = await AuthService.findInvalidToken(token);

            if (existingInvalidToken) {
                return errorResponse(res, 500, "Invalid token");
            }

            const InvalidToken = await AuthService.createInvalidToken(token);

            return successResponse(res, 200, "Logout successfully");
        } catch (error) {
            console.error("Error:", error);
            return errorResponse(res, 500, "Error invalidating token");
        }
        //return response
    }
}

export default AuthContoller;