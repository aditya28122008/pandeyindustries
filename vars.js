const upload_preset = `${process.env.UPLOAD_PRESET}`;
const GITHUB_ID = `${process.env.GITHUB_ID}`;
const GITHUB_SECRET = `${process.env.GITHUB_SECRET}`;
const GOOGLE_CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
const GOOGLE_CLIENT_SECRET = `${process.env.GOOGLE_CLIENT_SECRET}`;
const ADMINEMAIL = `${process.env.ADMINEMAIL}`
const CLOUDINARY_CLOUD_NAME = `${process.env.CLOUDINARY_CLOUD_NAME}`;
const CLOUDINARY_API_KEY = `${process.env.CLOUDINARY_API_KEY}`;
const CLOUDINARY_API_SECRET = `${process.env.CLOUDINARY_API_SECRET}`;

const vars = {
  GITHUB_ID,
  GITHUB_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  upload_preset,
  CLOUDINARY_CLOUD_NAME,
  ADMINEMAIL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
};

export default vars;
