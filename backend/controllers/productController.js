import expressAsyncHandler from "express-async-handler";
import Products from "../models/productModel.js";

// @desc Fetch All Products
// @route GET /api/products
// @access Public

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Products.find({});

  res.status(200).json(products);
});

const getSingleProduct = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

export { getProducts, getSingleProduct };
