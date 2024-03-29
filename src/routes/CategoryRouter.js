import { Router } from 'express';
import CategoryController from '../controllers/CategoryController.js';
import { validateIdParam } from '../middlewares/validateMiddleware.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/create', authMiddleWare, CategoryController.createCategory);
router.get('/get-all', authMiddleWare, CategoryController.getCategorys);
router.get('/:id', authMiddleWare, validateIdParam, CategoryController.getCategory);
router.put('/update:id', authMiddleWare, validateIdParam, CategoryController.updateCategory);
router.delete('/delete/:id', authMiddleWare, validateIdParam, CategoryController.deleteCategory);

export default router;