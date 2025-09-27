# Project Requirements Document (PRD)

## 0) Project Snapshot
- **Website Name:** **GR3YM4TT3R**
- **One-liner:** Modern, masculine, stoic brand site with cinematic, aggressive-smooth motion; dark monochrome palette with surgical red accents.
- **Primary Goals:**
  1) Communicate strength, courage, and discipline through restrained, premium design.
  2) Convert visitors to email/community members and qualified leads.
  3) Showcase projects and growth articles with high-impact storytelling and motion.
- **KPI Targets (V1, first 30 days):**
  - CVR to email signup ≥ 4%
  - Hero LCP ≤ 2.5s on 3G/low-end device
  - CLS ≤ 0.05; TBT ≤ 200ms; Lighthouse Perf ≥ 90 (desktop), ≥ 80 (mobile)
  - Bounce rate ≤ 45% on hero + scroll depth ≥ 50% for new visitors

---

## 1) Audience & Positioning
- **Audience:** Men 18–45; seekers of improvement, combat sports / tactical / training / engineering; tech-forward but values legacy and stoicism.
- **Tone:** Calm, disciplined, formidable; "measured aggression."
- **Differentiation:**
  - Visual austerity: limited palette, heavy typographic rhythm, brutalist grid tempered by classical details.
  - Explainable motion: complex animations that always serve clarity, not spectacle.

---

## 2) Competitive/Referential Notes
*(Design reference only; no brand imitation)*
- **Obriy / Sarmat**: cinematics, typography hierarchy, material textures.
- **GBRS Group**: tactical credibility, utility-first sections.
- **TREX Arms**: product clarity, transparent approach ethos.
**Takeaways:** micro-grain textures, command-line style accents, editorial scale shifts, confident whitespace, and purposeful red signals.

---

## 3) Scope (V1)
- **Pages/Routes**
  1. **Home:** cinematic hero, narrative sections, featured project, manifesto, CTA, social media links with minimalistic buttons, and curated image gallery.
  2. **Growth Page:** categories index (Strength, Mindset, Discipline, etc.), with category detail pages displaying different free articles.
  3. **Projects / Case Studies:** index + detail.
  4. **Shop (optional for V1):** index + product detail.
  5. **About / Ethos:** origin, philosophy, team.
  6. **Contact (lead form).**
  7. **Legal:** Privacy, Terms.
- **CMS:** Free + open-source (MDX/Contentlayer) for all content.
- **Internationalization:** Single locale (en-US) for V1.
- **Integrations:** Email (Buttondown free tier), Analytics (Plausible self-hosted or Umami), all free resources.

---

## 4) Information Architecture (IA)
- **Global Header / Navigation:**
  - Logo (GR3YM4TT3R top-left)
  - Primary nav: Home, Growth, Projects, Shop (optional), About, Contact
  - Social media icons (Instagram, X/Twitter, LinkedIn) with minimalistic button styles
  - Utility: theme density toggle
- **Global Footer:** Mini-sitemap, email subscribe, social, legal; subtle top border line in light grey.
- **Home Scroll Order:** Hero → Proof (logos/stats) → Featured project → Philosophy/Manifesto → Growth teaser (featured categories) → Product teaser (optional) → Email capture + social → Footer.

---

## 5) Content Model (CMS)
- **Project**: title, slug, heroMedia, problem, approach, results, gallery[], techStacks[].
- **GrowthCategory**: title, slug, description, heroImage, articleRefs[].
- **GrowthArticle**: title, slug, excerpt, cover, body, tags[], publishedAt, categoryRef.
- **SiteSettings**: nav, footer, legal, SEO defaults, social.

---

## 6) Visual System (executive summary; full Theme Guide below)
- **Palette:** Greyscale (true neutral + warm steel) with strategic **Signal Red**. Dark by default with minor light lines/dividers.
- **Type:** Modern grotesk for UI (e.g., **Inter/PP Neue Montreal**, both free), Classical display for headings (e.g., **Cinzel**, free Google Font).
- **Grid:** 12-col fluid; max-width 1440px; generous gutters. Rhythm uses 4px base.
- **Texture:** Micro-grain noise overlays (1–2%), subtle carbon/forged patterns.
- **Iconography:** Thin-stroke, geometric; open-source icons only (Lucide, Heroicons).

---

## 7) Motion & Interaction (principles)
- **Character:** *Smooth but aggressive* — fast start, clean settle.
- **Cadence:** Staggered reveals, section entrances, hover states.
- **Elements:**
  - Hero with kinetic typography.
  - Growth category cards wipe into view.
  - Minimalistic social media buttons animate on hover (scale + red glow).

---

## 8) Accessibility & Compliance
- **WCAG 2.2 AA**: verified contrasts, skip links, focus states.
- **Motion toggle:** respects `prefers-reduced-motion`.

---

## 9) Copy & Messaging
- **Voice:** terse, declarative, honorable.
- **Manifesto bullets:** Duty • Courage • Precision • Accountability • Fortitude.

---

## 10) SEO & Sharing
- Semantic HTML, free tools (Sitemap.js, Robots.txt), Open Graph templates.

---

## 11) Performance Budget
- **Total JS:** ≤ 170KB gzip.
- **Hero media:** ≤ 1.4MB (compressed free tools like Squoosh).
- **Images:** WebP/AVIF with free open-source compressors.
- **Fonts:** Google Fonts free.

---

## 12) Tech Stack & Architecture
- **Frontend:** Next.js (free, open-source) + React; TailwindCSS (free) + shadcn/ui (free); Framer Motion (free) + Lenis (free smooth scroll) + GSAP (free core).
- **Content:** MDX (Contentlayer) for all articles and categories.
- **Forms:** React Hook Form (free).
- **Email:** Buttondown free tier.
- **Analytics:** Umami self-hosted free.
- **Hosting:** Vercel free tier.
- **Security:** Free best-practice headers.

---

## 13) AI Coding Agent Plan (Tooling & Guardrails)
- **Resources:** Must use only free/open-source tools (no paid APIs, fonts, or services).
- **Checkpoints:**
  1) Scaffold (Next + Tailwind + shadcn)  
  2) Theme tokens + typography + layout primitives  
  3) Hero + global nav (with socials)  
  4) Growth index + category detail (articles)  
  5) Projects index + detail  
  6) About/Ethos  
  7) Contact form (Buttondown integration)  
  8) Accessibility, perf pass  
  9) Analytics + SEO pass (Umami)
- **Approval Gates:** Installing packages; adding assets; modifying theme tokens.

---

# Theme Guide (for AI Agent & Developers)

- **Website Name Usage:** Always use **GR3YM4TT3R** in logo lockups and metadata.
- **Navigation:** Home, Growth, Projects, Shop (optional), About, Contact.
- **Home Page:** Cinematic hero, image gallery grid, minimalistic social media buttons styled with borders and hover motion.
- **Growth Page:**
  - Category cards: dark panel with red caret; on hover, wipe animation.
  - Article detail: bold H1 (Cinzel), body (Inter), CTA to "Back to Growth."
- **Resources:** Fonts from Google Fonts, icons from Lucide/Heroicons, hosting on Vercel free tier, CMS using MDX.
- **Motion Guidelines:** Social icons pulse subtly on hover; category reveals use swiftOut easing.
- **Accessibility Tokens:** Visible skip link, focus ring color red, screen reader support.
- **Imagery:** All free/open-source or custom-generated images (no paid stock).

---

# AI Agent Execution Guide (Additional Notes)
- Ensure GrowthPage routes and components (categories index + detail).
- Ensure Home has social icons styled minimalistic.
- Ensure only free resources used throughout (fonts, icons, hosting, CMS, analytics).
- CMS: GrowthCategory + GrowthArticle types integrated via free MDX.
- Approval gates updated: nav items must match spec, free-only rule enforced.