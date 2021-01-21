const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Product = require("./models/product.model");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Connection to MongoDB established");
})

app.use("/product",productRouter);
app.use("/user",userRouter);
app.use((req,res)=>{
    res.status(400).json({state:"OK"});
})

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})