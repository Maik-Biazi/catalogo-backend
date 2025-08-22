// migrations/20250820_002_create_categories.js
export const up = async (knex) => {
  await knex.schema.createTable('categories', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).notNullable();
    t.string('name', 100).notNullable().unique();
    t.text('description');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('categories');
};
