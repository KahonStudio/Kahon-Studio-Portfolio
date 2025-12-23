# How to Find Your Supabase Anon Key

## ❌ What You're Looking At

The key you showed (`040621dd-bb18-47c2-b209-7ff4238b2506`) is a **UUID**, not a JWT token.

## ✅ What a Real Anon Key Looks Like

A Supabase anon key is a **JWT token** that:
- Is **very long** (200+ characters)
- Starts with `eyJ...` (this is base64 encoding of `{"`)
- Looks like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjeXhqc2lyeWpjbGRucHBpeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjE2MDAsImV4cCI6MjA1MDQ5NzYwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 📍 Where to Find It

### Step-by-Step:

1. **Go to Supabase Dashboard**
   - Visit: https://app.supabase.com/
   - Sign in if needed

2. **Select Your Project**
   - Click on: **KahonStudio Website**

3. **Navigate to API Settings**
   - Click the **Settings** icon (⚙️ gear icon) in the left sidebar
   - Click **API** in the settings menu

4. **Find the Anon Key**
   - Look for a section called **"Project API keys"** or **"API Keys"**
   - Find the key labeled **"anon"** or **"anon public"**
   - It should be a very long string starting with `eyJ...`
   - Click the **eye icon** 👁️ or **copy icon** 📋 to reveal/copy it

## 🔍 What You Might See

In the API settings page, you'll typically see:

```
Project URL
https://gcyxjsiryjcldnppixcl.supabase.co

API Keys
┌─────────────────────────────────────────┐
│ anon public                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← This is what you need!
│ [👁️ Show] [📋 Copy]                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ service_role (secret)                    │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... │ ← Don't use this!
│ [👁️ Show] [📋 Copy]                      │
└─────────────────────────────────────────┘
```

## ⚠️ Important Notes

- **Use the "anon public" key** - this is safe for frontend use
- **Never use the "service_role" key** - this is secret and should only be used server-side
- The UUID you found (`040621dd-bb18-47c2-b209-7ff4238b2506`) is likely a project reference ID, not an API key

## 🎯 Quick Checklist

- [ ] Go to Supabase Dashboard
- [ ] Select "KahonStudio Website" project
- [ ] Go to Settings → API
- [ ] Find "anon public" key
- [ ] Copy the long string starting with `eyJ...`
- [ ] Update your `.env` file with this key

## 📝 After You Find It

Once you have the correct anon key:

1. Open your `.env` file
2. Replace the current `VITE_SUPABASE_ANON_KEY` value
3. Save the file
4. Restart your dev server: `npm run dev`

The `.env` file should look like:
```
VITE_SUPABASE_URL=https://gcyxjsiryjcldnppixcl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjeXhqc2lyeWpjbGRucHBpeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjE2MDAsImV4cCI6MjA1MDQ5NzYwMH0.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🆘 Still Can't Find It?

If you can't find the anon key:
1. Make sure you're in the correct project
2. Check if you have the right permissions
3. Try refreshing the page
4. Look for "API" or "Keys" in different sections of Settings

