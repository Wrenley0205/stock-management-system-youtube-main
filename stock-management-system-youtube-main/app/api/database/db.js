import dotenv from "dotenv";

dotenv.config({
  path: "./.env"
});
export const URI = process.env.MONGODB_URI;
export const DATABASE = process.env.DATABASE;
export const COLLECTION = process.env.COLLECTION;
