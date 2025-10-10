const Granth = require("../Models/granth");


const addGranth = async (req, res) => {
  try {
      console.log("Received form data:", req.body); // ✅ Check received form fields
      console.log("Received files:", req.files); // ✅ Check uploaded files

      const { name,englishName } = req.body;
const BASE_URL = process.env.BASE_URL || `${BASE_URL}://${req.get("host")}`;
      // ✅ Correctly extract file URLs
      const pdfFile = req.files?.["pdf"]?.[0];
const imageFile = req.files?.["image"]?.[0];
const coverPhotoFile = req.files?.["coverPhoto"]?.[0];

const pdfUrl = pdfFile ? `${BASE_URL}/uploads/${pdfFile.filename}` : null;
const imageUrl = imageFile ? `${BASE_URL}/uploads/${imageFile.filename}` : null;
const coverPhoto = coverPhotoFile ? `${BASE_URL}/uploads/${coverPhotoFile.filename}` : null;
      console.log("Received files:", req.files);  // Log uploaded files
      console.log("Protocol:", BASE_URL);     // Should be 'http'
      console.log("Host:", req.get("host"));
      console.log("Processed PDF URL:", pdfUrl);
      console.log("Processed Image URL:", imageUrl);
      console.log("Processed Image URL:", coverPhoto);


      if (!name || !englishName || !pdfUrl || !imageUrl || !coverPhoto) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const newGranth = new Granth({ name, englishName, pdfUrl, imageUrl,coverPhoto });
      await newGranth.save();

      res.status(201).json(newGranth);
  } catch (error) {
      console.error("Error adding Granth:", error);
      res.status(500).json({ message: "Error adding Granth", error });
  }
};

const getGranths = async (req, res) => {
  try {
    const granths = await Granth.find();
    res.status(200).json(granths);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getGranthById = async (req, res) => {
  try {
    const granth = await Granth.findById(req.params.id);
    if (!granth) return res.status(404).json({ message: "Granth not found" });
    res.status(200).json(granth);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateGranth = async (req, res) => {
  try {
    const { name, englishName } = req.body;
const BASE_URL = process.env.BASE_URL || `${BASE_URL}://${req.get("host")}`;
    // Fetch existing record first
    const existingGranth = await Granth.findById(req.params.id);
    if (!existingGranth) {
      return res.status(404).json({ message: "Granth not found" });
    }

    // Get updated file URLs if new files are uploaded
    const pdfUrl = req.files && req.files["pdf"]
      ? `${BASE_URL}/uploads/${req.files["pdf"][0].filename}`
      : existingGranth.pdfUrl;

    const imageUrl = req.files && req.files["image"]
      ? `${BASE_URL}/uploads/${req.files["image"][0].filename}`
      : existingGranth.imageUrl;

      const coverPhoto = req.files && req.files["coverPhoto"]
      ? `${BASE_URL}/uploads/${req.files["coverPhoto"][0].filename}`
      : existingGranth.coverPhoto;

    const updatedGranth = await Granth.findByIdAndUpdate(
      req.params.id,
      { name, englishName, pdfUrl, imageUrl,coverPhoto },
      { new: true }
    );

    res.status(200).json(updatedGranth);
  } catch (err) {
    console.error("Error updating Granth:", err);
    res.status(500).json({ message: err.message });
  }
};


const deleteGranth = async (req, res) => {
  try {
    const deletedGranth = await Granth.findByIdAndDelete(req.params.id);
    if (!deletedGranth) return res.status(404).json({ message: "Granth not found" });
    res.status(200).json({ message: "Granth deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export all functions properly
module.exports = { addGranth, getGranths, getGranthById, updateGranth, deleteGranth };


