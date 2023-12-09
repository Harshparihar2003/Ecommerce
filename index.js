// const dotenv = require('dotenv')
// dotenv.config();
// const bodyPaser = require("body-parser")

const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes")
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/prodCategoryRoutes")
const blogCategoryRouter = require("./routes/blogCategoryRoutes")
const brandRouter = require("./routes/brandRoutes")
const { notFound, errorHandler } = require("./middleware/errorHandling");
const cookieParser = require("cookie-parser")
const morgan = require("morgan")    

// const PORT = process.env.PORT || 3000;
const PORT = 5000;

dbConnect();
app.use(morgan("dev"))
app.use(express.json())
// app.use(bodyPaser.json());
// app.use(bodyPaser.urlencoded({extended : false}))
app.use(cookieParser())

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);

app.use(notFound)
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is running on the port ${PORT}`)
})
