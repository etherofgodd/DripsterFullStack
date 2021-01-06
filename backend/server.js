import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import products from "./data/products.js";
import connectDb from "./config/db.js";

const app = express();

dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.warn(
    `SERVER RUNNING IN ${process.env.NODE_ENV} ON PORT ${PORT}`.yellow.bold
  )
);

app.get("/", (req, res) => {
  res.json("WELCOME");
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/product/:id", (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.status(200).json(product);
});
