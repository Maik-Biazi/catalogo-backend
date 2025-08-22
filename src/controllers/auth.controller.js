// src/controllers/auth.controller.js
import { AuthService } from '../services/auth.service.js';

export const AuthController = {
  register: async (req, res, next) => {
    try {
      const user = await AuthService.register(req.body, req.user);
      res.status(201).json(user);
    } catch (e) { next(e); }
  },
  login: async (req, res, next) => {
    try {
      const result = await AuthService.login(req.body);
      res.json(result);
    } catch (e) { next(e); }
  },
  me: async (req, res) => {
    res.json({ user: req.user });
  }
};
