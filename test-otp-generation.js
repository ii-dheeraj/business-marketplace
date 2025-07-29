// Test script for OTP generation fix
async function testOTPGeneration() {
  console.log('🧪 Testing OTP Generation Fix...\n')

  const baseUrl = 'http://localhost:3000'

  try {
    // Test 1: Check if there are any orders with CONFIRMED status
    console.log('1️⃣ Checking for orders with CONFIRMED status...')
    const ordersResponse = await fetch(`${baseUrl}/api/delivery/orders?deliveryAgentId=1`)
    const ordersData = await ordersResponse.json()

    if (ordersResponse.ok) {
      console.log('   ✅ Delivery agent orders fetched successfully')
      console.log('   Available orders:', ordersData.availableOrders?.length || 0)
      console.log('   Active deliveries:', ordersData.activeDeliveries?.length || 0)
      
      // Look for orders with ACCEPTED_BY_AGENT status (which should be CONFIRMED in DB)
      const acceptedOrders = ordersData.activeDeliveries?.filter(order => 
        order.status === 'ACCEPTED_BY_AGENT'
      ) || []
      
      if (acceptedOrders.length > 0) {
        console.log('   📦 Found orders with ACCEPTED_BY_AGENT status:', acceptedOrders.length)
        
        // Test OTP generation for the first accepted order
        const testOrder = acceptedOrders[0]
        console.log(`   Testing OTP generation for order #${testOrder.id}...`)
        
        const otpResponse = await fetch(`${baseUrl}/api/order/generate-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: testOrder.orderId,
            deliveryAgentId: 1
          })
        })

        const otpData = await otpResponse.json()
        
        if (otpResponse.ok) {
          console.log('   ✅ OTP generated successfully!')
          console.log('   OTP:', otpData.otp)
          console.log('   Order Status:', otpData.orderStatus)
          console.log('   Expires At:', otpData.expiresAt)
        } else {
          console.log('   ❌ OTP generation failed')
          console.log('   Error:', otpData.error)
          console.log('   Details:', otpData.details)
        }
      } else {
        console.log('   ⚠️  No orders with ACCEPTED_BY_AGENT status found')
        console.log('   💡 Please accept an order first to test OTP generation')
      }
    } else {
      console.error('   ❌ Failed to fetch delivery agent orders:', ordersData)
    }

    // Test 2: Check if there are any unassigned orders that can be accepted
    console.log('\n2️⃣ Checking for unassigned orders...')
    const unassignedOrders = ordersData.availableOrders?.filter(order => 
      order.isUnassigned
    ) || []
    
    if (unassignedOrders.length > 0) {
      console.log('   📦 Found unassigned orders:', unassignedOrders.length)
      console.log('   💡 You can accept these orders to test the full flow')
      
      unassignedOrders.forEach((order, index) => {
        console.log(`   Order ${index + 1}: #${order.id} - ${order.status}`)
      })
    } else {
      console.log('   ⚠️  No unassigned orders found')
    }

    // Test 3: Check order status mapping
    console.log('\n3️⃣ Testing order status mapping...')
    const allOrders = [
      ...(ordersData.availableOrders || []),
      ...(ordersData.activeDeliveries || []),
      ...(ordersData.completedDeliveries || [])
    ]
    
    if (allOrders.length > 0) {
      console.log('   📊 Order status distribution:')
      const statusCount = {}
      allOrders.forEach(order => {
        statusCount[order.status] = (statusCount[order.status] || 0) + 1
      })
      
      Object.entries(statusCount).forEach(([status, count]) => {
        console.log(`   ${status}: ${count} orders`)
      })
    }

    console.log('\n✅ OTP generation test completed!')

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run the test
testOTPGeneration()