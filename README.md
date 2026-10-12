# High-Ticket Builders & Trades — White-Label Web Platform & CMS

A high-performance, conversion-engineered website template and client CMS portal designed specifically for **Builders, General Contractors, Carpenters, Electricians, Plumbers, and Premium Home Improvement Trades**.

Retains 100% of the proven backend plumbing, PIN-authenticated content management portal, in-browser photo compression, and Before/After interactive slider engine — while fully abstracting all branding, color palettes, trust accreditations, and trade-specific terminology into centralized configuration files.

---

## ⚡ 5-Minute Client Re-Skinning Guide

To rebrand this template for any new client (e.g. *Apex Construction*, *Vanguard Carpentry*, *Heritage Roofing*), you only need to edit **two centralized files**:

### 1. Brand & Business Details: `config/site.config.ts`
Open `config/site.config.ts` and update:
```typescript
export const siteConfig = {
  brand: {
    name: 'Apex Construction & Master Builders',
    legalName: 'Apex Construction Ltd',
    strapline: 'Design • Build • Transform',
    subStrapline: 'Dartmouth, Kingswear & South Devon',
    logoImage: undefined, // Provide image path e.g. '/logo.png' or leave undefined for auto-typographic crest
    serviceArea: 'Dartmouth, Kingswear, Totnes & South Hams',
    coverageAreas: ['Dartmouth', 'Kingswear', 'Totnes', 'Salcombe', 'South Hams'],
    workingHours: 'Monday – Friday: 07:30 – 17:30',
  },
  contact: {
    phone: '07803 258507',
    phoneRaw: '07803258507',
    whatsapp: '447803258507',
    whatsappDisplay: '07803 258507',
    email: 'info@apexbuilders-devon.co.uk',
    address: '15 Southtown, Dartmouth, Devon, TQ6 9BX',
    postcode: 'TQ6 9BX',
  },
  trade: {
    sector: 'High-Ticket Building, Renovations & Extensions',
    specificationsLabel: 'Materials & Structural Scope',
    specificationsPlaceholder: 'e.g. Structural Steel, C24 Timber, Velux Glazing...',
    categories: ['All', 'Extensions', 'Renovations', 'New Builds', 'Specialist Carpentry'],
    services: [ /* ... mapped to your trade service cards */ ],
  },
  trust: {
    showTrustBanner: true,
    badges: [
      { name: 'Federation of Master Builders', tagline: 'Vetted & Inspected Member' },
      { name: 'TrustMark Government Endorsed', tagline: 'Quality & Workmanship Standards' },
      { name: '£5,000,000 Liability Cover', tagline: 'Comprehensive Commercial Insurance' },
      { name: '10-Year Structural Guarantee', tagline: 'Insurance-Backed Workmanship' },
    ],
  },
};
```

### 2. Color Palette & Styling: `config/theme.config.ts`
Open `config/theme.config.ts` to tweak the color palette (Primary Navy, Slate, Accent Gold/Amber, Warm Neutrals):
```typescript
export const themeConfig = {
  colors: {
    primary: { DEFAULT: '#0f172a', foreground: '#ffffff' },
    secondary: { DEFAULT: '#d97706', foreground: '#ffffff' },
    accent: { DEFAULT: '#f59e0b', foreground: '#0f172a' },
  },
  borderRadius: {
    cards: 'rounded-2xl',
    buttons: 'rounded-xl',
  },
};
```

---

## 🛠️ Key Capabilities & Features

### 1. PIN-Protected Client Management Portal (`/portal` or `/admin`)
* **Default Access PIN:** `1234` (configurable).
* **Hero Carousel Slides:** Upload multi-screen high-definition slides with Ken Burns motion, reorder slides, or remove.
* **Project Galleries & Portfolio:**
  * Multi-image uploads with automatic in-browser Canvas JPEG compression (prevents oversized phone uploads from crashing the site).
  * Designate primary showcase photo with **Set Cover**.
  * Before & After slider tagging: assign both a Before and After photo to automatically enable an interactive touch-slider on the public card.
  * **Trade Specifications & Materials Scope:** Tag structural materials, timber grade, steel, or trade suppliers directly onto the project card.
  * **Gallery Reordering:** Instant visual ordering using Up/Down controls, Jump to Top/Bottom, or direct position selectors per gallery category.
* **Review Moderation:** Enter new verified reviews or approve pending client submissions.
* **1-Click Live Sync:** Updates save locally and push directly to GitHub via `/api/cms` with one click of **"Update the Website"**.

### 2. High-Ticket Conversion Public Pages
* **Homepage (`/`)**: Dynamic hero carousel, Trust & Accreditations banner, trade service cards, localized SEO story, and floating mobile action bar.
* **Work & Case Studies (`/projects`)**: Filter by any category defined in `site.config.ts`. Full-screen image zoom modal (up to 300%) with touch pan controls.
* **Reviews & Testimonials (`/reviews`)**: Client review wall with rating breakdown and interactive submission modal.
* **Estimate & Contact (`/contact`)**: Instant click-to-dial phone, WhatsApp direct-chat, and detailed project specification inquiry form.
* **Legal Compliance (`/privacy`, `/terms`, `/cookies`, `/accessibility`)**: UK GDPR, Data (Use & Access) Act 2025, and WCAG 2.1 Level AA compliant policies.

---

## 🚀 Development & Deployment

### Quick Start Locally
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public site.  
Open [http://localhost:3000/portal](http://localhost:3000/portal) to access the CMS portal.

### Build Verification
```bash
npm run build
```

### Production Deployment (Vercel)
1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and select this repository.
3. Framework preset: **Next.js** (auto-detected).
4. Click **Deploy**.
5. Set custom domain under **Settings > Domains**.
