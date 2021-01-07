import express from "express";
import expressAsyncHandler from "express-async-handler";

const router = express.Router();
import Products from "../models/productModel.js";

// @desc Fetch All Products
// @route GET /api/products
// @access Public

router.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Products.find({});
    res.status(200).json(products);
  })
);

// @desc Fetch One Product
// @route GET /api/products/:id
// @access Public

router.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Products.findById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product Not found");
    }
  })
);

export default router;
