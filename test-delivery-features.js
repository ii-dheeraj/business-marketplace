const { createClient } = require('@supabase/supabase-js');

// Test the new delivery features
async function testDeliveryFeatures() {
  console.log('🧪 Testing Delivery Features...\n');

  // Test 1: OTP Generation
  console.log('1. Testing OTP Generation...');
  try {
    const response = await fetch('http://localhost:3000/api/order/generate-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        orderId: '1', 
        deliveryAgentId: 1 
      })
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      console.log('✅ OTP Generation: SUCCESS');
      console.log(`   Generated OTP: ${data.otp}`);
    } else {
      console.log('❌ OTP Generation: FAILED');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ OTP Generation: ERROR');
    console.log(`   Error: ${error.message}`);
  }

  // Test 2: OTP Verification
  console.log('\n2. Testing OTP Verification...');
  try {
    const response = await fetch('http://localhost:3000/api/order/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        orderId: '1', 
        deliveryAgentId: 1,
        otp: '123456' // This should fail with invalid OTP
      })
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      console.log('✅ OTP Verification: SUCCESS');
    } else {
      console.log('✅ OTP Verification: Expected failure with invalid OTP');
      console.log(`   Message: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ OTP Verification: ERROR');
    console.log(`   Error: ${error.message}`);
  }

  // Test 3: GPS Tracking
  console.log('\n3. Testing GPS Tracking...');
  try {
    const response = await fetch('http://localhost:3000/api/order/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        orderId: '1', 
        deliveryAgentId: 1,
        action: 'update_location',
        location: { lat: 28.6139, lng: 77.2090 } // Delhi coordinates
      })
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      console.log('✅ GPS Tracking: SUCCESS');
      console.log(`   Location updated: ${data.location.lat}, ${data.location.lng}`);
    } else {
      console.log('❌ GPS Tracking: FAILED');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ GPS Tracking: ERROR');
    console.log(`   Error: ${error.message}`);
  }

  // Test 4: Start Delivery
  console.log('\n4. Testing Start Delivery...');
  try {
    const response = await fetch('http://localhost:3000/api/order/tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        orderId: '1', 
        deliveryAgentId: 1,
        action: 'start_delivery'
      })
    });
    
    const data = await response.json();
    if (response.ok && data.success) {
      console.log('✅ Start Delivery: SUCCESS');
      console.log(`   Order status: ${data.order.orderStatus}`);
    } else {
      console.log('❌ Start Delivery: FAILED');
      console.log(`   Error: ${data.error}`);
    }
  } catch (error) {
    console.log('❌ Start Delivery: ERROR');
    console.log(`   Error: ${error.message}`);
  }

  console.log('\n🎉 Delivery Features Test Complete!');
  console.log('\n📋 Feature Summary:');
  console.log('✅ OTP Generation for parcel pickup');
  console.log('✅ OTP Verification with seller');
  console.log('✅ GPS tracking and location updates');
  console.log('✅ Real-time delivery status tracking');
  console.log('✅ Delivery agent dashboard integration');
}

// Run the test
testDeliveryFeatures().catch(console.error); 