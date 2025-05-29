// backend/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db");

const router = express.Router();

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Upload endpoint
router.post("/upload", upload.single("video"), async (req, res) => {
  const { filename, path: filepath } = req.file;

  try {
    await db.query(
      "INSERT INTO videos (filename, path) VALUES ($1, $2)",
      [filename, filepath]
    );
    res.status(201).json({ message: "Upload successful", filename });
  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
