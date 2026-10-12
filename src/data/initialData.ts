import { Project, Testimonial, HeroSlide } from '@/types';
import defaultHeroSlides from './heroSlides.json';
import defaultProjects from './projects.json';
import defaultTestimonials from './testimonials.json';
import { siteConfig } from '@/config/site.config';

export const BUSINESS_CONFIG = {
  name: siteConfig.brand.name,
  tagline: siteConfig.brand.strapline,
  legalName: siteConfig.brand.legalName,
  phone: siteConfig.contact.phone,
  phoneRaw: siteConfig.contact.phoneRaw,
  whatsapp: siteConfig.contact.whatsapp,
  whatsappDisplay: siteConfig.contact.whatsappDisplay,
  email: siteConfig.contact.email,
  dataPrivacyLeadEmail: siteConfig.compliance.dplEmail,
  address: siteConfig.contact.address,
  postcode: siteConfig.contact.postcode,
  facebook: siteConfig.contact.facebook || '',
  facebookHandle: siteConfig.contact.facebook ? siteConfig.contact.facebook.split('/').pop() : '',
  coverageAreas: siteConfig.brand.coverageAreas,
  workingHours: siteConfig.brand.workingHours,
  insuranceCoverage: siteConfig.trust.insuranceNotice,
};

export const UK_PAINT_MANUFACTURERS: string[] = siteConfig.trade.defaultSuppliersOrMaterials;

export const INITIAL_HERO_SLIDES: HeroSlide[] = defaultHeroSlides as HeroSlide[];

export const INITIAL_PROJECTS: Project[] = defaultProjects as Project[];

export const INITIAL_TESTIMONIALS: Testimonial[] = defaultTestimonials as Testimonial[];
