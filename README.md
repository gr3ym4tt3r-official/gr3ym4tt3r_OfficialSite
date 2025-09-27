# GR3YM4TT3R Official Website

> Modern, masculine, stoic brand site with cinematic, aggressive-smooth motion. Communicating strength, courage, and discipline through premium design.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-38B2AC)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

## 🎯 Project Vision

GR3YM4TT3R represents the intersection of modern web technology and stoic philosophy. This website serves as a digital manifestation of strength, discipline, and measured aggression, targeting men aged 18-45 who value improvement, tactical thinking, and engineering excellence.

### Core Values
- **Duty** • **Courage** • **Precision** • **Accountability** • **Fortitude**

## 🚀 Current Status

**Phase 1: Foundation Complete** ✅

The project foundation has been successfully implemented with:
- Next.js 14 App Router architecture
- TypeScript configuration with ES2020 target
- TailwindCSS v4 with custom GR3YM4TT3R theme
- Comprehensive security headers (CSP, HSTS, etc.)
- Accessibility-first design principles
- Performance optimizations

### Key Metrics Targets (V1)
- CVR to email signup ≥ 4%
- Hero LCP ≤ 2.5s on 3G/low-end device
- CLS ≤ 0.05; TBT ≤ 200ms
- Lighthouse Performance ≥ 90 (desktop), ≥ 80 (mobile)
- Bounce rate ≤ 45% with scroll depth ≥ 50%

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5.9.2 (ES2020 target)
- **Styling**: TailwindCSS 4.1.13 + Custom Theme
- **Fonts**: Google Fonts (Inter + Cinzel)
- **Deployment**: Vercel (planned)
- **Analytics**: Umami (planned)
- **Email**: Buttondown (planned)

### Project Structure
```
gr3ym4tt3r_OfficialSite/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/               # Static assets
├── .env.example          # Environment variables template
├── next.config.js        # Next.js configuration + security
├── tailwind.config.js    # Theme configuration
└── tsconfig.json         # TypeScript configuration
```

## 🎨 Design System

### Color Palette
```css
/* Signal Red - Strategic accent color */
--signal-red-500: #DC2626;
--signal-red-600: #B91C1C;

/* Grey Scale - Primary palette */
--grey-950: #0A0A0A;  /* Deep black backgrounds */
--grey-900: #171717;  /* Dark panels */
--grey-100: #F5F5F5;  /* Light text */

/* Warm Steel - Supporting tones */
--warm-steel-500: #B8B4AE;
--warm-steel-800: #5E594B;
```

### Typography
- **UI Text**: Inter (free Google Font)
- **Headings**: Cinzel (free Google Font)
- **Hierarchy**: 4px base rhythm, fluid scaling

### Motion Principles
- **Character**: Smooth but aggressive
- **Timing**: Fast start, clean settle
- **Respect**: `prefers-reduced-motion`

## 🔒 Security Features

### Headers Implemented
- **Content Security Policy (CSP)**: XSS protection
- **Strict Transport Security**: Force HTTPS
- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **Permissions Policy**: Disable unnecessary APIs
- **Referrer Policy**: Control referrer information

### Privacy & Compliance
- No tracking cookies without consent
- WCAG 2.2 AA accessibility compliance
- GDPR-ready architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 18.17+ (LTS recommended)
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/gr3ym4tt3r-official/gr3ym4tt3r_OfficialSite.git
cd gr3ym4tt3r_OfficialSite

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checking
npm run security     # Run security audit
npm run clean        # Clean build artifacts
```

## 📋 Implementation Roadmap

### Phase 2: Design System & Components (Next)
- [ ] Set up shadcn/ui component library
- [ ] Implement theme tokens and design primitives
- [ ] Create reusable UI components
- [ ] Add Framer Motion for animations
- [ ] Implement Lenis smooth scrolling

### Phase 3: Core Layout & Navigation
- [ ] Global header with logo and navigation
- [ ] Footer with sitemap and social links
- [ ] Theme density toggle
- [ ] Mobile-first responsive design

### Phase 4: Content Management
- [ ] MDX + Contentlayer setup
- [ ] Content models (Project, GrowthCategory, GrowthArticle)
- [ ] Sample content creation
- [ ] Dynamic routing

### Phase 5: Page Implementation
- [ ] **Home Page**: Cinematic hero, manifesto, featured content
- [ ] **Growth System**: Categories index + article details
- [ ] **Projects**: Portfolio showcase with case studies
- [ ] **About/Ethos**: Philosophy and team information
- [ ] **Contact**: Lead generation form
- [ ] **Legal**: Privacy policy, terms of service

### Phase 6: Animations & Interactions
- [ ] Hero kinetic typography
- [ ] Staggered section reveals
- [ ] Hover state animations
- [ ] Page transition effects
- [ ] Loading states

### Phase 7: Integrations
- [ ] Buttondown email integration (free tier)
- [ ] Umami analytics setup (self-hosted)
- [ ] React Hook Form implementation
- [ ] Contact form with validation

### Phase 8: Performance & Accessibility
- [ ] Image optimization pipeline
- [ ] Code splitting optimization
- [ ] WCAG 2.2 AA compliance audit
- [ ] Performance testing
- [ ] Cross-browser testing

### Phase 9: Deployment & Monitoring
- [ ] Vercel deployment configuration
- [ ] Environment variable setup
- [ ] Performance monitoring
- [ ] Error tracking
- [ ] Analytics implementation

## 🧪 Testing Strategy

### Performance Testing
- Lighthouse CI in GitHub Actions
- Core Web Vitals monitoring
- Bundle size analysis
- Load testing for traffic spikes

### Accessibility Testing
- Automated a11y testing
- Screen reader compatibility
- Keyboard navigation testing
- Color contrast validation

### Security Testing
- OWASP security scanning
- Dependency vulnerability checks
- CSP policy validation
- SSL/TLS configuration testing

## 📊 Analytics & Monitoring

### Planned Integrations
- **Analytics**: Umami (privacy-focused, self-hosted)
- **Performance**: Web Vitals tracking
- **Errors**: Custom error boundary logging
- **User Feedback**: Integrated feedback system

### Key Metrics
- Page load performance (LCP, FID, CLS)
- User engagement (time on page, scroll depth)
- Conversion rates (email signups, contact forms)
- SEO performance (rankings, organic traffic)

## 🤝 Contributing

This is a private project for GR3YM4TT3R brand. For collaboration inquiries, please contact through official channels.

### Development Guidelines
- Follow the established design system
- Maintain TypeScript strict mode
- Ensure accessibility compliance
- Write semantic HTML
- Optimize for performance

## 📄 License

ISC License - See [LICENSE](LICENSE) file for details.

## 🔗 Resources

### Design References
- [Original PRD](docs/gr3ym4tt3r_website_prd_theme_guide.md)
- [Brand Guidelines](docs/brand-guidelines.md) (when available)
- [Component Library](docs/components.md) (when available)

### External Links
- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

---

**Built with discipline. Engineered for strength. Designed for the future.**
GR3YM4TT3R's Official Website for Customer Contact and Social Integration
