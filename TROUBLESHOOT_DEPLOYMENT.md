# Troubleshooting GitHub Actions Deployment Failures

## Common Causes and Solutions

### 🔴 Issue 1: Missing GitHub Secrets (MOST COMMON)

**Symptoms:**
- Workflow fails during the "Build" step
- Error messages about missing environment variables
- Build completes in 15-18 seconds (too fast, indicating early failure)

**Solution:**
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Verify these secrets exist (names must match exactly, case-sensitive):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. If missing, click **New repository secret** and add them:
   - **VITE_SUPABASE_URL**: `https://gcyxjsiryjcldnppixcl.supabase.co`
   - **VITE_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjeXhqc2lyeWpjbGRucHBpeGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0Njk0MzIsImV4cCI6MjA4MjA0NTQzMn0.gmipywdk_FiQNwlXCYNBW0gnV6XR35S6Ty4JmiYJS54`

### 🔴 Issue 2: GitHub Pages Not Configured

**Symptoms:**
- Workflow fails at "Deploy to GitHub Pages" step
- Error about missing environment or permissions

**Solution:**
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions** (NOT "Deploy from a branch")
3. Click **Save**
4. If you see "Your site is ready to be published", wait a few minutes for GitHub to set up the environment

### 🔴 Issue 3: Repository Permissions

**Symptoms:**
- Workflow fails with permission errors
- "Resource not accessible by integration" errors

**Solution:**
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, ensure:
   - ✅ "Read and write permissions" is selected
   - ✅ "Allow GitHub Actions to create and approve pull requests" is checked (if available)
3. Click **Save**

### 🔴 Issue 4: Build Failures

**Symptoms:**
- Workflow fails during npm install or build
- Error messages in the Actions log

**How to Check:**
1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click on the **build** job
4. Expand the failed step to see the error message

**Common Build Errors:**

#### npm ci fails
- **Cause**: `package-lock.json` is out of sync or missing
- **Fix**: Run `npm install` locally and commit `package-lock.json`

#### Build fails with module errors
- **Cause**: Missing dependencies or version conflicts
- **Fix**: Check `package.json` and ensure all dependencies are listed

### 🔴 Issue 5: Wrong Repository Name in vite.config.js

**Symptoms:**
- Deployment succeeds but site shows 404
- Site loads but assets are broken

**Solution:**
Check `vite.config.js` - the `base` path must match your repository name:
```javascript
base: '/Kahon-Studio-Portfolio/',  // Must match your repo name exactly
```

If your repo name is different, update it:
```javascript
base: '/YOUR-ACTUAL-REPO-NAME/',
```

## Step-by-Step Fix Process

1. **Check Secrets** (Most Important!)
   - Go to Settings → Secrets and variables → Actions
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exist
   - If missing, add them

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
   - Save

3. **Check Workflow Logs**
   - Go to Actions tab
   - Click on the failed run
   - Read the error message in the build job
   - Look for specific error messages

4. **Re-run the Workflow**
   - After fixing issues, push a new commit or
   - Click "Re-run all jobs" on the failed workflow

## Quick Verification Checklist

- [ ] Secrets `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are added
- [ ] GitHub Pages source is set to "GitHub Actions"
- [ ] Repository is Public (required for free GitHub Pages)
- [ ] `vite.config.js` base path matches repository name
- [ ] `package.json` has all required dependencies
- [ ] `package-lock.json` is committed to repository

## Still Having Issues?

1. Check the **Actions** tab for detailed error messages
2. Look at the specific step that failed
3. Common error patterns:
   - "Secret not found" → Add missing secrets
   - "Permission denied" → Check GitHub Pages settings
   - "Build failed" → Check build logs for npm/node errors
   - "404 Not Found" → Check vite.config.js base path

## Test Locally First

Before pushing to GitHub, test the build locally:
```bash
npm install
npm run build
```

If this fails locally, fix the issues before pushing to GitHub.

