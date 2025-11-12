/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  if (process.env.NODE_ENV !== "development") {
    console.log("Seed pulado: não estamos em ambiente de desenvolvimento");
    return;
  }

  const now = new Date();

  const products = [
    // Categoria: Roupas Masculinas
    {
      name: "Jaqueta de Couro",
      description: "Jaqueta estilosa de couro legítimo",
      price: 350.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Camisa Polo",
      description: "Camisa polo básica de algodão",
   
      price: 120.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Bermuda Jeans",
      description: "Bermuda jeans casual",
      price: 90.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Moletom Cinza",
      description: "Moletom com capuz e bolso frontal",
      price: 150.0,
      created_at: now,
      updated_at: now,
    },

    // Categoria: Roupas Femininas
    {
      name: "Calça Jeans Feminina",
      description: "Calça skinny azul escura",
      price: 130.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Vestido Florido",
      description: "Vestido leve com estampa floral",
      price: 180.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Blusa Cropped",
      description: "Blusa cropped de algodão",
      price: 70.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Saia Midi",
      description: "Saia midi preta elegante",
      price: 140.0,
      created_at: now,
      updated_at: now,
    },

    // Categoria: Calçados
    {
      name: "Tênis Esportivo",
      description: "Tênis leve para corrida",
      price: 250.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Bota de Couro",
      description: "Bota de couro marrom",
      price: 320.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Sandália Feminina",
      description: "Sandália rasteira confortável",
      price: 110.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Chinelo Básico",
      description: "Chinelo de borracha simples",
      price: 40.0,
      created_at: now,
      updated_at: now,
    },

    // Categoria: Acessórios
    {
      name: "Relógio Digital",
      description: "Relógio resistente à água",
      price: 180.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Óculos de Sol",
      description: "Óculos escuros com proteção UV",
      price: 200.0,
      created_at: now,
      updated_at: now,
    },
    {
      name: "Carteira de Couro",
      description: "Carteira masculina de couro legítimo",
      price: 95.0,
      created_at: now,
      updated_at: now,
    },
  ];

  for (const product of products) {
    await knex('products')
      .insert({
        ...product,
        id: crypto.randomUUID(), // opcional, se seu banco não gera UUID automaticamente
      })
      .onConflict('id') 
      .ignore();
  }

  console.log("Seed de produtos finalizado!");
}
