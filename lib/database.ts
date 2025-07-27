import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Customer functions
export const createCustomer = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  countryCode?: string
}) => {
  const { data: customer, error } = await supabase
    .from('customers')
    .insert([{ ...data }])
    .select()
    .single()
  if (error) throw error
  return customer
}

export const findCustomerByEmail = async (email: string) => {
  const { data: customer, error } = await supabase
    .from('customers')
    .select('*')
    .eq('email', email)
    .single()
  if (error) return null
  return customer
}

export const findCustomerById = async (id: number) => {
  const { data: customer, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return customer
}

export const findCustomerByPhone = async (phone: string) => {
  const { data: customer, error } = await supabase
    .from('customers')
    .select('*')
    .eq('phone', phone)
    .single()
  if (error) return null
  return customer
}

// Seller functions
export const createSeller = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  countryCode?: string
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
  const { data: seller, error } = await supabase
    .from('sellers')
    .insert([{ ...data }])
    .select()
    .single()
  if (error) throw error
  return seller
}

export const findSellerByEmail = async (email: string) => {
  const { data: seller, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('email', email)
    .single()
  if (error) return null
  return seller
}

export const findSellerById = async (id: number) => {
  const { data: seller, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return seller
}

export const findSellerByPhone = async (phone: string) => {
  const { data: seller, error } = await supabase
    .from('sellers')
    .select('*')
    .eq('phone', phone)
    .single()
  if (error) return null
  return seller
}

// Delivery Agent functions
export const createDeliveryAgent = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  countryCode?: string
  vehicleNumber: string
  vehicleType: string
}) => {
  const { data: agent, error } = await supabase
    .from('delivery_agents')
    .insert([{ ...data }])
    .select()
    .single()
  if (error) throw error
  return agent
}

export const findDeliveryAgentByEmail = async (email: string) => {
  const { data: agent, error } = await supabase
    .from('delivery_agents')
    .select('*')
    .eq('email', email)
    .single()
  if (error) return null
  return agent
}

export const findDeliveryAgentById = async (id: number) => {
  const { data: agent, error } = await supabase
    .from('delivery_agents')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return null
  return agent
}

export const findDeliveryAgentByPhone = async (phone: string) => {
  const { data: agent, error } = await supabase
    .from('delivery_agents')
    .select('*')
    .eq('phone', phone)
    .single()
  if (error) return null
  return agent
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
  deliveryOTP?: string
  items: any[]
}) => {
  // Step 1: Create order without orderNumber
  const { data: order, error } = await supabase
    .from('orders')
    .insert([{
      orderNumber: 'temp',
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
      paymentMethod: data.paymentMethod,
      deliveryInstructions: data.deliveryInstructions,
      parcel_otp: data.deliveryOTP, // Store the delivery OTP
      orderStatus: 'CONFIRMED',
    }])
    .select()
    .single()
  if (error) throw error
  // Step 2: Update orderNumber to be the running id
  const { data: updatedOrder, error: updateError } = await supabase
    .from('orders')
    .update({ orderNumber: order.id.toString() })
    .eq('id', order.id)
    .select()
    .single()
  if (updateError) throw updateError
  // Insert order items
  for (const item of data.items) {
    await supabase.from('order_items').insert({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
      productName: item.productName,
      productImage: item.productImage,
      productCategory: item.productCategory
    })
  }
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
  const { data: sellerOrder, error } = await supabase
    .from('seller_orders')
    .insert([{
      orderId: data.orderId,
      sellerId: data.sellerId,
      items: data.items,
      subtotal: data.subtotal,
      commission: data.commission,
      netAmount: data.netAmount
    }])
    .select()
    .single()
  if (error) throw error
  return sellerOrder
}

export const createPayment = async (data: {
  orderId: number
  userId: number
  amount: number
  paymentMethod: string
  transactionId?: string
  gateway?: string
}) => {
  const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const { data: payment, error } = await supabase
    .from('payments')
    .insert([{
      paymentId,
      orderId: data.orderId,
      userId: data.userId,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      transactionId: data.transactionId,
      gateway: data.gateway
    }])
    .select()
    .single()
  if (error) throw error
  return payment
}



// Update delivery agent GPS location for an order
export const updateOrderDeliveryAgentLocation = async (orderId: number, location: any) => {
  const { error } = await supabase
    .from('orders')
    .update({ delivery_agent_location: location })
    .eq('id', orderId)
  if (error) throw error
}

// Fetch delivery agent GPS location for an order
export const getOrderDeliveryAgentLocation = async (orderId: number) => {
  const { data: order, error } = await supabase
    .from('orders')
    .select('delivery_agent_location')
    .eq('id', orderId)
    .single()
  if (error) throw error
  return order?.delivery_agent_location
}

// In-memory store for login OTPs (for development/demo only)
const loginOtpStore: Record<string, { otp: string; expiresAt: number }> = {};

/**
 * Generate a 6-digit OTP for login
 */
export function generateLoginOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Store OTP for a phone/email (keyed by phone for now)
 */
export function setLoginOTP(phone: string, otp: string, expiresInSeconds = 300) {
  loginOtpStore[phone] = {
    otp,
    expiresAt: Date.now() + expiresInSeconds * 1000,
  };
}

/**
 * Validate OTP for a phone/email
 */
export function validateLoginOTP(phone: string, otp: string): boolean {
  const entry = loginOtpStore[phone];
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) return false;
  return entry.otp === otp;
}

/**
 * Clear OTP after successful login
 */
export function clearLoginOTP(phone: string) {
  delete loginOtpStore[phone];
} 