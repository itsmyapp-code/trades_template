export interface ThemeConfig {
  colors: {
    primary: string;         // e.g. Navy / Deep Slate (#0f172a)
    primaryHover: string;    // (#1e293b)
    secondary: string;       // Accent / Safety Gold / Brass (#f59e0b)
    secondaryHover: string;  // (#d97706)
    accent: string;          // Muted Gold / Rust / Copper (#b45309)
    background: string;      // Warm lime/sand or light slate (#faf9f5)
    surface: string;         // White or off-white card surface (#ffffff)
    textMain: string;        // Main text color (#0f172a)
    textMuted: string;       // Secondary text color (#64748b)
    border: string;          // Border lines (#e2e8f0)
    borderFocus: string;     // Active input focus (#0f172a)
  };
  typography: {
    headingStyle: 'serif' | 'sans'; // Whether headings use editorial serif or modern industrial sans
    bodyStyle: 'sans';
  };
  layout: {
    radius: 'rounded-none' | 'rounded-lg' | 'rounded-xl' | 'rounded-2xl' | 'rounded-3xl' | 'rounded-full';
    cardShadow: 'shadow-xs' | 'shadow-sm' | 'shadow-md' | 'shadow-lg';
    containerMaxWidth: string; // 'max-w-7xl'
  };
}

export const themeConfig: ThemeConfig = {
  colors: {
    primary: '#0f172a',
    primaryHover: '#1e293b',
    secondary: '#f59e0b',
    secondaryHover: '#d97706',
    accent: '#b45309',
    background: '#faf9f5',
    surface: '#ffffff',
    textMain: '#0f172a',
    textMuted: '#64748b',
    border: '#e2e8f0',
    borderFocus: '#0f172a',
  },
  typography: {
    headingStyle: 'serif',
    bodyStyle: 'sans',
  },
  layout: {
    radius: 'rounded-2xl',
    cardShadow: 'shadow-sm',
    containerMaxWidth: 'max-w-7xl',
  },
};
