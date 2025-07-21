// Run this with: npx tsx scripts/fix-seller-location.js
const { PrismaClient } = require('../lib/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  const sellers = await prisma.seller.findMany();
  for (const seller of sellers) {
    await prisma.seller.update({
      where: { id: seller.id },
      data: {
        businessCity: 'Bangalore',
        businessArea: 'MG Road',
        businessLocality: 'Brigade Road Junction',
      },
    });
    console.log(`Updated seller ${seller.businessName} location to Bangalore / MG Road / Brigade Road Junction`);
  }
  console.log('All sellers updated with real city/area/locality.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 