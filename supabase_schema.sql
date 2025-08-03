-- =====================================================
-- SUPABASE-COMPATIBLE PRODUCT LISTING SYSTEM SCHEMA
-- =====================================================

-- ENUMS
CREATE TYPE product_type AS ENUM ('physical', 'digital', 'appointment', 'walkin', 'enquire');
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'READY_FOR_DELIVERY', 'READY_FOR_PICKUP', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE payment_method AS ENUM ('CASH_ON_DELIVERY', 'ONLINE_PAYMENT', 'WALLET', 'UPI', 'BANK_TRANSFER');

-- =====================================================
-- CORE TABLES
-- =====================================================

-- SELLERS TABLE
CREATE TABLE sellers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country_code TEXT DEFAULT '+91',
    password TEXT NOT NULL,
    avatar TEXT,
    business_name TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategories TEXT[],
    business_address TEXT NOT NULL,
    business_city TEXT NOT NULL,
    business_state TEXT NOT NULL,
    business_pincode TEXT NOT NULL,
    business_area TEXT,
    business_locality TEXT,
    business_description TEXT,
    business_image TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_promoted BOOLEAN DEFAULT FALSE,
    rating NUMERIC(2,1),
    total_reviews INTEGER DEFAULT 0,
    delivery_time TEXT,
    is_open BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PRODUCTS TABLE (Main table)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type product_type NOT NULL DEFAULT 'physical',
    category TEXT,
    subcategory TEXT,
    
    -- SEO & Discovery
    slug TEXT UNIQUE,
    tags TEXT[],
    keywords TEXT[],
    seo_description TEXT,
    
    -- Status & Visibility
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_promoted BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PRICING & INVENTORY
-- =====================================================

-- PRODUCT PRICING TABLE
CREATE TABLE product_pricing (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    original_price NUMERIC(10,2),
    selling_price NUMERIC(10,2) NOT NULL,
    discount_percent NUMERIC(5,2),
    unit_label TEXT DEFAULT 'piece',
    custom_unit TEXT,
    sku TEXT,
    quantity_available INTEGER DEFAULT 0,
    min_order_quantity INTEGER DEFAULT 1,
    max_order_quantity INTEGER,
    is_in_stock BOOLEAN DEFAULT TRUE,
    low_stock_threshold INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- IMAGES & MEDIA
-- =====================================================

-- PRODUCT IMAGES TABLE
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- VARIANTS SYSTEM (Shopify-style)
-- =====================================================

-- PRODUCT VARIANTS TABLE
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g., "Size", "Color", "Material"
    values TEXT[] NOT NULL, -- e.g., ["S", "M", "L"] or ["Red", "Blue", "Green"]
    is_required BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VARIANT COMBINATIONS TABLE
CREATE TABLE variant_combinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_data JSONB NOT NULL, -- e.g., {"Size": "M", "Color": "Red"}
    sku TEXT,
    price_adjustment NUMERIC(10,2) DEFAULT 0,
    stock_quantity INTEGER DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PRODUCT TYPE SPECIFIC TABLES
-- =====================================================

-- DIGITAL PRODUCT DETAILS
CREATE TABLE digital_product_details (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    download_url TEXT,
    access_instructions TEXT,
    file_size TEXT,
    file_type TEXT,
    download_limit INTEGER, -- Number of times customer can download
    expiry_days INTEGER, -- Days after which download expires
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- APPOINTMENT PRODUCT DETAILS
CREATE TABLE appointment_product_details (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    service_name TEXT,
    duration_minutes INTEGER DEFAULT 30,
    price_per_session NUMERIC(10,2),
    calendly_url TEXT,
    timezone TEXT DEFAULT 'Asia/Kolkata',
    weekly_availability JSONB, -- {"Monday": {"enabled": true, "from": "09:00", "to": "17:00"}}
    blocked_dates JSONB, -- Array of blocked date ranges
    max_bookings_per_day INTEGER,
    advance_booking_days INTEGER DEFAULT 7,
    cancellation_policy TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WALK-IN PRODUCT DETAILS
CREATE TABLE walkin_product_details (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    location_name TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    opening_hours JSONB, -- {"Monday": {"from": "09:00", "to": "18:00"}}
    instructions TEXT,
    contact_phone TEXT,
    contact_email TEXT,
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENQUIRY FORM DETAILS
CREATE TABLE enquiry_form_details (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    contact_email TEXT,
    contact_phone TEXT,
    contact_name TEXT,
    enquiry_subject TEXT,
    enquiry_message TEXT,
    response_time_hours INTEGER DEFAULT 24,
    auto_response_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DELIVERY & SHIPPING (for physical products)
-- =====================================================

-- DELIVERY SETTINGS
CREATE TABLE product_delivery_settings (
    product_id UUID PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    is_delivery_enabled BOOLEAN DEFAULT TRUE,
    delivery_radius_km INTEGER DEFAULT 10,
    delivery_fee NUMERIC(10,2) DEFAULT 0,
    free_delivery_threshold NUMERIC(10,2),
    min_order_amount NUMERIC(10,2) DEFAULT 0,
    delivery_time_days INTEGER DEFAULT 3,
    pickup_available BOOLEAN DEFAULT FALSE,
    pickup_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CUSTOMERS TABLE
-- =====================================================

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country_code TEXT DEFAULT '+91',
    password TEXT NOT NULL,
    avatar TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ORDERS SYSTEM
-- =====================================================

-- ORDERS TABLE
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    delivery_agent_id UUID,
    order_status order_status DEFAULT 'PENDING',
    customer_name TEXT,
    customer_phone TEXT,
    customer_address TEXT,
    customer_city TEXT,
    customer_area TEXT,
    customer_locality TEXT,
    subtotal NUMERIC(10,2) NOT NULL,
    delivery_fee NUMERIC(10,2) NOT NULL,
    tax_amount NUMERIC(10,2) DEFAULT 0,
    total_amount NUMERIC(10,2) NOT NULL,
    payment_method payment_method,
    payment_status payment_status DEFAULT 'PENDING',
    delivery_instructions TEXT,
    estimated_delivery_time TIMESTAMP WITH TIME ZONE,
    actual_delivery_time TIMESTAMP WITH TIME ZONE,
    parcel_otp TEXT,
    delivery_agent_location JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ORDER ITEMS TABLE
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(10,2) NOT NULL,
    product_name TEXT,
    product_image TEXT,
    product_category TEXT,
    variant_data JSONB, -- Store selected variant combination
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SELLER ORDERS TABLE
CREATE TABLE seller_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES sellers(id) ON DELETE CASCADE,
    status order_status DEFAULT 'PENDING',
    items JSONB,
    subtotal NUMERIC(10,2) NOT NULL,
    commission NUMERIC(10,2) NOT NULL,
    net_amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PAYMENTS TABLE
-- =====================================================

CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id TEXT UNIQUE NOT NULL,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    payment_method payment_method,
    payment_status payment_status DEFAULT 'PENDING',
    transaction_id TEXT,
    gateway TEXT,
    gateway_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DELIVERY AGENTS TABLE
-- =====================================================

CREATE TABLE delivery_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    country_code TEXT DEFAULT '+91',
    password TEXT NOT NULL,
    avatar TEXT,
    vehicle_number TEXT NOT NULL,
    vehicle_type TEXT NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    current_location JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- CATEGORIES & TAGS
-- =====================================================

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Products indexes
CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_type ON products(type);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_products_slug ON products(slug);

-- Pricing indexes
CREATE INDEX idx_product_pricing_selling_price ON product_pricing(selling_price);
CREATE INDEX idx_product_pricing_is_in_stock ON product_pricing(is_in_stock);

-- Images indexes
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_is_primary ON product_images(is_primary);

-- Variants indexes
CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_variant_combinations_product_id ON variant_combinations(product_id);

-- Orders indexes
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_order_status ON orders(order_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Seller orders indexes
CREATE INDEX idx_seller_orders_seller_id ON seller_orders(seller_id);
CREATE INDEX idx_seller_orders_status ON seller_orders(status);

-- Payments indexes
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_payments_customer_id ON payments(customer_id);
CREATE INDEX idx_payments_payment_status ON payments(payment_status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE variant_combinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE digital_product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE walkin_product_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiry_form_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_delivery_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_agents ENABLE ROW LEVEL SECURITY;

-- Sellers can manage their own products
CREATE POLICY "Sellers can manage own products" ON products
    FOR ALL USING (auth.uid()::text = seller_id::text);

CREATE POLICY "Sellers can manage own product pricing" ON product_pricing
    FOR ALL USING (product_id IN (SELECT id FROM products WHERE seller_id::text = auth.uid()::text));

CREATE POLICY "Sellers can manage own product images" ON product_images
    FOR ALL USING (product_id IN (SELECT id FROM products WHERE seller_id::text = auth.uid()::text));

CREATE POLICY "Sellers can manage own product variants" ON product_variants
    FOR ALL USING (product_id IN (SELECT id FROM products WHERE seller_id::text = auth.uid()::text));

CREATE POLICY "Sellers can manage own variant combinations" ON variant_combinations
    FOR ALL USING (product_id IN (SELECT id FROM products WHERE seller_id::text = auth.uid()::text));

-- Customers can view active products
CREATE POLICY "Customers can view active products" ON products
    FOR SELECT USING (is_active = true);

CREATE POLICY "Customers can view product pricing" ON product_pricing
    FOR SELECT USING (product_id IN (SELECT id FROM products WHERE is_active = true));

CREATE POLICY "Customers can view product images" ON product_images
    FOR SELECT USING (product_id IN (SELECT id FROM products WHERE is_active = true));

-- Customers can manage their own orders
CREATE POLICY "Customers can manage own orders" ON orders
    FOR ALL USING (auth.uid()::text = customer_id::text);

CREATE POLICY "Customers can view own order items" ON order_items
    FOR SELECT USING (order_id IN (SELECT id FROM orders WHERE customer_id::text = auth.uid()::text));

-- Sellers can view orders for their products
CREATE POLICY "Sellers can view own orders" ON seller_orders
    FOR SELECT USING (seller_id::text = auth.uid()::text);

-- =====================================================
-- TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to tables with updated_at
CREATE TRIGGER update_sellers_updated_at BEFORE UPDATE ON sellers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_pricing_updated_at BEFORE UPDATE ON product_pricing FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seller_orders_updated_at BEFORE UPDATE ON seller_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_delivery_agents_updated_at BEFORE UPDATE ON delivery_agents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample categories
INSERT INTO categories (name, description, icon, sort_order) VALUES
('Electronics', 'Electronic devices and accessories', '📱', 1),
('Fashion', 'Clothing and accessories', '👕', 2),
('Home & Garden', 'Home improvement and garden items', '🏠', 3),
('Services', 'Professional services and appointments', '🔧', 4),
('Digital Products', 'Software, ebooks, and digital content', '💻', 5);

-- Insert sample subcategories
INSERT INTO subcategories (category_id, name, description, sort_order) VALUES
((SELECT id FROM categories WHERE name = 'Electronics'), 'Smartphones', 'Mobile phones and accessories', 1),
((SELECT id FROM categories WHERE name = 'Electronics'), 'Laptops', 'Laptop computers and accessories', 2),
((SELECT id FROM categories WHERE name = 'Fashion'), 'Men''s Clothing', 'Clothing for men', 1),
((SELECT id FROM categories WHERE name = 'Fashion'), 'Women''s Clothing', 'Clothing for women', 2),
((SELECT id FROM categories WHERE name = 'Services'), 'Beauty Services', 'Hair, makeup, and beauty treatments', 1),
((SELECT id FROM categories WHERE name = 'Services'), 'Consultation', 'Professional consultation services', 2);

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
    order_num TEXT;
BEGIN
    SELECT 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(CAST(nextval('order_number_seq') AS TEXT), 4, '0')
    INTO order_num;
    RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Function to calculate product rating
CREATE OR REPLACE FUNCTION calculate_product_rating(product_uuid UUID)
RETURNS NUMERIC AS $$
DECLARE
    avg_rating NUMERIC;
BEGIN
    SELECT AVG(rating) INTO avg_rating
    FROM product_reviews
    WHERE product_id = product_uuid AND is_approved = true;
    
    RETURN COALESCE(avg_rating, 0);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SCHEMA COMPLETION
-- =====================================================

-- Add comments for documentation
COMMENT ON TABLE products IS 'Main products table supporting multiple listing types';
COMMENT ON TABLE product_pricing IS 'Pricing and inventory information for products';
COMMENT ON TABLE product_variants IS 'Shopify-style variant system for products';
COMMENT ON TABLE variant_combinations IS 'Specific variant combinations with pricing and stock';
COMMENT ON TABLE digital_product_details IS 'Digital product specific fields';
COMMENT ON TABLE appointment_product_details IS 'Appointment service specific fields';
COMMENT ON TABLE walkin_product_details IS 'Walk-in service specific fields';
COMMENT ON TABLE enquiry_form_details IS 'Enquiry form specific fields';

-- Grant necessary permissions (adjust based on your Supabase setup)
-- GRANT USAGE ON SCHEMA public TO authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;