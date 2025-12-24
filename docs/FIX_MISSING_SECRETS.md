# Fix Missing Secrets Error - Step by Step

If you're still seeing "Missing Supabase environment variables" on your deployed site, follow these steps **in order**:

## Step 1: Verify Secrets Are Actually Added

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. You should see **TWO** secrets listed:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**If you DON'T see both secrets:**
- Click **"New repository secret"** and add them (see `GITHUB_SECRETS_SETUP.md` for exact values)
- Make sure names are **exactly**:
  - `VITE_SUPABASE_URL` (all caps, underscore)
  - `VITE_SUPABASE_ANON_KEY` (all caps, underscore)

## Step 2: Check the Latest Workflow Run

1. Go to **Actions** tab
2. Click on the **most recent** workflow run
3. Click on the **"build"** job (left sidebar)
4. Expand the **"Build"** step
5. Look for these lines:

```
🔍 Checking environment variables...
VITE_SUPABASE_URL: ✅ Set (length: XX)
VITE_SUPABASE_ANON_KEY: ✅ Set (length: XX)
```

**What to look for:**

✅ **If you see "✅ Set"**:
- Secrets are detected correctly
- The build should have embedded them
- If you still get errors, the site might be showing an old deployment
- **Solution:** Wait 2-3 minutes, then hard refresh your site (Ctrl+F5)

❌ **If you see "❌ Missing"**:
- Secrets are NOT set correctly
- Go back to Step 1 and verify the secret names match exactly

## Step 3: Trigger a NEW Build

**IMPORTANT:** After adding/updating secrets, you MUST trigger a new build!

### Option A: Re-run the Workflow (Easiest)
1. Go to **Actions** tab
2. Click on the latest workflow run
3. Click **"Re-run all jobs"** button (top right)
4. Wait for it to complete (2-3 minutes)

### Option B: Push a New Commit
```bash
git add .
git commit -m "Trigger rebuild with secrets"
git push origin main
```

## Step 4: Verify the Build Succeeded

1. Go to **Actions** tab
2. The latest run should show:
   - ✅ Green checkmark (success)
   - Both "build" and "deploy" jobs completed
3. Click on the run → Click "deploy" job
4. You should see: "Deploy to GitHub Pages" completed successfully

## Step 5: Clear Browser Cache

The error might be from an old cached version:

1. **Hard refresh:** Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. **Or clear cache:** 
   - Press `F12` to open DevTools
   - Right-click the refresh button
   - Click "Empty Cache and Hard Reload"

## Step 6: Check the Deployed Site

1. Visit your GitHub Pages URL
2. Open browser console (F12 → Console tab)
3. **If you still see the error:**
   - Check if the workflow shows secrets were detected (Step 2)
   - Make sure you waited for the new deployment to finish
   - Try incognito/private browsing mode

## Common Issues

### Issue: Secrets added but workflow still shows "Missing"
**Cause:** Secret names don't match exactly
**Fix:** 
- Delete the secrets
- Re-add them with EXACT names: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Re-run workflow

### Issue: Workflow shows "Set" but site still errors
**Cause:** Old deployment cached
**Fix:**
- Wait 5 minutes for GitHub Pages to update
- Hard refresh browser (Ctrl+Shift+R)
- Try incognito mode

### Issue: Can't find "Re-run all jobs" button
**Cause:** Workflow might be running or you're on the wrong page
**Fix:**
- Wait for current run to finish
- Or push a new commit instead

## Quick Checklist

Before asking for help, verify:

- [ ] Both secrets exist in Settings → Secrets and variables → Actions
- [ ] Secret names are exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- [ ] Latest workflow run shows "✅ Set" for both secrets
- [ ] Latest workflow run completed successfully (green checkmark)
- [ ] You triggered a NEW build after adding secrets
- [ ] You cleared browser cache / tried incognito mode
- [ ] You waited 5+ minutes after deployment completed

## Still Not Working?

If you've done ALL of the above and it still doesn't work:

1. **Screenshot the workflow logs** showing the "Build" step output
2. **Screenshot your Secrets page** (blur the values, just show the names)
3. Check if there are any error messages in the Actions tab

The workflow will now show clear messages about whether secrets are detected or not!

