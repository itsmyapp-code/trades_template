export interface TrustBadge {
  name: string;
  tagline: string;
  iconName?: 'ShieldCheck' | 'Award' | 'Building2' | 'CheckCircle2' | 'Flame' | 'Hammer';
  badgeText?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  buttonText: string;
  iconName: 'Building2' | 'Hammer' | 'Layers' | 'Home' | 'Paintbrush' | 'Wrench' | 'ShieldCheck';
  gradient: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    legalName: string;
    strapline: string;
    subStrapline?: string;
    logoImage?: string; // Set to image path e.g. '/sistine_logo.jpg' or leave undefined for dynamic typographic logo
    locationBadge: string;
    serviceArea: string;
    coverageAreas: string[];
    workingHours: string;
    foundedYear?: string;
  };
  contact: {
    phone: string;
    phoneRaw: string;
    whatsapp: string;
    whatsappDisplay: string;
    email: string;
    address: string;
    postcode: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  trade: {
    sector: string; // e.g. 'Building & General Construction', 'Painting & Decorating', 'Carpentry & Joinery'
    specificationsLabel: string; // e.g. 'Materials & Structural Scope' or 'Paints & Suppliers Used'
    specificationsPlaceholder: string;
    defaultSuppliersOrMaterials: string[];
    categories: string[]; // e.g. ['All', 'Extensions', 'Renovations', 'New Builds', 'Carpentry']
    services: ServiceItem[];
  };
  trust: {
    showTrustBanner: boolean;
    bannerHeadline?: string;
    badges: TrustBadge[];
    insuranceNotice: string;
    guaranteeNotice: string;
  };
  seo: {
    defaultTitle: string;
    metaTitleTemplate: string;
    description: string;
    keywords: string[];
    schemaType: 'GeneralContractor' | 'HomeAndConstructionBusiness' | 'PaintingService';
  };
  compliance: {
    dplEmail: string;
    effectiveDate: string;
    governanceStandard: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: 'Apex Construction & Master Builders',
    legalName: 'Apex Construction & Building Services Ltd',
    strapline: 'Design • Build • Transform',
    subStrapline: 'Dartmouth, Kingswear & The South Hams',
    logoImage: undefined, // Dynamic architectural logo enabled
    locationBadge: 'Dartmouth & South Devon',
    serviceArea: 'Dartmouth, Kingswear, Totnes, Salcombe & South Hams',
    coverageAreas: [
      'Dartmouth',
      'Kingswear',
      'Stoke Fleming',
      'Strete',
      'Dittisham',
      'Totnes',
      'Blackawton',
      'Salcombe',
      'South Hams'
    ],
    workingHours: 'Monday – Friday: 07:30 – 17:30 | Saturday: By Appointment',
    foundedYear: '2016',
  },
  contact: {
    phone: '07803 258507',
    phoneRaw: '07803258507',
    whatsapp: '447803258507',
    whatsappDisplay: '07803 258507',
    email: 'info@apexbuilders-devon.co.uk',
    address: '15 Southtown, Dartmouth, Devon, TQ6 9BX',
    postcode: 'TQ6 9BX',
    facebook: 'https://www.facebook.com/apexbuildersdevon',
  },
  trade: {
    sector: 'High-Ticket Building, Renovations & Extensions',
    specificationsLabel: 'Materials & Structural Scope',
    specificationsPlaceholder: 'e.g. C24 Structural Timber, Steel RSJ, British Gypsum, Marley Roof Tiles',
    defaultSuppliersOrMaterials: [
      'Structural Steel (RSJ)',
      'C24 Structural Timber',
      'Celotex / Kingspan Insulation',
      'British Gypsum',
      'Marley Roof Tiles',
      'Velux Rooflights',
      'Origin Aluminium Bifolds',
      'Marshalls Natural Stone',
      'Rehau Windows',
      'Underfloor Heating (Wet)',
      'Porcelanosa Tiling',
      'Dulux Trade Finishes',
      'Farrow & Ball Coatings',
      'Permarock External Render',
      'K-Rend Silicone Render',
      'Sandtoft Slate'
    ],
    categories: ['All', 'Extensions', 'Renovations', 'New Builds', 'Specialist Carpentry'],
    services: [
      {
        id: 'extensions',
        title: 'Home Extensions & Architectural Expansions',
        category: 'Extensions',
        description: 'Single and double-storey rear and side extensions, structural knock-throughs, and open-plan kitchen living transformations built with exacting precision.',
        buttonText: 'View Extension Projects',
        iconName: 'Building2',
        gradient: 'from-slate-800 to-slate-950',
      },
      {
        id: 'renovations',
        title: 'Full Property Renovations & Period Restorations',
        category: 'Renovations',
        description: 'Comprehensive restorations of coastal holiday homes, townhouses, and heritage stone properties across Dartmouth, blending period integrity with modern luxury.',
        buttonText: 'Explore Renovations',
        iconName: 'Hammer',
        gradient: 'from-amber-700 to-slate-900',
      },
      {
        id: 'new-builds',
        title: 'Bespoke New Builds & Structural Groundworks',
        category: 'New Builds',
        description: 'Turnkey residential developments from foundations, retaining walls, and steel framing through to high-end interior carpentry and architectural finishes.',
        buttonText: 'Inspect New Builds',
        iconName: 'Layers',
        gradient: 'from-blue-800 to-slate-900',
      },
    ],
  },
  trust: {
    showTrustBanner: true,
    bannerHeadline: 'Accredited Craftsmanship & Structural Integrity',
    badges: [
      {
        name: 'FMB Member',
        tagline: 'Federation of Master Builders',
        iconName: 'Award',
        badgeText: 'FMB'
      },
      {
        name: 'TrustMark Verified',
        tagline: 'Government-Endorsed Quality',
        iconName: 'ShieldCheck',
        badgeText: 'TRUSTMARK'
      },
      {
        name: 'NHBC Standards',
        tagline: 'Approved Building Warranty',
        iconName: 'Building2',
        badgeText: 'NHBC'
      },
      {
        name: 'Fully Insured',
        tagline: '£5M Public & Employers Liability',
        iconName: 'CheckCircle2',
        badgeText: 'INSURED'
      },
      {
        name: '10-Year Guarantee',
        tagline: 'Structural Workmanship Warranty',
        iconName: 'ShieldCheck',
        badgeText: '10-YR'
      }
    ],
    insuranceNotice: 'Fully Insured with £5,000,000 Public & Contract Works Liability',
    guaranteeNotice: 'Comprehensive 10-Year Workmanship & Structural Guarantee on qualifying works',
  },
  seo: {
    defaultTitle: 'Apex Construction | Master Builders & Renovations Dartmouth, Devon',
    metaTitleTemplate: '%s | Apex Construction Dartmouth',
    description: 'Premier building contractor in Dartmouth and the South Hams. Specialising in luxury home extensions, complete structural renovations, and architectural carpentry.',
    keywords: [
      'builders Dartmouth',
      'building contractors South Hams',
      'house extensions Dartmouth',
      'home renovations South Devon',
      'master builders Totnes',
      'structural alterations Dartmouth Devon'
    ],
    schemaType: 'GeneralContractor',
  },
  compliance: {
    dplEmail: 'privacy@apexbuilders-devon.co.uk',
    effectiveDate: '2026-10-12',
    governanceStandard: 'UK GDPR / Data (Use and Access) Act (DUAA 2025)',
  },
};
