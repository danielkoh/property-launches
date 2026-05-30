import type { Metadata } from "next";
import DragonsClient from "./DragonsClient";

export const metadata: Metadata = {
    title: "The Five Dragons of Singapore | New Launch Singapore",
    description: "Explore Singapore's geomancy landscape. An interactive analysis of the 5 Dragon Veins and how landform Feng Shui influences district prosperity.",
    openGraph: {
        title: "The Five Dragons of Singapore | New Launch Singapore",
        description: "Explore Singapore's geomancy landscape. An interactive analysis of the 5 Dragon Veins and how landform Feng Shui influences district prosperity.",
    },
};

export default function FiveDragonsPage() {
    return <DragonsClient recaptchaSiteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""} />;
}
