const Mandir = require("../Models/MandirModel");


const addMandir= async (req, res) => {
  try {
      console.log("Received form data:", req.body); // ✅ Check received form fields
      console.log("Received files:", req.files); // ✅ Check uploaded files

      const { name,contactperson,contactnumber,address,location } = req.body;
const BASE_URL = process.env.BASE_URL || `${BASE_URL}://${req.get("host")}`;
      // ✅ Correctly extract file URLs
     
const imageFiles = req.files;
const imageUrls = imageFiles.map(file => `${BASE_URL}/uploads/${file.filename}`);


      console.log("Received files:", req.files);  // Log uploaded files
      console.log("Protocol:", BASE_URL);     // Should be 'http'
      console.log("Host:", req.get("host"));

      console.log("Processed Image URL:", imageUrls);
     


      if (!name || !contactperson || !contactnumber || !imageUrls.length || !address || !location) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const newMandir = new Mandir({ name, contactperson, contactnumber, images:imageUrls,address,location });
      await newMandir.save();

      res.status(201).json(newMandir);
  } catch (error) {
      console.error("Error adding Mandir:", error);
      res.status(500).json({ message: "Error adding mandir", error });
  }
};

const getMandir = async (req, res) => {
  try {
    const Mandirs = await Mandir.find();
    res.status(200).json(Mandirs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getMandirById = async (req, res) => {
  try {
    const Mandir = await Mandir.findById(req.params.id);
    if (!Mandir) return res.status(404).json({ message: "Mandir not found" });
    res.status(200).json(Mandir);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMandir = async (req, res) => {
  try {
    const { name, contactperson, contactnumber, address,location } = req.body;
    const BASE_URL = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;

    const existingMandir = await Mandir.findById(req.params.id);
    if (!existingMandir) {
      return res.status(404).json({ message: "Mandir not found" });
    }

    let updatedImages = existingMandir.images; // default to existing

    // If new files are uploaded, replace the images
    if (req.files && req.files.length > 0) {
      updatedImages = req.files.map(file => `${BASE_URL}/uploads/${file.filename}`);
    }

    const updatedMandir = await Mandir.findByIdAndUpdate(
      req.params.id,
      {
        name,
        contactperson,
        contactnumber,
        address,
        images: updatedImages,
        location,
      },
      { new: true }
    );

    res.status(200).json(updatedMandir);
  } catch (err) {
    console.error("Error updating mandir:", err);
    res.status(500).json({ message: err.message });
  }
};



const deleteMandir = async (req, res) => {
  try {
    const deletedMandir = await Mandir.findByIdAndDelete(req.params.id);
    if (!deletedMandir) return res.status(404).json({ message: "Mandir not found" });
    res.status(200).json({ message: "Mandir deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export all functions properly
module.exports = { addMandir, getMandir, getMandirById, updateMandir, deleteMandir };


