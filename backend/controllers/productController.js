import expressAsyncHandler from "express-async-handler";
import Products from "../models/productModel.js";

// @desc Fetch All Products
// @route GET /api/products
// @access Public

const getProducts = expressAsyncHandler(async (req, res) => {
  const products = await Products.find({}).populate("user", "name email");

  res.status(200).json(products);
});

// @desc GET A Product
// @route GET /api/products/:ID
// @access Private Admin

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

// @desc DELETE A Product
// @route DELETE /api/products/:ID
// @access Private Admin

const deleteProduct = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);

  if (product) {
    await product.remove();
    res.json({
      message: "Product removed",
    });
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

// @desc CREATE  Product
// @route POST /api/products
// @access Private Admin

const createProduct = expressAsyncHandler(async (req, res) => {
  const product = new Products({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc UPDATE  Product
// @route PUT /api/product/:ID
// @access Private Admin
const updateProduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.image = image;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc CREATE  ner REVIEW
// @route POST /api/product/:ID/reviews
// @access Private
const createProductReview = expressAsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Products.findById(req.params.id);

  if (product) {
    const reviwed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (reviwed) {
      res.status(400);
      throw new Error("ALready reviewed Product");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Product Reviewed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
