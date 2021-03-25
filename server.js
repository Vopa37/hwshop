const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Connection to MongoDB established");
})

app.use("/product",productRouter);
app.use("/user",userRouter);
app.use("/order",orderRouter);

app.use(express.static(__dirname+"/frontend/public"))

app.get(/.*/,(req,res)=>{
    res.sendFile(__dirname+"/frontend/public/index.html");
});


app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})