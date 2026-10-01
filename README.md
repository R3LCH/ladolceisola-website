# La Dolce Isola Website

🌐 **LIVE SITE**: https://r3lch.github.io/ladolceisola-website/

Premium website for La Dolce Isola - Italian bar, café, and gelateria in Scalea, Calabria.

## 🎯 Features

### Interactive Digital Menu
- 21-page flipbook with realistic 3D page-turn animations
- Category sidebar with smooth slide-in/out navigation
- Touch gestures + keyboard navigation support
- High-quality menu images from original paper menu

### Multilingual Support
- 🇮🇹 Italian (default)
- 🇬🇧 English
- 🇷🇺 Russian
- 🇺🇦 Ukrainian
- 🇵🇱 Polish
- 🇩🇪 German

### Premium UX
- GSAP-powered scroll animations
- Smooth page transitions
- Mobile-first responsive design
- Reduced motion accessibility support
- Fast load times (~450KB total)

### Content Sections
- **Hero** - Prominent "View Menu" CTA
- **About** - Venue description and story
- **Menu** - Interactive flipbook experience
- **Reviews** - Customer testimonials carousel
- **Hours** - Operating schedule
- **Location** - Google Maps integration
- **Contact** - Social links (Facebook, Instagram, WhatsApp, Email, Phone)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Lint code
npm run lint
```

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript 6
- **Build Tool**: Vite 8.3
- **Styling**: Tailwind CSS 3.4 with custom design tokens
- **Animations**: GSAP 3.15 + ScrollTrigger
- **i18n**: i18next + react-i18next
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Header, Footer, Section wrappers
│   ├── menu/             # MenuFlipbook, CategorySidebar
│   └── sections/         # Hero, About, Menu, Reviews, etc.
├── data/                 # Menu structure, reviews, venue data
├── hooks/                # useGSAP, useSwipeGesture, useKeyboardNav
├── i18n/                 # i18next configuration
├── utils/                # Animation utilities (GSAP helpers)
└── styles/               # Global CSS & design tokens

public/
├── images/menu/          # 21 menu page images (menu1-21.jpeg)
└── locales/              # Translation JSON files (6 languages)
```

## 🎨 Design System

### Colors
- **Sand**: `#F5E6D3` - Warm backgrounds
- **Sunset**: `#FF6B35` - Primary CTAs and accents
- **Ocean**: `#2A9D8F` - Links and interactive elements
- **Coral**: `#E76F51` - Secondary accents

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body**: Inter (sans-serif, clean)

### Animations
- Beach-inspired easing curves
- ScrollTrigger parallax effects
- Smooth state transitions
- Respects `prefers-reduced-motion`

## 🌍 Deployment

### Live Site
- **URL**: https://r3lch.github.io/ladolceisola-website/
- **Status**: ✅ Active
- **Branch**: `gh-pages` (auto-deployed)

### Deploy Process
```bash
npm run deploy
```

This command:
1. Builds production bundle (`npm run build`)
2. Deploys `dist/` to `gh-pages` branch
3. GitHub Pages auto-publishes

### Custom Domain (Optional)
1. Add `public/CNAME` with your domain
2. Configure DNS: `CNAME` record → `r3lch.github.io`
3. Enable in GitHub Settings → Pages
4. Redeploy

## 📊 Performance

- **Bundle Size**: 412KB main JS (137KB gzipped)
- **CSS**: 20KB (5KB gzipped)
- **First Load**: ~450KB total
- **Images**: Optimized JPEG/WebP
- **Caching**: Aggressive content hashing

## 🧪 Development

### Adding Menu Items
1. Update `src/data/menu-structure.json`
2. Add translations to `public/locales/*/translation.json`
3. Place images in `public/images/menu/`

### Adding Languages
1. Create `public/locales/{code}/translation.json`
2. Add language to `src/i18n/config.ts`
3. Update language switcher in Header

### Modifying Animations
Edit `src/utils/animations.ts` for reusable GSAP utilities.

## 🐛 Troubleshooting

**Build fails**: Clear cache and reinstall
```bash
rm -rf node_modules dist
npm install
```

**Deploy fails**: Check GitHub token permissions or deploy manually

**Animations janky**: Check browser support for GSAP (Chrome 90+, Safari 14+)

## 📝 License

Proprietary - All rights reserved to La Dolce Isola

## 📞 Contact

**La Dolce Isola**  
Via Michele Bianchi 30  
87029 Scalea CS, Italy  
📞 +39 0985 920136  
🕐 Open Daily: 07:00 - 03:00  
📘 [Facebook](https://www.facebook.com/ladolceisola.scalea)

---

**Repository**: https://github.com/R3LCH/ladolceisola-website  
**Live Site**: https://r3lch.github.io/ladolceisola-website/  
**Built**: 2026-10-01
