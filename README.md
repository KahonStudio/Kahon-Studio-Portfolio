# Kahon Studio Portfolio

A modern, responsive portfolio website for Kahon Studio built with React and Vite.

## Features

- 🎨 Modern and beautiful UI design
- 📱 Fully responsive layout
- ⚡ Fast performance with Vite
- 🎯 Smooth scrolling navigation
- 💼 Project showcase with filtering
- 👥 Team member profiles
- 📧 Contact form
- 🌐 Ready for GitHub Pages deployment

## Team Members

- **James Raphael** - Creative Director & Developer
- **Kelvin** - Lead Developer & Designer

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd kahon-studio-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Building for Production

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deploying to GitHub Pages

For detailed deployment instructions, see the [docs folder](docs/).

**Quick Start:**
1. Follow the [Quick Deploy Guide](docs/QUICK_DEPLOY.md)
2. Add required secrets (see [GitHub Secrets Setup](docs/GITHUB_SECRETS_SETUP.md))
3. Push to GitHub - deployment happens automatically via GitHub Actions

Your site will be available at `https://username.github.io/Kahon-Studio-Portfolio/`

**Troubleshooting?** Check [Troubleshoot Deployment](docs/TROUBLESHOOT_DEPLOYMENT.md) or [Fix Missing Secrets](docs/FIX_MISSING_SECRETS.md)

## Project Structure

```
├── src/                    # Source code
│   ├── components/         # React components
│   ├── lib/                # Utilities (Supabase client)
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── docs/                   # Documentation
│   ├── QUICK_DEPLOY.md    # Deployment guide
│   ├── GITHUB_SECRETS_SETUP.md
│   └── ...                 # Other guides
├── public/                 # Static assets
└── dist/                   # Build output (generated)
```

## Technologies Used

- React 18
- Vite
- CSS3 (Custom Properties, Grid, Flexbox)
- React Router (for future navigation if needed)

## License

© 2024 Kahon Studio. All rights reserved.



