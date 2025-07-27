-- Add openingHours column to sellers table
ALTER TABLE "sellers" 
ADD COLUMN "openingHours" TEXT;

-- Add website column if it doesn't exist (it was also missing from the schema)
ALTER TABLE "sellers" 
ADD COLUMN "website" TEXT;

-- Update the updated_at trigger to include the new columns
-- (This ensures the updated_at timestamp is updated when these columns change) 