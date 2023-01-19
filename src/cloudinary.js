import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
import  { CloudinaryStorage } from "multer-storage-cloudinary";
import  multer from "multer";


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });
export default upload;