import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dunearn House | Elite District 11 Living & Turf City First-Mover Advantage',
  description: 'Secure first-mover advantage at Dunearn House (District 11 CCR). Nestled near Sixth Avenue MRT and prestigious schools like Methodist Girls’ School and Nanyang Primary. Developed by Frasers Property, CSC Land, and Sekisui House.',
  openGraph: {
    title: 'Dunearn House | Elite District 11 Living & Turf City First-Mover Advantage',
    description: 'Secure first-mover advantage at Dunearn House (District 11 CCR). Nestled near Sixth Avenue MRT and prestigious schools like Methodist Girls’ School and Nanyang Primary.',
    url: 'https://newlaunch.bluebed.ai/dunearn-house',
    siteName: 'Dunearn House',
    images: [
      {
        url: '/dunearn-house/page_01.png',
        width: 1200,
        height: 630,
        alt: 'Dunearn House Hero Facade',
      },
    ],
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dunearn House | Elite District 11 Living & Turf City First-Mover Advantage',
    description: 'Secure first-mover advantage at Dunearn House (District 11 CCR). Developed by Frasers, CSC Land, and Sekisui House.',
    images: ['/dunearn-house/page_01.png'],
  },
};

export default function DunearnHouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
