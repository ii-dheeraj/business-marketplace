// Run this with: node scripts/update-business-images.js
const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

// Sample business images from Unsplash
const businessImages = [
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop", // Electronics store
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop", // Fashion boutique
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop", // Grocery store
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", // Restaurant
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", // Bookstore
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", // Home decor
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop", // Food delivery
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop", // Tech store
];

// Sample product images
const productImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop", // Electronics
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop", // Fashion
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop", // Grocery
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop", // Food
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", // Books
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop", // Home
];

async function updateBusinessImages() {
  try {
    console.log('Updating business images...');
    
    // Get all sellers
    const sellers = await prisma.seller.findMany();
    console.log(`Found ${sellers.length} sellers to update`);
    
    for (let i = 0; i < sellers.length; i++) {
      const seller = sellers[i];
      const imageIndex = i % businessImages.length;
      const businessImage = businessImages[imageIndex];
      
      // Update seller with proper business image
      await prisma.seller.update({
        where: { id: seller.id },
        data: {
          businessImage: businessImage,
          rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
          totalReviews: Math.floor(Math.random() * 100) + 10, // Random reviews between 10-110
          isPromoted: Math.random() > 0.7, // 30% chance of being promoted
        }
      });
      
      console.log(`Updated seller ${seller.businessName || seller.name} with image`);
      
      // Update products for this seller
      const products = await prisma.product.findMany({
        where: { sellerId: seller.id }
      });
      
      for (let j = 0; j < products.length; j++) {
        const product = products[j];
        const productImageIndex = j % productImages.length;
        const productImage = productImages[productImageIndex];
        
        await prisma.product.update({
          where: { id: product.id },
          data: {
            image: productImage,
            price: Math.floor(Math.random() * 500) + 50, // Random price between 50-550
            stock: Math.floor(Math.random() * 20) + 5, // Random stock between 5-25
          }
        });
        
        console.log(`Updated product ${product.name} with image and pricing`);
      }
    }
    
    console.log('Successfully updated all business and product images!');
    
  } catch (error) {
    console.error('Error updating business images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateBusinessImages(); 