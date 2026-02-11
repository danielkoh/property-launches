import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Inter as in the mockup
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newlaunch.bluebed.ai"),
  title: "Pinery Residences | Experience Convenience & Value",
  description:
    "Direct access to MRT, situated above a retail mall, and within 1km of top primary schools. Discover Pinery Residences - the smart choice for modern living in Singapore.",
  keywords: [
    "Pinery Residences",
    "Singapore Property",
    "New Launch",
    "Tampines Condo",
    "Luxury Living",
    "Real Estate Singapore",
  ],
  authors: [{ name: "Daniel Koh", url: "https://www.bluebed.ai" }],
  openGraph: {
    title: "Pinery Residences | Experience Convenience & Value",
    description:
      "Direct access to MRT, situated above a retail mall, and within 1km of top primary schools. Discover Pinery Residences - the smart choice for modern living in Singapore.",
    url: "https://pinery-residences.bluebed.ai",
    siteName: "Pinery Residences",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Pinery Residences Facade",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinery Residences | Experience Convenience & Value",
    description:
      "Direct access to MRT, situated above a retail mall, and within 1km of top primary schools.",
    images: ["/hero.png"],
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

};

import RecaptchaProvider from "./components/RecaptchaProvider";
import GoogleAnalytics from "./components/GoogleAnalytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <RecaptchaProvider>{children}</RecaptchaProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
