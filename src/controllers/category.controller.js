// src/controllers/category.controller.js
import { CategoryService } from '../services/category.service.js';

export const CategoryController = {
  list: async (req, res, next) => {
    try {
      const data = await CategoryService.list(req.query);
      res.json(data);
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try {
      const created = await CategoryService.create(req.body);
      res.status(201).json(created);
    } catch (e) { next(e); }
  },
  get: async (req, res, next) => {
    try {
      const c = await CategoryService.getById(req.params.id);
      if (!c) return next({ status: 404, message: 'Categoria não encontrada' });
      res.json(c);
    } catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const up = await CategoryService.update(req.params.id, req.body);
      if (!up) return next({ status: 404, message: 'Categoria não encontrada' });
      res.json(up);
    } catch (e) { next(e); }
  },
  remove: async (req, res, next) => {
    try {
      const del = await CategoryService.remove(req.params.id);
      if (!del) return next({ status: 404, message: 'Categoria não encontrada' });
      res.status(204).send();
    } catch (e) { next(e); }
  }
};
