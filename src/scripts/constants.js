require('dotenv').config();
console.log(process.env);

export const MONGO_LOGIN = process.env.MONGO_LOGIN;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

console.log(MONGO_LOGIN);
