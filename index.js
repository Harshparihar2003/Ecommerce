// const dotenv = require('dotenv')
// dotenv.config();

const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const bodyPaser = require("body-parser")
const authRouter = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandling");

// const PORT = process.env.PORT || 3000;
const PORT = 5000;

dbConnect();
app.use(express.json())
// app.use(bodyPaser.json());
// app.use(bodyPaser.urlencoded({extended : false}))

app.use("/api/user", authRouter);

app.use("/",(req,res)=>{
    res.send("Hello from the server side");
})

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})
