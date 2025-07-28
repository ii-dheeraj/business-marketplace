const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testDeliveryFlow() {
  console.log('🚀 Testing Delivery Flow...');

  try {
    // 1. Create a test delivery agent
    const { data: deliveryAgent, error: agentError } = await supabase
      .from('delivery_agents')
      .upsert([{
        name: "Rahul Kumar",
        email: "rahul@delivery.com",
        phone: "+91 98765 43210",
        password: "$2a$10$hashedpassword",
        vehicleNumber: "DL01AB1234",
        vehicleType: "Bike",
        isAvailable: true
      }], { onConflict: 'email' })
      .select()
      .single();

    if (agentError) {
      console.error('❌ Error creating delivery agent:', agentError);
    } else {
      console.log('✅ Delivery agent created:', deliveryAgent.name);
    }

    // 2. Create test customers
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .upsert([{
        name: "Priya Sharma",
        email: "priya@customer.com",
        phone: "+91 98765 43211",
        password: "$2a$10$hashedpassword"
      }], { onConflict: 'email' })
      .select()
      .single();

    if (customerError) {
      console.error('❌ Error creating customer:', customerError);
    } else {
      console.log('✅ Customer created:', customer.name);
    }

    // 3. Create test products for the existing seller
    const { data: products, error: productsError } = await supabase
      .from('products')
      .upsert([
        {
          name: "iPhone 15 Pro",
          description: "Latest iPhone with titanium design",
          price: 149999,
          originalPrice: 159999,
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
          category: "electronics",
          subcategory: "Smartphones",
          stock: 10,
          inStock: true,
          sellerId: 1
        },
        {
          name: "MacBook Air M3",
          description: "Ultra-thin laptop with M3 chip",
          price: 114999,
          originalPrice: 124999,
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
          category: "electronics",
          subcategory: "Laptops",
          stock: 5,
          inStock: true,
          sellerId: 1
        }
      ], { onConflict: 'id' })
      .select();

    if (productsError) {
      console.error('❌ Error creating products:', productsError);
    } else {
      console.log('✅ Products created:', products.length);
    }

    // 4. Create test orders in different statuses
    const testOrders = [
      {
        orderNumber: "ORD-001",
        customerId: customer.id,
        orderStatus: "CONFIRMED",
        customerName: "Priya Sharma",
        customerPhone: "+91 98765 43211",
        customerAddress: "123, Green Park, New Delhi, Delhi 110016",
        customerCity: "New Delhi",
        customerArea: "Green Park",
        customerLocality: "South Delhi",
        subtotal: 149999,
        deliveryFee: 50,
        taxAmount: 0,
        totalAmount: 150049
      },
      {
        orderNumber: "ORD-002", 
        customerId: customer.id,
        orderStatus: "READY_FOR_DELIVERY",
        customerName: "Priya Sharma",
        customerPhone: "+91 98765 43211",
        customerAddress: "456, Connaught Place, New Delhi, Delhi 110001",
        customerCity: "New Delhi",
        customerArea: "Connaught Place",
        customerLocality: "Central Delhi",
        subtotal: 114999,
        deliveryFee: 50,
        taxAmount: 0,
        totalAmount: 115049
      },
      {
        orderNumber: "ORD-003",
        customerId: customer.id,
        deliveryAgentId: deliveryAgent.id,
        orderStatus: "READY_FOR_DELIVERY",
        customerName: "Priya Sharma", 
        customerPhone: "+91 98765 43211",
        customerAddress: "789, Lajpat Nagar, New Delhi, Delhi 110024",
        customerCity: "New Delhi",
        customerArea: "Lajpat Nagar",
        customerLocality: "South Delhi",
        subtotal: 264998,
        deliveryFee: 50,
        taxAmount: 0,
        totalAmount: 265048
      }
    ];

    for (const order of testOrders) {
      const { data: createdOrder, error: orderError } = await supabase
        .from('orders')
        .upsert([order], { onConflict: 'orderNumber' })
        .select()
        .single();

      if (orderError) {
        console.error(`❌ Error creating order ${order.orderNumber}:`, orderError);
      } else {
        console.log(`✅ Order created: ${order.orderNumber} (${order.orderStatus})`);
        
        // 5. Create order items
        const orderItems = [
          {
            orderId: createdOrder.id,
            productId: products[0].id,
            quantity: 1,
            price: products[0].price
          }
        ];

        if (order.orderNumber === "ORD-003") {
          // Add both products for the third order
          orderItems.push({
            orderId: createdOrder.id,
            productId: products[1].id,
            quantity: 1,
            price: products[1].price
          });
        }

        for (const item of orderItems) {
          const { error: itemError } = await supabase
            .from('order_items')
            .upsert([item], { onConflict: 'id' });

          if (itemError) {
            console.error(`❌ Error creating order item:`, itemError);
          } else {
            console.log(`✅ Order item created for order ${order.orderNumber}`);
          }
        }

        // 6. Create seller orders
        const { error: sellerOrderError } = await supabase
          .from('seller_orders')
          .upsert([{
            orderId: createdOrder.id,
            sellerId: 1,
            status: order.orderStatus,
            items: JSON.stringify(orderItems),
            subtotal: order.subtotal,
            commission: order.subtotal * 0.1,
            netAmount: order.subtotal * 0.9
          }], { onConflict: 'orderId' });

        if (sellerOrderError) {
          console.error(`❌ Error creating seller order:`, sellerOrderError);
        } else {
          console.log(`✅ Seller order created for order ${order.orderNumber}`);
        }
      }
    }

    console.log('\n🎉 Test data created successfully!');
    console.log('\n📋 Test Summary:');
    console.log('- 1 Delivery Agent: Rahul Kumar');
    console.log('- 1 Customer: Priya Sharma');
    console.log('- 2 Products: iPhone 15 Pro, MacBook Air M3');
    console.log('- 3 Orders:');
    console.log('  * ORD-001: CONFIRMED (Available for pickup)');
    console.log('  * ORD-002: READY_FOR_DELIVERY (Available for pickup)');
    console.log('  * ORD-003: READY_FOR_DELIVERY (Assigned to Rahul)');
    
    console.log('\n🔗 Test the delivery dashboard:');
    console.log('http://localhost:3000/delivery/dashboard');
    console.log('\n📱 Login as delivery agent:');
    console.log('Email: rahul@delivery.com');
    console.log('Password: (any password)');

  } catch (error) {
    console.error('❌ Error in test delivery flow:', error);
  }
}

// Run the test
testDeliveryFlow(); 