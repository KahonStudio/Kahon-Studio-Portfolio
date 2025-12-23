# Database Setup Guide

Follow these steps to set up your Supabase database tables.

## Step 1: Create Tables

1. Go to your Supabase Dashboard: https://app.supabase.com/
2. Select your project: **KahonStudio Website**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy and paste the contents of `database/schema.sql`
6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

## Step 2: Add Sample Data (Optional)

1. In the SQL Editor, create a new query
2. Copy and paste the contents of `database/seed-data.sql`
3. Click **Run**
4. This will add sample projects and team members

## Step 3: Verify Tables

1. Go to **Table Editor** in the left sidebar
2. You should see these tables:
   - `contacts` - Contact form submissions
   - `projects` - Portfolio projects
   - `team_members` - Team member information

## Step 4: Test Your Setup

1. Go back to your app
2. Refresh the page
3. The TestConnection component should still show "✅ Connected!"
4. Your components should now be able to fetch data from Supabase

## Table Structure

### Contacts Table
- `id` - UUID (primary key)
- `name` - Text
- `email` - Text
- `message` - Text
- `created_at` - Timestamp
- `read` - Boolean (for tracking if you've read the message)
- `responded` - Boolean (for tracking if you've responded)

### Projects Table
- `id` - UUID (primary key)
- `title` - Text
- `description` - Text
- `category` - Text (games, web, mobile, all)
- `tags` - Array of text
- `image_url` - Text (optional)
- `project_url` - Text (optional)
- `github_url` - Text (optional)
- `featured` - Boolean
- `display_order` - Integer
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Team Members Table
- `id` - UUID (primary key)
- `name` - Text
- `role` - Text
- `description` - Text
- `avatar_url` - Text (optional)
- `skills` - Array of text
- `email` - Text (optional)
- `linkedin_url` - Text (optional)
- `github_url` - Text (optional)
- `display_order` - Integer
- `created_at` - Timestamp
- `updated_at` - Timestamp

## Security (Row Level Security)

All tables have Row Level Security (RLS) enabled:
- **Public read access** - Anyone can view projects and team members
- **Public insert** - Anyone can submit contact forms
- **Authenticated only** - Only logged-in users can modify data

You can modify these policies later in Supabase Dashboard → Authentication → Policies.

## Troubleshooting

### "permission denied" error
- Check that RLS policies are created correctly
- Verify you ran the schema.sql file completely

### Tables not showing up
- Refresh the Table Editor
- Check the SQL Editor for any error messages

### Can't insert data
- Make sure you ran the schema.sql file first
- Check that RLS policies allow the operation you're trying

## Next Steps

After setting up the tables:
1. Update your React components to fetch data from Supabase
2. Test the contact form to save submissions
3. Add your actual project data
4. Customize the data as needed

