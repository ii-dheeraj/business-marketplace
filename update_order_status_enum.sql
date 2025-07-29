-- Migration: Update Order Status Enum and Add OTP Fields
-- This migration updates the order_status enum to use the new granular flow
-- and adds OTP verification fields to the orders table

-- Step 1: Create new order_status enum with updated values
CREATE TYPE order_status_new AS ENUM (
    'PENDING',
    'ACCEPTED_BY_AGENT', 
    'OTP_GENERATED',
    'OTP_VERIFIED',
    'PARCEL_PICKED_UP',
    'IN_TRANSIT',
    'DELIVERED',
    'CANCELLED'
);

-- Step 2: Add new OTP fields to orders table
ALTER TABLE "orders" 
ADD COLUMN IF NOT EXISTS "otp_verified" BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS "otp_verified_at" TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS "otp_expires_at" TIMESTAMPTZ;

-- Step 3: Update existing orders to map old statuses to new ones
UPDATE "orders" SET 
    "orderStatus" = CASE 
        WHEN "orderStatus" = 'PENDING' THEN 'PENDING'::order_status_new
        WHEN "orderStatus" = 'CONFIRMED' THEN 'ACCEPTED_BY_AGENT'::order_status_new
        WHEN "orderStatus" = 'PREPARING' THEN 'ACCEPTED_BY_AGENT'::order_status_new
        WHEN "orderStatus" = 'READY_FOR_PICKUP' THEN 'OTP_GENERATED'::order_status_new
        WHEN "orderStatus" = 'READY_FOR_DELIVERY' THEN 'OTP_VERIFIED'::order_status_new
        WHEN "orderStatus" = 'PICKED_UP' THEN 'PARCEL_PICKED_UP'::order_status_new
        WHEN "orderStatus" = 'IN_TRANSIT' THEN 'IN_TRANSIT'::order_status_new
        WHEN "orderStatus" = 'OUT_FOR_DELIVERY' THEN 'IN_TRANSIT'::order_status_new
        WHEN "orderStatus" = 'DELIVERED' THEN 'DELIVERED'::order_status_new
        WHEN "orderStatus" = 'CANCELLED' THEN 'CANCELLED'::order_status_new
        ELSE 'PENDING'::order_status_new
    END;

-- Step 4: Update seller_orders table status mapping
UPDATE "seller_orders" SET 
    "status" = CASE 
        WHEN "status" = 'PENDING' THEN 'PENDING'::order_status_new
        WHEN "status" = 'CONFIRMED' THEN 'ACCEPTED_BY_AGENT'::order_status_new
        WHEN "status" = 'PREPARING' THEN 'ACCEPTED_BY_AGENT'::order_status_new
        WHEN "status" = 'READY_FOR_PICKUP' THEN 'OTP_GENERATED'::order_status_new
        WHEN "status" = 'READY_FOR_DELIVERY' THEN 'OTP_VERIFIED'::order_status_new
        WHEN "status" = 'PICKED_UP' THEN 'PARCEL_PICKED_UP'::order_status_new
        WHEN "status" = 'IN_TRANSIT' THEN 'IN_TRANSIT'::order_status_new
        WHEN "status" = 'OUT_FOR_DELIVERY' THEN 'IN_TRANSIT'::order_status_new
        WHEN "status" = 'DELIVERED' THEN 'DELIVERED'::order_status_new
        WHEN "status" = 'CANCELLED' THEN 'CANCELLED'::order_status_new
        ELSE 'PENDING'::order_status_new
    END;

-- Step 5: Update order_tracking table status mapping
UPDATE "order_tracking" SET 
    "status" = CASE 
        WHEN "status" = 'PENDING' THEN 'PENDING'::order_status_new
        WHEN "status" = 'CONFIRMED' THEN 'ACCEPTED_BY_AGENT'::order_status_new
        WHEN "status" = 'PREPARING' THEN 'ACCEPTED_BY_AGENT'::order_status_new
        WHEN "status" = 'READY_FOR_PICKUP' THEN 'OTP_GENERATED'::order_status_new
        WHEN "status" = 'READY_FOR_DELIVERY' THEN 'OTP_VERIFIED'::order_status_new
        WHEN "status" = 'PICKED_UP' THEN 'PARCEL_PICKED_UP'::order_status_new
        WHEN "status" = 'IN_TRANSIT' THEN 'IN_TRANSIT'::order_status_new
        WHEN "status" = 'OUT_FOR_DELIVERY' THEN 'IN_TRANSIT'::order_status_new
        WHEN "status" = 'DELIVERED' THEN 'DELIVERED'::order_status_new
        WHEN "status" = 'CANCELLED' THEN 'CANCELLED'::order_status_new
        ELSE 'PENDING'::order_status_new
    END;

-- Step 6: Drop the old enum and rename the new one
ALTER TABLE "orders" ALTER COLUMN "orderStatus" TYPE order_status_new USING "orderStatus"::text::order_status_new;
ALTER TABLE "seller_orders" ALTER COLUMN "status" TYPE order_status_new USING "status"::text::order_status_new;
ALTER TABLE "order_tracking" ALTER COLUMN "status" TYPE order_status_new USING "status"::text::order_status_new;

DROP TYPE order_status;
ALTER TYPE order_status_new RENAME TO order_status;

-- Step 7: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_otp_verified ON "orders"("otp_verified");
CREATE INDEX IF NOT EXISTS idx_orders_status_agent ON "orders"("orderStatus", "deliveryAgentId");

-- Step 8: Add GPS tracking table for better location management
CREATE TABLE IF NOT EXISTS "order_gps_tracking" (
    "id" SERIAL PRIMARY KEY,
    "orderId" INTEGER NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
    "deliveryAgentId" INTEGER NOT NULL REFERENCES "delivery_agents"("id") ON DELETE CASCADE,
    "latitude" NUMERIC(10, 8) NOT NULL,
    "longitude" NUMERIC(11, 8) NOT NULL,
    "accuracy" NUMERIC(5, 2),
    "speed" NUMERIC(5, 2),
    "heading" NUMERIC(5, 2),
    "tracked_at" TIMESTAMPTZ DEFAULT NOW(),
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_gps_tracking_order ON "order_gps_tracking"("orderId", "tracked_at");
CREATE INDEX IF NOT EXISTS idx_order_gps_tracking_agent ON "order_gps_tracking"("deliveryAgentId", "tracked_at");

-- Migration completed successfully 