// src/services/category.service.js
import { CategoryRepo } from '../repositories/category.repo.js';

export const CategoryService = {
  list: (q) => CategoryRepo.list(q),
  create: (data) => CategoryRepo.create(data),
  getById: (id) => CategoryRepo.getById(id),
  update: (id, data) => CategoryRepo.update(id, data),
  remove: (id) => CategoryRepo.remove(id)
};
