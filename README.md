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

1. Make sure you have `gh-pages` installed (already included in devDependencies)

2. Update the `base` path in `vite.config.js` to match your repository name:
   - If your repo is `username/Kahon-Studio-Portfolio`, keep it as `/Kahon-Studio-Portfolio/`
   - If your repo name is different, update accordingly

3. Deploy to GitHub Pages:
```bash
npm run deploy
```

4. Go to your repository settings on GitHub:
   - Navigate to Settings > Pages
   - Under "Source", select "gh-pages" branch
   - Your site will be available at `https://username.github.io/Kahon-Studio-Portfolio/`

## Project Structure

```
src/
├── components/       # React components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Team.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Technologies Used

- React 18
- Vite
- CSS3 (Custom Properties, Grid, Flexbox)
- React Router (for future navigation if needed)

## License

© 2024 Kahon Studio. All rights reserved.


