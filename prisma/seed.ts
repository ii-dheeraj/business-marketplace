import { PrismaClient } from '../lib/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create sample customers
  const customer1 = await prisma.customer.create({
    data: {
      name: 'John Customer',
      email: 'customer@example.com',
      password: hashedPassword,
      phone: '+1234567890'
    }
  })

  // Create demo customer for testing
  const demoCustomer = await prisma.customer.create({
    data: {
      name: 'Demo Customer',
      email: 'customer@example.com',
      password: await bcrypt.hash('customer123', 10),
      phone: '+91 98765 43210'
    }
  })

  // Create sample sellers
  const seller1 = await prisma.seller.create({
    data: {
      name: 'Alice Restaurant',
      email: 'restaurant@example.com',
      password: hashedPassword,
      phone: '+1234567891',
      businessName: 'Alice\'s Restaurant',
      category: 'food-beverage',
      subcategories: JSON.stringify(['Restaurants (Veg / Non-Veg / Multi-Cuisine)', 'Cafes & Coffee Shops']),
      businessAddress: '123 Main Street',
      businessCity: 'New York',
      businessArea: 'Manhattan',
      businessLocality: 'Downtown',
      businessDescription: 'Delicious food for everyone',
      businessImage: '/placeholder.svg',
      isVerified: true,
      isPromoted: true,
      rating: 4.5,
      totalReviews: 150,
      deliveryTime: '30-45 min',
      isOpen: true
    }
  })

  const seller2 = await prisma.seller.create({
    data: {
      name: 'Bob Grocery',
      email: 'grocery@example.com',
      password: hashedPassword,
      phone: '+1234567892',
      businessName: 'Bob\'s Grocery Store',
      category: 'retail-general',
      subcategories: JSON.stringify(['Kirana / Grocery Stores', 'Supermarkets / Hypermarkets (e.g., Big Bazaar, DMart)']),
      businessAddress: '456 Oak Avenue',
      businessCity: 'New York',
      businessArea: 'Brooklyn',
      businessLocality: 'Williamsburg',
      businessDescription: 'Fresh groceries and household items',
      businessImage: '/placeholder.svg',
      isVerified: true,
      isPromoted: false,
      rating: 4.2,
      totalReviews: 89,
      deliveryTime: '45-60 min',
      isOpen: true
    }
  })

  // Create demo seller for testing
  const demoSeller = await prisma.seller.create({
    data: {
      name: 'Sharma Electronics',
      email: 'seller@example.com',
      password: await bcrypt.hash('seller123', 10),
      phone: '+91 98765 43211',
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
  })

  // Create demo restaurant seller for testing
  await prisma.seller.create({
    data: {
      name: 'Demo Restaurant',
      email: 'demo-restaurant@example.com',
      password: await bcrypt.hash('demo123', 10),
      phone: '+1234567890',
      businessName: 'Demo Restaurant',
      category: 'food-beverage', // THIS IS IMPORTANT!
      subcategories: JSON.stringify(['North Indian', 'Cafe']),
      businessAddress: '123 Main Street',
      businessCity: 'Bangalore',
      businessArea: 'MG Road',
      businessLocality: 'Central',
      businessDescription: 'A great place for food!',
      businessImage: '/placeholder.svg',
      isVerified: true,
      isPromoted: false,
      rating: 4.5,
      totalReviews: 100,
      deliveryTime: '30-45 min',
      isOpen: true
    }
  });

  // Update Alice Restaurant's category
  await prisma.seller.updateMany({
    where: {
      name: {
        contains: 'Alice',
        mode: 'insensitive'
      }
    },
    data: {
      category: 'food-beverage'
    }
  });

  // Create sample delivery agents
  const deliveryAgent1 = await prisma.deliveryAgent.create({
    data: {
      name: 'Charlie Delivery',
      email: 'delivery@example.com',
      password: hashedPassword,
      phone: '+1234567893',
      vehicleNumber: 'DL-1234',
      vehicleType: 'Motorcycle',
      isAvailable: true,
      currentLocation: 'New York, NY'
    }
  })

  // Create sample products for seller1
  const product1 = await prisma.product.create({
    data: {
      name: 'Margherita Pizza',
      description: 'Classic tomato sauce with mozzarella cheese',
      price: 15.99,
      originalPrice: 19.99,
      image: '/placeholder.svg',
      category: 'Pizza',
      subcategory: 'Italian',
      stock: 50,
      inStock: true,
      isActive: true,
      sellerId: seller1.id
    }
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Chicken Burger',
      description: 'Grilled chicken with fresh vegetables',
      price: 12.99,
      image: '/placeholder.svg',
      category: 'Burger',
      subcategory: 'Fast Food',
      stock: 30,
      inStock: true,
      isActive: true,
      sellerId: seller1.id
    }
  })

  const product3 = await prisma.product.create({
    data: {
      name: 'Caesar Salad',
      description: 'Fresh lettuce with caesar dressing',
      price: 8.99,
      image: '/placeholder.svg',
      category: 'Salad',
      subcategory: 'Healthy',
      stock: 20,
      inStock: true,
      isActive: true,
      sellerId: seller1.id
    }
  })

  // Create sample products for seller2
  const product4 = await prisma.product.create({
    data: {
      name: 'Fresh Milk',
      description: 'Organic whole milk',
      price: 4.99,
      image: '/placeholder.svg',
      category: 'Dairy',
      subcategory: 'Milk',
      stock: 100,
      inStock: true,
      isActive: true,
      sellerId: seller2.id
    }
  })

  const product5 = await prisma.product.create({
    data: {
      name: 'Whole Wheat Bread',
      description: 'Freshly baked whole wheat bread',
      price: 3.99,
      image: '/placeholder.svg',
      category: 'Bakery',
      subcategory: 'Bread',
      stock: 75,
      inStock: true,
      isActive: true,
      sellerId: seller2.id
    }
  })

  const product6 = await prisma.product.create({
    data: {
      name: 'Organic Bananas',
      description: 'Fresh organic bananas',
      price: 2.99,
      image: '/placeholder.svg',
      category: 'Fruits',
      subcategory: 'Organic',
      stock: 200,
      inStock: true,
      isActive: true,
      sellerId: seller2.id
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('Created:')
  console.log(`- ${customer1.name} (Customer) - Email: customer@example.com, Password: password123`)
  console.log(`- ${demoCustomer.name} (Demo Customer) - Email: customer@example.com, Password: customer123`)
  console.log(`- ${seller1.businessName} (Seller) - Email: restaurant@example.com, Password: password123`)
  console.log(`- ${seller2.businessName} (Seller) - Email: grocery@example.com, Password: password123`)
  console.log(`- ${demoSeller.businessName} (Demo Seller) - Email: seller@example.com, Password: seller123`)
  console.log(`- ${deliveryAgent1.name} (Delivery Agent) - Email: delivery@example.com, Password: password123`)
  console.log(`- 6 products across 2 sellers`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 