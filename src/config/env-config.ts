import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const config = {
  serverHost: process.env.SERVER_HOST || "97.74.87.118",
  serverURL: process.env.SERVER_URL || "https://api.re-wears.com",
  baseURL: process.env.BASE_URL || "https://api.re-wears.com/api/v1",
};

export const BASE_URL = process.env.BASE_URL;
export const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
