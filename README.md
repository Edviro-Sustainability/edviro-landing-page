# Edviro Energy Landing Page

A modern landing page for Edviro Energy, showcasing energy dashboarding and anomaly detection solutions for school districts.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment to GitHub Pages

This project is configured for deployment to GitHub Pages using the `gh-pages` package.

### Quick Deploy

```bash
npm run deploy
```

This command will:
1. Build the project with the correct base path for GitHub Pages
2. Deploy the `dist` folder to the `gh-pages` branch

### Manual Steps

1. **Build for GitHub Pages:**
   ```bash
   npm run build:gh-pages
   ```

2. **Deploy to gh-pages branch:**
   ```bash
   npm run deploy
   ```

### GitHub Pages Configuration

1. Go to your repository settings on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Source**, select the `gh-pages` branch
4. Select the `/ (root)` folder
5. Click **Save**

Your site will be available at:
- `https://[username].github.io/edviro-landing-page/` (if using project pages)
- Or your custom domain if configured

### Custom Domain

If you're using a custom domain, update `vite.config.js` to set `base: '/'` instead of the project path.

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── App.jsx     # Main landing page component
│   └── index.css   # Global styles with Tailwind
└── dist/           # Build output (generated)
```

## Technologies

- React 19
- Vite
- Tailwind CSS v4
- gh-pages (for deployment)
