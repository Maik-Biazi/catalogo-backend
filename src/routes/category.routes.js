// src/routes/category.routes.js
import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';
import { validate } from '../middlewares/validate.js';
import { createCategorySchema, idParamSchema, listQuerySchema } from '../schemas/category.schema.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const r = Router();

r.get('/', requireAuth, validate(listQuerySchema), CategoryController.list);
r.post('/', requireAuth, requireRole('ADMIN'), validate(createCategorySchema), CategoryController.create);
r.get('/:id', requireAuth, validate(idParamSchema), CategoryController.get);
r.put('/:id', requireAuth, requireRole('ADMIN'), validate(createCategorySchema.merge(idParamSchema)), CategoryController.update);
r.delete('/:id', requireAuth, requireRole('ADMIN'), validate(idParamSchema), CategoryController.remove);

export default r;
