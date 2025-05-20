// src/app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import type { ReactNode } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Interactive Storefront Demo – Next.js & Cloudinary',
  description:
    'A Next.js 15 app showcasing Cloudinary’s Product Gallery with AI-powered auto-tagging and 3-D models.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${spaceGrotesk.className} ${jetbrainsMono.className}`}
    >
      <head>
        {/* ➊  warm-up the Cloudinary CDN */}
        <link rel='preconnect' href='https://res.cloudinary.com' />

        {/* Product-Gallery bundle */}
        <link
          rel='stylesheet'
          href='https://product-gallery.cloudinary.com/all.css'
        />
        <Script
          src='https://product-gallery.cloudinary.com/all.js'
          strategy='beforeInteractive'
        />

        {/* ➋  Upload-widget can be deferred */}
        <Script
          src='https://upload-widget.cloudinary.com/global/all.js'
          strategy='lazyOnload'
        />

        {/* 3-D element */}
        <Script
          type='module'
          src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
          strategy='beforeInteractive'
        />
      </head>

      <body className='antialiased flex flex-col min-h-screen'>
        <Navbar />
        <main className='flex-grow pt-16 px-4 sm:px-6 lg:px-8'>{children}</main>
        <Footer />
        <Toaster position='bottom-right' />
      </body>
    </html>
  );
}
