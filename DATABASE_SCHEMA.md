# Database Schema Documentation

## Overview

The business marketplace application uses a comprehensive database schema with Prisma ORM. The database is designed to support three types of users: Customers, Sellers, and Delivery Agents, with proper relationships between orders, products, and payments.

## Database Tables

### 1. User Table
The main user table that supports three user types with specific fields for each:

**Common Fields:**
- `id` (Primary Key)
- `name` - User's full name
- `email` - Unique email address
- `phone` - Phone number
- `password` - Hashed password
- `userType` - Enum: CUSTOMER, SELLER, DELIVERY_AGENT
- `avatar` - Profile image URL
- `createdAt`, `updatedAt` - Timestamps

**Seller-Specific Fields:**
- `businessName` - Name of the business
- `businessCategory` - Business category (Restaurant, Grocery, etc.)
- `businessAddress` - Business address
- `businessCity`, `businessArea`, `businessLocality` - Location details
- `businessDescription` - Business description
- `businessImage` - Business logo/image
- `isVerified` - Verification status
- `isPromoted` - Promotion status
- `rating` - Average rating
- `totalReviews` - Number of reviews
- `deliveryTime` - Estimated delivery time
- `isOpen` - Business open/closed status

**Delivery Agent-Specific Fields:**
- `vehicleNumber` - Vehicle registration number
- `vehicleType` - Type of vehicle
- `isAvailable` - Availability status
- `currentLocation` - Current location

### 2. Product Table
Stores products sold by sellers:

- `id` (Primary Key)
- `name` - Product name
- `description` - Product description
- `price` - Current price
- `originalPrice` - Original price (for discounts)
- `image` - Product image URL
- `category` - Product category
- `subcategory` - Product subcategory
- `stock` - Available stock quantity
- `inStock` - Stock availability boolean
- `isActive` - Product active status
- `sellerId` (Foreign Key) - References User table
- `createdAt`, `updatedAt` - Timestamps

### 3. Order Table
Main order table for customer orders:

- `id` (Primary Key)
- `orderNumber` - Unique order number
- `customerId` (Foreign Key) - References User table
- `deliveryAgentId` (Foreign Key) - References User table (optional)
- `orderStatus` - Enum: PENDING, CONFIRMED, PREPARING, READY_FOR_DELIVERY, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
- `customerName`, `customerPhone`, `customerAddress`, `customerCity`, `customerArea`, `customerLocality` - Customer details
- `subtotal`, `deliveryFee`, `taxAmount`, `totalAmount` - Amount details
- `paymentMethod` - Enum: CASH_ON_DELIVERY, ONLINE_PAYMENT, WALLET
- `paymentStatus` - Enum: PENDING, COMPLETED, FAILED, REFUNDED
- `deliveryInstructions` - Special delivery instructions
- `estimatedDeliveryTime`, `actualDeliveryTime` - Delivery timestamps
- `createdAt`, `updatedAt` - Timestamps

### 4. OrderItem Table
Individual items within an order:

- `id` (Primary Key)
- `orderId` (Foreign Key) - References Order table
- `productId` (Foreign Key) - References Product table
- `quantity` - Item quantity
- `unitPrice` - Price per unit
- `totalPrice` - Total price for this item
- `productName`, `productImage`, `productCategory` - Product snapshot (preserved even if product is deleted)

### 5. SellerOrder Table
Tracks orders for each seller (when order contains items from multiple sellers):

- `id` (Primary Key)
- `orderId` (Foreign Key) - References Order table
- `sellerId` (Foreign Key) - References User table
- `status` - Order status for this seller
- `items` - JSON array of items for this seller
- `subtotal` - Subtotal for this seller's items
- `commission` - Platform commission
- `netAmount` - Net amount after commission
- `createdAt`, `updatedAt` - Timestamps

### 6. Payment Table
Tracks all payment transactions:

- `id` (Primary Key)
- `paymentId` - Unique payment identifier
- `orderId` (Foreign Key) - References Order table
- `userId` (Foreign Key) - References User table (who made the payment)
- `amount` - Payment amount
- `paymentMethod` - Payment method used
- `paymentStatus` - Payment status
- `transactionId` - External transaction ID
- `gateway` - Payment gateway used
- `gatewayResponse` - Gateway response data (JSON)
- `createdAt`, `updatedAt` - Timestamps

## Enums

### UserType
- `CUSTOMER` - End customers who place orders
- `SELLER` - Business owners who sell products
- `DELIVERY_AGENT` - Delivery personnel

### OrderStatus
- `PENDING` - Order placed but not confirmed
- `CONFIRMED` - Order confirmed by seller
- `PREPARING` - Order being prepared
- `READY_FOR_DELIVERY` - Order ready for pickup
- `OUT_FOR_DELIVERY` - Order with delivery agent
- `DELIVERED` - Order delivered successfully
- `CANCELLED` - Order cancelled

### PaymentStatus
- `PENDING` - Payment pending
- `COMPLETED` - Payment completed
- `FAILED` - Payment failed
- `REFUNDED` - Payment refunded

### PaymentMethod
- `CASH_ON_DELIVERY` - Cash on delivery
- `ONLINE_PAYMENT` - Online payment
- `WALLET` - Digital wallet payment

## Relationships

1. **User → Product**: One-to-Many (Seller can have multiple products)
2. **User → Order**: One-to-Many (Customer can have multiple orders)
3. **User → Order**: One-to-Many (Delivery Agent can deliver multiple orders)
4. **Order → OrderItem**: One-to-Many (Order can have multiple items)
5. **Product → OrderItem**: One-to-Many (Product can be in multiple order items)
6. **Order → SellerOrder**: One-to-Many (Order can have multiple seller orders)
7. **User → SellerOrder**: One-to-Many (Seller can have multiple seller orders)
8. **Order → Payment**: One-to-Many (Order can have multiple payments)
9. **User → Payment**: One-to-Many (User can make multiple payments)

## Key Features

1. **Multi-Seller Support**: Orders can contain items from multiple sellers
2. **Commission Tracking**: Platform commission is tracked per seller
3. **Payment Tracking**: Complete payment history with multiple payment methods
4. **Delivery Management**: Delivery agent assignment and tracking
5. **Stock Management**: Product stock tracking with availability status
6. **Order Status Tracking**: Detailed order status progression
7. **Data Preservation**: Product snapshots in orders to preserve data integrity

## Sample Data

The database comes pre-seeded with:
- 1 Customer user
- 2 Seller users (Restaurant and Grocery)
- 1 Delivery Agent user
- 6 sample products across the sellers

## Usage

### Creating a new user:
```typescript
const user = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    userType: 'CUSTOMER'
  }
})
```

### Creating a product:
```typescript
const product = await prisma.product.create({
  data: {
    name: 'Product Name',
    price: 29.99,
    sellerId: sellerId,
    stock: 100,
    category: 'Electronics'
  }
})
```

### Creating an order:
```typescript
const order = await prisma.order.create({
  data: {
    orderNumber: 'ORD-123456',
    customerId: customerId,
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    customerAddress: '123 Main St',
    customerCity: 'New York',
    customerArea: 'Manhattan',
    subtotal: 50.00,
    deliveryFee: 5.00,
    totalAmount: 55.00,
    paymentMethod: 'ONLINE_PAYMENT',
    items: {
      create: [
        {
          productId: 1,
          quantity: 2,
          unitPrice: 25.00,
          totalPrice: 50.00,
          productName: 'Product Name'
        }
      ]
    }
  }
})
```

## Migration History

- `20250717043425_init` - Initial schema
- `20250717044909_add_business_product_metadata` - Added business and product metadata
- `20250718134115_add_product_stock` - Added product stock management
- `20250719033659_complete_database_schema` - Complete schema with all tables and relationships 