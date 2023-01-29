require('dotenv').config();

// export const HOST = '/Game-Store/';
export const HOST = '/';

export const MONGO_LOGIN = process.env.MONGO_LOGIN;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
export const DB_URL = process.env.DB_URL;

console.log(DB_URL);
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
