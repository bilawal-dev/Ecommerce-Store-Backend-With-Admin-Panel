import { Router } from "express";
import { getProducts, searchProducts, getSingleProduct, getRelatedProducts, getCategoryProduct } from "../controllers/productController.js";

const router = Router();

router.get('/', getProducts);

router.get('/search', searchProducts);

router.get('/category/:name', getCategoryProduct);

router.get('/related/:id', getRelatedProducts);

router.get('/:id', getSingleProduct);

export default router;