// Run this with: npx tsx scripts/seed-sellers-and-products.js
const { PrismaClient } = require('../lib/generated/prisma');
const { CATEGORIES } = require('../utils/category-data');
const prisma = new PrismaClient();

async function main() {
  for (const cat of CATEGORIES) {
    // Check if a seller for this category already exists
    let seller = await prisma.seller.findFirst({ where: { category: cat.id } });
    if (!seller) {
      seller = await prisma.seller.create({
        data: {
          name: `${cat.name} Seller`,
          email: `${cat.id.replace(/[^a-z0-9]/g, '')}@example.com`,
          password: '$2b$10$CqeksPoTA1a0Fs10nYhVnOz98Vvnw9dZ0RhqOPzWC68Scbgduleh6', // dummy hash
          businessName: `${cat.name} Business`,
          category: cat.id,
          subcategories: JSON.stringify(cat.subcategories.slice(0, 2)),
          businessAddress: '123 Main Street',
          businessCity: 'Sample City',
          businessArea: 'Sample Area',
          businessLocality: 'Sample Locality',
          businessDescription: `Sample business for ${cat.name}`,
          businessImage: '/placeholder.svg',
          isVerified: true,
          isPromoted: false,
          rating: 4.0,
          totalReviews: 10,
          deliveryTime: '30-45 min',
          isOpen: true,
        },
      });
      console.log(`Created seller for category ${cat.name}`);
    }
    // Create a sample product for this seller
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
    console.log(`Created product for seller ${seller.businessName}`);
  }
  console.log('All categories now have a seller and a product.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 