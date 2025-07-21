// Run this with: npx tsx scripts/fix-categories.js
const { PrismaClient } = require('../lib/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Update Restaurant
  await prisma.seller.updateMany({
    where: { category: 'Restaurant' },
    data: { category: 'food-beverage' },
  });
  // Update Grocery
  await prisma.seller.updateMany({
    where: { category: 'Grocery' },
    data: { category: 'grocery-staples' },
  });
  // Update Electronics
  await prisma.seller.updateMany({
    where: { category: 'Electronics' },
    data: { category: 'electronics-appliances' },
  });
  console.log('Category IDs fixed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 