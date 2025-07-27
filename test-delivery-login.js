// Test script for delivery agent login and dashboard access
const fetch = require('node-fetch');

async function testDeliveryAgentLogin() {
  console.log('🧪 Testing Delivery Agent Login and Dashboard Access...\n');

  try {
    // Step 1: Test delivery agent registration
    console.log('1. Testing delivery agent registration...');
    
    const registerData = {
      name: "Test Delivery Agent",
      email: "delivery@test.com",
      phone: "+91 98765 43210",
      userType: "DELIVERY_AGENT",
      vehicleNumber: "DL01AB1234",
      vehicleType: "Bike",
      step: "request_otp"
    };

    const registerResponse = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData)
    });

    if (!registerResponse.ok) {
      const error = await registerResponse.json();
      console.log('⚠️  Registration OTP request failed:', error.error);
    } else {
      console.log('✅ Registration OTP request successful');
    }

    // Step 2: Test delivery agent login
    console.log('\n2. Testing delivery agent login...');
    
    const loginData = {
      phone: "+91 98765 43210",
      userType: "DELIVERY_AGENT",
      step: "request_otp"
    };

    const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData)
    });

    if (!loginResponse.ok) {
      const error = await loginResponse.json();
      console.log('⚠️  Login OTP request failed:', error.error);
    } else {
      console.log('✅ Login OTP request successful');
    }

    // Step 3: Test delivery orders API
    console.log('\n3. Testing delivery orders API...');
    
    const ordersResponse = await fetch('http://localhost:3000/api/delivery/orders?deliveryAgentId=1', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!ordersResponse.ok) {
      const error = await ordersResponse.json();
      console.log('⚠️  Delivery orders API failed:', error.error);
    } else {
      const ordersData = await ordersResponse.json();
      console.log('✅ Delivery orders API successful');
      console.log('   - Available orders:', ordersData.availableOrders?.length || 0);
      console.log('   - Active deliveries:', ordersData.activeDeliveries?.length || 0);
      console.log('   - Stats:', ordersData.stats);
    }

    console.log('\n🎉 Delivery agent system test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Login as a delivery agent');
    console.log('3. Check the browser console for debug logs');
    console.log('4. Monitor the delivery dashboard for timeout issues');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testDeliveryAgentLogin(); 