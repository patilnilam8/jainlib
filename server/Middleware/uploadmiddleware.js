const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = "/home/jaindigambar/public_html/uploads"; // Adjust path as needed

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    
    if (file.mimetype === "application/pdf") {
      const name = req.body.name || 'unnamed';
      const englishName = req.body.englishName || 'unnamed';
      
      // Sanitize file name for PDF
      const safeName = `${name}_${englishName}`.replace(/[^a-zA-Z0-9_\-–—\s\u0900-\u097F]/g, '_');
      
      cb(null, `${safeName}${ext}`);
    } else {
      // Keep original filename for images
      cb(null, file.originalname);
    }
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png","image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage :storage, fileFilter });

module.exports = upload; // Export using CommonJS
