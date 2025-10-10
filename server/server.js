const express = require('express')
const cors = require('cors')
const dotenv =require('dotenv')
const {default:mongoose}= require('mongoose')
const granthroutes = require('./Routes/granthroutes')
const mandirroutes = require('./Routes/mandirroutes')

const adminRoutes = require("./Routes/adminroutes");
const path = require("path");

dotenv.config()

const app= express()

const corsOptions ={
   origin:"http://localhost:5173", // Your frontend URL
    credentials: true,
}



app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static(path.join(__dirname, "../public_html")));
app.use("/api/admin", adminRoutes);
app.use('/uploads', express.static('/home/jaindigambar/public_html/uploads'));



app.use("/api/granths", granthroutes);
app.use("/api/mandir",mandirroutes)

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get(/^\/(?!api\/|uploads\/).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../public_html/index.html"));
});
const mongourl= process.env.mongo_url

mongoose.connect(mongourl)
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log(" error in connection",err))

const PORT= process.env.PORT ||5001;
const HOST= process.env.HOST||'0.0.0.0';
app.listen(PORT,HOST,()=>{
   console.log(`APP running on port ${HOST}:${PORT}`)});