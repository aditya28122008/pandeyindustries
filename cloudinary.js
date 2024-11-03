import { v2 as cloudinary } from "cloudinary";
import vars from "@/vars";

cloudinary.config({
  cloud_name: vars.CLOUDINARY_CLOUD_NAME,
  api_key: vars.CLOUDINARY_API_KEY,
  api_secret: vars.CLOUDINARY_API_SECRET,
});

export default cloudinary