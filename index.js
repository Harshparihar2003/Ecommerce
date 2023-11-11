const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const dotenv = require('dotenv')
dotenv.config();

// const PORT = process.env.PORT || 3000;
const PORT = 5000;
dbConnect();


app.use("/",(req,res)=>{
    res.send("Hello from the server side");
})

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})
