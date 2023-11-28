import { Response } from 'express';

export const errorResponse = (res: Response, status_code: number, error: string, data: any = null): Response => {  
    return res.status(status_code).json({
      success: false,
      error: error,
      data: data || null,
    });
  };
  
  export const successResponse = (res: Response, status_code: number, message: string, data: any = null): Response => {
    return res.status(status_code).json({
      success: true,
      message: message,
      data: data || null,
    });
  };
  