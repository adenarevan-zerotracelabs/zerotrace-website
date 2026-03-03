# ZeroTrace Website

Production-ready backend & DevOps engineering team landing page.

## Tech Stack
- HTML5
- CSS3 (Modern CSS with custom properties)
- Vanilla JavaScript (ES6+)
- Inter font family

## Features
- 🎨 Dark theme with gradient accents
- 📱 Fully responsive design
- ✨ Smooth scroll animations
- 🎯 Intersection Observer API for scroll reveals
- 💫 Interactive service cards with 3D tilt effect
- 📊 Animated metrics counter
- 🔧 Terminal typewriter effect
- 📲 Mobile-friendly navigation

## Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Python
python -m http.server 8000

# PHP (Laragon)
# Already running at http://localhost/zerotrace/

# Node.js
npx serve
```

## Deploy to Vercel

### Method 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Method 2: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Method 3: Drag & Drop
1. Go to [vercel.com](https://vercel.com)
2. Drag the entire `zerotrace` folder to Vercel dashboard

## Project Structure
```
zerotrace/
├── index.html          # Main HTML structure
├── css/
│   └── style.css      # All styles
├── js/
│   └── main.js        # Interactive animations
├── vercel.json        # Vercel configuration
└── README.md          # Documentation
```

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance
- Minimal dependencies (no frameworks)
- Optimized animations with CSS transforms
- Intersection Observer for performance-friendly scroll detection
- Lazy loading ready

## License
All rights reserved © 2026 ZeroTrace

---

**Built with production in mind.**
