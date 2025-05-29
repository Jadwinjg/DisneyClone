const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();


const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  }
});


router.post('/upload', (req, res) => {
  upload.single('video')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const userId = req.body.userId;
    if (!userId) return res.status(400).json({ message: 'No userId provided' });

    // TODO: Save userId + file path to DB

    res.json({ filePath: `/uploads/${req.file.filename}` });
  });
});

module.exports = router;
