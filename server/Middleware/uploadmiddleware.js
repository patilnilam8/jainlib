const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "others";
    let resource_type = "auto";

    if (file.mimetype === "application/pdf") {
      folder = "granth_pdfs";
      resource_type = "raw"; // IMPORTANT for PDF
    } else if (file.mimetype.startsWith("image")) {
      if (file.fieldname === "coverPhoto") {
        folder = "granth_covers";
      } else {
        folder = "granth_images";
      }
    }

    const name = req.body.name || "unnamed";
    const englishName = req.body.englishName || "unnamed";

    const safeName = `${name}_${englishName}`
      .replace(/[^a-zA-Z0-9_\-–—\s\u0900-\u097F]/g, "_");

    return {
      folder,
      public_id: safeName,
      resource_type
    };
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

module.exports = multer({ storage, fileFilter });