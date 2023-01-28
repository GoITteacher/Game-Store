require('dotenv').config();
console.log(process.env);

export const HOST = '/Game-Store/';
// export const HOST = '/';

export const MONGO_LOGIN = process.env.MONGO_LOGIN;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
