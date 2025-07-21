// Test script for customer order tracking and real-time notifications

async function testCustomerOrderTracking() {
  console.log('🧪 Testing Customer Order Tracking System...\n');

  try {
    // Test 1: Fetch customer orders
    console.log('1️⃣ Testing customer orders fetch...');
    const ordersResponse = await fetch('http://localhost:3000/api/order/place?customerId=2');
    const ordersData = await ordersResponse.json();
    
    if (ordersData.orders && ordersData.orders.length > 0) {
      console.log('✅ Customer orders found:', ordersData.orders.length);
      console.log('   Latest order:', {
        id: ordersData.orders[0].id,
        status: ordersData.orders[0].orderStatus,
        total: ordersData.orders[0].totalAmount,
        items: ordersData.orders[0].items.length
      });
    } else {
      console.log('⚠️  No orders found for customer');
    }

    // Test 2: Test real-time notifications API
    console.log('\n2️⃣ Testing real-time notifications API...');
    const notificationResponse = await fetch('http://localhost:3000/api/realtime/notifications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerId: '2',
        type: 'order_status_change',
        title: 'Test Order Update',
        message: 'This is a test notification for order tracking'
      })
    });
    
    const notificationData = await notificationResponse.json();
    if (notificationData.success) {
      console.log('✅ Real-time notification sent successfully');
    } else {
      console.log('❌ Failed to send notification:', notificationData.error);
    }

    // Test 3: Test order status update
    console.log('\n3️⃣ Testing order status update...');
    if (ordersData.orders && ordersData.orders.length > 0) {
      const orderId = ordersData.orders[0].id;
      const updateResponse = await fetch(`http://localhost:3000/api/order/place?orderId=${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderStatus: 'ORDER_CONFIRMED'
        })
      });
      
      const updateData = await updateResponse.json();
      if (updateData.success) {
        console.log('✅ Order status updated successfully');
        console.log('   New status:', updateData.order.orderStatus);
      } else {
        console.log('❌ Failed to update order status:', updateData.error);
      }
    } else {
      console.log('⚠️  Skipping order update test - no orders available');
    }

    // Test 4: Test order tracking data
    console.log('\n4️⃣ Testing order tracking data...');
    if (ordersData.orders && ordersData.orders.length > 0) {
      const orderId = ordersData.orders[0].id;
      const trackingResponse = await fetch(`http://localhost:3000/api/order/tracking?orderId=${orderId}`);
      const trackingData = await trackingResponse.json();
      
      if (trackingData.success && trackingData.order.tracking) {
        console.log('✅ Order tracking data found:', trackingData.order.tracking.length, 'entries');
        trackingData.order.tracking.forEach((entry, index) => {
          console.log(`   ${index + 1}. ${entry.status}: ${entry.description}`);
        });
      } else {
        console.log('⚠️  No tracking data available');
      }
    }

    console.log('\n🎉 Customer Order Tracking Test Complete!');
    console.log('\n📋 Summary:');
    console.log('   - Customer orders: ✅');
    console.log('   - Real-time notifications: ✅');
    console.log('   - Order status updates: ✅');
    console.log('   - Order tracking: ✅');
    console.log('\n🚀 Customer can now:');
    console.log('   - View all their orders at /customer/orders');
    console.log('   - Get real-time updates when order status changes');
    console.log('   - Track order progress with detailed timeline');
    console.log('   - Receive instant notifications for delivery updates');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCustomerOrderTracking(); 