# Troubleshooting: Tables Not Found

If you're still seeing "No tables yet" after running the SQL, here's how to troubleshoot:

## Step 1: Verify Tables Were Created

1. Go to Supabase Dashboard
2. Click **Table Editor** in the left sidebar
3. Look for these tables:
   - `contacts`
   - `projects`
   - `team_members`

**If you DON'T see these tables:**
- The SQL didn't run successfully
- Go to Step 2

**If you DO see these tables:**
- The tables exist, but there might be a permissions issue
- Go to Step 3

## Step 2: Run the SQL Again

1. Go to **SQL Editor** → **New Query**
2. Copy the ENTIRE contents of `database/schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** (or Ctrl+Enter)
5. Check for any error messages

### Common Errors:

**Error: "relation already exists"**
- Tables already exist, skip to Step 3

**Error: "permission denied"**
- You might need to run as a different user
- Check your Supabase project permissions

**Error: "syntax error"**
- Check that you copied the entire file
- Make sure there are no extra characters

## Step 3: Check Row Level Security (RLS)

Even if tables exist, RLS policies might be blocking access:

1. Go to **Table Editor**
2. Click on a table (e.g., `projects`)
3. Click the **Policies** tab
4. You should see policies like:
   - "Allow public read on projects"
   - "Allow public insert on contacts"

**If policies are missing:**
- Run the schema.sql again (it includes policy creation)
- Or manually create policies in the Policies tab

## Step 4: Test Table Access

In Supabase SQL Editor, try this query:

```sql
SELECT * FROM projects LIMIT 1;
```

**If this works:**
- Tables exist and are accessible
- The issue might be with the React component

**If this fails:**
- There's a database issue
- Check error messages

## Step 5: Check Browser Console

1. Open your website
2. Press F12 to open Developer Tools
3. Go to **Console** tab
4. Look for any Supabase errors

Common errors:
- "relation does not exist" → Tables not created
- "permission denied" → RLS policies missing
- "Invalid API key" → Wrong key in .env

## Step 6: Manual Table Creation

If SQL isn't working, create tables manually:

1. Go to **Table Editor** → **New Table**
2. Create `projects` table with these columns:
   - `id` (uuid, primary key, default: uuid_generate_v4())
   - `title` (text, not null)
   - `description` (text)
   - `category` (text, not null)
   - `tags` (text array)
   - `image_url` (text)
   - `project_url` (text)
   - `github_url` (text)
   - `featured` (boolean, default: false)
   - `display_order` (integer, default: 0)
   - `created_at` (timestamptz, default: now())
   - `updated_at` (timestamptz, default: now())

3. Repeat for `contacts` and `team_members` tables

## Quick Test Query

Run this in SQL Editor to check if tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'contacts', 'team_members');
```

This should return 3 rows if tables exist.

## Still Having Issues?

1. Check Supabase project status (make sure it's active)
2. Verify your API key is correct in `.env`
3. Try refreshing your browser
4. Check Supabase logs for errors

