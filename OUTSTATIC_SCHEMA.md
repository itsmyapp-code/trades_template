# Outstatic CMS Schema & Collection Definition

This application is designed for instant out-of-the-box operation and full Git-based Outstatic CMS synchronization.

## 1. Projects Collection (`projects`)
- **Location:** `outstatic/content/projects`
- **Fields:**
  - `title` (String, required): Descriptive title of the project (e.g., "Georgian Townhouse Interior & Cornice Restoration")
  - `category` (Select, required): "Interior" | "Exterior" | "Wallpapering" | "Restoration & Woodwork" | "Commercial"
  - `location` (String, required): Town/City and Postcode area (e.g., "Cheltenham, Gloucestershire")
  - `beforeImage` (Image upload, optional): High-resolution photo before restoration
  - `afterImage` (Image upload, required): High-resolution photo of completed finish
  - `description` (Textarea, required): Detailed summary of surface prep, paint systems, and craft techniques
  - `featured` (Boolean): Highlight on homepage comparison slider
  - `publishedAt` (Date): Publication date (YYYY-MM-DD)

## 2. Testimonials Collection (`testimonials`)
- **Location:** `outstatic/content/testimonials`
- **Fields:**
  - `clientName` (String, required): Client or property owner name
  - `location` (String, required): Town / district
  - `projectType` (String, required): Scope description (e.g., "Period Townhouse Full Interior")
  - `rating` (Number, 1–5, required): Customer star rating
  - `reviewText` (Textarea, required): Verbatim client testimonial
  - `source` (Select, required): "Facebook" | "Direct Quote" | "Google Verified"
  - `publishedAt` (Date): Publication date

## 3. Environment Variables for Deployment (Vercel & GitHub)
When deploying to Vercel with Outstatic:
```env
OST_GITHUB_ID=your_github_oauth_client_id
OST_GITHUB_SECRET=your_github_oauth_client_secret
OST_REPO_SLUG=your-org/apex-decorating-restoration
OST_REPO_BRANCH=main
NEXT_PUBLIC_ADMIN_PIN=1234
```
