import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thomson Reserve | Modern Singapore Luxury at Bright Hill Drive',
  description: 'Discover modern Singapore luxury at Bright Hill Drive. Register your interest for Thomson Reserve.',
  openGraph: {
    title: 'Thomson Reserve | Modern Singapore Luxury at Bright Hill Drive',
    description: 'Discover modern Singapore luxury at Bright Hill Drive. Register your interest for Thomson Reserve.',
    url: 'https://newlaunch.bluebed.ai/thomson-reserve',
    siteName: 'Thomson Reserve',
    images: [
      {
        url: '/thomson-reserve/thomson-reserve_p26_img1.jpeg',
        width: 1200,
        height: 630,
        alt: 'Thomson Reserve Hero',
      },
    ],
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomson Reserve | Modern Singapore Luxury at Bright Hill Drive',
    description: 'Discover modern Singapore luxury at Bright Hill Drive. Register your interest for Thomson Reserve.',
    images: ['/thomson-reserve/thomson-reserve_p26_img1.jpeg'],
  },
};

export default function ThomsonReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
