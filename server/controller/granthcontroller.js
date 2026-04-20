const Granth = require("../Models/granth");
const cloudinary = require("cloudinary").v2;



const addGranth = async (req, res) => {
  try {
    const { name, englishName } = req.body;

    const pdfUrl = req.files?.pdf?.[0]?.path;
    const imageUrl = req.files?.image?.[0]?.path;
    const coverPhoto = req.files?.coverPhoto?.[0]?.path;
   const pdfPublicId= req.files?.pdf?.[0]?.filename;
 const imagePublicId= req.files?.image?.[0]?.filename;
 const coverPublicId=req.files?.coverPhoto?.[0]?.filename;

    if (!name || !englishName || !pdfUrl || !imageUrl || !coverPhoto || !pdfPublicId || !imagePublicId || !coverPublicId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newGranth = new Granth({
  name,
  englishName,
  pdfUrl,
  imageUrl,
  coverPhoto,
  pdfPublicId,
  imagePublicId,
  coverPublicId
});

    await newGranth.save();
    res.status(201).json(newGranth);

  } catch (error) {
    res.status(500).json({ message: "Error adding Granth" });
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

    const granth = await Granth.findById(req.params.id);
    if (!granth) {
      return res.status(404).json({ message: "Granth not found" });
    }

    let pdfUrl = granth.pdfUrl;
    let imageUrl = granth.imageUrl;
    let coverPhoto = granth.coverPhoto;

    let pdfPublicId = granth.pdfPublicId;
    let imagePublicId = granth.imagePublicId;
    let coverPublicId = granth.coverPublicId;

    // 🔥 PDF update
    if (req.files?.pdf) {
      if (pdfPublicId) {
        await cloudinary.uploader.destroy(pdfPublicId, {
          resource_type: "raw"
        });
      }

      pdfUrl = req.files.pdf[0].path;
      pdfPublicId = req.files.pdf[0].filename;
    }

    // 🔥 Image update
    if (req.files?.image) {
      if (imagePublicId) {
        await cloudinary.uploader.destroy(imagePublicId);
      }

      imageUrl = req.files.image[0].path;
      imagePublicId = req.files.image[0].filename;
    }

    // 🔥 Cover update
    if (req.files?.coverPhoto) {
      if (coverPublicId) {
        await cloudinary.uploader.destroy(coverPublicId);
      }

      coverPhoto = req.files.coverPhoto[0].path;
      coverPublicId = req.files.coverPhoto[0].filename;
    }

    const updatedGranth = await Granth.findByIdAndUpdate(
      req.params.id,
      {
        name,
        englishName,
        pdfUrl,
        imageUrl,
        coverPhoto,
        pdfPublicId,
        imagePublicId,
        coverPublicId
      },
      { new: true }
    );

    res.status(200).json(updatedGranth);

  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: err.message });
  }
};



const deleteGranth = async (req, res) => {
  try {
    const granth = await Granth.findById(req.params.id);

    if (!granth) {
      return res.status(404).json({ message: "Granth not found" });
    }

    // 🔥 Delete PDF (raw type)
    if (granth.pdfPublicId) {
      await cloudinary.uploader.destroy(granth.pdfPublicId, {
        resource_type: "raw"
      });
    }

    // 🔥 Delete Image
    if (granth.imagePublicId) {
      await cloudinary.uploader.destroy(granth.imagePublicId);
    }

    // 🔥 Delete Cover Photo
    if (granth.coverPublicId) {
      await cloudinary.uploader.destroy(granth.coverPublicId);
    }

    // Delete from DB
    await Granth.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Granth deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Export all functions properly
module.exports = { addGranth, getGranths, getGranthById, updateGranth, deleteGranth };


