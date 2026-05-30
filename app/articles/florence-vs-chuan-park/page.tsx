import type { Metadata } from 'next';
import FlorenceVsChuanParkClient from './client';

export const metadata: Metadata = {
    title: "D19 Capital Appreciation: Florence Residences vs. Chuan Park",
    description: "Unlocking capital appreciation in Singapore's heartland. A comparative detailed analysis of a mega-scale development versus a prime location new launch.",
};

export default function FlorenceVsChuanParkPage() {
    return <FlorenceVsChuanParkClient recaptchaSiteKey={process.env.RECAPTCHA_SITE_KEY || ""} />;
}
