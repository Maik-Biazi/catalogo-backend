// src/schemas/auth.schema.js
import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(60),
    full_name: z.string().min(3).max(120),
    password: z.string().min(8).max(128),
    role: z.enum(['ADMIN', 'CUSTOMER']).optional() // só ADMIN pode setar; veremos no controller
  }),
  params: z.object({}),
  query: z.object({})
});

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(60),
    password: z.string().min(8).max(128)
  }),
  params: z.object({}),
  query: z.object({})
});
