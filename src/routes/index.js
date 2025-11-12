import { Router } from 'express';
import productRoutes from './product.routes.js';

const r = Router();

r.use('/products', productRoutes);

export default r;
