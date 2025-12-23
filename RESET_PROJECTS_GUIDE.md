# Reset Projects with Gallery Images

I've created SQL scripts to reset your projects table with sample data that includes multiple images for the gallery feature.

## Available Scripts

### Option 1: `database/reset-projects-unsplash.sql` (Recommended)
- Uses Unsplash images (beautiful, high-quality photos)
- Multiple images per project (2-4 images each)
- Ready to use immediately

### Option 2: `database/reset-projects-with-placeholders.sql`
- Uses Placeholder.com (customizable colored placeholders)
- Matches your dark theme colors
- Text labels on images

### Option 3: `database/reset-projects.sql`
- Uses Unsplash images
- Alternative format

## How to Use

1. **Go to Supabase Dashboard** → **SQL Editor**
2. **Copy and paste** the contents of `database/reset-projects-unsplash.sql`
3. **Click Run** (or Ctrl+Enter)
4. **Done!** Your projects table will be reset with new sample data

## What You'll Get

6 projects with multiple images each:

### Games (2 projects)
- **Action RPG Game** - 3 images
- **Indie Game Project** - 2 images

### Web (2 projects)
- **E-Commerce Website** - 3 images
- **Corporate Website** - 2 images

### Mobile (2 projects)
- **Mobile Game App** - 3 images
- **Mobile Social App** - 3 images

## Testing the Gallery

After running the script:

1. Refresh your website
2. Click on any project card
3. You should see:
   - Main image display
   - Navigation buttons (← →)
   - Thumbnail strip below
   - Dot indicators
   - Image counter (e.g., "1 / 3")

## Customizing Images

To use your own images later:

1. Go to **Table Editor** → **projects**
2. Edit a project
3. Update the `image_urls` array with your image URLs
4. Format: `{"url1", "url2", "url3"}`

## Note

The script uses `DELETE FROM projects;` which will remove ALL existing projects. Make sure you're okay with this before running it!


