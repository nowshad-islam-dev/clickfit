const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// cors setup
app.use(
  cors({
    origin: ["*"], // allow all origins
    methods: ["GET", "POST"],
  })
);

// multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
}); // 10 MB limit

// route for uploading images
app.post("/upload", upload.array("images", 10), (req, res) => {
  res
    .status(200)
    .json({ message: "Images uploaded successfully!", files: req.files });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
