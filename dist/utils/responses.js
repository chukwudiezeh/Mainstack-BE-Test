"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
const errorResponse = (res, status_code, error, data = null) => {
    return res.status(status_code).json({
        success: false,
        error: error,
        data: data || null,
    });
};
exports.errorResponse = errorResponse;
const successResponse = (res, status_code, message, data = null) => {
    return res.status(status_code).json({
        success: true,
        message: message,
        data: data || null,
    });
};
exports.successResponse = successResponse;
