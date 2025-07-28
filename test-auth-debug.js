// Debug script to test authentication system
const BASE_URL = 'http://localhost:3000';

async function testAuthSystem() {
  console.log('🔍 Testing Authentication System...\n');

  // Test 1: Check if server is running
  console.log('1. Testing server connectivity...');
  try {
    const healthResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true })
    });
    console.log('✅ Server is running (Status:', healthResponse.status, ')');
  } catch (error) {
    console.log('❌ Server connection failed:', error.message);
    console.log('   Make sure your Next.js server is running on port 3000');
    return;
  }

  // Test 2: Check environment variables
  console.log('\n2. Testing environment variables...');
  try {
    const envResponse = await fetch(`${BASE_URL}/api/test`, {
      method: 'GET'
    });
    if (envResponse.ok) {
      const envData = await envResponse.json();
      console.log('✅ Environment check response:', envData);
    } else {
      console.log('⚠️  Environment check failed (Status:', envResponse.status, ')');
    }
  } catch (error) {
    console.log('⚠️  Environment check error:', error.message);
  }

  // Test 3: Test login with invalid data
  console.log('\n3. Testing login with invalid data...');
  try {
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'wrongpassword'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login API is responding (Status:', loginResponse.status, ')');
    console.log('   Response:', loginData.error || loginData.message);
  } catch (error) {
    console.log('❌ Login API failed:', error.message);
  }

  // Test 4: Test OTP request
  console.log('\n4. Testing OTP request...');
  try {
    const otpResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: '+919876543210',
        userType: 'CUSTOMER',
        step: 'request_otp'
      })
    });
    
    const otpData = await otpResponse.json();
    console.log('✅ OTP API is responding (Status:', otpResponse.status, ')');
    console.log('   Response:', otpData.error || otpData.message);
  } catch (error) {
    console.log('❌ OTP API failed:', error.message);
  }

  console.log('\n📋 Debug Summary:');
  console.log('• Check if your Next.js server is running: npm run dev');
  console.log('• Check if you have a .env.local file with Supabase credentials');
  console.log('• Check browser console for any JavaScript errors');
  console.log('• Check server console for any backend errors');
}

// Run the test
testAuthSystem().catch(console.error); 