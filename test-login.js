// Test script to verify login functionality
const BASE_URL = 'http://localhost:3001';

async function testLogin() {
  console.log('🧪 Testing Login Functionality...\n');

  try {
    // Test 1: Customer Login
    console.log('1. Testing Customer Login...');
    const customerLoginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'customer@example.com',
        password: 'customer123'
      })
    });
    
    const customerData = await customerLoginResponse.json();
    console.log('Customer Login Status:', customerLoginResponse.status);
    console.log('Customer Login Response:', customerData);
    console.log('✅ Customer Login Test:', customerLoginResponse.ok ? 'PASSED' : 'FAILED');
    console.log('');

    // Test 2: Seller Login
    console.log('2. Testing Seller Login...');
    const sellerLoginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'seller@example.com',
        password: 'seller123'
      })
    });
    
    const sellerData = await sellerLoginResponse.json();
    console.log('Seller Login Status:', sellerLoginResponse.status);
    console.log('Seller Login Response:', sellerData);
    console.log('✅ Seller Login Test:', sellerLoginResponse.ok ? 'PASSED' : 'FAILED');
    console.log('');

    // Test 3: Categories API
    console.log('3. Testing Categories API...');
    const categoriesResponse = await fetch(`${BASE_URL}/api/categories`);
    const categoriesData = await categoriesResponse.json();
    console.log('Categories API Status:', categoriesResponse.status);
    console.log('Categories Count:', categoriesData.categories?.length || 0);
    console.log('✅ Categories API Test:', categoriesResponse.ok ? 'PASSED' : 'FAILED');
    console.log('');

    // Test 4: Business API
    console.log('4. Testing Business API...');
    const businessResponse = await fetch(`${BASE_URL}/api/business`);
    const businessData = await businessResponse.json();
    console.log('Business API Status:', businessResponse.status);
    console.log('Businesses Count:', businessData.businesses?.length || 0);
    console.log('✅ Business API Test:', businessResponse.ok ? 'PASSED' : 'FAILED');
    console.log('');

    console.log('🎉 All tests completed!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
}

// Run the test
testLogin(); 