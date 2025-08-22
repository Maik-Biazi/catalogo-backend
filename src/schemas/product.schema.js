// src/schemas/product.schema.js
import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150),
    description: z.string().optional(),
    quantity: z.coerce.number().int().min(0).default(0),
    price: z.coerce.number().positive(),
    category_id: z.string().uuid()
  }),
  params: z.object({}),
  query: z.object({})
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(150).optional(),
    description: z.string().optional(),
    quantity: z.coerce.number().int().min(0).optional(),
    price: z.coerce.number().positive().optional(),
    category_id: z.string().uuid().optional()
  }).refine((data) => Object.keys(data).length > 0, { message: 'Informe algum campo para atualizar' }),
  params: z.object({ id: z.string().uuid() }),
  query: z.object({})
});

export { idParamSchema, listQuerySchema } from './category.schema.js';
