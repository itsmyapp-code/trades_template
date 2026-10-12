export type ProjectCategory = string;

export interface HeroSlide {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  afterImage?: string | null; // Primary / after photo
  beforeImage?: string | null; // Optional before photo
  images: string[]; // Multiple photos gallery of the work carried out
  description: string;
  scopeDetails?: string[];
  manufacturers?: string[]; // UK Paint & decorating product manufacturers used (e.g., Dulux Trade, Farrow & Ball)
  featured?: boolean;
  publishedAt: string;
  isDraft?: boolean;
  order?: number;
}

export type ReviewSource = 'Facebook' | 'Direct Quote' | 'Google Verified';

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  rating: number;
  reviewText: string;
  source?: ReviewSource;
  publishedAt: string;
  status: 'approved' | 'pending'; // Approval workflow: public submissions default to 'pending'
  verifiedLink?: string;
  isDraft?: boolean;
}

export interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  postcode: string;
  address?: string;
  service: string;
  propertyType?: string;
  timeframe?: string;
  description: string;
  uploadedPhotos?: string[];
}
