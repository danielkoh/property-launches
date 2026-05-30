import type { Metadata } from 'next';
import OcrStrataLandedClient from './client';

export const metadata: Metadata = {
    title: "The OCR Strata Landed Phenom: Netted Buyers Up to $1.45M in 3 Years",
    description: "Deep micro-market analysis using real OCR transaction logs. Exposing the gap between national averages and localized strata landed outperformance.",
};

export default function OcrStrataLandedPage() {
    return <OcrStrataLandedClient recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY || ""} />;
}
