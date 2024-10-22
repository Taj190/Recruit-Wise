import express from 'express';
import { isAdmin, isLoggedIn } from '../middleware/middle.js';
import { createCategoryController, deleteCategoryController, getCategoriesController, updateCategoryController } from '../controller/categoryController.js';
export const createCategory = express.Router();

createCategory.post('/category', isLoggedIn , isAdmin , createCategoryController);
createCategory.get('/categories', getCategoriesController);
createCategory.put('/category/:id', isLoggedIn, isAdmin, updateCategoryController);
createCategory.delete('/category/:id', isLoggedIn, isAdmin, deleteCategoryController);


