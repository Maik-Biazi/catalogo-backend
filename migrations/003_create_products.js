// migrations/20250820_003_create_products.js
export const up = async (knex) => {
  await knex.schema.createTable('products', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()')).notNullable();
    t.string('name', 150).notNullable();
    t.text('description');
    t.integer('quantity').notNullable().defaultTo(0);
    t.decimal('price', 12, 2).notNullable();
    t.uuid('category_id').notNullable()
      .references('id').inTable('categories')
      .onDelete('RESTRICT').onUpdate('CASCADE');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
    t.index(['name']);
    t.index(['category_id']);
  });
};

export const down = async (knex) => {
  await knex.schema.dropTableIfExists('products');
};
