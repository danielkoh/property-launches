import type { Metadata } from 'next';
import D19SubAreasAnalysisClient from './client';

export const metadata: Metadata = {
    title: "D19 Sub-Area Analysis - Livability and Capital Gain Potential",
    description: "Deep dive into District 19 sub-areas: Bartley, Serangoon, Sengkang, and Punggol. Detailed SWOT analysis and investment potential.",
};

export default function D19SubAreasAnalysisPage() {
    return <D19SubAreasAnalysisClient recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY || ""} />;
}
