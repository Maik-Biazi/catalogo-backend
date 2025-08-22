// src/routes/index.js
import { Router } from 'express';
import authRoutes from './auth.routes.js';
import categoryRoutes from './category.routes.js';
import productRoutes from './product.routes.js';

const r = Router();

r.use('/auth', authRoutes);
r.use('/categories', categoryRoutes);
r.use('/products', productRoutes);

export default r;
