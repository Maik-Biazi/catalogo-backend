// src/routes/product.routes.js
import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { validate } from '../middlewares/validate.js';
import { createProductSchema, updateProductSchema, idParamSchema, listQuerySchema } from '../schemas/product.schema.js';

const r = Router();

r.get( '/', validate(listQuerySchema), ProductController.list);
r.post('/', validate(createProductSchema),ProductController.create );
r.get( '/:id', validate(idParamSchema), ProductController.get);
r.put('/:id', validate(updateProductSchema), ProductController.update);

r.delete('/:id', validate(idParamSchema), ProductController.remove);

export default r;
