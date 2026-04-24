const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./Models/adminModel.js"); // Adjust path if needed
const dotenv =require('dotenv')


require('dotenv').config();

const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url)
  .then(() => console.log("✅ mongodb connected"))
  .catch((err) => console.log("❌ error in connection", err));

// Connect to MongoDB
const mongo_url= process.env.mongo_url

mongoose.connect(mongo_url)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(" error in connection",err))

// Function to create an admin user
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ email: "patilvishals86@gmail.com" });

    if (!existingAdmin) {
      
            
      await Admin.create({
        email: "patilvishals86@gmail.com",
        password: "Admin@123"
      });

      console.log("✅ Default Admin Created",Admin.password);
    } else {
      console.log("⚠️ Admin Already Exists");
    }
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
seedAdmin();
