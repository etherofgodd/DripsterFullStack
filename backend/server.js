import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import path from "path";
import morgan from "morgan";
import connectDb from "./config/db.js";

// Routes
import productRoute from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// middlewares
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();
connectDb();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `SERVER RUNNING IN ${process.env.NODE_ENV} ON PORT ${PORT}`.yellow.bold
  )
);
app.use("/api/products", productRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/uploads", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.get("/", (req, res) => {
  res.json("WELCOME");
});

app.use(notFound);
app.use(errorHandler);
