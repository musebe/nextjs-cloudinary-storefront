// src/app/head.tsx
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalize E-commerce & Marketing Visuals',
  description:
    'Use Cloudinary Product Gallery, Imagga Auto-Tagging, and Generative Replace to customize product imagery with Next.js, Shadcn, and Motion.',
};

export default function Head() {
  return (
    <>
      {/* ── Cloudinary Upload Widget (optional) ─────────────────────────── */}
      <Script
        src='https://upload-widget.cloudinary.com/global/all.js'
        strategy='beforeInteractive'
        async
      />

      {/* ── Cloudinary Product Gallery bundle ──────────────────────────── */}
      {/* CSS first, so the gallery is styled before it renders */}
      <link
        rel='stylesheet'
        href='https://product-gallery.cloudinary.com/all.css'
      />
      {/* JS bundle exposes window.cloudinary.galleryWidget */}
      <Script
        src='https://product-gallery.cloudinary.com/all.js'
        strategy='beforeInteractive'
        async
      />
    </>
  );
}
