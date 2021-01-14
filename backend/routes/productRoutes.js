import express from "express";
const router = express.Router();

import {
  deleteProduct,
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
