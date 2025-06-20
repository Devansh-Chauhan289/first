// const cloudinary = require('cloudinary').v2;
import cloudinary from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY,
  secure: true // Ensure secure URLs are returned
});

console.log("Cloudinary Middleware: Configuration loaded."); // Log configuration

export { cloudinary }