const { PrismaClient } = require('./lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding demo users...');

  try {
    // Create demo customer
    const demoCustomer = await prisma.customer.create({
      data: {
        name: 'Demo Customer',
        email: 'customer@example.com',
        password: await bcrypt.hash('customer123', 10),
        phone: '+91 98765 43210',
        countryCode: '+91'
      }
    });
    console.log('✅ Demo Customer created:', demoCustomer.email);

    // Create demo seller
    const demoSeller = await prisma.seller.create({
      data: {
        name: 'Sharma Electronics',
        email: 'seller@example.com',
        password: await bcrypt.hash('seller123', 10),
        phone: '+91 98765 43211',
        countryCode: '+91',
        businessName: 'Sharma Electronics',
        category: 'electronics-appliances',
        subcategories: JSON.stringify(['Mobile Stores', 'Laptop / Computer Stores', 'TV & Home Appliances Stores']),
        businessAddress: 'MG Road, Bangalore',
        businessCity: 'Bangalore',
        businessArea: 'MG Road',
        businessLocality: 'Central',
        businessDescription: 'Best electronics store in Bangalore',
        businessImage: '/placeholder.svg',
        isVerified: true,
        isPromoted: true,
        rating: 4.8,
        totalReviews: 200,
        deliveryTime: '30-45 min',
        isOpen: true
      }
    });
    console.log('✅ Demo Seller created:', demoSeller.email);

    console.log('\n🎉 Demo users created successfully!');
    console.log('Demo Customer - Email: customer@example.com, Password: customer123');
    console.log('Demo Seller - Email: seller@example.com, Password: seller123');

  } catch (error) {
    console.error('❌ Error seeding demo users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 