import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectDb from "./config/db.js";
import productRoute from "./routes/productRoutes.js";

// middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.warn(
    `SERVER RUNNING IN ${process.env.NODE_ENV} ON PORT ${PORT}`.yellow.bold
  )
);
app.use("/api/products", productRoute);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json("WELCOME");
});
