const { PrismaClient } = require('./lib/generated/prisma');

const prisma = new PrismaClient();

async function checkProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true }
    });
    
    console.log('All Products:');
    products.forEach(product => {
      console.log(`ID: ${product.id}, Name: ${product.name}, Stock: ${product.stock}, inStock: ${product.inStock}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProducts(); 