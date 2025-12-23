# Quick Deployment Steps

Follow these steps to deploy your portfolio to GitHub Pages:

## Step 1: Add All Files and Commit

```bash
cd "C:\Users\James\Documents\GitHub\Kahon Studio Portfolio"
git add .
git commit -m "Initial commit with deployment setup"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `Kahon-Studio-Portfolio` (or your preferred name)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README
5. Click **Create repository**

## Step 3: Connect and Push

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/Kahon-Studio-Portfolio.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

## Step 5: Add Secrets (IMPORTANT!)

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** and add:

   - Name: `VITE_SUPABASE_URL`
     Value: (from your `.env` file)

   - Name: `VITE_SUPABASE_ANON_KEY`
     Value: (from your `.env` file)

   - Name: `VITE_EMAILJS_SERVICE_ID`
     Value: (from your `.env` file, if you set up EmailJS)

   - Name: `VITE_EMAILJS_TEMPLATE_ID`
     Value: (from your `.env` file, if you set up EmailJS)

   - Name: `VITE_EMAILJS_PUBLIC_KEY`
     Value: (from your `.env` file, if you set up EmailJS)

## Step 6: Trigger Deployment

After adding secrets, push any change to trigger deployment:

```bash
git add .
git commit -m "Trigger deployment"
git push origin main
```

## Step 7: Check Deployment

1. Go to your repository → **Actions** tab
2. You should see a workflow running
3. Wait 1-2 minutes for it to complete
4. Your site will be live at:
   `https://YOUR_USERNAME.github.io/Kahon-Studio-Portfolio/`

## Troubleshooting

- **Workflow fails?** Check the Actions tab for error messages
- **Secrets not working?** Make sure secret names match exactly (case-sensitive)
- **Site shows 404?** Verify the `base` in `vite.config.js` matches your repo name

## Update Your Site

To update your site, just push changes:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Deployment happens automatically!

