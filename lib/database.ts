import { prisma } from './prisma'

// Customer functions
export const createCustomer = async (data: {
  name: string
  email: string
  password: string
  phone?: string
}) => {
  return await prisma.customer.create({ data })
}

export const findCustomerByEmail = async (email: string) => {
  return await prisma.customer.findUnique({ where: { email } })
}

export const findCustomerById = async (id: number) => {
  return await prisma.customer.findUnique({ where: { id } })
}

// Seller functions
export const createSeller = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  businessName: string
  category: string
  subcategories: string
  businessAddress: string
  businessCity: string
  businessState: string
  businessPincode: string
  businessArea?: string
  businessLocality?: string
  businessDescription?: string
  businessImage?: string
  deliveryTime?: string
}) => {
  return await prisma.seller.create({ data })
}

export const findSellerByEmail = async (email: string) => {
  return await prisma.seller.findUnique({ where: { email } })
}

export const findSellerById = async (id: number) => {
  return await prisma.seller.findUnique({ where: { id } })
}

// Delivery Agent functions
export const createDeliveryAgent = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  vehicleNumber: string
  vehicleType: string
}) => {
  return await prisma.deliveryAgent.create({ data })
}

export const findDeliveryAgentByEmail = async (email: string) => {
  return await prisma.deliveryAgent.findUnique({ where: { email } })
}

export const findDeliveryAgentById = async (id: number) => {
  return await prisma.deliveryAgent.findUnique({ where: { id } })
}

// User session storage functions
export const storeUserSession = async (userType: string, userId: number) => {
  let userData: any = null
  
  if (userType === 'CUSTOMER') {
    userData = await findCustomerById(userId)
  } else if (userType === 'SELLER') {
    userData = await findSellerById(userId)
  } else if (userType === 'DELIVERY_AGENT') {
    userData = await findDeliveryAgentById(userId)
  }
  
  if (!userData) {
    throw new Error('User not found')
  }
  
  // Return user data with type information
  const baseUserData = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    userType: userType,
  }

  // Add seller specific fields if user is a seller
  if (userType === 'SELLER') {
    return {
      ...baseUserData,
      businessName: userData.businessName,
      category: userData.category,
      subcategories: userData.subcategories,
      businessAddress: userData.businessAddress,
      businessCity: userData.businessCity,
      businessArea: userData.businessArea,
      businessLocality: userData.businessLocality,
      businessDescription: userData.businessDescription,
      businessImage: userData.businessImage,
      isVerified: userData.isVerified,
      isPromoted: userData.isPromoted,
      rating: userData.rating,
      totalReviews: userData.totalReviews,
      deliveryTime: userData.deliveryTime,
      isOpen: userData.isOpen,
    }
  }

  // Add delivery agent specific fields if user is a delivery agent
  if (userType === 'DELIVERY_AGENT') {
    return {
      ...baseUserData,
      vehicleNumber: userData.vehicleNumber,
      vehicleType: userData.vehicleType,
      isAvailable: userData.isAvailable,
      currentLocation: userData.currentLocation
    }
  }

  // Return base user data for customers
  return baseUserData
}

// Order functions
export const createOrder = async (data: {
  customerId: number
  customerName: string
  customerPhone: string
  customerAddress: string
  customerCity: string
  customerArea: string
  customerLocality?: string
  subtotal: number
  deliveryFee: number
  taxAmount: number
  totalAmount: number
  paymentMethod: string
  deliveryInstructions?: string
  items: any[]
}) => {
  // Step 1: Create order without orderNumber
  const order = await prisma.order.create({
    data: {
      orderNumber: "temp", // Temporary, will update after creation
      customerId: data.customerId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      customerCity: data.customerCity,
      customerArea: data.customerArea,
      customerLocality: data.customerLocality,
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee,
      taxAmount: data.taxAmount,
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod as any,
      deliveryInstructions: data.deliveryInstructions,
      orderStatus: "CONFIRMED",
      items: {
        create: data.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          productName: item.productName,
          productImage: item.productImage,
          productCategory: item.productCategory
        }))
      }
    },
    include: {
      items: true,
      customer: true
    }
  })
  // Step 2: Update orderNumber to be the running id
  const updatedOrder = await prisma.order.update({
    where: { id: order.id },
    data: { orderNumber: order.id.toString() },
    include: {
      items: true,
      customer: true
    }
  })
  return updatedOrder
}

export const createSellerOrder = async (data: {
  orderId: number
  sellerId: number
  items: any[]
  subtotal: number
  commission: number
  netAmount: number
}) => {
  return await prisma.sellerOrder.create({
    data: {
      orderId: data.orderId,
      sellerId: data.sellerId,
      items: data.items,
      subtotal: data.subtotal,
      commission: data.commission,
      netAmount: data.netAmount
    }
  })
}

export const createPayment = async (data: {
  orderId: number
  customerId: number
  amount: number
  paymentMethod: string
  transactionId?: string
  gateway?: string
}) => {
  const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  return await prisma.payment.create({
    data: {
      paymentId,
      orderId: data.orderId,
      customerId: data.customerId,
      amount: data.amount,
      paymentMethod: data.paymentMethod as any,
      transactionId: data.transactionId,
      gateway: data.gateway
    }
  })
} 