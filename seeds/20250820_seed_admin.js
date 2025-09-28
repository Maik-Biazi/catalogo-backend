import 'dotenv/config';
import bcrypt from 'bcryptjs';

export const seed = async (knex) => {
  const saltRounds = Number(process.env.BCRYPT_SALT) || 10;
  const password_hash = await bcrypt.hash('Admin#123', saltRounds);

  await knex('users') 
    .insert({
      username: 'admin',
      full_name: 'Administrador', 
      password_hash,
      role: 'ADMIN'
    })
    .onConflict('username')
    .merge({
      full_name: 'Administrador',
      password_hash,
      role: 'ADMIN',
      updated_at: knex.fn.now()
    });
};
