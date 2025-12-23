# Deployment Guide - GitHub Pages

This guide will help you deploy your Kahon Studio Portfolio to GitHub Pages.

## Prerequisites

- A GitHub account
- Your repository pushed to GitHub
- Environment variables set up in GitHub Secrets

## Step 1: Create GitHub Repository (if not already created)

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it `Kahon-Studio-Portfolio` (or your preferred name)
4. Choose **Public** (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license (since you already have these)
6. Click **Create repository**

## Step 2: Connect Your Local Repository to GitHub

If you haven't connected your local repo yet:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Kahon-Studio-Portfolio.git

# Push your code
git branch -M main  # or master, depending on your default branch
git push -u origin main
```

## Step 3: Update Vite Config (if repo name is different)

If your GitHub repository name is different from `Kahon-Studio-Portfolio`, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',  // Change this to match your repo name
})
```

**Important:** If your repo is at the root of your GitHub account (username.github.io), use `base: '/'` instead.

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

## Step 5: Add Environment Variables as GitHub Secrets

Your site needs environment variables to work. Add them as GitHub Secrets:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each variable:

### Required Secrets:

- **VITE_SUPABASE_URL** - Your Supabase project URL
- **VITE_SUPABASE_ANON_KEY** - Your Supabase anonymous key

### Optional Secrets (for email notifications):

- **VITE_EMAILJS_SERVICE_ID** - Your EmailJS service ID (only if you set up EmailJS)
- **VITE_EMAILJS_TEMPLATE_ID** - Your EmailJS template ID (only if you set up EmailJS)
- **VITE_EMAILJS_PUBLIC_KEY** - Your EmailJS public key (only if you set up EmailJS)

**Note:** EmailJS secrets are optional. Your site will work without them - the contact form will still save to Supabase, but you won't receive email notifications until you configure EmailJS (see `EMAILJS_SETUP.md`).

### How to Add Secrets:

1. Click **New repository secret**
2. Name: `VITE_SUPABASE_URL`
3. Secret: Paste your Supabase URL (from your `.env` file)
4. Click **Add secret**
5. Repeat for all environment variables

## Step 6: Deploy

### Option A: Automatic Deployment (Recommended)

The GitHub Actions workflow will automatically deploy when you push to `main` or `master` branch:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

After pushing, go to your repository → **Actions** tab to see the deployment progress.

### Option B: Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
npm run deploy
```

This uses `gh-pages` to deploy directly.

## Step 7: Access Your Site

Once deployed, your site will be available at:

- `https://YOUR_USERNAME.github.io/Kahon-Studio-Portfolio/`

Or if you set up a custom domain:
- `https://yourdomain.com`

## Troubleshooting

### Site shows 404 or blank page

1. Check that `base` in `vite.config.js` matches your repository name
2. Ensure GitHub Pages is enabled in repository Settings → Pages
3. Check the Actions tab for deployment errors

### Environment variables not working

1. Verify secrets are added correctly in Settings → Secrets
2. Check that secret names match exactly (case-sensitive)
3. Re-run the deployment workflow after adding secrets

### Build fails

1. Check the Actions tab for error messages
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility

### Assets not loading

1. Check browser console for 404 errors
2. Verify `base` path in `vite.config.js` is correct
3. Clear browser cache and try again

## Updating Your Site

To update your deployed site:

1. Make changes locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```
3. GitHub Actions will automatically rebuild and redeploy
4. Wait 1-2 minutes for deployment to complete

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
   ```
   yourdomain.com
   ```
2. Configure DNS records with your domain provider
3. Update GitHub Pages settings with your custom domain

## Monitoring Deployments

- Check deployment status: Repository → **Actions** tab
- View deployment logs: Click on the latest workflow run
- See live site: Repository → **Settings** → **Pages** → View site

## Notes

- GitHub Pages is free for public repositories
- Builds typically take 1-3 minutes
- The site updates automatically on every push to main/master
- Environment variables are secure and not exposed in the built files

