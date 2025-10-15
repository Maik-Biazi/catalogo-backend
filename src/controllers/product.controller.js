import { ProductService } from '../services/product.service.js';

export const ProductController = {
  list: async (req, res, next) => {
    try {
      const data = await ProductService.list(req.query);
      res.json(data);
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try {
      const created = await ProductService.create(req.body);
      res.status(201).json(created);
    } catch (e) { next(e); }
  },
  get: async (req, res, next) => {
    try {
      const p = await ProductService.getById(req.params.id);
      if (!p) return next({ status: 404, message: 'Produto não encontrado' });
      res.json(p);
    } catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const up = await ProductService.update(req.params.id, req.body);
      if (!up) return next({ status: 404, message: 'Produto não encontrado' });
      res.json(up);
    } catch (e) { next(e); }
  },
  remove: async (req, res, next) => {
    try {
      const del = await ProductService.remove(req.params.id);
      if (!del) return next({ status: 404, message: 'Produto não encontrado' });
      res.status(204).send();
    } catch (e) { next(e); }
  }
};
