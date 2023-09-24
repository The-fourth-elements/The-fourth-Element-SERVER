const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: procces.env.CLOUDINARY_CLOUD_NAME,
  api_key: procces.env.CLOUDINARY_API_KEY,
  api_secret: procces.env.CLOUDINARY_API_SECRET
});