// src/routes/auth.routes.js
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const r = Router();

// registro: qualquer um cria CUSTOMER; ADMIN pode criar ADMIN
r.post('/register', requireAuth, requireRole('ADMIN'), validate(registerSchema), AuthController.register);
// alternativa: permitir self-signup CUSTOMER sem token (descomente a linha abaixo e remova requireAuth/requireRole acima)
// r.post('/register', validate(registerSchema), AuthController.register);

r.post('/login', validate(loginSchema), AuthController.login);
r.get('/me', requireAuth, AuthController.me);

export default r;
