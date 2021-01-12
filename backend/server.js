import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import connectDb from "./config/db.js";

// Routes
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
app.use(express.json());

dotenv.config();
connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `SERVER RUNNING IN ${process.env.NODE_ENV} ON PORT ${PORT}`.yellow.bold
  )
);
app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (req, res) => {
  res.json("WELCOME");
});

app.use(notFound);
app.use(errorHandler);
