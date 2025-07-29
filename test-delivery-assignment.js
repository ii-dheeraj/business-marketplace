// Test script for delivery agent assignment system
async function testDeliveryAssignment() {
  console.log('🚚 Testing Delivery Agent Assignment System\n')

  const baseUrl = 'http://localhost:3000'

  try {
    // Test 1: Check if there are any delivery agents
    console.log('1️⃣ Checking available delivery agents...')
    const agentsResponse = await fetch(`${baseUrl}/api/delivery/assign?orderId=1`)
    const agentsData = await agentsResponse.json()
    
    if (agentsResponse.status === 503) {
      console.log('   ⚠️  No delivery agents available')
      console.log('   💡 Please create a delivery agent first')
      return
    }

    // Test 2: Create a test order
    console.log('\n2️⃣ Creating a test order...')
    const orderData = {
      customerId: 1,
      items: [
        {
          productId: 1,
          quantity: 2,
          price: 100,
          name: "Test Product",
          image: "test.jpg",
          category: "Test"
        }
      ],
      customerDetails: {
        name: "Test Customer",
        phone: "1234567890",
        address: "123 Test Street",
        city: "Test City",
        area: "Test Area",
        locality: "Test Locality"
      },
      paymentMethod: "CASH_ON_DELIVERY",
      totalAmount: 200,
      subtotal: 200,
      deliveryFee: 0,
      taxAmount: 0,
      deliveryInstructions: "Test delivery"
    }

    const orderResponse = await fetch(`${baseUrl}/api/order/place`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json()
      console.error('   ❌ Failed to create order:', errorData)
      return
    }

    const orderResult = await orderResponse.json()
    console.log('   ✅ Order created successfully')
    console.log('   Order ID:', orderResult.order.id)
    console.log('   Order Number:', orderResult.order.orderNumber)

    // Test 3: Check if order was automatically assigned
    console.log('\n3️⃣ Checking if order was automatically assigned...')
    const checkResponse = await fetch(`${baseUrl}/api/delivery/orders?deliveryAgentId=1`)
    const checkData = await checkResponse.json()

    if (checkResponse.ok) {
      console.log('   ✅ Delivery agent orders fetched successfully')
      console.log('   Available orders:', checkData.availableOrders?.length || 0)
      console.log('   Active deliveries:', checkData.activeDeliveries?.length || 0)
      console.log('   Completed deliveries:', checkData.completedDeliveries?.length || 0)
      
      if (checkData.availableOrders?.length > 0) {
        console.log('   📦 Orders found in delivery agent dashboard!')
        checkData.availableOrders.forEach((order, index) => {
          console.log(`   Order ${index + 1}: #${order.id} - ${order.status}${order.isUnassigned ? ' (Unassigned)' : ''}`)
        })
      } else {
        console.log('   ⚠️  No orders found in delivery agent dashboard')
      }
    } else {
      console.error('   ❌ Failed to fetch delivery agent orders:', checkData)
    }

    // Test 4: Manually assign an order if needed
    console.log('\n4️⃣ Testing manual order assignment...')
    const manualAssignResponse = await fetch(`${baseUrl}/api/delivery/assign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: orderResult.order.id })
    })

    const manualAssignData = await manualAssignResponse.json()
    
    if (manualAssignResponse.ok) {
      console.log('   ✅ Order assigned successfully')
      console.log('   Assigned to agent:', manualAssignData.deliveryAgent?.name)
    } else {
      console.log('   ℹ️  Order assignment result:', manualAssignData.message || manualAssignData.error)
    }

    console.log('\n✅ Delivery agent assignment system test completed!')

  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Run the test
testDeliveryAssignment()