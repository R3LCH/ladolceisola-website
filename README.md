# La Dolce Isola Website

Premium website for La Dolce Isola beach bar and restaurant in Scalea, Italy.

## Features

- 🍹 Interactive flipbook-style digital menu with smooth page-turn animations
- 🌍 Multi-language support (IT, EN, RU, UK, PL, DE)
- ✨ Premium GSAP animations and smooth interactions
- 📱 Fully responsive design (mobile & desktop)
- 🎨 Beach-inspired aesthetic with tropical summer vibe
- 🗺️ Integrated Google Maps location
- ⭐ Customer reviews carousel
- 📱 Social media integration

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3.4
- **Animations**: GSAP 3.15 + ScrollTrigger
- **Internationalization**: i18next + react-i18next
- **Deployment**: GitHub Pages

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── layout/       # Header, Footer, Section wrappers
│   ├── sections/     # Page sections (Hero, Menu, About, Contact, etc.)
│   ├── ui/           # Reusable UI components
│   └── menu/         # Menu-specific components (Flipbook, CategoryNav, etc.)
├── data/             # Menu data, reviews, translations
├── styles/           # Global styles, tokens, animations
├── i18n/             # Internationalization config
├── utils/            # Helper functions, animation utilities
└── hooks/            # Custom React hooks

public/
├── images/           # Venue photos, menu images
├── locales/          # Translation files
└── ...               # Static assets
```

## Menu System

The digital menu features:
- Realistic flipbook page-turn animations
- Category sidebar with smooth slide-in/out behavior
- Touch-friendly navigation for mobile
- High-quality food and drink photography
- Multi-language menu item names and descriptions

## Deployment

The site is configured for GitHub Pages deployment:
1. Push changes to main branch
2. Run `npm run deploy`
3. Site will be published to `https://[username].github.io/ladolceisola-website/`

Custom domain configuration available via CNAME.

## License

© 2026 La Dolce Isola. All rights reserved.
