// src/routes/product.routes.js
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { validate } from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema, idParamSchema, listQuerySchema } from '../schemas/product.schema.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const r = Router();

// Rota pública: listar produtos
r.get(
  '/',
  validate(listQuerySchema),
  ProductController.list
);


r.post('/', requireAuth, requireRole('ADMIN'), validate(createProductSchema), ProductController.create);
r.get('/:id', requireAuth, validate(idParamSchema), ProductController.get);
r.put('/:id', requireAuth, requireRole('ADMIN'), validate(updateProductSchema), ProductController.update);
r.delete('/:id', requireAuth, requireRole('ADMIN'), validate(idParamSchema), ProductController.remove);

export default r;
