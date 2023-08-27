// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
// CLOUDINARY_URL=cloudinary://917654268199592:1JWZ599pSokXEHTCFg8yKqwJGTc@diw2rxnog
cloudinary.config({
  cloud_name: 'diw2rxnog',
  api_key: '917654268199592',
  api_secret: '1JWZ599pSokXEHTCFg8yKqwJGTc'
});

// Configure Multer for file upload
const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({ dest: '../../u' });

// Define the upload route
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     // Upload the image to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.buffer);
//     console.log(result)

//     res.status(201).json({
//       success: true,
//       imageUrl: result.secure_url
//     });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ success: false, message: 'Image upload failed' });
//   }
// });

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
  console.log(result)
      // The uploaded image URL will be available in result.secure_url
      res.json({ imageUrl: result.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  });

module.exports = router;
