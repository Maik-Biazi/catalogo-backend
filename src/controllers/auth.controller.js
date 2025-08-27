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
    const data = await AuthService.login(req.body); 
    res.json(data);
  } catch (e) { next(e); }
},

  me: async (req, res) => {
    // o payload do JWT já tem username/role
    res.json({ username: req.user.username, role: req.user.role });
  }
};
