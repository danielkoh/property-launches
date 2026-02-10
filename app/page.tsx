import type { Metadata } from "next";
import HomeClient from "./components/HomeClient";

export const metadata: Metadata = {
  title: "New Launch Singapore | Property Investment Tools & Analysis",
  description:
    "Comprehensive property launch analysis, mortgage calculators, and investment insights by Daniel Koh. Find your next property gem with data-backed decisions.",
  keywords: [
    "Singapore Property",
    "New Launch",
    "Property Investment",
    "Mortgage Calculator",
    "Stamp Duty Calculator",
    "Daniel Koh",
    "Real Estate Singapore",
  ],
  authors: [{ name: "Daniel Koh", url: "https://www.era.com.sg" }],
  openGraph: {
    title: "New Launch Singapore | Property Investment Tools & Analysis",
    description:
      "Comprehensive property launch analysis, mortgage calculators, and investment insights by Daniel Koh.",
    url: "https://property-launches.vercel.app", // Adjust if user has a custom domain
    siteName: "New Launch Singapore",
    images: [
      {
        url: "/logo.png", // Or a specific OG image for the main site
        width: 1200,
        height: 630,
        alt: "New Launch Singapore",
      },
    ],
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Launch Singapore | Property Investment Tools & Analysis",
    description:
      "Comprehensive property launch analysis, mortgage calculators, and investment insights by Daniel Koh.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return <HomeClient />;
}
