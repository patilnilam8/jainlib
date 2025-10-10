const express = require("express");
const upload = require("../Middleware/uploadmiddleware.js");
const { 
    addGranth, 
    getGranths, 
    updateGranth,  // Add this function in your controller
    deleteGranth 
} = require("../controller/granthcontroller.js");
const Granth = require("../Models/granth.js")
const router = express.Router();

// Add a Granth (PDF & Image upload)
router.post("/", upload.fields([{ name: "pdf" }, { name: "image" },{name:"coverPhoto"}]), addGranth);

// Get all Granths
router.get("/", getGranths);

// MOVE THIS ABOVE /:id
router.put('/download/:id', async (req, res) => {
  try {
    const updatedGranth = await Granth.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    if (!updatedGranth) {
      return res.status(404).json({ message: 'Granth not found' });
    }
    res.status(200).json(updatedGranth);
  } catch (error) {
    console.error('Download count error:', error);
    res.status(500).json({ message: 'Error updating download count' });
  }
});


// Update a Granth
router.put(
    "/:id",
    upload.fields([{ name: "pdf", maxCount: 1 }, { name: "image", maxCount: 1 },{name:"coverPhoto"}]),
    updateGranth
  );

// Delete a Granth
router.delete("/:id", deleteGranth);

module.exports = router;
