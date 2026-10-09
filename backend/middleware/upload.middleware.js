const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'mock_cloud',
  api_key: process.env.CLOUDINARY_API_KEY || 'mock_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mock_secret'
});

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'), false);
    }
  }
});

const uploadToCloudinary = async (fileBuffer, mimetype) => {
  if (process.env.CLOUDINARY_CLOUD_NAME === 'mock_cloud' || !process.env.CLOUDINARY_CLOUD_NAME) {
    return 'http://mock-cloudinary-url.com/image.jpg';
  }
  return new Promise((resolve, reject) => {
    const b64 = Buffer.from(fileBuffer).toString('base64');
    let dataURI = "data:" + mimetype + ";base64," + b64;
    cloudinary.uploader.upload(dataURI, { folder: 'campusfix' }, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url);
    });
  });
};

module.exports = { upload, uploadToCloudinary };
