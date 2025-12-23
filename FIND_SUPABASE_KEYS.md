# How to Find Your Supabase Anon Key

The keys you provided don't look like standard Supabase anon keys. Here's how to find the correct one:

## Step 1: Go to Supabase Dashboard

1. Visit: https://app.supabase.com/
2. Select your project: **KahonStudio Website**
3. Click on **Settings** (gear icon in the left sidebar)
4. Click on **API** in the settings menu

## Step 2: Find Your API Keys

In the API settings page, you'll see:

### Project URL
- This should be: `https://gcyxjsiryjcldnppixcl.supabase.co` ✅ (You have this!)

### API Keys Section
Look for these keys:

1. **anon public** key
   - This is a LONG string (usually 200+ characters)
   - Starts with `eyJ...` (it's a JWT token)
   - This is what you need for `VITE_SUPABASE_ANON_KEY`
   - ✅ Safe to use in frontend code

2. **service_role** key (optional)
   - Also starts with `eyJ...`
   - ⚠️ NEVER use this in frontend code - it's secret!

## What About Your Keys?

The keys you provided:
- `sb_publishable_FXxnfd3v3GWGgk7L3GX6xQ_8ydtNn6K`
- `sb_secret_wr6kYmrnhjOb9b1E0iIBSw_LOoIOETZ`

These look like they might be from:
- A different service (like Clerk, Auth0, etc.)
- A newer Supabase feature
- A different authentication system

## Solution

**Try using your publishable key as the anon key** - sometimes Supabase uses different naming. If that doesn't work, follow the steps above to find the correct anon key in your Supabase dashboard.

## Quick Test

After setting up your `.env` file, we'll test the connection to make sure everything works!


