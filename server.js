import express from "express";
// import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from 'cors'
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import womenProductRoutes from './routes/Product/womenProductRoutes.js'
import menProductRoutes from './routes/Product/menRoutes.js'
import babyRoutes from './routes/Product/babyRoutes.js'
import beautyRoutes from './routes/Product/beautyRoutes.js'
import electronicsRoutes from './routes/Product/electronicsRoutes.js'
import kitchenRoutes from './routes/Product/kitchenRoutes.js'
import homeRoutes from './routes/Product/homeRoutes.js'
import toysRoutes from './routes/Product/toysRoutes.js'
import fruitsRoutes from './routes/Product/fruitsRoutes.js'
import foodRoutes from './routes/Product/foodRoutes.js'
import weddingRoutes from './routes/Product/weddingRoutes.js'



//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();



//midelware
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/women", womenProductRoutes);
app.use("/api/v1/men", menProductRoutes);
app.use("/api/v1/baby", babyRoutes);
app.use("/api/v1/beauty", beautyRoutes);
app.use("/api/v1/electronics", electronicsRoutes)
app.use("/api/v1/kitchen", kitchenRoutes)
app.use("/api/v1/home", homeRoutes)
app.use("/api/v1/toys", toysRoutes)
app.use("/api/v1/fruits", fruitsRoutes)
app.use("/api/v1/food", foodRoutes)
app.use("/api/v1/wedding",weddingRoutes)








//rest api
app.get("/", (req, res) => {
    res.send("<h1> Welcome to the Deals Hunt Server Portal, where great deals await! Explore, hunt, and seize incredible savings opportunities here!</h1>");
  });
  
  //PORT
  const PORT = process.env.PORT || 8080;
  
  //run listen
  app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });