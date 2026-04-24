require('dotenv').config(); // MUST BE AT THE VERY TOP
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes
const granthroutes = require('./Routes/granthroutes');
const mandirroutes = require('./Routes/mandirroutes');
const adminRoutes = require("./Routes/adminroutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/api/admin", adminRoutes);
app.use("/api/granths", granthroutes);
app.use("/api/mandir", mandirroutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

// Check if variables are loading
if (!process.env.mongo_url) {
  console.error("❌ ERROR: mongo_url is not defined in .env file");
  process.exit(1); 
}

// Database Connection
mongoose.connect(process.env.mongo_url)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
  });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});