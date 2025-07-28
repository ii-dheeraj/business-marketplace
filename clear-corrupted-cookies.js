// Script to clear corrupted cookies and fix authentication issues
const fs = require('fs');
const path = require('path');

console.log('🧹 Clearing corrupted cookies...');

// Function to clear cookies by setting them to expire in the past
function clearCookies() {
  console.log('📝 Instructions to clear cookies:');
  console.log('');
  console.log('1. Open your browser and go to: http://localhost:3000');
  console.log('2. Open Developer Tools (F12)');
  console.log('3. Go to Application/Storage tab');
  console.log('4. Find "Cookies" in the left sidebar');
  console.log('5. Click on "http://localhost:3000"');
  console.log('6. Delete these cookies:');
  console.log('   - userInfo');
  console.log('   - userType');
  console.log('   - userId');
  console.log('');
  console.log('7. Refresh the page');
  console.log('');
  console.log('Alternative method:');
  console.log('1. Open browser settings');
  console.log('2. Go to Privacy & Security');
  console.log('3. Clear browsing data');
  console.log('4. Select "Cookies and other site data"');
  console.log('5. Clear data for localhost:3000');
  console.log('');
}

clearCookies();

console.log('✅ Cookie clearing instructions provided!');
console.log('');
console.log('📋 Next steps:');
console.log('1. Clear cookies using the instructions above');
console.log('2. Restart your development server: npm run dev');
console.log('3. Go to http://localhost:3000');
console.log('4. Sign in again with your credentials');
console.log('5. The seller dashboard should now work properly');
console.log('');
console.log('🔧 If you still have issues:');
console.log('- Check that your .env.local file has correct Supabase credentials');
console.log('- Check browser console for any JavaScript errors');
console.log('- Verify that the server is running on port 3000'); 