require('dotenv').config();

export const HOST = process.env.HOST || '/Game-Store/';
export const ACCESS_KEY = process.env.ACCESS_KEY;
export const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

export const DB_USERNAME = process.env.USERNAME;
export const DB_PASSWORD = process.env.PASSWORD;
export const DB_URL = process.env.PUBLIC_RDS;
