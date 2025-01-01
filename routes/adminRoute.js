import Router from 'express';
import { createCategory, deleteCategory, createProduct, deleteProduct } from '../controllers/adminController.js';
import { validateCategory } from '../middleware/validateCategory.js';
import { validateProduct } from '../middleware/validateProduct.js';

const router = Router();

// Create A Category
router.post('/category', validateCategory, createCategory);

// Delete A Category
router.delete('/category/:name', deleteCategory);

// Create A Product
router.post('/product', validateProduct, createProduct);

// Delete A Product
router.delete('/product/:id', deleteProduct);

export default router;