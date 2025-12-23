# Deployment Guide for GitHub Pages

This guide will help you deploy your Kahon Studio portfolio to GitHub Pages.

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `Kahon-Studio-Portfolio` (or any name you prefer)
5. Make it **Public** (required for free GitHub Pages)
6. **Don't** initialize with README, .gitignore, or license
7. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

Run these commands in your terminal (make sure you're in the project directory):

```bash
# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Kahon Studio portfolio"

# Add your GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/Kahon-Studio-Portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Update Vite Config (if needed)

If your repository name is different from `Kahon-Studio-Portfolio`, update the `base` path in `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',  // Update this to match your repo name
})
```

## Step 4: Deploy to GitHub Pages

Run the deployment command:

```bash
npm run deploy
```

This will:
1. Build your React app for production
2. Deploy it to the `gh-pages` branch on GitHub

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

## Step 6: Access Your Site

Your portfolio will be available at:
```
https://YOUR_USERNAME.github.io/Kahon-Studio-Portfolio/
```

It may take a few minutes for the site to be available after deployment.

## Updating Your Site

Whenever you make changes:

1. Make your changes
2. Commit them:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push
   ```
3. Deploy again:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### Site shows 404 or blank page
- Make sure the `base` path in `vite.config.js` matches your repository name exactly
- Wait a few minutes for GitHub Pages to update
- Check that the `gh-pages` branch exists and has content

### Styles or assets not loading
- Verify the `base` path is correct
- Clear your browser cache
- Check browser console for 404 errors

### Build fails
- Make sure all dependencies are installed: `npm install`
- Check for any syntax errors in your code
- Review the error messages in the terminal


