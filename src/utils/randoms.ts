export const generateRandomEmail = (): string => {
    const username = Math.random().toString(36).substring(2, 9);
    const domain = 'storefront.com';
    return `c${username}@${domain}`;
}

export const generateRandomPhone = (): string => {
    const randomNumber = Math.random().toString().slice(2, 10);
    return `23481${randomNumber}`;
}