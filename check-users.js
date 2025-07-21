const { PrismaClient } = require('./lib/generated/prisma');

const prisma = new PrismaClient();

async function checkUsers() {
  console.log('🔍 Checking users in database...\n');

  try {
    // Check customers
    const customers = await prisma.customer.findMany();
    console.log('📧 Customers:');
    customers.forEach(customer => {
      console.log(`  - ${customer.name} (${customer.email})`);
    });

    // Check sellers
    const sellers = await prisma.seller.findMany();
    console.log('\n🏪 Sellers:');
    sellers.forEach(seller => {
      console.log(`  - ${seller.businessName} (${seller.email}) - Category: ${seller.category}`);
    });

    // Check delivery agents
    const deliveryAgents = await prisma.deliveryAgent.findMany();
    console.log('\n🚚 Delivery Agents:');
    deliveryAgents.forEach(agent => {
      console.log(`  - ${agent.name} (${agent.email})`);
    });

  } catch (error) {
    console.error('❌ Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers(); 