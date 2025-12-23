# Update Projects Table for Image Gallery

The Projects table has been updated to support multiple images per project using an array.

## What Changed

### Database Schema
- **Old**: `image_url TEXT` (single image)
- **New**: `image_urls TEXT[]` (array of images)

## How to Update Your Database

### Option 1: If You Haven't Created Tables Yet

1. Go to Supabase Dashboard → SQL Editor
2. Run the updated `database/schema.sql` file
3. The table will be created with `image_urls` array support

### Option 2: If You Already Have a Projects Table

1. Go to Supabase Dashboard → SQL Editor
2. Run `database/migrate-to-image-urls.sql`
3. This will:
   - Add the `image_urls` column
   - Migrate existing `image_url` data to the array
   - Keep your existing data safe

### Option 3: Manual Update in Supabase Dashboard

1. Go to **Table Editor** → **projects** table
2. Click **Add Column**
3. Set:
   - Name: `image_urls`
   - Type: `text[]` (array of text)
   - Default: `{}` (empty array)
4. Click **Save**
5. For existing projects, update `image_urls` manually or use SQL:
   ```sql
   UPDATE projects 
   SET image_urls = ARRAY[image_url] 
   WHERE image_url IS NOT NULL;
   ```

## How to Add Multiple Images to a Project

### In Supabase Table Editor:

1. Go to **Table Editor** → **projects**
2. Edit a project row
3. In the `image_urls` field, enter images as an array:
   ```
   {"https://example.com/image1.jpg", "https://example.com/image2.jpg", "https://example.com/image3.jpg"}
   ```
4. Or use the array input format in Supabase UI

### Using SQL:

```sql
UPDATE projects 
SET image_urls = ARRAY[
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]
WHERE id = 'your-project-id';
```

## Example Project with Multiple Images

```sql
INSERT INTO projects (
  title, 
  description, 
  category, 
  tags, 
  image_urls,
  featured
) VALUES (
  'My Awesome Project',
  'A great project description',
  'web',
  ARRAY['React', 'TypeScript'],
  ARRAY[
    'https://example.com/screenshot1.png',
    'https://example.com/screenshot2.png',
    'https://example.com/screenshot3.png'
  ],
  true
);
```

## How It Works in the App

- **Single image**: If `image_urls` has one image, it displays normally
- **Multiple images**: If `image_urls` has multiple images, the gallery slideshow appears
- **No images**: Shows placeholder icon

## Backward Compatibility

The code supports both:
- `image_urls` (array) - new format
- `image_url` (single) - old format (for backward compatibility)

If you have existing projects with `image_url`, they'll still work, but you should migrate to `image_urls` for the gallery feature.

## Testing

After updating your database:

1. Add a project with multiple images in `image_urls`
2. Open the project modal
3. You should see:
   - Main image display
   - Navigation buttons (if multiple images)
   - Thumbnail strip
   - Dot indicators
   - Image counter

## Troubleshooting

### Images not showing:
- Check that `image_urls` is an array type (`text[]`)
- Verify image URLs are valid and accessible
- Check browser console for errors

### Gallery not working:
- Make sure `image_urls` has more than one image
- Verify the array format is correct
- Check that images are loading properly

