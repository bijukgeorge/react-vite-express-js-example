import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create sample products
  const products = [
    {
      name: 'MacBook Pro 16"',
      description:
        'Apple MacBook Pro 16-inch with M2 Pro chip, 16GB RAM, 512GB SSD. Perfect for professional work and creative tasks.',
      price: 2499.99,
      quantity: 15,
      category: 'Electronics',
    },
    {
      name: 'iPhone 15 Pro',
      description:
        'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. Available in multiple colors.',
      price: 999.99,
      quantity: 25,
      category: 'Electronics',
    },
    {
      name: 'Nike Air Max 270',
      description:
        'Comfortable running shoes with Max Air cushioning. Perfect for everyday wear and light workouts.',
      price: 159.99,
      quantity: 50,
      category: 'Footwear',
    },
    {
      name: 'The Great Gatsby',
      description:
        'Classic American novel by F. Scott Fitzgerald. A timeless tale of love, wealth, and the American Dream.',
      price: 12.99,
      quantity: 100,
      category: 'Books',
    },
    {
      name: 'Gaming Chair Pro',
      description:
        'Ergonomic gaming chair with RGB lighting, lumbar support, and adjustable armrests. Perfect for long gaming sessions.',
      price: 299.99,
      quantity: 8,
      category: 'Furniture',
    },
    {
      name: 'Coffee Maker Deluxe',
      description:
        'Premium coffee maker with built-in grinder, programmable settings, and thermal carafe.',
      price: 189.99,
      quantity: 0,
      category: 'Kitchen',
    },
    {
      name: 'Wireless Headphones',
      description:
        'High-quality noise-canceling headphones with 30-hour battery life and premium sound quality.',
      price: 299.99,
      quantity: 20,
      category: 'Electronics',
    },
    {
      name: 'Yoga Mat Premium',
      description:
        'Non-slip yoga mat made from eco-friendly materials. Perfect for yoga, pilates, and fitness routines.',
      price: 49.99,
      quantity: 35,
      category: 'Sports',
    },
  ];

  for (const productData of products) {
    // Check if product already exists
    const existingProduct = await prisma.product.findFirst({
      where: { name: productData.name },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: productData,
      });
    }
  }

  console.log(`Created ${products.length} products`);
  console.log('Database seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error('Error during seeding:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
