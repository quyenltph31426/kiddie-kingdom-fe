import { fontOrbitron, fontPoppins, fontSans, openSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { cn } from '@/libs/common';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from './providers';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.appUrl),
  title: siteConfig.name,
  description: siteConfig.description,
  generator: 'Next.js',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: [],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    images: [siteConfig.ogImage],
    description: siteConfig.description,
    title: {
      default: siteConfig.name,
      template: `${siteConfig.name} - %s`,
    },
  },
  icons: {
    icon: siteConfig.ogImage,
    shortcut: siteConfig.ogImage,
    apple: siteConfig.ogImage,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.name}`,
  },
};

export const viewport: Viewport = {
  width: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    // { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={cn(
          'min-h-screen bg-background font-poppins antialiased',
          openSans.variable,
          fontSans.variable,
          fontPoppins.variable,
          fontOrbitron.variable
        )}
      >
        <Providers>
          <>{children}</>
        </Providers>
      </body>
    </html>
  );
}
