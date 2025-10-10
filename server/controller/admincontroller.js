const Admin = require("../Models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Ensure .env is loaded

// Admin Login Controller
const loginAdmin = async (req, res) => {
    console.log("body",req.body);
    
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);
  console.log("Login attempt with password:", password);

  try {
    // Find Admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found for email:", email);
      return res.status(401).json({ message: "Admin not found" });
    }

    console.log("Stored hashed password:", admin.password);

    // Compare Password
    const isMatch = await bcrypt.compare(password, admin.password);
    
    console.log("Password match result:", isMatch);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign({ id: admin._id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    console.log("Generated JWT Token:", token);
    res.status(200).json({ message: "Admin Login Successful", token });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Export the controller functions
module.exports = { loginAdmin };
