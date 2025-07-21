const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testOrders() {
  try {
    console.log('🔍 Testing Order System...\n');

    // 1. Check if there are any products
    const products = await prisma.product.findMany({
      take: 5,
      include: {
        seller: true
      }
    });

    console.log('📦 Found Products:');
    products.forEach(product => {
      console.log(`  - ${product.name} (₹${product.price}) - Seller: ${product.seller.name} (ID: ${product.seller.id})`);
    });

    // 2. Check if there are any orders
    const orders = await prisma.order.findMany({
      take: 5,
      include: {
        items: {
          include: {
            product: {
              include: {
                seller: true
              }
            }
          }
        }
      }
    });

    console.log('\n📋 Found Orders:');
    orders.forEach(order => {
      console.log(`  - Order #${order.orderNumber} (₹${order.totalAmount})`);
      console.log(`    Customer: ${order.customerName}`);
      console.log(`    Items: ${order.items.length}`);
      order.items.forEach(item => {
        console.log(`      * ${item.productName} (Qty: ${item.quantity}) - Seller: ${item.product.seller.name}`);
      });
    });

    // 3. Test seller-specific order query
    if (products.length > 0) {
      const sellerId = products[0].sellerId;
      console.log(`\n🔍 Testing Seller Orders for Seller ID: ${sellerId}`);
      
      const sellerOrders = await prisma.order.findMany({
        where: {
          items: {
            some: {
              product: {
                sellerId: sellerId
              }
            }
          }
        },
        include: {
          items: {
            where: {
              product: {
                sellerId: sellerId
              }
            },
            include: {
              product: true
            }
          }
        }
      });

      console.log(`Found ${sellerOrders.length} orders for seller ${sellerId}:`);
      sellerOrders.forEach(order => {
        const sellerItems = order.items;
        const sellerTotal = sellerItems.reduce((sum, item) => sum + item.totalPrice, 0);
        console.log(`  - Order #${order.orderNumber}: ${sellerItems.length} items, Total: ₹${sellerTotal}`);
      });
    }

    // 4. Check order items structure
    console.log('\n📊 Order Items Structure:');
    const sampleOrder = await prisma.order.findFirst({
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (sampleOrder) {
      console.log(`Sample Order #${sampleOrder.orderNumber}:`);
      sampleOrder.items.forEach(item => {
        console.log(`  - ${item.productName} (Product ID: ${item.productId})`);
        console.log(`    Quantity: ${item.quantity}, Price: ₹${item.unitPrice}, Total: ₹${item.totalPrice}`);
        console.log(`    Product Seller ID: ${item.product.sellerId}`);
      });
    }

  } catch (error) {
    console.error('❌ Error testing orders:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testOrders(); 