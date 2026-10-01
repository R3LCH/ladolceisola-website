# La Dolce Isola Website

Premium website for La Dolce Isola - Italian bar, café, and gelateria in Scalea, Calabria.

🌐 **Live Site**: [Coming soon - deploy to GitHub Pages]

## 📋 Features

✨ **Interactive Digital Menu**
- 21-page flipbook with realistic 3D page-turn animations
- Category navigation sidebar with smooth transitions
- Touch gestures and keyboard controls
- Desktop: two-page spread view
- Mobile: single-page optimized view

🌍 **Multi-language Support**
- 6 languages: Italian (default), English, Russian, Ukrainian, Polish, German
- Real-time language switching
- Localized content and menu translations

🎨 **Premium Design**
- Mediterranean-inspired color palette (warm sand, sunset gold, coral)
- GSAP ScrollTrigger animations throughout
- Smooth, beach-inspired transitions
- Mobile-first responsive design
- Reduced motion support

📱 **Content Sections**
- Hero with prominent menu CTA
- About Us with venue description
- Interactive menu flipbook
- Reviews carousel with auto-play
- Location with Google Maps embed
- Contact information with social media links
- Opening hours display

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript 6
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS 3.4
- **Animations**: GSAP 3.15 + ScrollTrigger
- **i18n**: i18next + react-i18next
- **Deployment**: GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/ladolceisola-website.git
cd ladolceisola-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Deployment to GitHub Pages

### First-time Setup

1. **Create GitHub repository**
   ```bash
   # On GitHub, create a new repository named 'ladolceisola-website'
   ```

2. **Update remote origin**
   ```bash
   git remote set-url origin https://github.com/[your-username]/ladolceisola-website.git
   ```

3. **Update base path in vite.config.ts** (if not using custom domain)
   ```typescript
   export default defineConfig({
     base: '/ladolceisola-website/', // Repository name
     // ...
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
   - Save

Site will be live at: `https://[your-username].github.io/ladolceisola-website/`

### Custom Domain Setup

1. **Add CNAME file**
   ```bash
   echo "www.ladolceisola.com" > public/CNAME
   ```

2. **Configure DNS** (at your domain registrar)
   ```
   Type: CNAME
   Name: www
   Value: [your-username].github.io
   ```

3. **Enable custom domain in GitHub**
   - Settings → Pages → Custom domain
   - Enter: www.ladolceisola.com
   - Check "Enforce HTTPS"

## 📂 Project Structure

```
ladolceisola-website/
├── public/
│   ├── images/
│   │   └── menu/          # 21 menu page images
│   └── locales/           # Translation files (6 languages)
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer, Section
│   │   ├── menu/          # MenuFlipbook, CategorySidebar
│   │   ├── sections/      # Hero, About, Location, Contact, etc.
│   │   └── ui/            # Reusable UI components
│   ├── data/
│   │   ├── venue.json     # Venue information
│   │   ├── reviews.json   # Customer reviews
│   │   └── menuData.ts    # Menu structure and helpers
│   ├── i18n/
│   │   └── config.ts      # i18next configuration
│   ├── styles/
│   │   └── base.css       # Design tokens and global styles
│   ├── utils/
│   │   └── animations.ts  # GSAP animation utilities
│   └── App.tsx            # Main app component
├── dist/                  # Production build output
└── package.json
```

## 🎨 Design System

### Colors

- **Sand**: #E8E6E0 (backgrounds)
- **Sunset**: #D7A542 (accents, CTAs)
- **Coral**: #E8956D (secondary accents)
- **Driftwood**: #4A3F35 (text)
- **Ocean**: #4A9CAA (links, decorative)

### Typography

- **Display**: Playfair Display (headings)
- **Body**: Inter (paragraphs, UI)

### Animations

- Beach-inspired smooth transitions
- GSAP ScrollTrigger for scroll-based reveals
- 3D page-turn effects for menu flipbook
- Reduced motion support via CSS media query

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🌟 Key Components

### MenuFlipbook
Interactive 21-page menu with realistic page-turn animations using GSAP 3D transforms.

### CategorySidebar  
Auto-hiding navigation that appears on interaction, with smooth slide transitions.

### Reviews Carousel
Auto-playing carousel with manual controls, showing customer testimonials.

### Location Map
Embedded Google Maps with venue marker and directions link.

## 📄 License

© 2026 La Dolce Isola. All rights reserved.

## 🤝 Contributing

This is a production website for La Dolce Isola. For inquiries, contact the venue directly.

---

**La Dolce Isola**  
Via Michele Bianchi 30, Scalea, Calabria, Italy  
📞 +39 0985 920136  
⏰ Open daily 07:00 - 03:00  
🌐 [Facebook](https://www.facebook.com/ladolceisola.scalea)
