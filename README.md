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
**Phase 2: Design System Complete** ✅  
**Phase 3.1: Page Architecture Complete** ✅

The project is now a fully functional website with:
- Next.js 15.5.4 App Router architecture
- TypeScript configuration with ES2020 target
- TailwindCSS v4 with custom GR3YM4TT3R theme
- Complete design system with tokens and components
- Comprehensive page structure (Home, About, Work, Blog, Contact)
- Responsive navigation with mobile support
- Dark/Light theme system with user preferences
- Comprehensive security headers (CSP, HSTS, etc.)
- WCAG 2.1 AA accessibility compliance
- Performance optimizations and clean build

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
├── app/                          # Next.js App Router
│   ├── about/page.tsx           # About page
│   ├── blog/page.tsx            # Blog landing page
│   ├── contact/page.tsx         # Contact page with form
│   ├── privacy/page.tsx         # Privacy policy
│   ├── terms/page.tsx           # Terms of service
│   ├── sitemap/page.tsx         # Site navigation
│   ├── work/page.tsx            # Portfolio/work showcase
│   ├── globals.css              # Global styles + theme CSS
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Home page with hero
├── src/
│   ├── components/              # UI components
│   │   └── layout/              # Layout components
│   │       ├── Header.tsx       # Navigation header
│   │       ├── Footer.tsx       # Site footer
│   │       └── PageLayout.tsx   # Main layout wrapper
│   └── design-system/           # Design system foundation
│       ├── components/          # Design components
│       │   ├── Button.tsx       # Button system
│       │   ├── Container.tsx    # Layout container
│       │   ├── Grid.tsx         # Grid system
│       │   ├── Heading.tsx      # Typography headings
│       │   ├── Stack.tsx        # Flex layouts
│       │   └── Text.tsx         # Body text components
│       ├── tokens/              # Design tokens
│       │   ├── colors.ts        # Color system
│       │   ├── typography.ts    # Type scale
│       │   ├── spacing.ts       # Spacing system
│       │   └── motion.ts        # Animation tokens
│       └── utilities/           # Utility components
│           └── ThemeProvider.tsx # Theme management
├── projectDocs/                 # Project documentation
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.js               # Next.js configuration + security
├── tailwind.config.js           # Theme configuration
└── tsconfig.json                # TypeScript configuration
```

## 🎨 Design System

Complete design system implementation with tokens, components, and utilities.

### Color System
```css
/* Signal Red - Strategic accent color */
--signal-red-500: #DC2626;
--signal-red-600: #B91C1C;

/* Greyscale Palette - Warm steel tones */
--grey-950: #0A0A0A;   /* Deep backgrounds */
--grey-900: #1C1C1C;   /* Dark panels */
--grey-800: #2D2D2D;   /* Borders */
--grey-700: #404040;   /* Muted elements */
--grey-400: #9CA3AF;   /* Muted text */
--grey-300: #D1D5DB;   /* Secondary text */
--grey-100: #F3F4F6;   /* Primary text */
--grey-50: #F9FAFB;    /* Light backgrounds */

/* Theme Support */
/* Dark theme (default) + Light theme variants */
/* Automatic system preference detection */
```

### Typography System
- **UI Text**: Inter (Google Fonts) - Clean, highly legible
- **Display Headings**: Cinzel (Google Fonts) - Classical impact
- **Monospace**: JetBrains Mono - Technical content
- **Scale**: Modular scale with 4px base rhythm
- **Responsive**: Fluid typography across devices

### Component Library
- **Layout**: Container, Grid, Stack (Flexbox utilities)
- **Typography**: Heading, Text with semantic variants
- **Interactive**: Button system with hover animations
- **Navigation**: Header, Footer with mobile support
- **Theme**: Dark/Light mode with system detection

### Motion System
- **Philosophy**: "Smooth but aggressive" - fast start, clean settle
- **Easing**: Custom curves for brand personality
- **Performance**: Hardware-accelerated transforms
- **Accessibility**: Respects `prefers-reduced-motion`
- **Integration**: Framer Motion ready for future phases

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
npm run lint         # Run ESLint (when configured)
npm run type-check   # TypeScript type checking (when configured)
```

## 📋 Implementation Roadmap

### ✅ Phase 1: Foundation & Setup (COMPLETED)
- [x] Next.js 15.5.4 with TypeScript and App Router
- [x] TailwindCSS v4 with custom theme configuration
- [x] Security headers (CSP, HSTS, security policies)
- [x] Development environment and build optimization
- [x] Accessibility foundation (WCAG 2.1 AA)
- [x] Environment configuration and deployment setup

### ✅ Phase 2: Design System & Core Components (COMPLETED)
- [x] Design token system (colors, typography, spacing, motion)
- [x] Layout components (Container, Grid, Stack)
- [x] Typography components (Heading, Text with variants)
- [x] Button system with hover animations and social variants
- [x] Theme infrastructure (Dark/Light mode with system detection)
- [x] Responsive design utilities and breakpoint system

### ✅ Phase 3.1: Page Architecture (COMPLETED)
- [x] Global header with responsive navigation and mobile menu
- [x] Footer with social links and site navigation
- [x] Home page with hero section and core values showcase
- [x] About page with philosophy and technical expertise
- [x] Work/Portfolio page with project showcase and filtering
- [x] Contact page with form validation and information
- [x] Blog landing page structure
- [x] Legal pages (Privacy Policy, Terms of Service, Sitemap)
- [x] Mobile-first responsive design across all pages

### 🔄 Phase 3.2: Content Management (NEXT)
- [ ] MDX integration for blog content
- [ ] Static content optimization and SEO implementation
- [ ] Open Graph and social media meta tags
- [ ] Dynamic content loading and pagination

### Phase 4: Advanced Features & Interactions
- [ ] Contact form backend integration
- [ ] Newsletter signup functionality
- [ ] Advanced animations with Framer Motion
- [ ] Image optimization and loading strategies
- [ ] Search functionality implementation

### Phase 5: Performance & Optimization
- [ ] Image optimization pipeline and lazy loading
- [ ] Code splitting and bundle optimization
- [ ] Performance monitoring and Core Web Vitals
- [ ] Cross-browser testing and compatibility
- [ ] Accessibility audit and compliance verification

### Phase 6: Integrations & Services
- [ ] Email service integration (Buttondown or equivalent)
- [ ] Analytics setup (Umami or privacy-focused alternative)
- [ ] Contact form backend (Netlify Forms or API routes)
- [ ] Newsletter subscription system
- [ ] Social media integration and sharing

### Phase 7: Advanced Features
- [ ] Advanced animations and micro-interactions
- [ ] Blog content management system
- [ ] Project case study templates
- [ ] User preference persistence
- [ ] Advanced search and filtering

### Phase 8: Deployment & Monitoring
- [ ] Production deployment (Vercel/Netlify)
- [ ] Environment configuration
- [ ] Performance monitoring setup
- [ ] Error tracking and logging
- [ ] SEO optimization and sitemap generation

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

### Current Implementation
- **Theme Persistence**: localStorage-based theme preferences
- **Accessibility**: WCAG 2.1 AA compliance maintained
- **Performance**: Optimized builds with 0 errors
- **Security**: Comprehensive CSP and security headers

### Planned Integrations
- **Analytics**: Umami (privacy-focused, self-hosted)
- **Performance**: Web Vitals tracking and monitoring
- **Errors**: Custom error boundary logging system
- **User Feedback**: Integrated feedback and contact systems

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
