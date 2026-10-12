# Sistine Professional Decorators
## Comprehensive Website & Client Portal Capabilities Report

**Client:** Sistine Professional Decorators  
**Operating Area:** Dartmouth & South Hams, Devon  
**Domain / Web App:** [sistine.itsmyapp.co.uk](https://sistine.itsmyapp.co.uk)  
**Report Date:** October 2026  
**Document Version:** 1.0 (Final Handover)

---

## 1. Executive Summary

This report provides a complete, non-technical overview of the bespoke website and client management system developed for **Sistine Professional Decorators**. 

The platform has been engineered to serve two core purposes:
1. **A Premium Digital Showcase for Prospective Clients:** Designed to attract and convert homeowners, holiday-cottage managers, and commercial clients throughout Dartmouth and the wider South Hams by presenting completed decorating work with exceptional visual craftsmanship.
2. **An Autonomous, Trade-Friendly Management Portal (`/admin`):** An easy-to-use, PIN-protected admin area that allows Sistine Decorators to upload new jobs directly from a smartphone or laptop, curate showcase order, manage homepage slides, and approve client testimonials without requiring ongoing developer intervention or monthly maintenance fees.

---

## 2. Brand Identity & Design System

The visual design is tailored specifically to a high-end coastal painting and decorating trade:
- **Colour Palette:** A coastal trade palette incorporating deep slate (`#0f172a`), warm cream/limewash background (`#faf9f5`), rich amber gold highlights (`#b45309`), and crisp white card containers.
- **Typography:** Classic editorial serif typography (**Playfair Display**) for headings, paired with a modern, high-legibility sans-serif (**Inter**) for body text and specifications.
- **Mobile-First Responsiveness:** Flawlessly adaptive layout engineered for high-resolution retina screens, desktop displays, iPads, and mobile smartphones.
- **Authentic Local Focus:** Explicit Dartmouth and South Hams geographic presence incorporated across all banners, titles, and metadata for maximum local resonance.

---

## 3. Public Website Pages & Features

### 3.1 Homepage (`/`)
- **Full-Width Ken Burns Hero Carousel:** A cinematic showcase at the top of the homepage featuring smooth, gradual zoom and pan animations over completed Dartmouth projects.
- **Headline & Tagline:** Clear positioning — *"Welcome to Sistine Professional Decorators"* with the brand tagline *"Decorate • Restore • Refurbish"*.
- **Local Story & Working Ethos:** A dedicated introduction highlighting attention to detail, clean and respectful working practices in clients' homes, and Dartmouth roots.
- **Three Core Service Cards:**
  1. *Interior Painting & Decorating* — Living spaces, bedrooms, cornices, and woodwork.
  2. *Exterior Painting & Facades* — Coastal masonry weather-protection, rendered walls, exterior timbers, and front doors.
  3. *Specialist Wallpapering* — Designer feature walls, lining paper, pattern-matching, and precision seams.
- **Direct Contact Banner:** One-tap telephone dialling (`07803 258507`) and contact links.
- **Footer Navigation & Legal Badges:** Contact details, working hours, insurance accreditation ("Fully Insured Public Liability"), and links to all statutory policies.

---

### 3.2 Portfolio & Work Completed (`/projects`)
- **Category Filter Tabs:** Visitors can seamlessly switch between **All**, **Interior**, **Exterior**, and **Specialist Wallpapering** galleries.
- **Project Cards:** Each job displays:
  - High-resolution cover photo.
  - Photo count badge (e.g. `4 📷`).
  - Interactive Before & After badge (when comparison photos are available).
  - Project title, category, and Dartmouth/South Devon location.
  - **Decorating Suppliers Badges:** Verified UK paint brands used on the job (e.g. *Farrow & Ball*, *Dulux Trade*, *Little Greene*, *Zinsser*, etc.).
  - Concise description of the work completed.
- **Curated Display Order:** Jobs appear in the exact curated order established by Sistine Decorators in the portal.

---

### 3.3 Interactive Project Photo Gallery Modal
Clicking any project card opens a full-screen, high-resolution viewing experience:
- **Multi-Image Photo Carousel:** Visitors can browse through every photo captured for that job using arrow navigation, swipe gestures on mobile, or thumbnail selectors.
- **Pinch-to-Zoom & Pan (Up to 300%):** Prospective clients can zoom in close on painted cornices, woodwork cut-ins, and wallpaper seams to inspect workmanship quality.
- **Touch Gesture Support:** Supports double-tap zoom, pinch-to-zoom, and smooth drag-panning on smartphones and tablets.
- **Interactive Split-Screen Before & After Slider:** For jobs with before/after photography, visitors can drag an interactive divider handle back and forth to witness the transformation side-by-side.

---

### 3.4 Reviews & Testimonials (`/reviews`)
- **Verified 5-Star Reviews Grid:** Displays genuine client feedback with client names, Dartmouth villages, project types, and review sources (e.g. *Facebook Verified*, *Direct Quote*, *Google Verified*).
- **Public "Leave a Review" Modal:** Allows satisfied clients to submit feedback directly from the website:
  - Star rating selector (1 to 5 stars).
  - Client name, location, and project category.
  - Written testimonial text.
  - Instant on-screen confirmation informing the client that their review has been submitted for moderation.
- **Safe Moderation Workflow:** Submitted reviews are held in a pending queue in the admin portal and **never** appear publicly until approved.

---

### 3.5 Contact & Quotations (`/contact`)
- **Direct Dial & WhatsApp Integration:** Click-to-call telephone links and instant WhatsApp message launch.
- **Dartmouth & South Hams Coverage Area:** Clear list of local coverage towns (*Dartmouth, Kingswear, Stoke Fleming, Strete, Dittisham, Totnes, Blackawton, and wider South Hams*).
- **Online Estimate Request Form:** Clients can submit job requests detailing property type, service required, timeframe, and project details.
- **Business Operational Information:** Address (*15 Southtown, Dartmouth, Devon, TQ6 9BX*), email (*sistine@live.co.uk*), and working hours (*Monday – Friday: 08:00 – 17:30, Saturday by appointment*).

---

### 3.6 Statutory & Legal Pages
The website is fully furnished with bespoke legal documentation complying with UK trade standards:
1. **`/terms` (Terms of Service):** Standard decorating trade terms covering quotation validity, access & property preparation, paint specification agreements, variation procedures, payment schedules, and 12-month workmanship guarantees.
2. **`/privacy` (Privacy Policy):** Fully compliant with the **UK General Data Protection Regulation (UK GDPR)** and the **Data (Use and Access) Act (DUAA 2025)**, specifying a 30-day Subject Access Request (SAR) SLA and dedicated Data Privacy Lead.
3. **`/cookies` (Cookie Policy):** Transparent policy explaining that the site strictly operates using essential operational cookies and local storage exemptions under PECR.
4. **`/accessibility` (Accessibility Statement):** Standard WCAG 2.1 Level AA compliance declaration with keyboard navigation, focus indicators, and screen-reader considerations.

---

## 4. The Sistine Decorators Admin Portal (`/admin`)

The portal is accessible at `/admin` and protected by a secure 4-digit PIN (default: `1234`).

### 4.1 Tab 1: Job Galleries & Projects Manager

#### A. Publishing New Jobs & Uploading Photos
- **Job Details:** Enter title, category (*Interior*, *Exterior*, *Wallpapering*), and Devon location.
- **Paint Suppliers & Brands Checklist:** An interactive selector containing 16 recognized UK trade paints:
  *Dulux Trade, Farrow & Ball, Little Greene, Johnstone's Trade, Crown Trade, Zinsser, Mylands, Paint & Paper Library, Benjamin Moore, Tikkurila, Leyland Trade, Bedec, Sadolin, Sikkens, Osmo, Hammerite* — plus a custom text field for specialty coatings. Only selected paints appear on the website.
- **Multi-Photo Upload with Auto-Compression:** Upload multiple photos straight from a smartphone camera or desktop. The built-in image processor automatically compresses file sizes in the browser before upload, ensuring lightning-fast website loading.
- **Cover Photo Control:** Click **"Set Cover"** on any photo to choose the card showcase image.
- **Before & After Photo Assignment:** Easily tag dedicated Before and After images to enable the split-screen slider.
- **Initial Placement:** Choose whether a new job appears at the **Top of list (#1)** or at the **Bottom of list**.

#### B. Display Order Control (All Work & Individual Galleries)
- **Gallery Category Tabs:** Filter the active list by **All Galleries**, **Interior**, **Exterior**, or **Wallpapering**.
- **Visual Position Badges:** Clearly displays each project's order (`#1`, `#2`, `#3`, etc.), with overall portfolio position indicators when filtered.
- **One-Click Step Reordering:**
  - `▲` **Move Up:** Move job forward by one place.
  - `▼` **Move Down:** Move job backward by one place.
- **Instant Top / Bottom Jumps:**
  - `⏫` **Move to Top:** Instantly place the job at position `#1`.
  - `⏬` **Move to Bottom:** Instantly send the job to the last position.
- **Direct Position Selector (`#Pos` Dropdown):** Jump any project directly to any target position (e.g. from position `#7` straight to `#2`) in a single click.
- **Quick Sort Presets:** Automatically order any view by *Newest Published*, *Oldest Published*, *Title A–Z*, *Title Z–A*, or *Reverse Order*.
- **Intelligent Category Alignment:** Adjusting order within a specific gallery (e.g. Interior) updates that category's relative order on the public site without disturbing jobs in other categories.

---

### 4.2 Tab 2: Homepage Hero Carousel Slides
- **Add Slide:** Upload new high-resolution images to the top homepage carousel.
- **Caption & Description:** Set custom accessibility alt text.
- **Sequence Ordering:** Use **Move Up** and **Move Down** buttons to dictate which slide appears 1st, 2nd, 3rd, etc.
- **Delete Slide:** Remove outdated or seasonal images in one click.

---

### 4.3 Tab 3: Client Reviews Moderation Queue
- **Pending Review Approvals:** Customer reviews submitted on the public website arrive here with a yellow badge. The client can read the review and click **"Approve & Publish"** to push it live, or **"Reject / Delete"** to dismiss spam.
- **Direct Manual Review Entry:** Add reviews received verbally, on WhatsApp, by letter, or via Facebook.

---

### 4.4 Tab 4: Live Global Publishing (`Update the Website`)
- All changes made in the portal are immediately previewable and saved locally.
- Clicking the dark **"Update the Website"** button triggers an automated cloud sync directly to the online repository (`itsmyapp-code/sistine`), updating the live website globally across all devices.

---

## 5. Technical Specifications & Performance

| Feature | Implementation | Client Benefit |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (React 18, App Router) | Rapid page loads, superior SEO, and smooth client transitions. |
| **Image Compression** | Client-side Canvas JPEG (1600px, 85% quality) | Photos upload quickly even on rural 4G mobile connections. |
| **Local Search SEO** | Structured JSON-LD Schema (`PaintingService`) | Strong Google Maps and Dartmouth local trade visibility. |
| **Hosting & Deploy** | Vercel Serverless Architecture | 99.99% uptime, global CDN delivery, and zero server maintenance. |
| **Data Storage** | Local Storage + GitHub API JSON backend | Works offline/locally and syncs permanently to the cloud. |
| **Security** | Session PIN-gated Admin Portal | Unauthorized visitors cannot alter content or view moderation queues. |

---

## 6. Handover Checklist for Sistine Decorators

1. **Admin Portal Address:** Access by visiting `/admin` on your browser.
2. **Default Access PIN:** `1234` (can be updated upon request).
3. **Uploading From Phone:** Bookmark the `/admin` URL on your iPhone/Android home screen. You can take photos on site, open the portal, and publish jobs immediately.
4. **Publishing Live:** Whenever you finish adding jobs or reordering galleries, click the **"Update the Website"** button in the portal to deploy your updates to the live web.
