const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const mime = require('mime'); // Use require for mime

// Set up Cloudinary storage for images
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdf_uploads', // You can rename this folder as needed
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'pdf'], // Allow image formats only
    public_id: (req, file) => file.originalname.replace(/\s/g, '_').split('.')[0], // Use the filename without spaces
  },
});

// Image file filter to ensure only image files are uploaded
const fileFilter = (req, file, cb) => {
  const mimeType = mime.getType(file.originalname) || 'application/octet-stream';

  if (mimeType.startsWith('image/') || mimeType === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed'), false);
  }
};
// Initialize Multer with the Cloudinary storage and image filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter, // Apply the image filter
});

module.exports = { upload, cloudinary };
