-- Migration script to update existing projects table to support multiple images
-- Run this if you already have a projects table with image_url column

-- Step 1: Add image_urls column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'projects' AND column_name = 'image_urls'
  ) THEN
    ALTER TABLE projects ADD COLUMN image_urls TEXT[] DEFAULT '{}';
  END IF;
END $$;

-- Step 2: Migrate existing image_url data to image_urls array
UPDATE projects 
SET image_urls = CASE 
  WHEN image_url IS NOT NULL AND image_url != '' THEN ARRAY[image_url]
  ELSE '{}'
END
WHERE image_urls IS NULL OR array_length(image_urls, 1) IS NULL;

-- Step 3: Verify the migration
-- Run this query to check:
-- SELECT id, title, image_url, image_urls FROM projects;

-- Step 4: (Optional) Remove old image_url column after verifying migration works
-- Uncomment the line below ONLY after you've verified everything works:
-- ALTER TABLE projects DROP COLUMN image_url;


