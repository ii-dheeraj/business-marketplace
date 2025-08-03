import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'your-anon-key'

// Validate environment variables
if (!supabaseUrl || supabaseUrl === 'https://your-project.supabase.co') {
  console.error('❌ SUPABASE_URL is not configured. Please set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL in your .env.local file')
}

if (!supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
  console.error('❌ SUPABASE_ANON_KEY is not configured. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY in your .env.local file')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
      return false;
    }
    
    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('❌ Supabase connection test failed:', error);
    return false;
  }
}

// Customer functions
export const createCustomer = async (data: {
  name: string
  email: string
  password: string
  phone?: string
  countryCode?: string
}) => {
  // Convert camelCase to snake_case for database
  const customerData = {
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    country_code: data.countryCode || '+91'
  }
  
  try {
    const { data: customer, error } = await supabase
      .from('customers')
      .insert([customerData])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error creating customer:', error);
      throw new Error(`Failed to create customer: ${error.message}`);
    }
    
    return customer;
  } catch (error) {
    console.error('Exception creating customer:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Database connection failed. Please check your Supabase configuration.');
  }
}

export const findCustomerByEmail = async (email: string) => {
  try {
    const { data: customer, error } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()
    if (error) {
      console.error('Error finding customer by email:', error);
      return null
    }
    return customer
  } catch (error) {
    console.error('Exception finding customer by email:', error);
    return null
  }
}

export const findCustomerById = async (id: string) => {
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
  subcategories: string[] | string
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
  // Convert camelCase to snake_case for database
  const sellerData = {
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    country_code: data.countryCode || '+91',
    business_name: data.businessName,
    category: data.category,
    subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
    business_address: data.businessAddress,
    business_city: data.businessCity,
    business_state: data.businessState,
    business_pincode: data.businessPincode,
    business_area: data.businessArea,
    business_locality: data.businessLocality,
    business_description: data.businessDescription,
    business_image: data.businessImage,
    delivery_time: data.deliveryTime
  }
  
  try {
    const { data: seller, error } = await supabase
      .from('sellers')
      .insert([sellerData])
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error creating seller:', error);
      throw new Error(`Failed to create seller: ${error.message}`);
    }
    
    return seller;
  } catch (error) {
    console.error('Exception creating seller:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Database connection failed. Please check your Supabase configuration.');
  }
}

export const findSellerByEmail = async (email: string) => {
  try {
    const { data: seller, error } = await supabase
      .from('sellers')
      .select('*')
      .eq('email', email)
      .single()
    if (error) {
      console.error('Error finding seller by email:', error);
      return null
    }
    return seller
  } catch (error) {
    console.error('Exception finding seller by email:', error);
    return null
  }
}

export const findSellerById = async (id: string) => {
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
  // Convert camelCase to snake_case for database
  const agentData = {
    name: data.name,
    email: data.email,
    password: data.password,
    phone: data.phone,
    country_code: data.countryCode || '+91',
    vehicle_number: data.vehicleNumber,
    vehicle_type: data.vehicleType
  }
  
  const { data: agent, error } = await supabase
    .from('delivery_agents')
    .insert([agentData])
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

export const findDeliveryAgentById = async (id: string) => {
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
export const storeUserSession = async (userType: string, userId: string) => {
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
      businessName: userData.business_name,
      category: userData.category,
      subcategories: userData.subcategories,
      businessAddress: userData.business_address,
      businessCity: userData.business_city,
      businessArea: userData.business_area,
      businessLocality: userData.business_locality,
      businessDescription: userData.business_description,
      businessImage: userData.business_image,
      isVerified: userData.is_verified,
      isPromoted: userData.is_promoted,
      rating: userData.rating,
      totalReviews: userData.total_reviews,
      deliveryTime: userData.delivery_time,
      isOpen: userData.is_open,
    }
  }

  // Add delivery agent specific fields if user is a delivery agent
  if (userType === 'DELIVERY_AGENT') {
    return {
      ...baseUserData,
      vehicleNumber: userData.vehicle_number,
      vehicleType: userData.vehicle_type,
      isAvailable: userData.is_available,
      currentLocation: userData.current_location
    }
  }

  // Return base user data for customers
  return baseUserData
}

// Order functions
export const createOrder = async (data: {
  customerId: string
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
  console.log("Creating order with data:", data)
  
  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  // Step 1: Create order
  const { data: order, error } = await supabase
    .from('orders')
    .insert([{
      order_number: orderNumber,
      customer_id: data.customerId,
      customer_name: data.customerName,
      customer_phone: data.customerPhone,
      customer_address: data.customerAddress,
      customer_city: data.customerCity,
      customer_area: data.customerArea,
      customer_locality: data.customerLocality,
      subtotal: data.subtotal,
      delivery_fee: data.deliveryFee,
      tax_amount: data.taxAmount,
      total_amount: data.totalAmount,
      payment_method: data.paymentMethod,
      delivery_instructions: data.deliveryInstructions,
      parcel_otp: data.deliveryOTP,
      order_status: 'PENDING',
    }])
    .select()
    .single()
  if (error) {
    console.error("Error creating order:", error)
    throw error
  }
  
  // Insert order items
  for (const item of data.items) {
    await supabase.from('order_items').insert({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.totalPrice,
      product_name: item.productName,
      product_image: item.productImage,
      product_category: item.productCategory
    })
  }
  return order
}

export const createSellerOrder = async (data: {
  orderId: string
  sellerId: string
  items: any[]
  subtotal: number
  commission: number
  netAmount: number
}) => {
  const { data: sellerOrder, error } = await supabase
    .from('seller_orders')
    .insert([{
      order_id: data.orderId,
      seller_id: data.sellerId,
      items: data.items,
      subtotal: data.subtotal,
      commission: data.commission,
      net_amount: data.netAmount
    }])
    .select()
    .single()
  if (error) throw error
  return sellerOrder
}

export const createPayment = async (data: {
  orderId: string
  userId: string
  amount: number
  paymentMethod: string
  transactionId?: string
  gateway?: string
}) => {
  const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const { data: payment, error } = await supabase
    .from('payments')
    .insert([{
      payment_id: paymentId,
      order_id: data.orderId,
      customer_id: data.userId,
      amount: data.amount,
      payment_method: data.paymentMethod,
      transaction_id: data.transactionId,
      gateway: data.gateway
    }])
    .select()
    .single()
  if (error) throw error
  return payment
}

// Product functions for new schema
export const createProduct = async (data: {
  sellerId: string
  title: string
  description?: string
  type: 'physical' | 'digital' | 'appointment' | 'walkin' | 'enquire'
  category?: string
  subcategory?: string
  slug?: string
  tags?: string[]
  keywords?: string[]
  seoDescription?: string
  originalPrice?: number
  sellingPrice: number
  discountPercent?: number
  unitLabel?: string
  customUnit?: string
  sku?: string
  quantityAvailable?: number
  minOrderQuantity?: number
  maxOrderQuantity?: number
  isInStock?: boolean
  lowStockThreshold?: number
  images?: string[]
  isActive?: boolean
  isFeatured?: boolean
  isPromoted?: boolean
}) => {
  try {
    // Create product first
    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([{
        seller_id: data.sellerId,
        title: data.title,
        description: data.description,
        type: data.type,
        category: data.category,
        subcategory: data.subcategory,
        slug: data.slug,
        tags: data.tags || [],
        keywords: data.keywords || [],
        seo_description: data.seoDescription,
        is_active: data.isActive ?? true,
        is_featured: data.isFeatured ?? false,
        is_promoted: data.isPromoted ?? false
      }])
      .select()
      .single()

    if (productError) throw productError

    // Create pricing
    const { error: pricingError } = await supabase
      .from('product_pricing')
      .insert([{
        product_id: product.id,
        original_price: data.originalPrice,
        selling_price: data.sellingPrice,
        discount_percent: data.discountPercent,
        unit_label: data.unitLabel || 'piece',
        custom_unit: data.customUnit,
        sku: data.sku,
        quantity_available: data.quantityAvailable || 0,
        min_order_quantity: data.minOrderQuantity || 1,
        max_order_quantity: data.maxOrderQuantity,
        is_in_stock: data.isInStock ?? true,
        low_stock_threshold: data.lowStockThreshold || 5
      }])

    if (pricingError) {
      console.error('Pricing creation error:', pricingError)
      // Continue anyway as pricing is optional
    }

    // Create images
    if (data.images && data.images.length > 0) {
      const imageData = data.images.map((url, index) => ({
        product_id: product.id,
        image_url: url,
        alt_text: data.title,
        is_primary: index === 0,
        sort_order: index
      }))

      const { error: imageError } = await supabase
        .from('product_images')
        .insert(imageData)

      if (imageError) {
        console.error('Image creation error:', imageError)
        // Continue anyway as images are optional
      }
    }

    return product
  } catch (error) {
    console.error('Product creation error:', error)
    throw error
  }
}

export const getProductWithDetails = async (productId: string) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        product_pricing(*),
        product_images(*),
        product_variants(*),
        variant_combinations(*),
        digital_product_details(*),
        appointment_product_details(*),
        walkin_product_details(*),
        enquiry_form_details(*),
        product_delivery_settings(*)
      `)
      .eq('id', productId)
      .single()

    if (error) throw error
    return product
  } catch (error) {
    console.error('Error fetching product details:', error)
    throw error
  }
}

// Update delivery agent GPS location for an order
export const updateOrderDeliveryAgentLocation = async (orderId: string, location: any) => {
  const { error } = await supabase
    .from('orders')
    .update({ delivery_agent_location: location })
    .eq('id', orderId)
  if (error) throw error
}

// Fetch delivery agent GPS location for an order
export const getOrderDeliveryAgentLocation = async (orderId: string) => {
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