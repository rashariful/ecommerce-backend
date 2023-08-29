const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const dotenv = require("dotenv").config();


const authRouter = require("./app/modules/user/authRoute");
const orderRoutes = require("./app/modules/order/order.route");
const productRouter = require("./app/modules/product/product.route");
const blogRouter = require("./app/modules/blog/blog.route");
const productCategoryRouter = require("./app/modules/productCategory/productCategory.route");
const blogcategoryRouter = require("./app/modules/blogCategory/blogCategory.route");
const brandRouter = require("./app/modules/brand/brand.route");
const colorRouter = require("./app/modules/color/color.route");
const enqRouter = require("./app/modules/enquiry/enquiry.route");
const couponRouter = require("./app/modules/coupon/coupon.route");
const bannerRouter = require("./app/modules/banner/banner.routes");
const uploadRoutes = require('./app/modules/upload/upload.route');
// const uploadRouter = require("./routes/uploadRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { notFound, errorHandler } = require("./app/middlewares/errorHandler");
// const { findLastOrderId, generateOrderID } = require("./app/modules/order/order.utils");

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("E-commerce backend server running")
})

app.use('/api/v1/uploads', uploadRoutes);
app.use("/api/v1/user", authRouter);
app.use('/api/v1/orders', orderRoutes);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/productcategory", productCategoryRouter);
app.use("/api/v1/blogcategory", blogcategoryRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/color", colorRouter);
app.use("/api/v1/enquiry", enqRouter);
app.use("/api/v1/banner", bannerRouter);
// app.use("/api/v1/upload", uploadRouter);

app.use(notFound);
app.use(errorHandler);


// app.listen(PORT, () => {
//   console.log(`Server is running  at PORT ${PORT}`);
// });

// const findlst = async ()=>{
    
//     const test = await generateOrderID()
//     console.log(test)
// }
// // console.log(test)
// findlst()

module.exports = app;
