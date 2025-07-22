// Run this with: npx tsx scripts/fix-seller-categories.js
const { PrismaClient } = require('../lib/generated/prisma');
const { CATEGORIES } = require('../utils/category-data');
const prisma = new PrismaClient();

async function main() {
  const sellers = await prisma.seller.findMany();
  if (sellers.length === 0) {
    console.log('No sellers found.');
    process.exit(1);
  }
  for (let i = 0; i < sellers.length; i++) {
    const cat = CATEGORIES[i % CATEGORIES.length];
    await prisma.seller.update({
      where: { id: sellers[i].id },
      data: { category: cat.id },
    });
    console.log(`Updated seller ${sellers[i].businessName} to category ${cat.name}`);
  }
  console.log('All sellers updated with new categories.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 