const express = require("express");
const upload = require("../Middleware/mandirmiddleware.js");
const { 
    addMandir, 
    getMandir, 
    updateMandir,  // Add this function in your controller
    deleteMandir 
} = require("../controller/mandircontroller.js");
const Mandir = require("../Models/MandirModel.js")
const router = express.Router();

// Add a Mandir (PDF & Image upload)
router.post('/', upload.array('images', 2), addMandir);
// Get all mandir
router.get("/", getMandir);




// Update a mandir
router.put(
    "/:id",
    upload.array(  "images",2),
    updateMandir
  );

// Delete a mandir
router.delete("/:id", deleteMandir);

module.exports = router;
