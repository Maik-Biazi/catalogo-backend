// src/repositories/user.repo.js
import db from '../db/knex.js';

export const UserRepo = {
  async findByUsername(username) {
    return db('users').where({ username }).first();
  },
  async create({ username, full_name, password_hash, role }) {
    const [u] = await db('users')
      .insert({ username, full_name, password_hash, role })
      .returning(['id', 'username', 'full_name', 'role', 'created_at']);
    return u;
  }
};
