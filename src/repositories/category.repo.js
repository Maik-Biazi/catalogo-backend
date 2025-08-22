// src/repositories/category.repo.js
import db from '../db/knex.js';

export const CategoryRepo = {
  async list({ page = 1, limit = 10, q }) {
    const base = db('categories').modify((qb) => {
      if (q) qb.whereILike('name', `%${q}%`);
    });
    const [{ count }] = await base.clone().count('* as count');
    const items = await base
      .clone()
      .orderBy('name', 'asc')
      .limit(limit)
      .offset((page - 1) * limit);
    return { items, total: Number(count) };
  },
  async create(data) {
    const [c] = await db('categories').insert(data).returning('*');
    return c;
  },
  getById(id) {
    return db('categories').where({ id }).first();
  },
  async update(id, data) {
    const [c] = await db('categories').where({ id }).update({ ...data, updated_at: db.fn.now() }).returning('*');
    return c;
  },
  remove(id) {
    return db('categories').where({ id }).del();
  }
};
