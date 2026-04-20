const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const granthroutes = require('./Routes/granthroutes')
const mandirroutes = require('./Routes/mandirroutes')
const adminRoutes = require("./Routes/adminroutes");

dotenv.config()

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app"
  ],
  credentials: true,
}))

app.use(express.json())

app.use("/api/admin", adminRoutes);
app.use("/api/granths", granthroutes);
app.use("/api/mandir", mandirroutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

mongoose.connect(process.env.mongo_url)
.then(() => console.log("mongodb connected"))
.catch((err) => console.log("error in connection", err))

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`)
});