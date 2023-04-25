import * as Cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

export default Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  //secure: true,
});
