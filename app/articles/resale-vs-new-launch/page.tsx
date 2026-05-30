import type { Metadata } from 'next';
import ResaleVsNewLaunchClient from './client';

export const metadata: Metadata = {
    title: "2026 HDB Upgrader Matrix: Resale vs. New Launch",
    description: "Identify the most efficient path for HDB upgraders in 2026. Compare Harmonization rules, 1.4% mortgage rates, and sunk costs between Resale and New Launch.",
};

export default function ResaleVsNewLaunchPage() {
    return <ResaleVsNewLaunchClient recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY || ""} />;
}
