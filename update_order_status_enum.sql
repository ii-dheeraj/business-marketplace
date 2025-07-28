-- Update order_status enum to include missing statuses for delivery flow
-- First, create a new enum with all the required statuses
CREATE TYPE order_status_new AS ENUM (
    'PENDING', 
    'CONFIRMED', 
    'PREPARING', 
    'READY_FOR_DELIVERY', 
    'READY_FOR_PICKUP',
    'PICKED_UP',
    'IN_TRANSIT',
    'OUT_FOR_DELIVERY', 
    'DELIVERED', 
    'CANCELLED'
);

-- Update existing orders to use the new enum
-- Convert READY_FOR_DELIVERY to READY_FOR_PICKUP for orders that are ready for pickup
UPDATE orders 
SET "orderStatus" = 'READY_FOR_PICKUP'::order_status_new 
WHERE "orderStatus" = 'READY_FOR_DELIVERY'::order_status;

-- Convert all other statuses
UPDATE orders 
SET "orderStatus" = "orderStatus"::text::order_status_new 
WHERE "orderStatus" IS NOT NULL;

-- Drop the old enum and rename the new one
ALTER TABLE orders ALTER COLUMN "orderStatus" TYPE order_status_new USING "orderStatus"::text::order_status_new;
DROP TYPE order_status;
ALTER TYPE order_status_new RENAME TO order_status;

-- Update seller_orders table as well
ALTER TABLE seller_orders ALTER COLUMN "status" TYPE order_status USING "status"::text::order_status;

-- Update order_tracking table as well
ALTER TABLE order_tracking ALTER COLUMN "status" TYPE order_status USING "status"::text::order_status; 