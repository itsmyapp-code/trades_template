import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import MobileStickyBar from "@/components/MobileStickyBar";
import { siteConfig } from "@/config/site.config";
import { themeConfig } from "@/config/theme.config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.metaTitleTemplate,
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  publisher: "itsmyapp.co.uk",
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.description,
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.brand.name,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: themeConfig.colors.primary,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex flex-col min-h-screen bg-brand-bg text-brand-text selection:bg-amber-100 selection:text-amber-900 font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-brand-primary text-white font-bold rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary"
        >
          Skip to main content
        </a>
        
        <Navbar />
        
        <main id="main-content" className="flex-1 pb-16 md:pb-0">
          {children}
        </main>

        <Footer />
        <CookieBanner />
        <MobileStickyBar />
      </body>
    </html>
  );
}
