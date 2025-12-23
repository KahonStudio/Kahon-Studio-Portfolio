# GitHub Secrets Setup Guide

This guide shows you exactly how to add the required secrets to your GitHub repository so your deployment works correctly.

## Step 1: Navigate to Secrets

1. Go to your repository on GitHub
2. Click **Settings** (in the top menu bar)
3. In the left sidebar, click **Secrets and variables**
4. Click **Actions**

## Step 2: Add First Secret - VITE_SUPABASE_URL

1. Click the **"New repository secret"** button (top right)

2. Fill in the form:

   **Name:**
   ```
   VITE_SUPABASE_URL
   ```
   - Must be exactly: `VITE_SUPABASE_URL`
   - All uppercase letters
   - Use underscores (not hyphens)
   - No spaces before or after

   **Secret:**
   ```
   https://gcyxjsiryjcldnppixcl.supabase.co
   ```

3. Click **"Add secret"**

## Step 3: Add Second Secret - VITE_SUPABASE_ANON_KEY

1. Click **"New repository secret"** again

2. Fill in the form:

   **Name:**
   ```
   VITE_SUPABASE_ANON_KEY
   ```
   - Must be exactly: `VITE_SUPABASE_ANON_KEY`
   - All uppercase letters
   - Use underscores (not hyphens)
   - No spaces before or after

   **Secret:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjeXhqc2lyeWpjbGRucHBpeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0Njk0MzIsImV4cCI6MjA4MjA0NTQzMn0.gmipywdk_FiQNwlXCYNBW0gnV6XR35S6Ty4JmiYJS54
   ```
   - Paste the **entire** key (it's one long string)
   - Make sure you copy the complete key

3. Click **"Add secret"**

## Step 4: Verify Secrets Are Added

After adding both secrets, you should see them listed:

```
Repository secrets
├── VITE_SUPABASE_ANON_KEY
│   Updated [time]
│   [ Update ] [ Delete ]
│
└── VITE_SUPABASE_URL
    Updated [time]
    [ Update ] [ Delete ]
```

## Visual Guide

### Secret 1 Form:
```
┌─────────────────────────────────────────────────┐
│ Name *                                         │
│ ┌───────────────────────────────────────────┐ │
│ │ VITE_SUPABASE_URL                         │ │
│ └───────────────────────────────────────────┘ │
│                                                 │
│ Secret *                                        │
│ ┌───────────────────────────────────────────┐ │
│ │ https://gcyxjsiryjcldnppixcl.supabase.co  │ │
│ └───────────────────────────────────────────┘ │
│                                                 │
│         [ Cancel ]  [ Add secret ]             │
└─────────────────────────────────────────────────┘
```

### Secret 2 Form:
```
┌─────────────────────────────────────────────────┐
│ Name *                                         │
│ ┌───────────────────────────────────────────┐ │
│ │ VITE_SUPABASE_ANON_KEY                    │ │
│ └───────────────────────────────────────────┘ │
│                                                 │
│ Secret *                                        │
│ ┌───────────────────────────────────────────┐ │
│ │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   │ │
│ │ (paste the full long key here)            │ │
│ └───────────────────────────────────────────┘ │
│                                                 │
│         [ Cancel ]  [ Add secret ]             │
└─────────────────────────────────────────────────┘
```

## Common Mistakes to Avoid

### ❌ Wrong Name Casing
- `vite_supabase_url` (lowercase)
- `Vite_Supabase_Url` (mixed case)
- `VITE-SUPABASE-URL` (hyphens instead of underscores)

### ✅ Correct Name
- `VITE_SUPABASE_URL` (all uppercase, underscores)

### ❌ Extra Spaces
- ` VITE_SUPABASE_URL ` (spaces before/after)
- `VITE_SUPABASE_URL ` (space after)

### ✅ No Spaces
- `VITE_SUPABASE_URL` (no spaces)

### ❌ Wrong Location
- Adding to "Environment secrets"
- Adding to "Organization secrets"

### ✅ Correct Location
- Adding to "Repository secrets"

### ❌ Incomplete Key
- Only pasting part of the JWT token
- Missing characters at the end

### ✅ Complete Key
- Paste the entire key (it's one long string)

## Quick Checklist

Before deploying, verify:

- [ ] Both secrets are in **Repository secrets** (not Environment secrets)
- [ ] Name is exactly: `VITE_SUPABASE_URL` (all uppercase)
- [ ] Name is exactly: `VITE_SUPABASE_ANON_KEY` (all uppercase)
- [ ] Both use underscores (not hyphens or spaces)
- [ ] No extra spaces in the names
- [ ] Values are pasted completely (especially the long JWT token)
- [ ] Both secrets show "Updated [time]" in the list

## After Adding Secrets

1. **Re-run the workflow:**
   - Go to **Actions** tab
   - Click on the latest workflow run
   - Click **"Re-run all jobs"**

   OR

2. **Push a new commit:**
   ```bash
   git add .
   git commit -m "Trigger deployment with secrets"
   git push origin main
   ```

## Troubleshooting

### Secrets not working?
- Double-check the names match exactly (case-sensitive)
- Verify you're adding to "Repository secrets" not "Environment secrets"
- Make sure you pasted the complete values
- Re-run the workflow after adding secrets

### Still getting "Missing Supabase environment variables"?
- Check the Actions tab → latest workflow run → Build step
- Look for the validation messages showing if secrets are detected
- The improved workflow will show: `✅ Set (length: XX)` if secrets are found

## Summary

**Required Secrets:**
1. `VITE_SUPABASE_URL` = `https://gcyxjsiryjcldnppixcl.supabase.co`
2. `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjeXhqc2lyeWpjbGRucHBpeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0Njk0MzIsImV4cCI6MjA4MjA0NTQzMn0.gmipywdk_FiQNwlXCYNBW0gnV6XR35S6Ty4JmiYJS54`

**Location:** Settings → Secrets and variables → Actions → Repository secrets

**Important:** Names must match exactly, case-sensitive, no spaces!

