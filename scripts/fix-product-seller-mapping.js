// Run this with: npx tsx scripts/fix-product-seller-mapping.js
const { PrismaClient } = require('../lib/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const sellers = await prisma.seller.findMany();
  const products = await prisma.product.findMany();
  let updated = 0;
  for (const product of products) {
    const seller = sellers.find(s => s.category === product.category);
    if (seller) {
      await prisma.product.update({
        where: { id: product.id },
        data: { sellerId: seller.id },
      });
      console.log(`Product '${product.name}' assigned to seller '${seller.businessName}'`);
      updated++;
    } else {
      console.warn(`No seller found for category '${product.category}' (product: '${product.name}')`);
    }
  }
  console.log(`Updated ${updated} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 