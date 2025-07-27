-- Update Supabase Schema to add missing columns to sellers table
-- Run this in your Supabase SQL Editor

-- Add openingHours column to sellers table
ALTER TABLE "sellers" 
ADD COLUMN IF NOT EXISTS "openingHours" TEXT;

-- Add website column to sellers table (if it doesn't exist)
ALTER TABLE "sellers" 
ADD COLUMN IF NOT EXISTS "website" TEXT;

-- Verify the columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'sellers' 
AND column_name IN ('openingHours', 'website');

-- Update existing records to have default values (optional)
UPDATE "sellers" 
SET "openingHours" = '9:00 AM - 9:00 PM' 
WHERE "openingHours" IS NULL;

UPDATE "sellers" 
SET "website" = '' 
WHERE "website" IS NULL; 