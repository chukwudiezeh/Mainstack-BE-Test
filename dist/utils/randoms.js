"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomPhone = exports.generateRandomEmail = void 0;
const generateRandomEmail = () => {
    const username = Math.random().toString(36).substring(2, 9);
    const domain = 'storefront.com';
    return `c${username}@${domain}`;
};
exports.generateRandomEmail = generateRandomEmail;
const generateRandomPhone = () => {
    const randomNumber = Math.random().toString().slice(2, 10);
    return `23481${randomNumber}`;
};
exports.generateRandomPhone = generateRandomPhone;
