// src/middlewares/auth.js
import jwt from 'jsonwebtoken';

/**
 * Autenticação por JWT.
 * - Aceita "Authorization: Bearer <token>" (case-insensitive)
 * - Aceita também "x-access-token" como fallback
 * - Retorna 401 se ausente/inválido e 500 se JWT_SECRET não estiver configurado
 */
export function requireAuth(req, _res, next) {
  const h = req.get('authorization') || req.headers['authorization'] || '';
  const m = typeof h === 'string' ? h.trim().match(/^Bearer\s+(.+)$/i) : null;
  const token = m?.[1] || req.get('x-access-token') || req.headers['x-access-token'] || null;

  if (!token) return next({ status: 401, message: 'Token ausente' });

  const secret = process.env.JWT_SECRET;
  if (!secret) return next({ status: 500, message: 'JWT_SECRET não configurado' });

  try {
    const decoded = jwt.verify(token, secret); // { id, username, role }
    req.user = decoded;
    next();
  } catch {
    next({ status: 401, message: 'Token inválido' });
  }
}

/**
 * Autorização por papel (RBAC).
 * Uso: requireRole('ADMIN'), requireRole('ADMIN','CUSTOMER')
 */
export function requireRole(...roles) {
  return (req, _res, next) => {
    const role = req.user?.role;
    if (!role) return next({ status: 401, message: 'Token ausente' });
    if (!roles.includes(role)) return next({ status: 403, message: 'Acesso negado' });
    next();
  };
}
