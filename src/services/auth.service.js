// src/services/auth.service.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepo } from '../repositories/user.repo.js';

export const AuthService = {
  async register({ username, full_name, password, role }, requester) {
    const exists = await UserRepo.findByUsername(username);
    if (exists) throw { status: 409, message: 'Username já em uso' };

    // só ADMIN pode escolher role; senão força CUSTOMER
    const finalRole = requester?.role === 'ADMIN' && role ? role : 'CUSTOMER';
    const password_hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT) || 10);

    const user = await UserRepo.create({ username, full_name, password_hash, role: finalRole });
    return { ...user };
  },

  async login({ username, password }) {
    const user = await UserRepo.findByUsername(username);
    if (!user) throw { status: 401, message: 'Credenciais inválidas' };

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) throw { status: 401, message: 'Credenciais inválidas' };

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '1d' }
    );

    return { token, user: { id: user.id, username: user.username, full_name: user.full_name, role: user.role } };
  }
};
