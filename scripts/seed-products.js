// Run this with: npx tsx scripts/seed-products.js
const { PrismaClient } = require('../lib/generated/prisma');
const { CATEGORIES } = require('../utils/category-data');
const prisma = new PrismaClient();

async function main() {
  // Delete all products
  await prisma.product.deleteMany();
  const seller = await prisma.seller.findFirst();
  if (!seller) {
    console.log('No seller found.');
    process.exit(1);
  }
  for (const cat of CATEGORIES) {
    await prisma.product.create({
      data: {
        name: `Sample Product for ${cat.name}`,
        description: `A sample product for ${cat.name}`,
        price: 100,
        stock: 10,
        category: cat.id,
        subcategory: cat.subcategories.slice(0, 2).join(','),
        sellerId: seller.id,
        image: '/placeholder.svg',
        inStock: true,
        isActive: true,
      },
    });
  }
  console.log('Sample products created for each category.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 