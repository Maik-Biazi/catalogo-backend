// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

export function requireAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next({ status: 401, message: 'Token ausente' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch {
    next({ status: 401, message: 'Token inválido' });
  }
}

export function requireRole(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next({ status: 403, message: 'Acesso negado' });
    }
    next();
  };
}
