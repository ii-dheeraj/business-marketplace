-- ENUMS
CREATE TYPE user_type AS ENUM ('CUSTOMER', 'SELLER', 'DELIVERY_AGENT');
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_DELIVERY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE payment_method AS ENUM ('CASH_ON_DELIVERY', 'ONLINE_PAYMENT', 'WALLET');

-- CUSTOMERS
CREATE TABLE "customers" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "countryCode" TEXT DEFAULT '+91',
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- SELLERS
CREATE TABLE "sellers" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "countryCode" TEXT DEFAULT '+91',
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "businessName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategories" TEXT,
    "businessAddress" TEXT NOT NULL,
    "businessCity" TEXT NOT NULL,
    "businessState" TEXT NOT NULL,
    "businessPincode" TEXT NOT NULL,
    "businessArea" TEXT,
    "businessLocality" TEXT,
    "businessDescription" TEXT,
    "businessImage" TEXT,
    "isVerified" BOOLEAN DEFAULT FALSE,
    "isPromoted" BOOLEAN DEFAULT FALSE,
    "rating" NUMERIC(2,1),
    "totalReviews" INTEGER DEFAULT 0,
    "deliveryTime" TEXT,
    "isOpen" BOOLEAN DEFAULT TRUE,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- DELIVERY AGENTS
CREATE TABLE "delivery_agents" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "phone" TEXT,
    "countryCode" TEXT DEFAULT '+91',
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "vehicleNumber" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "isAvailable" BOOLEAN DEFAULT TRUE,
    "currentLocation" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- PRODUCTS
CREATE TABLE "products" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" NUMERIC(10,2) NOT NULL,
    "originalPrice" NUMERIC(10,2),
    "image" TEXT,
    "category" TEXT,
    "subcategory" TEXT,
    "stock" INTEGER DEFAULT 0,
    "inStock" BOOLEAN DEFAULT TRUE,
    "isActive" BOOLEAN DEFAULT TRUE,
    "sellerId" INTEGER NOT NULL REFERENCES "sellers"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- ORDERS
CREATE TABLE "orders" (
    "id" SERIAL PRIMARY KEY,
    "orderNumber" TEXT UNIQUE,
    "customerId" INTEGER NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
    "deliveryAgentId" INTEGER REFERENCES "delivery_agents"("id") ON DELETE SET NULL,
    "orderStatus" order_status DEFAULT 'PENDING',
    "customerName" TEXT,
    "customerPhone" TEXT,
    "customerAddress" TEXT,
    "customerCity" TEXT,
    "customerArea" TEXT,
    "customerLocality" TEXT,
    "subtotal" NUMERIC(10,2) NOT NULL,
    "deliveryFee" NUMERIC(10,2) NOT NULL,
    "taxAmount" NUMERIC(10,2) DEFAULT 0,
    "totalAmount" NUMERIC(10,2) NOT NULL,
    "paymentMethod" payment_method,
    "paymentStatus" payment_status DEFAULT 'PENDING',
    "deliveryInstructions" TEXT,
    "estimatedDeliveryTime" TIMESTAMP,
    "actualDeliveryTime" TIMESTAMP,
    "parcel_otp" TEXT,
    "delivery_agent_location" JSONB,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- ORDER ITEMS
CREATE TABLE "order_items" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
    "productId" INTEGER NOT NULL REFERENCES "products"("id") ON DELETE SET NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" NUMERIC(10,2) NOT NULL,
    "totalPrice" NUMERIC(10,2) NOT NULL,
    "productName" TEXT,
    "productImage" TEXT,
    "productCategory" TEXT
);

-- SELLER ORDERS
CREATE TABLE "seller_orders" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
    "sellerId" INTEGER NOT NULL REFERENCES "sellers"("id") ON DELETE CASCADE,
    "status" order_status DEFAULT 'PENDING',
    "items" JSONB,
    "subtotal" NUMERIC(10,2) NOT NULL,
    "commission" NUMERIC(10,2) NOT NULL,
    "netAmount" NUMERIC(10,2) NOT NULL,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE "payments" (
    "id" SERIAL PRIMARY KEY,
    "paymentId" TEXT UNIQUE NOT NULL,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
    "userId" INTEGER NOT NULL,
    "amount" NUMERIC(10,2) NOT NULL,
    "paymentMethod" payment_method,
    "paymentStatus" payment_status DEFAULT 'PENDING',
    "transactionId" TEXT,
    "gateway" TEXT,
    "gatewayResponse" JSONB,
    "created_at" TIMESTAMP DEFAULT NOW(),
    "updated_at" TIMESTAMP DEFAULT NOW()
);

-- ORDER TRACKING
CREATE TABLE "order_tracking" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
    "status" order_status NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP DEFAULT NOW()
);

-- CHAT MESSAGES
CREATE TABLE "chat_messages" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER REFERENCES "orders"("id") ON DELETE CASCADE,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "sentAt" TIMESTAMP DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE "categories" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- SUBCATEGORIES
CREATE TABLE "subcategories" (
    "id" SERIAL PRIMARY KEY,
    "categoryId" INTEGER NOT NULL REFERENCES "categories"("id") ON DELETE CASCADE,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- INDEXES
CREATE INDEX idx_products_sellerId ON "products"("sellerId");
CREATE INDEX idx_orders_customerId ON "orders"("customerId");
CREATE INDEX idx_orders_deliveryAgentId ON "orders"("deliveryAgentId");
CREATE INDEX idx_order_items_orderId ON "order_items"("orderId");
CREATE INDEX idx_order_items_productId ON "order_items"("productId");
CREATE INDEX idx_seller_orders_orderId ON "seller_orders"("orderId");
CREATE INDEX idx_seller_orders_sellerId ON "seller_orders"("sellerId");
CREATE INDEX idx_payments_orderId ON "payments"("orderId");
CREATE INDEX idx_payments_userId ON "payments"("userId"); 