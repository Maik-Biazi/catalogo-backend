// migrations/20250820_001_create_users.js
export const up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).notNullable();
    t.string('username', 60).notNullable().unique();
    t.string('full_name', 120).notNullable();
    t.string('password_hash').notNullable();
    t.enu('role', ['ADMIN', 'CUSTOMER'], { useNative: true, enumName: 'user_role' })
      .notNullable()
      .defaultTo('CUSTOMER');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.raw('DROP TYPE IF EXISTS user_role;');
};
