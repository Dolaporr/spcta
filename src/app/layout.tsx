import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const siteTitle = "SPCTA Industrial | Infrastructure for Circular Supply Chains";
const siteDescription =
  "SPCTA builds distributed clean-energy infrastructure for circular supply chains through solar-powered waste banks, digital workflow, workforce capability, and advanced recycling centres.";
const previewImage = "/og-image.png";

export const viewport: Viewport = {
  themeColor: "#0d1117",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.spcta.green"),
  applicationName: "SPCTA Industrial",
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "SPCTA",
    "circular supply chains",
    "clean energy infrastructure",
    "solar-powered waste banks",
    "advanced recycling",
    "recycled feedstock",
  ],
  authors: [{ name: "SPCTA Industrial", url: "https://www.spcta.green" }],
  creator: "SPCTA Industrial",
  publisher: "SPCTA Industrial",
  referrer: "origin-when-cross-origin",
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SPCTA Industrial",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "SPCTA logo",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
  appleWebApp: {
    title: "SPCTA Industrial",
    capable: true,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
