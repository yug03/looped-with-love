import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { BackToTop } from '@/components/ui/BackToTop';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { Providers } from './providers';
import { getSiteSettings } from '@/lib/api';

export const viewport: Viewport = { width:'device-width', initialScale:1, maximumScale:5, themeColor:[{media:'(prefers-color-scheme: light)',color:'#FFF8F0'},{media:'(prefers-color-scheme: dark)',color:'#1A1614'}] };

export const metadata: Metadata = {
  title: { default:'LoopedWithLove — Handmade Crochet Gifts & Products', template:'%s | LoopedWithLove' },
  description: 'Discover beautiful handmade crochet products — bouquets, keychains, earrings, amigurumi & more. Crafted with love.',
  keywords: ['handmade crochet','crochet gifts India','crochet bouquet','amigurumi','loopedwithlove'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://loopedwithlove.vercel.app'),
  openGraph: { type:'website', locale:'en_IN', siteName:'LoopedWithLove', title:'LoopedWithLove — Handmade Crochet', description:'Beautiful handmade crochet products crafted with love.', images:[{url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',width:1200,height:630,alt:'LoopedWithLove'}] },
  robots: { index:true, follow:true },
  manifest: '/manifest.json',
  icons: { icon:'/favicon.ico' },
};

export const revalidate = 3600;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text font-nunito antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Providers>
            <AnnouncementBar text={settings.announcement_text} />
            <Header settings={settings} />
            <main className="min-h-screen pb-16 md:pb-0">{children}</main>
            <Footer settings={settings} />
            <MobileNav />
            <WhatsAppButton phoneNumber={settings.whatsapp_number} />
            <BackToTop />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
