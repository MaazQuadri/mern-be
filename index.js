import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./configs/db.js";
import usersRoutes from "./routes/usersRoutes.js";
import photosRoutes from "./routes/photosRoutes.js";
import cors from "cors";
// import imagesRoutes from "./routes/imagesRoutes.js";

dotenv.config();
connectDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan());

app.get("/", (req, res) => {
  res.status(200).send("Welcome To Mern Stack");
});

app.use("/api/v1/auth", usersRoutes);
// app.use("/api/v1/products", usersRoutes);
app.use("/api/v1/photo", photosRoutes);
app.listen(2000);
