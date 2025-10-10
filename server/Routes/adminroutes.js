const express = require("express");
const { loginAdmin } = require("../controller/admincontroller");
const adminAuth = require("../Middleware/auth");

const router = express.Router();

// Admin Login Route
router.post("/login", loginAdmin);

// Protected Admin Dashboard Route
router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
