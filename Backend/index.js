const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user")

const cors = require("cors");
const blogRouter = require("./Routes/blog");

const app = express();
app.use(cors())
app.use(express.json())





app.use('/user',userRouter);
app.use('/blog',blogRouter)


app.listen(5500,()=>{
    console.log("port connected")
})