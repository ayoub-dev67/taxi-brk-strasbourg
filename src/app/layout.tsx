import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Header, Footer, MobileNavigation, FloatingButtons } from "@/components/layout";
import { SchemaMarkup } from "@/components/shared/SchemaMarkup";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import { ServiceWorkerRegistration } from "@/components/shared/ServiceWorkerRegistration";
import { Analytics } from "@/components/shared/Analytics";
import { InitialLoader, CustomCursor } from "@/components/animations";
import { GoogleMapsProvider } from "@/components/maps";
import { siteConfig } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Taxi Conventionné CPAM Strasbourg`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: `${siteConfig.name} | Taxi Conventionné CPAM Strasbourg`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.images.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Taxi Conventionné CPAM Strasbourg`,
    description: siteConfig.description,
    images: [siteConfig.images.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.svg",
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Local SEO Meta Tags */}
        <meta name="geo.region" content="FR-67" />
        <meta name="geo.placename" content="Strasbourg" />
        <meta name="geo.position" content="48.5734;7.7521" />
        <meta name="ICBM" content="48.5734, 7.7521" />

        {/* Schema.org structured data */}
        <SchemaMarkup />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <GoogleMapsProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="skip-to-main"
          >
            Aller au contenu principal
          </a>
          <PromoBanner />
          <Header />
          <main id="main-content" className="min-h-screen" tabIndex={-1}>{children}</main>
          <Footer />
          <MobileNavigation />
          <FloatingButtons />
          <ExitIntentPopup />
          <Toaster position="top-center" richColors />
          <ServiceWorkerRegistration />
          <Analytics />
          <InitialLoader />
          <CustomCursor />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
