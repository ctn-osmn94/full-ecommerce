const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")

const app = express()
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/api/auth", userRoutes)
app.use("/api", productRoutes)

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server started on Port ${process.env.PORT}`);
})

mongoose.connect('mongodb://127.0.0.1:27017/nwusers', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("db connection successfull");
})
.catch((err)=>{
    console.log(err.message); 
})
